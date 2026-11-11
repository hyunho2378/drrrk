import AVFoundation
import Foundation
import Observation
import Speech
import SwiftUI

// 말한 내용 받아쓰기(11/11 밤 사용자 결정: "1초 뒤에 파란 말풍선으로 올라가게"). 웹 client/src/app/dictation.js 와 같은 동작이다.
// 방 입력줄(RoomInputBar)의 마이크가 켜져 있고 음성 인식과 마이크 권한을 받았으면, 말하는 동안 입력칸에 중간 결과가 채워지고
// 마지막 결과에서 1.0초 동안 새 결과가 없으면 입력줄 보내기와 같은 경로로 내 파란 말풍선이 된다.
// 마이크를 끄면 바로 멈추고 진행 중인 글은 버린다. 인식이 스스로 끝나면(1분 제한, 최종 결과, 오류) 마이크가 켜져 있는 동안 다시 듣는다.
// 연속 실패 3번이면 조용히 멈춘다. 권한을 거부하면 받아쓰기 없이 마이크만 켜진 상태로 둔다.
//
// 오디오 세션: 앱은 평소 ambient(mixWithOthers)를 쓴다. 녹음에는 playAndRecord 가 필요하므로 받아쓰기가 도는 동안만
// playAndRecord(mixWithOthers, defaultToSpeaker, allowBluetooth)로 바꾸고 멈추면 ambient 로 되돌린다.
// 그동안 다른 소리 코드(RoomVoice, FileSound, ItemSound)가 ambient 로 되돌리지 않도록 DictationAudio.recording 을 본다.
//
// 마이크가 켜진 채 남지 않게(11/11 밤 사용자 지시 "음성만 계속 켜져 있거나 그러면 안 됨", 웹 dictation.js 와 같은 규칙):
// 방에 들어와도 듣지 않는다. 마이크 버튼을 눌러야 그때 권한을 묻고 듣는다(첫 버튼 모양은 웹 첫 상태처럼 초록).
// 아래 경우 바로 AVAudioEngine stop, inputNode removeTap, recognitionTask cancel, 오디오 세션 ambient 로 놓는다.
//   mic-off 버튼으로 끔, leave 방 화면을 떠남(방 위 창 miniProfile, report, block 은 받아쓰기만 잠시 멈춤 pause),
//   hidden scenePhase background 또는 inactive(권한 창이 떠 있는 동안의 inactive 는 뺀다), room-end 해가 떠 종료 리포트로 감,
//   idle 말 없음 idleSeconds(30초, 웹 tokens.js live.dictIdleSec 와 같은 값). 끈 뒤에는 앱으로 돌아와도 저절로 켜지지 않는다.

/// 받아쓰기가 오디오 세션을 쓰는 중인지. 소리 코드가 세션 종류를 ambient 로 바꾸기 전에 본다.
enum DictationAudio {
    nonisolated(unsafe) static var recording = false
}

/// 오디오 탭(오디오 스레드)에서 지금 인식 요청으로 소리를 넘기는 상자. 요청을 바꿔도 엔진은 멈추지 않는다.
final class DictationTapBox: @unchecked Sendable {
    private let lock = NSLock()
    private var request: SFSpeechAudioBufferRecognitionRequest?

    func set(_ r: SFSpeechAudioBufferRecognitionRequest?) {
        lock.lock(); request = r; lock.unlock()
    }

    func append(_ buffer: AVAudioPCMBuffer) {
        lock.lock(); let r = request; lock.unlock()
        r?.append(buffer)
    }
}

@MainActor
@Observable
final class Dictation {
    static let shared = Dictation()

    /// 마지막 결과 뒤 이만큼 새 결과가 없으면 보낸다.
    static let silence: Duration = .milliseconds(1000)
    /// 인식이 스스로 끝났을 때 다시 시작하는 간격.
    static let restartDelay: Duration = .milliseconds(300)
    static let maxFails = 3
    /// 켠 뒤나 마지막 결과 뒤 말이 없는 상태가 이만큼 이어지면 받아쓰기를 멈추고 마이크 버튼을 꺼짐으로 바꾼다(웹 tokens.js live.dictIdleSec).
    static let idleSeconds: TimeInterval = 30
    /// 입력줄이 사라진 뒤 이 시간 안에 다른 입력줄(현장 모드와 일반 모드)이 붙지 않으면 방을 떠난 것으로 본다.
    static let leaveGrace: Duration = .milliseconds(600)
    /// 웹 tokens.js live.micOnText, micMutedText 와 같은 안내 글.
    static let micOnText = "마이크가 켜졌어요"
    static let micMutedText = "마이크를 껐어요"
    /// 같은 문장이 이 시간 안에 다시 오면 보내지 않는다(인식 재시작 때 같은 결과).
    static let dupWindow: TimeInterval = 4

    /// 입력칸에 보일 받아쓴 글(중간 결과 포함).
    private(set) var partial = ""
    private(set) var running = false
    /// 사용자가 마이크 버튼으로 켠 상태(듣는 중). 방에 들어올 때는 false 다.
    private(set) var listening = false
    /// 마이크 버튼이 꺼짐(빨강)인지. 처음과 방을 떠난 뒤는 false(웹 첫 상태처럼 초록), 끔과 숨김과 말 없음 뒤는 true.
    private(set) var muted = false

    /// 확인용 기록(시작, 중간 결과, 최종, 보냄, 재시작, 오류). 시뮬레이터에서 콘솔 없이 볼 수 있게 남긴다.
    @ObservationIgnored private(set) var log: [String] = []

    @ObservationIgnored private var owner: UUID?
    @ObservationIgnored private var commitHandler: ((String) -> Bool)?
    /// 방 위 창(미니프로필, 신고, 차단)이 떠 있는지. 떠 있는 동안은 받아쓰기만 잠시 멈춘다.
    @ObservationIgnored private var covered = false
    @ObservationIgnored private var lastAct = Date()
    @ObservationIgnored private var lastWhy = "mic-off"
    @ObservationIgnored private var idleTask: Task<Void, Never>?
    @ObservationIgnored private var leaveTask: Task<Void, Never>?
    @ObservationIgnored private var authorized: Bool?
    @ObservationIgnored private var asking = false

    @ObservationIgnored private let recognizer = SFSpeechRecognizer(locale: Locale(identifier: "ko-KR"))
    @ObservationIgnored private let engine = AVAudioEngine()
    @ObservationIgnored private let box = DictationTapBox()
    @ObservationIgnored private var request: SFSpeechAudioBufferRecognitionRequest?
    @ObservationIgnored private var task: SFSpeechRecognitionTask?
    @ObservationIgnored private var session = 0
    @ObservationIgnored private var silenceTask: Task<Void, Never>?
    @ObservationIgnored private var restartTask: Task<Void, Never>?
    @ObservationIgnored private var fails = 0
    @ObservationIgnored private var gaveUp = false
    @ObservationIgnored private var hadResult = false
    /// 끝난 인식 묶음에서 받아 두었지만 아직 보내지 않은 글.
    @ObservationIgnored private var carry = ""
    /// 지금 인식 묶음의 글.
    @ObservationIgnored private var live = ""
    @ObservationIgnored private var lastSent = ""
    @ObservationIgnored private var lastSentAt = Date.distantPast

    private init() {}

    private func note(_ s: String) {
        log.append(String(format: "%.2f ", Date().timeIntervalSince1970.truncatingRemainder(dividingBy: 1000)) + s)
        if log.count > 300 { log.removeFirst(log.count - 300) }
        #if DEBUG
        print("[DRRRK 받아쓰기]", s)
        #endif
    }

    // MARK: - 입력줄 연결

    /// 입력줄이 나타나면 붙는다. commit 은 문장을 보냈으면 true, 사용자가 직접 치는 중이라 못 보냈으면 false 를 돌려준다.
    func attach(_ id: UUID, commit: @escaping (String) -> Bool) {
        leaveTask?.cancel()
        owner = id
        commitHandler = commit
        sync()
    }

    /// 입력줄이 사라지면 뗀다. 그사이 다른 입력줄(현장 모드와 일반 모드)이 붙었으면 그대로 둔다.
    func detach(_ id: UUID) {
        guard owner == id else { return }
        owner = nil
        commitHandler = nil
        sync()
        // 다른 입력줄이 곧 붙지 않으면 방을 떠난 것이다. 마이크를 놓고 다음 방은 처음 상태로 시작한다.
        leaveTask?.cancel()
        leaveTask = Task { @MainActor in
            try? await Task.sleep(for: Self.leaveGrace)
            guard !Task.isCancelled, self.owner == nil else { return }
            self.halt("leave", muted: false)
        }
    }

    /// 마이크 버튼을 눌렀다. 켜졌으면 true. 켤 때 처음이면 이때 권한을 묻는다.
    @discardableResult
    func toggleMic() -> Bool {
        if listening {
            halt("mic-off", muted: true)
            return false
        }
        listening = true
        muted = false
        fails = 0
        gaveUp = false
        lastAct = Date()
        note("켬")
        startIdleWatch()
        sync()
        return true
    }

    /// 방 위 창이 떠 있으면 받아쓰기만 잠시 멈춘다(마이크 버튼 상태는 그대로).
    func setCovered(_ up: Bool) {
        guard covered != up else { return }
        covered = up
        sync()
    }

    /// 앱이 뒤로 가거나(background) 잠시 가려지면(inactive) 바로 놓는다. 권한 창 때문의 inactive 는 뺀다.
    func scene(_ phase: ScenePhase) {
        if phase == .background || (phase == .inactive && !asking) { halt("hidden", muted: true) }
    }

    /// 해가 떠 종료 리포트로 갈 때 방 시계가 부른다.
    func end(_ why: String = "room-end") { halt(why, muted: false) }

    /// 받아쓰기와 마이크를 모두 놓는다. muted 가 true 면 버튼이 꺼짐(빨강)으로 남고, false 면 처음 상태로 돌아간다.
    func halt(_ why: String, muted m: Bool) {
        idleTask?.cancel()
        idleTask = nil
        let was = listening || running
        listening = false
        if muted != m { muted = m }
        lastWhy = why
        if running { stop(why) } else if was { clearText(); restoreSession(); note("멈춤 \(why)") }
    }

    /// 말 없음 시계. 엔진이 듣는 동안 마지막 결과(또는 켠 순간, 다시 들은 순간)에서 idleSeconds 가 지나면 끈다.
    private func startIdleWatch() {
        idleTask?.cancel()
        idleTask = Task { @MainActor in
            while !Task.isCancelled {
                try? await Task.sleep(for: .milliseconds(250))
                guard !Task.isCancelled, self.listening else { return }
                guard self.running else { continue }
                if Date().timeIntervalSince(self.lastAct) >= Self.idleSeconds {
                    self.note("말 없음 \(Int(Self.idleSeconds))초")
                    self.halt("idle", muted: true)
                    RoomToastCenter.shared.show(Self.micMutedText)
                    return
                }
            }
        }
    }

    /// 사용자가 친 글을 비웠을 때 기다리던 받아쓴 글로 1초 시계를 다시 건다.
    func rearm() {
        guard running, !partial.trimmingCharacters(in: .whitespaces).isEmpty else { return }
        armSilence()
    }

    private func sync() {
        let want = owner != nil && listening && !covered && !gaveUp
        if !want {
            if running { stop(listening ? "pause" : lastWhy) }
            return
        }
        guard !running else { return }
        guard let ok = authorized else { ask(); return }
        guard ok else { return }
        start()
    }

    // MARK: - 권한(마이크를 처음 켤 때 한 번 묻는다)

    private func ask() {
        guard !asking else { return }
        asking = true
        SFSpeechRecognizer.requestAuthorization { status in
            Task { @MainActor in
                let speech = status == .authorized
                AVAudioApplication.requestRecordPermission { granted in
                    Task { @MainActor in
                        let d = Dictation.shared
                        d.asking = false
                        d.authorized = speech && granted
                        d.note("권한 음성 \(speech) 마이크 \(granted)")
                        d.sync()
                    }
                }
            }
        }
    }

    // MARK: - 엔진

    private func start() {
        guard let recognizer, recognizer.isAvailable else { fail("인식기 없음"); return }
        let audio = AVAudioSession.sharedInstance()
        do {
            DictationAudio.recording = true
            try audio.setCategory(.playAndRecord, mode: .default, options: [.mixWithOthers, .defaultToSpeaker, .allowBluetooth])
            try audio.setActive(true)
        } catch {
            restoreSession()
            fail("세션")
            return
        }
        let input = engine.inputNode
        let format = input.outputFormat(forBus: 0)
        guard format.sampleRate > 0, format.channelCount > 0 else { restoreSession(); fail("입력 없음"); return }
        input.removeTap(onBus: 0)
        input.installTap(onBus: 0, bufferSize: 1024, format: format, block: Self.tap(box))
        engine.prepare()
        do {
            try engine.start()
        } catch {
            input.removeTap(onBus: 0)
            restoreSession()
            fail("엔진")
            return
        }
        running = true
        lastAct = Date()
        note("시작 기기 안 인식 지원 \(recognizer.supportsOnDeviceRecognition)")
        newRequest()
    }

    /// 오디오 스레드에서 불리는 탭. 메인 액터에 묶이지 않게 따로 만든다.
    nonisolated private static func tap(_ box: DictationTapBox) -> AVAudioNodeTapBlock {
        { buffer, _ in box.append(buffer) }
    }

    /// 새 인식 묶음을 연다. 엔진과 탭은 그대로 두고 요청만 바꾼다.
    private func newRequest() {
        guard running, let recognizer else { return }
        task?.cancel()
        request?.endAudio()
        session += 1
        let sid = session
        hadResult = false
        live = ""
        let req = SFSpeechAudioBufferRecognitionRequest()
        req.shouldReportPartialResults = true
        req.requiresOnDeviceRecognition = false
        request = req
        box.set(req)
        task = recognizer.recognitionTask(with: req) { result, error in
            let text = result?.bestTranscription.formattedString
            let fin = result?.isFinal ?? false
            let failed = error != nil
            Task { @MainActor in Dictation.shared.handle(sid, text, fin, failed) }
        }
    }

    private func handle(_ sid: Int, _ text: String?, _ fin: Bool, _ failed: Bool) {
        guard sid == session, running else { return }
        if let text, !text.trimmingCharacters(in: .whitespaces).isEmpty {
            hadResult = true
            fails = 0
            lastAct = Date()
            live = text
            // 이미 보낸 문장이 재시작 뒤 같은 최종 결과로 다시 오면 보내지 않는다.
            if fin, carry.isEmpty, text == lastSent, Date().timeIntervalSince(lastSentAt) < Self.dupWindow {
                note("같은 문장 건너뜀 \(text)")
                live = ""
                newRequest()
                return
            }
            partial = joined()
            note((fin ? "최종 " : "중간 ") + text)
            armSilence()
        }
        guard fin || failed else { return }
        // 이 묶음이 끝났다(최종 결과, 1분 제한, 오류). 받은 글은 carry 로 넘기고 다시 듣는다.
        carry = joined()
        live = ""
        if failed && !hadResult {
            fails += 1
            note("오류 \(fails)")
            if fails >= Self.maxFails { gaveUp = true; note("멈춤"); stop("giveup"); return }
        }
        restartTask?.cancel()
        restartTask = Task { @MainActor in
            try? await Task.sleep(for: Self.restartDelay)
            guard !Task.isCancelled, self.running, sid == self.session else { return }
            self.note("재시작")
            self.newRequest()
        }
    }

    private func joined() -> String {
        [carry, live].map { $0.trimmingCharacters(in: .whitespaces) }.filter { !$0.isEmpty }.joined(separator: " ")
    }

    private func armSilence() {
        silenceTask?.cancel()
        silenceTask = Task { @MainActor in
            try? await Task.sleep(for: Self.silence)
            guard !Task.isCancelled else { return }
            self.commit()
        }
    }

    private func commit() {
        let text = partial.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !text.isEmpty else { return }
        if text == lastSent, Date().timeIntervalSince(lastSentAt) < Self.dupWindow {
            note("같은 문장 건너뜀 \(text)")
            clearText()
            return
        }
        guard let commitHandler, commitHandler(text) else { note("타이핑 중이라 기다림"); return }
        lastSent = text
        lastSentAt = Date()
        note("보냄 \(text)")
        clearText()
        // 보낸 뒤 새 말은 새 묶음에서 받는다(앞 문장이 다음 결과에 섞이지 않게).
        if running { newRequest() }
    }

    private func clearText() {
        carry = ""
        live = ""
        partial = ""
    }

    private func stop(_ why: String) {
        silenceTask?.cancel()
        restartTask?.cancel()
        session += 1
        task?.cancel()
        task = nil
        request?.endAudio()
        request = nil
        box.set(nil)
        if engine.isRunning { engine.stop() }
        engine.inputNode.removeTap(onBus: 0)
        running = false
        clearText()
        restoreSession()
        note("멈춤 \(why)")
    }

    private func restoreSession() {
        DictationAudio.recording = false
        try? AVAudioSession.sharedInstance().setCategory(.ambient, options: [.mixWithOthers])
    }

    private func fail(_ what: String) {
        fails += 1
        note("오류 \(what) \(fails)")
        if fails >= Self.maxFails { gaveUp = true; note("멈춤"); return }
        restartTask?.cancel()
        restartTask = Task { @MainActor in
            try? await Task.sleep(for: Self.restartDelay)
            guard !Task.isCancelled else { return }
            self.sync()
        }
    }
}
