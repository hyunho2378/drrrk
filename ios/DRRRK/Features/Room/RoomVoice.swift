import AVFoundation
import Foundation

// 방 대사 녹음. 함께 드르륵 방에서 내 말풍선(파란 말풍선, ChatEntry.mine)이 나타날 때 같은 대사의 녹음을 낸다(11. 10. 팀 음성 파일).
// 짝: "아니 오늘 나 뭔일 있었냐면"은 무슨 일이 있었냐면.mp3(voice-museun-il), "나만 예민한 거 아니지?"는 나만예민한거아니지.mp3(voice-naman-yemin).
// 무슨 일이 있었냐면은 앞 0.9초가 무음이라 0.9초 지점부터 재생해 말풍선이 나타나는 순간 목소리가 바로 나온다. 나만 예민한은 처음부터 재생한다.
// (11. 10. 팀 요청 "보이스 중에 들어봐봐 보이스만 넣고 개킹받아 부분 빼기"로 개킹받아 최종 녹음은 뺐다.)
// 내는 조건: 방 화면이 보이고, 온보딩 덮개가 없고, 내 마이크가 꺼짐(빨강)이 아닐 때. 말풍선이 새로 나타나는 한 번에 한 번만 낸다.
// 채팅 줄은 덮개가 닫힌 뒤에 하나둘씩 달리므로(RoomChat) 말풍선이 나타나는 순간 소리가 난다. 재생 중에 마이크를 끄거나 방을 나가면 멈춘다.
// 말하는 표시(초록 바와 테두리)는 나에게 붙이지 않는다(기존 규칙). 웹 client/src/app/roomVoice.js와 같은 규칙이다.
// 재생은 이 녹음 전용 플레이어로 한다(주전부리 소리 통로 FileSound와 섞이지 않게). 파일 주소는 SoundFiles.url로 찾는다.
@MainActor
final class RoomVoice {
    static let shared = RoomVoice()

    /// 대사 글과 녹음 키, 재생 시작 지점(초)
    private let lines: [String: (key: String, offset: Double)] = [
        "아니 오늘 나 뭔일 있었냐면": ("voiceMuseun", 0.9),
        "나만 예민한 거 아니지?": ("voiceNaman", 0),
    ]
    private let waitMax: Double = 120
    private let volume: Float = 0.8
    private let fadeSeconds: Double = 0.03

    private var inRoom = false
    private var covered = false
    private var micOff = false
    private var shown: Set<String> = []
    private var pending: (text: String, at: Date)?
    private var players: [String: AVAudioPlayer] = [:]
    private var playing: AVAudioPlayer?

    /// 방 화면이 나타날 때. 새 방이면(fresh) 지난 방의 기록을 비운다. 같은 방에 돌아오면(일반 모드에서 복귀) 한 번 난 말풍선은 다시 내지 않는다.
    /// 녹음 파일과 주전부리 파일을 미리 열어 둔다.
    func enter(covered: Bool, fresh: Bool = true) {
        inRoom = true
        self.covered = covered
        micOff = false
        if fresh { shown = [] }
        pending = nil
        try? AVAudioSession.sharedInstance().setCategory(.ambient, options: [.mixWithOthers])
        for v in lines.values { _ = player(v.key) }
        FileSound.shared.preload(SoundFiles.snackKeys)
    }

    /// 방을 나가면(화면이 사라지면) 재생 중인 녹음을 멈춘다.
    func leave() {
        inRoom = false
        pending = nil
        stop()
    }

    /// 재생 중인 녹음을 30ms 만에 줄여 끊는다.
    func stop() {
        guard let p = playing else { return }
        playing = nil
        p.setVolume(0, fadeDuration: fadeSeconds)
        let fade = fadeSeconds
        Task { @MainActor in
            try? await Task.sleep(for: .seconds(fade))
            if self.playing !== p { p.stop() }
        }
    }

    /// 온보딩 덮개가 뜨면 멈추고, 닫히면 기다리던 말풍선 녹음을 낸다.
    func setCovered(_ up: Bool) {
        covered = up
        if up { stop(); return }
        if let p = pending {
            pending = nil
            if Date().timeIntervalSince(p.at) < waitMax { start(p.text) }
        }
    }

    /// 입력줄 마이크 버튼이 바뀔 때. 끄면 재생 중인 녹음을 멈춘다.
    func setMic(on: Bool) {
        micOff = !on
        if micOff { pending = nil; stop() }
    }

    /// 지금 보이는 내 말풍선 글 목록. 새로 나타난 글 중 짝이 있는 대사만 한 번 낸다.
    func show(_ texts: [String]) {
        let fresh = texts.filter { !shown.contains($0) }
        shown.formUnion(texts)
        guard let text = fresh.last(where: { lines[$0] != nil }) else { return }
        guard inRoom, !micOff else { return }
        if covered { pending = (text, Date()); return }
        start(text)
    }

    private func player(_ key: String) -> AVAudioPlayer? {
        if let p = players[key] { return p }
        guard let url = SoundFiles.url(key), let p = try? AVAudioPlayer(contentsOf: url) else { return nil }
        p.prepareToPlay()
        players[key] = p
        return p
    }

    private func start(_ text: String) {
        guard let line = lines[text], inRoom, !micOff, !covered, let p = player(line.key) else { return }
        stop()
        try? AVAudioSession.sharedInstance().setActive(true)
        p.stop()
        p.currentTime = min(line.offset, max(0, p.duration - 0.05))
        p.volume = volume
        playing = p
        p.play()
    }
}
