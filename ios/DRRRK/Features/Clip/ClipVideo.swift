import AVFoundation
import SwiftUI
import UIKit

// 네이버 클립 화면의 진짜 영상(팀 피그마 영상 채움 f30d08c3d6, 쌍밍아웃 쇼츠 8초, 640 x 1138, 소리 있음).
// 영상 파일은 마지막 0.6초가 첫 장면으로 디졸브되고 소리도 끝에서 줄어 시작에서 커진다. 반복은 리스트와 영상 보기 모두 AVPlayerLooper로 끊김 없이 잇는다(11/11 사용자 "3초는 짧고 끊긴다").
// 리스트(55) 썸네일은 같은 영상(clip-ssang.mp4) 전체 8초를 무음으로 반복하고(탁빛나 1843:40980 핀 "쇼츠 미리보기처럼 무음으로 반복재생"),
// 영상 보기(56)는 전체 영상(clip-ssang.mp4)을 처음(0초)부터 소리 켠 채 재생한다(사용자 보충 "상세를 누르면 처음부터 재생").
// 영상이 없는 클립은 지금처럼 사진과 가짜 시간(ClipClock, ClipInfo.duration)을 쓴다. 웹 client/src/app/clipVideo.js와 같은 값이다.
// 영상 층은 Features/Room/SunriseVideo.swift, RoomEnterVideo.swift처럼 AVPlayerLayer(.resizeAspectFill)로 그린다. 조작 막대가 나오는 VideoPlayer는 쓰지 않는다.

extension ClipInfo {
    /// 진짜 영상이 있는 클립(지금은 첫 클립 쌍밍아웃 하나)
    var hasVideo: Bool {
        id == "s0"
    }
}

enum ClipVideoFiles {
    static let full = "clip-ssang"
    /// 리스트 미리보기와 영상 보기가 같은 파일이다.
    static let preview = "clip-ssang"
    /// 댓글 말풍선(탁빛나 1843:40911 핀 (101,603) "처음에는 댓글이 없다가 위로 샥 플로팅"): 재생 1.2초 뒤 28px 아래에서 올라온다.
    static let bubbleAt: Double = 1.2
    static let bubbleRise: CGFloat = 28
    static let bubbleIn: Double = 0.42
    static let bubbleOut: Double = 0.12

    static func url(_ name: String) -> URL? {
        Bundle.main.url(forResource: name, withExtension: "mp4")
    }

    /// 다른 앱 소리와 섞이는 ambient 세션. 이미 같은 값으로 맞춘 곳(RoomVoice, ItemSound)과 겹쳐도 같은 결과다.
    static func useAmbientSession() {
        try? AVAudioSession.sharedInstance().setCategory(.ambient, options: [.mixWithOthers])
        try? AVAudioSession.sharedInstance().setActive(true)
    }

    /// 앱 시작(첫 화면인 클립 리스트가 뜰 때) 두 파일을 AVURLAsset으로 미리 읽는다. 미리보기 먼저, 전체 영상 다음.
    @MainActor private static var assets: [AVURLAsset] = []
    @MainActor static func prefetch() {
        guard assets.isEmpty else { return }
        for name in [full] {
            guard let u = url(name) else { continue }
            let a = AVURLAsset(url: u)
            assets.append(a)
            Task { _ = try? await a.load(.isPlayable, .duration) }
        }
    }
}

/// 리스트 썸네일 미리보기. 무음(isMuted true)으로 AVQueuePlayer + AVPlayerLooper가 영상 전체(8초)를 끝없이 반복한다.
/// 플레이어 하나를 앱 전체에서 같이 써서, 영상 보기에 갔다 돌아오거나 리스트 탭(구독, 추천, 내클립)을 바꿔도 멈춘 자리부터 이어서 돈다.
/// 줄인 움직임 설정이면 플레이어를 만들지 않고 썸네일 그림만 보인다.
@MainActor
final class ClipPreviewPlayer {
    static let shared = ClipPreviewPlayer()

    let player: AVQueuePlayer?
    private var looper: AVPlayerLooper?

    private init() {
        guard !UIAccessibility.isReduceMotionEnabled, let u = ClipVideoFiles.url(ClipVideoFiles.preview) else {
            player = nil
            return
        }
        let q = AVQueuePlayer()
        q.isMuted = true
        q.preventsDisplaySleepDuringVideoPlayback = false
        looper = AVPlayerLooper(player: q, templateItem: AVPlayerItem(url: u))
        player = q
    }

    func play() {
        ClipVideoFiles.useAmbientSession()
        player?.isMuted = true
        player?.play()
    }

    func pause() {
        player?.pause()
    }
}

/// 영상 보기의 전체 영상. 0초부터 소리 켠 채 재생하고, 끝나면 처음으로 돌아가 반복한다(재생 방식이 한 번만이면 끝에서 멈춘다).
/// 댓글 시트의 카드 자리도 같은 플레이어를 두 번째 AVPlayerLayer로 그려서 영상과 소리가 끊기지 않는다.
@Observable
@MainActor
final class ClipFullPlayer {
    static let shared = ClipFullPlayer()

    let player: AVQueuePlayer?
    /// 재생 중인지(한 번 누름 일시정지와 진행 막대가 읽는다)
    private(set) var playing = false
    /// 말풍선을 보일 시각이 지났는지(재생 1.2초 뒤 true, 반복으로 0초에 돌아가면 false)
    private(set) var bubbleShown = false
    /// 재생 방식(ClipState.loop)
    private(set) var loop = true
    @ObservationIgnored private var endObserver: NSObjectProtocol?
    @ObservationIgnored private var timeObserver: Any?
    @ObservationIgnored private var looper: AVPlayerLooper?

    private init() {
        guard let u = ClipVideoFiles.url(ClipVideoFiles.full) else {
            player = nil
            return
        }
        // 반복 지점이 끊기지 않도록 AVPlayerLooper로 다음 판을 미리 이어 둔다(끝에서 직접 되감으면 한 박자 끊긴다).
        let q = AVQueuePlayer()
        q.preventsDisplaySleepDuringVideoPlayback = true
        player = q
        looper = AVPlayerLooper(player: q, templateItem: AVPlayerItem(url: u))
        endObserver = NotificationCenter.default.addObserver(forName: AVPlayerItem.didPlayToEndTimeNotification, object: nil, queue: .main) { [weak self] _ in
            MainActor.assumeIsolated { self?.ended() }
        }
        timeObserver = q.addPeriodicTimeObserver(forInterval: CMTime(value: 1, timescale: 20), queue: .main) { [weak self] t in
            MainActor.assumeIsolated { self?.tick(t.seconds) }
        }
    }

    /// 재생 방식(ClipState.loop). 한 번만으로 바꾸면 다음 판 이어 붙이기를 끄고, 반복으로 되돌리면 지금 위치에서 다시 잇는다.
    func setLoop(_ on: Bool) {
        guard loop != on else { return }
        loop = on
        if on { rebuildLooper(keepTime: true) } else { looper?.disableLooping() }
    }

    private func rebuildLooper(keepTime: Bool) {
        guard let q = player, let u = ClipVideoFiles.url(ClipVideoFiles.full) else { return }
        let t = keepTime ? time : 0
        let wasPlaying = playing
        looper?.disableLooping()
        looper = nil
        q.removeAllItems()
        looper = AVPlayerLooper(player: q, templateItem: AVPlayerItem(url: u))
        if !loop { looper?.disableLooping() }
        if t > 0 { q.seek(to: CMTime(seconds: t, preferredTimescale: 600), toleranceBefore: .zero, toleranceAfter: .zero) }
        if wasPlaying { q.play() }
    }

    /// 한 번만 재생이 끝까지 가서 판이 비었으면 다시 채운다.
    private func ensureItem() {
        if player?.currentItem == nil { rebuildLooper(keepTime: false) }
    }

    /// 영상 길이(초). 읽기 전이면 8초로 본다.
    var duration: Double {
        let d = player?.currentItem?.duration.seconds ?? .nan
        return d.isFinite && d > 0 ? d : 8
    }

    var time: Double {
        let t = player?.currentTime().seconds ?? 0
        return t.isFinite ? t : 0
    }

    /// 0초부터 재생한다. 영상 보기에 들어올 때와 위아래로 쓸어 이 클립으로 다시 올 때 부른다.
    func start(muted: Bool) {
        guard let player else { return }
        ClipVideoFiles.useAmbientSession()
        ensureItem()
        player.volume = 1
        player.isMuted = muted
        player.seek(to: .zero, toleranceBefore: .zero, toleranceAfter: .zero)
        bubbleShown = false
        player.play()
        playing = true
    }

    func resume() {
        guard let player else { return }
        ensureItem()
        if time >= duration - 0.05 {
            player.seek(to: .zero, toleranceBefore: .zero, toleranceAfter: .zero)
        }
        player.play()
        playing = true
    }

    func pause() {
        player?.pause()
        playing = false
    }

    /// 다른 클립으로 넘어가거나 화면을 떠날 때. 멈추고 소리를 끄고 0초로 돌려 둔다.
    /// 다시 들어올 때 새 AVPlayerLayer가 멈춘 자리(예: 5초 장면)를 한 번 그렸다가 0초로 뛰지 않고, 아래 첫 장면 그림(G-clip-vid)과 같은 장면부터 그리게 한다.
    func stop() {
        player?.pause()
        player?.isMuted = true
        player?.seek(to: .zero, toleranceBefore: .zero, toleranceAfter: .zero)
        playing = false
        bubbleShown = false
    }

    func setMuted(_ m: Bool) {
        player?.isMuted = m
    }

    func seek(fraction: Double) {
        let t = min(max(0, fraction), 1) * duration
        player?.seek(to: CMTime(seconds: min(t, duration - 0.05), preferredTimescale: 600), toleranceBefore: .zero, toleranceAfter: .zero)
    }

    /// 반복 중에는 AVPlayerLooper가 알아서 이어 재생하니 한 번만 재생일 때만 끝을 표시한다(다른 플레이어의 끝 알림은 거른다).
    private func ended() {
        guard let player, !loop, playing else { return }
        if player.currentItem == nil || time >= duration - 0.15 { playing = false }
    }

    private func tick(_ t: Double) {
        let want = t.isFinite && t >= ClipVideoFiles.bubbleAt
        if want != bubbleShown { bubbleShown = want }
    }
}

/// AVPlayerLayer를 주어진 틀에 꽉 채운다(videoGravity .resizeAspectFill, 가운데 기준).
struct ClipVideoLayerView: UIViewRepresentable {
    let player: AVPlayer?

    final class PlayerView: UIView {
        override static var layerClass: AnyClass { AVPlayerLayer.self }
        var playerLayer: AVPlayerLayer { layer as! AVPlayerLayer }
    }

    func makeUIView(context: Context) -> PlayerView {
        let v = PlayerView()
        v.isUserInteractionEnabled = false
        v.backgroundColor = .clear
        v.playerLayer.videoGravity = .resizeAspectFill
        v.playerLayer.player = player
        return v
    }

    func updateUIView(_ uiView: PlayerView, context: Context) {
        if uiView.playerLayer.player !== player { uiView.playerLayer.player = player }
    }
}

/// 영상 클립의 진행 막대(피그마 "진행 바" 0, 748.5, 트랙 390 x 2, #82CD4A). 영상의 실제 시간(currentTime / duration)을 따라 왼쪽에서 차고, 반복 때 0으로 돌아간다.
/// 누르거나 끌면 그 자리로 간다(가짜 시간 막대 ClipProgressBar와 같은 손짓).
struct ClipVideoProgressBar: View {
    let full: ClipFullPlayer
    @State private var scrubbing = false

    var body: some View {
        let _ = full.playing
        ZStack(alignment: .topLeading) {
            TimelineView(.animation(minimumInterval: 1 / 30, paused: !full.playing && !scrubbing)) { _ in
                let p = min(1, full.time / full.duration)
                let h: CGFloat = scrubbing ? 4 : 2
                ZStack(alignment: .leading) {
                    Rectangle().fill(clipColor("#FFFFFF", 0.18)).frame(width: 390, height: h)
                    Rectangle().fill(clipColor("#82CD4A")).frame(width: 390, height: h)
                        .scaleEffect(x: p, y: 1, anchor: .leading)
                }
                .offset(y: 748.5 + 2 - h)
            }
            .allowsHitTesting(false)
            Color.clear.frame(width: 390, height: 24).contentShape(Rectangle())
                .offset(y: 737)
                .gesture(DragGesture(minimumDistance: 0).onChanged { v in
                    if !scrubbing {
                        withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.12)) { scrubbing = true }
                    }
                    full.seek(fraction: Double(v.location.x / 390))
                }.onEnded { _ in
                    withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.12)) { scrubbing = false }
                })
                .accessibilityLabel("재생 위치")
        }
    }
}

/// 소리 끈 상태 표시. 피그마 "Icon / 소리"(1843:40920, 1910:11625)에는 끈 변형이 없어서 새 모양을 만들지 않고
/// 같은 아이콘(350, 63, 26 x 24) 위에 같은 색(흰색), 같은 굵기(2.2)의 대각선 한 줄만 올린다. 웹 ClipPlayer.jsx SOUND_OFF와 같은 선이다.
struct ClipMuteSlash: View {
    var body: some View {
        Path { p in
            p.move(to: CGPoint(x: 3, y: 2.5))
            p.addLine(to: CGPoint(x: 23.5, y: 21.5))
        }
        .stroke(Color.white, style: StrokeStyle(lineWidth: 2.2, lineCap: .round))
        .frame(width: 26, height: 24)
        .offset(x: 350, y: 63)
        .allowsHitTesting(false)
    }
}
