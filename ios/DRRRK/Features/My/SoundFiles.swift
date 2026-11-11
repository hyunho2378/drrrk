import AVFoundation
import Foundation

// 팀이 녹음해 보낸 소리 파일(mp3)과 앱 아이템의 짝(11. 10. 조의정 피드백 "주전부리 올렸을때 소리 반영", 피그마 댓글 "소리 코드에 넣기 필요").
// 파일은 Resources/Sounds/ 에 ASCII 이름으로 있다. 웹 client/src/app/itemSounds.js와 같은 표다.
// 11. 10. 밤 팀 요청(조의정 "건어물을 노가리와 오징어로 통일, 과자를 새우깡하고 오징어땅콩, 캔을 맥주랑 몬스타, 소주를 소주종류 2개")으로 주전부리 효과음 원본 4종을 두 아이템씩 함께 쓴다.
// 원본 이름: 주전부리 효과음 건어물(snack-dried, 노가리와 오징어), 과자(snack-chips, 새우깡과 오징어땅콩), 캔(snack-can, 드르라와 몬스타), 소주(snack-soju, 마지막처럼과 별로),
// 대사 녹음 무슨 일이 있었냐면.mp3, 나만예민한거아니지.mp3.
enum SoundFiles {
    /// 키는 마이 아이템 id(MyShelfItem.id)다. voice로 시작하는 키는 방 대사 녹음이다(RoomVoice).
    static let names: [String: String] = [
        "shrimp": "snack-chips",
        "peanut": "snack-chips",
        "nogari": "snack-dried",
        "squid": "snack-dried",
        "drrra": "snack-can",
        "monster": "snack-can",
        "soju": "snack-soju",
        "byeollo": "snack-soju",
        "voiceMuseun": "voice-museun-il",
        "voiceNaman": "voice-naman-yemin",
    ]

    /// 서로 다른 파일마다 한 아이템씩(미리 열기용). 웹 UNIQUE_SOUND_KEYS와 같다.
    static let uniqueSnackKeys = ["nogari", "shrimp", "drrra", "soju"]

    /// 아이템마다 따로 쓰는 소리 통로 이름. 마이 아이템 누름과 방 착지 소리가 같은 이름을 쓴다(같은 아이템만 앞 소리를 끊는다). 웹 itemChannel과 같다.
    static func channel(_ key: String) -> String { "item:" + key }

    /// 마이 아이템 이름. 방 퀵슬롯의 소주 칸은 마지막처럼, DRRRA 칸은 드르라다.
    static let itemNames: [String: String] = [
        "shrimp": "새우깡", "soju": "마지막처럼", "peanut": "오징어땅콩", "nogari": "노가리",
        "drrra": "드르라", "squid": "오징어", "monster": "몬스타", "byeollo": "별로",
    ]

    /// 방에 들어올 때 미리 여는 주전부리 소리(서로 다른 파일 4개). 퀵슬롯 7칸이 이 4개를 함께 쓴다.
    static let snackKeys = uniqueSnackKeys

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
/// 새 소리가 오면 그 통로의 앞 소리만 30ms 만에 줄여 끊는다. 통로가 다르면 서로 끊지 않고 겹쳐 끝까지 난다.
/// 아이템 소리는 아이템마다 통로가 따로라(SoundFiles.channel) 여러 주전부리를 연달아 던져도 소리가 겹쳐 난다(11. 10. 밤 팀 요청 "동시에 여러 개 놓을 수 있게").
/// 재생마다 새 AVAudioPlayer를 만든다(새우깡과 오징어땅콩처럼 같은 파일을 쓰는 두 아이템이 겹쳐도 둘 다 난다). 끝나면 정리한다.
/// 파일 내용은 파일 이름 단위로 한 번만 읽어 둔다. 음량 0.8. 오디오 세션은 .ambient(무음 스위치를 따르고 다른 앱 음악을 끊지 않는다).
@MainActor
final class FileSound: NSObject, AVAudioPlayerDelegate {
    static let shared = FileSound()

    private let volume: Float = 0.8
    private let gapSeconds: Double = 0.15
    private let fadeSeconds: Double = 0.03
    /// 파일 이름별 내용(미리 읽어 둔 mp3)
    private var files: [String: Data] = [:]
    /// 지금 소리 나는 플레이어(끝나거나 끊기면 빠진다)
    private var live: [ObjectIdentifier: AVAudioPlayer] = [:]
    private var current: [String: AVAudioPlayer] = [:]
    private var lastAsk: [String: (key: String, at: Date)] = [:]
    private var endHandlers: [ObjectIdentifier: () -> Void] = [:]
    private var sessionReady = false

    private func prepareSession() {
        guard !sessionReady else { return }
        do {
            // 받아쓰기(Dictation.swift)가 녹음 세션을 쓰는 중이면 ambient 로 되돌리지 않는다.
            if !DictationAudio.recording { try AVAudioSession.sharedInstance().setCategory(.ambient, options: [.mixWithOthers]) }
            try AVAudioSession.sharedInstance().setActive(true)
            sessionReady = true
        } catch {}
    }

    /// 파일을 미리 읽어 둔다(첫 소리가 늦지 않게). 방 진입과 마이 진입 때 부른다. 같은 파일은 한 번만 읽는다.
    func preload(_ keys: [String]) {
        prepareSession()
        for k in keys { _ = data(k) }
    }

    private func data(_ key: String) -> Data? {
        guard let name = SoundFiles.names[key] else { return nil }
        if let d = files[name] { return d }
        guard let url = SoundFiles.url(key), let d = try? Data(contentsOf: url) else { return nil }
        files[name] = d
        return d
    }

    /// 소리를 낸다. 파일이 없으면 false(부르는 쪽이 합성 소리로 대신한다). onEnded는 끝까지 재생되었을 때만 부른다.
    /// startAt(초)을 주면 파일의 그 지점부터 낸다(앞 무음을 건너뛸 때).
    @discardableResult
    func play(_ key: String, channel: String = "item", startAt: TimeInterval = 0, onEnded: (() -> Void)? = nil) -> Bool {
        let now = Date()
        if let last = lastAsk[channel], last.key == key, now.timeIntervalSince(last.at) < gapSeconds { return true }
        prepareSession()
        guard let d = data(key), let p = try? AVAudioPlayer(data: d) else { return false }
        lastAsk[channel] = (key, now)
        stop(channel)
        p.delegate = self
        p.volume = volume
        p.prepareToPlay()
        if startAt > 0 { p.currentTime = min(startAt, max(0, p.duration - 0.05)) }
        let id = ObjectIdentifier(p)
        live[id] = p
        current[channel] = p
        if let onEnded { endHandlers[id] = onEnded }
        p.play()
        return true
    }

    /// 통로의 지금 소리를 30ms 만에 줄여 끊는다. 다른 통로의 소리는 그대로 둔다.
    func stop(_ channel: String) {
        guard let p = current[channel] else { return }
        current[channel] = nil
        let id = ObjectIdentifier(p)
        endHandlers[id] = nil
        p.setVolume(0, fadeDuration: fadeSeconds)
        let fade = fadeSeconds
        Task { @MainActor in
            try? await Task.sleep(for: .seconds(fade))
            p.stop()
            self.live[id] = nil
        }
    }

    func isPlaying(_ channel: String) -> Bool { current[channel] != nil }

    nonisolated func audioPlayerDidFinishPlaying(_ player: AVAudioPlayer, successfully flag: Bool) {
        let id = ObjectIdentifier(player)
        Task { @MainActor in
            for (ch, p) in self.current where p === player { self.current[ch] = nil }
            self.live[id] = nil
            let h = self.endHandlers.removeValue(forKey: id)
            if flag { h?() }
        }
    }
}
