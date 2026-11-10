import AVFoundation
import Foundation

// 아이템 소리(11. 10. 메모 "아이템 눌렀을때 사운드 들어볼 수 있으면 좋겠어요", 피그마 댓글 "소리 코드에 넣기 필요").
// 소리 파일 없이 웹 sfx.js의 tone과 burst를 같은 값으로 옮겨 PCM 버퍼로 만들고 AVAudioEngine으로 낸다.
// 아이템마다 0.5초에서 1초 길이, 묶음 음량 0.5. 사용자가 누를 때만 부른다.
// 150ms 안에 다시 누르면 무시하고, 그보다 늦게 누르면 앞 소리를 멈추고 새로 낸다(겹쳐 쌓이지 않는다).
// 오디오 세션은 .ambient라서 무음 스위치를 켠 기기에서는 소리가 나지 않을 뿐 오류가 없고, 다른 앱 음악도 끊지 않는다.

@MainActor
final class ItemSound {
    static let shared = ItemSound()

    private let sampleRate: Double = 44100
    private let gapSeconds: Double = 0.15
    private let busVolume: Float = 0.5
    private let engine = AVAudioEngine()
    private let player = AVAudioPlayerNode()
    private let format: AVAudioFormat
    private var buffers: [String: AVAudioPCMBuffer] = [:]
    private var lastPlay: Date = .distantPast
    private var ready = false

    private init() {
        format = AVAudioFormat(standardFormatWithSampleRate: 44100, channels: 1)!
    }

    /// key: shrimp, soju, peanut, nogari, drrra, squid, monster, byeollo, locked
    func play(_ key: String) {
        let now = Date()
        guard now.timeIntervalSince(lastPlay) >= gapSeconds else { return }
        lastPlay = now
        guard prepare(), let buffer = buffer(for: key) else { return }
        player.stop()
        player.scheduleBuffer(buffer, at: nil, options: [])
        player.play()
    }

    private func prepare() -> Bool {
        if ready, engine.isRunning { return true }
        do {
            try AVAudioSession.sharedInstance().setCategory(.ambient, options: [.mixWithOthers])
            try AVAudioSession.sharedInstance().setActive(true)
            if !ready {
                engine.attach(player)
                engine.connect(player, to: engine.mainMixerNode, format: format)
                ready = true
            }
            if !engine.isRunning { try engine.start() }
            return true
        } catch {
            return false
        }
    }

    private func buffer(for key: String) -> AVAudioPCMBuffer? {
        if let b = buffers[key] { return b }
        var synth = Synth(sampleRate: sampleRate, seconds: 1.2)
        ItemSound.recipe(key)(&synth)
        let samples = synth.samples
        guard let b = AVAudioPCMBuffer(pcmFormat: format, frameCapacity: AVAudioFrameCount(samples.count)),
              let ch = b.floatChannelData?[0] else { return nil }
        b.frameLength = AVAudioFrameCount(samples.count)
        for i in 0 ..< samples.count {
            ch[i] = max(-1, min(1, samples[i] * busVolume))
        }
        buffers[key] = b
        return b
    }

    // MARK: - 아이템별 소리(웹 sfx.js ITEM_SOUND와 같은 값)

    private static func recipe(_ key: String) -> (inout Synth) -> Void {
        switch key {
        case "soju":
            // 마지막처럼: 병뚜껑을 비틀어 따는 소리, 잔에 꼴꼴 따르는 소리(0.9초)
            return { s in s.burst(0, 0.05, 2400, 4, 0.35); s.tone(900, 620, 0.06, .triangle, 0.18, at: 0.02); s.glug(0.22, 6, 0.1, 320, 0.3) }
        case "peanut":
            // 오징어땅콩: 바삭한 소리 넷과 봉지 흔드는 소리(0.6초)
            return { s in s.crunch(0, 4, 2400, 0.11, 0.42); s.burst(0.45, 0.14, 1800, 0.7, 0.12) }
        case "nogari":
            // 노가리: 천천히 질기게 씹는 소리 셋(0.75초)
            return { s in s.chew(0, 3, 0.25, 700, 0.32) }
        case "drrra":
            // 드르라: 캔 따는 딸깍과 칙 소리, 탄산 거품(0.9초)
            return { s in s.canOpen(0, 4200, 0.28, 0.4); s.fizz(0.34, 14, 0.5, 0.05) }
        case "squid":
            // 오징어: 쫄깃하게 빠르게 씹는 소리 넷(0.6초)
            return { s in s.chew(0, 4, 0.15, 1100, 0.3) }
        case "monster":
            // 몬스타: 조금 낮은 캔 따는 소리와 긴 칙 소리, 탄산(0.95초)
            return { s in s.canOpen(0, 3400, 0.36, 0.42); s.fizz(0.42, 16, 0.5, 0.05) }
        case "byeollo":
            // 별로: 투명한 병에서 꼴꼴 따르는 소리만(0.85초)
            return { s in s.glug(0, 8, 0.1, 360, 0.3) }
        case "locked":
            // 미획득: 낮게 덜컥 잠긴 소리 두 번(0.5초)
            return { s in
                s.tone(170, 110, 0.14, .square, 0.12); s.burst(0.005, 0.04, 900, 3, 0.25)
                s.tone(130, 85, 0.26, .square, 0.1, at: 0.24); s.burst(0.245, 0.05, 700, 3, 0.2)
            }
        default:
            // 새우깡: 봉지 속 과자가 바삭하게 부서지는 소리 다섯 번(0.5초)
            return { s in s.crunch(0, 5, 3400, 0.1, 0.45) }
        }
    }
}

/// 웹 Web Audio의 OscillatorNode(지수 주파수 변화, 8ms 올림 뒤 지수 감쇠)와 띠 통과 잡음(BiquadFilter bandpass)을 샘플로 옮긴 합성기
struct Synth {
    enum Wave { case sine, triangle, square }

    let sampleRate: Double
    var samples: [Float]
    private var seed: UInt32 = 0x9E37_79B9

    init(sampleRate: Double, seconds: Double) {
        self.sampleRate = sampleRate
        samples = Array(repeating: 0, count: Int(sampleRate * seconds))
    }

    mutating func tone(_ from: Double, _ to: Double, _ dur: Double, _ wave: Wave, _ vol: Double, at: Double = 0) {
        let start = Int(at * sampleRate)
        let count = Int((dur + 0.02) * sampleRate)
        let target = max(30, to)
        var phase = 0.0
        for i in 0 ..< count {
            let idx = start + i
            guard idx < samples.count else { break }
            let t = Double(i) / sampleRate
            let f = t < dur ? from * pow(target / from, t / dur) : target
            phase += f / sampleRate
            let p = phase - floor(phase)
            let v: Double
            switch wave {
            case .sine: v = sin(2 * .pi * p)
            case .triangle: v = 1 - 4 * abs(p - 0.5)
            case .square: v = p < 0.5 ? 1 : -1
            }
            let env: Double
            if t < 0.008 {
                env = 0.0001 * pow(vol / 0.0001, t / 0.008)
            } else if t < dur {
                env = vol * pow(0.0001 / vol, (t - 0.008) / max(0.001, dur - 0.008))
            } else {
                env = 0
            }
            samples[idx] += Float(v * env)
        }
    }

    mutating func burst(_ at: Double, _ dur: Double, _ freq: Double, _ q: Double, _ vol: Double) {
        let start = Int(at * sampleRate)
        let len = max(1, Int(sampleRate * dur))
        // RBJ 띠 통과(봉우리 0dB) 계수, Web Audio bandpass와 같은 식
        let w0 = 2 * .pi * freq / sampleRate
        let alpha = sin(w0) / (2 * q)
        let a0 = 1 + alpha
        let b0 = alpha / a0, b2 = -alpha / a0
        let a1 = -2 * cos(w0) / a0, a2 = (1 - alpha) / a0
        var x1 = 0.0, x2 = 0.0, y1 = 0.0, y2 = 0.0
        for i in 0 ..< len {
            let idx = start + i
            guard idx < samples.count else { break }
            let x = (nextNoise() * 2 - 1) * (1 - Double(i) / Double(len))
            let y = b0 * x + b2 * x2 - a1 * y1 - a2 * y2
            x2 = x1; x1 = x; y2 = y1; y1 = y
            let t = Double(i) / sampleRate
            let env = vol * pow(0.0001 / vol, t / dur)
            samples[idx] += Float(y * env)
        }
    }

    mutating func crunch(_ at: Double, _ n: Int, _ freq: Double, _ gap: Double, _ vol: Double) {
        for i in 0 ..< n {
            burst(at + Double(i) * gap + Double(i % 2) * 0.012, 0.05 + Double(i % 3) * 0.012, freq + Double(i % 3) * 420, 1.3, vol * (1 - Double(i) / Double(n + 1)))
        }
    }

    mutating func chew(_ at: Double, _ n: Int, _ gap: Double, _ freq: Double, _ vol: Double) {
        for i in 0 ..< n {
            tone(170 - Double(i) * 8, 105, 0.13, .sine, vol, at: at + Double(i) * gap)
            burst(at + Double(i) * gap + 0.01, 0.14, freq, 2.2, vol * 0.8)
        }
    }

    mutating func glug(_ at: Double, _ n: Int, _ gap: Double, _ from: Double, _ vol: Double) {
        for i in 0 ..< n {
            let f = from + Double(i) * 40
            tone(f, f * 1.7, 0.08, .sine, vol, at: at + Double(i) * gap)
            burst(at + Double(i) * gap, 0.06, f * 2, 3, vol * 0.4)
        }
    }

    mutating func canOpen(_ at: Double, _ click: Double, _ hiss: Double, _ vol: Double) {
        burst(at, 0.018, click, 2, vol)
        tone(click * 0.45, click * 0.3, 0.035, .triangle, vol * 0.5, at: at)
        burst(at + 0.03, hiss, 5200, 0.6, vol * 0.7)
    }

    mutating func fizz(_ at: Double, _ n: Int, _ span: Double, _ vol: Double) {
        for i in 0 ..< n {
            let f = 3000 + Double((i * 1733) % 3200)
            tone(f, f * 1.15, 0.025, .sine, vol, at: at + span * Double((i * 37) % n) / Double(n))
        }
    }

    private mutating func nextNoise() -> Double {
        seed ^= seed << 13
        seed ^= seed >> 17
        seed ^= seed << 5
        return Double(seed) / Double(UInt32.max)
    }
}
