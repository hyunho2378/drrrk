import AVFoundation
import Foundation

// 팀이 녹음해 보낸 소리 파일(mp3)과 앱 아이템의 짝(11. 10. 조의정 피드백 "주전부리 올렸을때 소리 반영", 피그마 댓글 "소리 코드에 넣기 필요").
// 파일은 Resources/Sounds/ 에 ASCII 이름으로 있다. 웹 client/src/app/itemSounds.js와 같은 표다.
// 원본 이름: 새우깡.mp3, 마지막처럼.mp3, 오징어땅콩.mp3, 노가리.mp3, 맥주.mp3(드르라), 오징어.mp3, 몬스터.mp3(몬스타), 별로.mp3,
// 대사 녹음 무슨 일이 있었냐면.mp3, 개킹받아 최종.mp3, 나만예민한거아니지.mp3.
enum SoundFiles {
    /// 키는 마이 아이템 id(MyShelfItem.id)다. voice로 시작하는 키는 방 대사 녹음이다(RoomVoice).
    static let names: [String: String] = [
        "shrimp": "snack-saewookkang",
        "soju": "snack-majimak",
        "peanut": "snack-ojingeottangkong",
        "nogari": "snack-nogari",
        "drrra": "snack-drrra",
        "squid": "snack-ojingeo",
        "monster": "snack-monsta",
        "byeollo": "snack-byeollo",
        "voiceMuseun": "voice-museun-il",
        "voiceGaeking": "voice-gaeking",
        "voiceNaman": "voice-naman-yemin",
    ]

    /// 마이 아이템 이름. 방 퀵슬롯의 소주 칸은 마지막처럼, DRRRA 칸은 드르라다.
    static let itemNames: [String: String] = [
        "shrimp": "새우깡", "soju": "마지막처럼", "peanut": "오징어땅콩", "nogari": "노가리",
        "drrra": "드르라", "squid": "오징어", "monster": "몬스타", "byeollo": "별로",
    ]

    static let snackKeys = ["shrimp", "soju", "peanut", "nogari", "drrra", "squid", "monster"]

    static func url(_ key: String) -> URL? {
        guard let name = names[key] else { return nil }
        return Bundle.main.url(forResource: name, withExtension: "mp3")
    }

    /// 한글 마지막 글자에 받침이 있으면 true(가에서 힣 사이 글자만 본다). 웹 hasFinalConsonant와 같은 계산이다.
    static func hasFinalConsonant(_ word: String) -> Bool {
        guard let last = word.trimmingCharacters(in: .whitespaces).unicodeScalars.last else { return false }
        let c = Int(last.value)
        guard c >= 0xAC00, c <= 0xD7A3 else { return false }
        return (c - 0xAC00) % 28 != 0
    }

    /// 목적격 조사: 받침이 있으면 을, 없으면 를.
    static func withObject(_ word: String) -> String {
        word + (hasFinalConsonant(word) ? "을" : "를")
    }

    /// 던진 뒤 안내 글. 예전 글 "주전부리를 테이블에 올렸어요"의 "주전부리"를 마이 아이템 이름으로 바꾼다.
    static func throwDoneText(_ snackID: String) -> String {
        withObject(itemNames[snackID] ?? "주전부리") + " 테이블에 올렸어요"
    }
}

/// 녹음 파일 재생. 통로(channel)마다 소리는 하나만 난다: 같은 소리를 150ms 안에 다시 부르면 무시하고,
/// 새 소리가 오면 앞 소리를 30ms 만에 줄여 끊는다. 음량 0.8. 오디오 세션은 .ambient(무음 스위치를 따르고 다른 앱 음악을 끊지 않는다).
@MainActor
final class FileSound: NSObject, AVAudioPlayerDelegate {
    static let shared = FileSound()

    private let volume: Float = 0.8
    private let gapSeconds: Double = 0.15
    private let fadeSeconds: Double = 0.03
    private var players: [String: AVAudioPlayer] = [:]
    private var current: [String: AVAudioPlayer] = [:]
    private var lastAsk: [String: (key: String, at: Date)] = [:]
    private var endHandlers: [ObjectIdentifier: () -> Void] = [:]
    private var sessionReady = false

    private func prepareSession() {
        guard !sessionReady else { return }
        do {
            try AVAudioSession.sharedInstance().setCategory(.ambient, options: [.mixWithOthers])
            try AVAudioSession.sharedInstance().setActive(true)
            sessionReady = true
        } catch {}
    }

    /// 파일을 미리 열어 둔다(첫 소리가 늦지 않게). 방 진입과 마이 진입 때 부른다.
    func preload(_ keys: [String]) {
        prepareSession()
        for k in keys { _ = player(k) }
    }

    private func player(_ key: String) -> AVAudioPlayer? {
        if let p = players[key] { return p }
        guard let url = SoundFiles.url(key), let p = try? AVAudioPlayer(contentsOf: url) else { return nil }
        p.delegate = self
        p.prepareToPlay()
        players[key] = p
        return p
    }

    /// 소리를 낸다. 파일이 없으면 false(부르는 쪽이 합성 소리로 대신한다). onEnded는 끝까지 재생되었을 때만 부른다.
    @discardableResult
    func play(_ key: String, channel: String = "item", onEnded: (() -> Void)? = nil) -> Bool {
        let now = Date()
        if let last = lastAsk[channel], last.key == key, now.timeIntervalSince(last.at) < gapSeconds { return true }
        prepareSession()
        guard let p = player(key) else { return false }
        lastAsk[channel] = (key, now)
        if current[channel] === p { current[channel] = nil } else { stop(channel) }
        p.stop()
        p.currentTime = 0
        p.volume = volume
        current[channel] = p
        if let onEnded { endHandlers[ObjectIdentifier(p)] = onEnded } else { endHandlers[ObjectIdentifier(p)] = nil }
        p.play()
        return true
    }

    /// 통로의 지금 소리를 30ms 만에 줄여 끊는다.
    func stop(_ channel: String) {
        guard let p = current[channel] else { return }
        current[channel] = nil
        endHandlers[ObjectIdentifier(p)] = nil
        p.setVolume(0, fadeDuration: fadeSeconds)
        let fade = fadeSeconds
        Task { @MainActor in
            try? await Task.sleep(for: .seconds(fade))
            // 그사이 같은 플레이어로 새 소리를 시작했으면 멈추지 않는다.
            if !self.current.values.contains(where: { $0 === p }) { p.stop() }
        }
    }

    func isPlaying(_ channel: String) -> Bool { current[channel] != nil }

    nonisolated func audioPlayerDidFinishPlaying(_ player: AVAudioPlayer, successfully flag: Bool) {
        let id = ObjectIdentifier(player)
        Task { @MainActor in
            for (ch, p) in self.current where p === player { self.current[ch] = nil }
            let h = self.endHandlers.removeValue(forKey: id)
            if flag { h?() }
        }
    }
}
