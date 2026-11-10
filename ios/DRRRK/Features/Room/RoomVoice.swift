import Foundation

// 방 대사 녹음. 함께 드르륵 방에서 내 말풍선(파란 말풍선, ChatEntry.mine)이 나타날 때 같은 대사의 녹음을 낸다(11. 10. 팀 음성 파일).
// 짝: "아니 오늘 나 뭔일 있었냐면"은 무슨 일이 있었냐면.mp3, 끝나고 0.4초 뒤 개킹받아 최종.mp3. "나만 예민한 거 아니지?"는 나만예민한거아니지.mp3.
// 개킹받아 최종은 같은 글의 말풍선이 앱에 없어 첫 말풍선 뒤에 잇는다(임시 배치).
// 내는 조건: 방 화면이 보이고, 온보딩 덮개가 없고, 내 마이크가 꺼짐(빨강)이 아닐 때. 말풍선이 새로 나타나는 한 번에 한 번만 낸다.
// 말풍선이 온보딩 덮개 아래에서 나타나면 덮개가 닫힐 때까지 기다렸다가 낸다(120초까지). 재생 중에 마이크를 끄거나 방을 나가면 멈춘다.
// 말하는 표시(초록 바와 테두리)는 나에게 붙이지 않는다(기존 규칙). 웹 client/src/app/roomVoice.js와 같은 규칙이다.
@MainActor
final class RoomVoice {
    static let shared = RoomVoice()

    private let lines: [String: [String]] = [
        "아니 오늘 나 뭔일 있었냐면": ["voiceMuseun", "voiceGaeking"],
        "나만 예민한 거 아니지?": ["voiceNaman"],
    ]
    private let nextGap: Double = 0.4
    private let waitMax: Double = 120
    private let channel = "voice"

    private var inRoom = false
    private var covered = false
    private var micOff = false
    private var shown: Set<String> = []
    private var pending: (text: String, at: Date)?
    private var token = 0

    /// 방 화면이 나타날 때. 지난 방의 기록을 비우고 녹음 파일과 주전부리 파일을 미리 열어 둔다.
    func enter(covered: Bool) {
        inRoom = true
        self.covered = covered
        micOff = false
        shown = []
        pending = nil
        FileSound.shared.preload(["voiceMuseun", "voiceGaeking", "voiceNaman"] + SoundFiles.snackKeys)
    }

    /// 방을 나가면(화면이 사라지면) 재생 중인 녹음을 멈춘다.
    func leave() {
        inRoom = false
        pending = nil
        stop()
    }

    func stop() {
        token += 1
        FileSound.shared.stop(channel)
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

    private func start(_ text: String) {
        guard let keys = lines[text], inRoom, !micOff, !covered else { return }
        stop()
        let my = token
        playStep(keys, 0, my)
    }

    private func playStep(_ keys: [String], _ i: Int, _ my: Int) {
        guard i < keys.count, my == token, inRoom, !micOff, !covered else { return }
        FileSound.shared.play(keys[i], channel: channel) { [weak self] in
            guard let self, my == self.token, i + 1 < keys.count else { return }
            Task { @MainActor in
                try? await Task.sleep(for: .seconds(self.nextGap))
                self.playStep(keys, i + 1, my)
            }
        }
    }
}
