import AVFoundation
import SwiftUI
import UIKit

/// 해 뜨는 단계(피그마 "DRRRK · 드르륵 · 해뜨기" 1647:24788, 사진보정 1979:27780, 2100:24394)의 배경 영상.
/// 11/10 팀 요청 "함께드르륵 해뜰 때 영상으로 나오면 좋겠다"와 피그마 댓글(1647:24788 "해뜨기 영상으로 넣기").
/// 쌍밍아웃은 sunrise-ssang.mp4, 사진보정은 sunrise-photo.mp4(Resources/Videos, 무음 24fps 5.17초).
/// 방에 들어오면 플레이어를 만들어 미리 받아 두고, 해 뜨는 단계가 시작되면 처음부터 한 번 재생한다. 끝나면 마지막 장면에서 멈춘다(반복 없음, 끝난 뒤 되감지 않음).
/// 첫 장면이 그려지면 영상이 0.12초 동안 옅게 나타나고 장면 그림은 옅어진다. 파일이 없거나 재생이 막히면 영상을 보이지 않고 장면 그림이 그대로 남는다.
/// 웹 client/src/app/sunriseVideo.js와 같은 동작이다.
@Observable
@MainActor
final class SunrisePlayer {
    /// 영상 길이(초). 받기가 멈춰 끝나지 않는 영상은 이 길이와 머무는 시간을 더한 만큼만 기다린다.
    static let duration: TimeInterval = 5.17
    /// 시계가 0이 된 뒤 영상 마지막 장면(해 뜬 아침)에 머무는 시간. 웹 tokens.js live.sunHoldMs 3000과 같다.
    static let holdSeconds: TimeInterval = 3
    /// 첫 장면이 그려질 때 영상이 나타나고 장면 그림이 사라지는 시간. 웹 live.sunriseFadeMs 120과 같다.
    static let fadeSeconds: TimeInterval = 0.12

    let player: AVPlayer?
    /// 첫 장면이 그려졌는지. true가 되면 영상이 보이고 장면 그림이 사라진다.
    var shown = false
    private(set) var startedAt: Date?
    private(set) var endedAt: Date?
    private(set) var failed = false
    @ObservationIgnored private var endObserver: NSObjectProtocol?
    @ObservationIgnored private var failObserver: NSObjectProtocol?
    @ObservationIgnored private var statusObservation: NSKeyValueObservation?
    @ObservationIgnored private var timeObserver: Any?

    static func fileName(for story: StoryKind) -> String {
        story == .photo ? "sunrise-photo" : "sunrise-ssang"
    }

    init(story: StoryKind) {
        guard let url = Bundle.main.url(forResource: Self.fileName(for: story), withExtension: "mp4") else {
            player = nil
            failed = true
            return
        }
        let item = AVPlayerItem(url: url)
        let p = AVPlayer(playerItem: item)
        p.isMuted = true
        p.actionAtItemEnd = .pause
        p.preventsDisplaySleepDuringVideoPlayback = false
        player = p
        endObserver = NotificationCenter.default.addObserver(forName: AVPlayerItem.didPlayToEndTimeNotification, object: item, queue: .main) { [weak self] _ in
            // 끝나면 그대로 둔다(되감지 않음). 마지막 장면이 화면에 남는다.
            MainActor.assumeIsolated { self?.endedAt = .now }
        }
        failObserver = NotificationCenter.default.addObserver(forName: AVPlayerItem.failedToPlayToEndTimeNotification, object: item, queue: .main) { [weak self] _ in
            MainActor.assumeIsolated { self?.fail() }
        }
        statusObservation = item.observe(\.status, options: [.new]) { [weak self] item, _ in
            guard item.status == .failed else { return }
            DispatchQueue.main.async { self?.fail() }
        }
    }

    deinit {
        if let endObserver { NotificationCenter.default.removeObserver(endObserver) }
        if let failObserver { NotificationCenter.default.removeObserver(failObserver) }
        if let timeObserver { player?.removeTimeObserver(timeObserver) }
    }

    /// 해 뜨는 단계가 시작될 때 부른다. 처음부터 재생한다.
    func start() {
        guard let player, !failed, startedAt == nil else { return }
        startedAt = .now
        // 재생 시간이 0보다 커지면(첫 장면이 그려지고 영상이 흐르기 시작하면) 영상을 보이게 한다. 웹 requestVideoFrameCallback과 같은 자리다.
        timeObserver = player.addPeriodicTimeObserver(forInterval: CMTime(value: 1, timescale: 24), queue: .main) { [weak self] time in
            guard time.seconds > 0 else { return }
            MainActor.assumeIsolated { self?.firstFrame() }
        }
        player.seek(to: .zero, toleranceBefore: .zero, toleranceAfter: .zero)
        player.play()
    }

    /// 방을 나가면 멈춘다.
    func stop() {
        player?.pause()
    }

    /// 첫 장면이 그려졌을 때(AVPlayerLayer.isReadyForDisplay) 부른다.
    func firstFrame() {
        guard startedAt != nil, !failed, !shown else { return }
        withAnimation(.linear(duration: Self.fadeSeconds)) { shown = true }
    }

    private func fail() {
        failed = true
        player?.pause()
        shown = false
    }

    /// 영상이 돌고 있거나 끝난 뒤 마지막 장면에 머무는 중이면 true. 종료 리포트로 넘어가는 단계는 이 값이 false가 될 때까지 기다린다.
    /// 방 구경에서 이어받은 시계가 이미 01:12 아래여서 영상이 늦게 시작해도 끝까지 보이고 마지막 장면이 holdSeconds 동안 남는다.
    func holding(at now: Date = .now) -> Bool {
        guard let startedAt, !failed else { return false }
        guard let endedAt else { return now.timeIntervalSince(startedAt) < Self.duration + Self.holdSeconds }
        return now.timeIntervalSince(endedAt) < Self.holdSeconds
    }
}

/// AVPlayerLayer를 화면 크기에 꽉 채운다(videoGravity .resizeAspectFill, 가운데 기준으로 좌우를 자름). 조작 막대가 나오는 VideoPlayer는 쓰지 않는다.
struct SunriseVideoView: UIViewRepresentable {
    let sunrise: SunrisePlayer

    final class PlayerView: UIView {
        override static var layerClass: AnyClass { AVPlayerLayer.self }
        var playerLayer: AVPlayerLayer { layer as! AVPlayerLayer }
        var readyObservation: NSKeyValueObservation?
    }

    func makeUIView(context: Context) -> PlayerView {
        let v = PlayerView()
        v.isUserInteractionEnabled = false
        v.backgroundColor = .clear
        v.playerLayer.videoGravity = .resizeAspectFill
        v.playerLayer.player = sunrise.player
        let s = sunrise
        v.readyObservation = v.playerLayer.observe(\.isReadyForDisplay, options: [.initial, .new]) { layer, _ in
            guard layer.isReadyForDisplay else { return }
            DispatchQueue.main.async { s.firstFrame() }
        }
        return v
    }

    func updateUIView(_ uiView: PlayerView, context: Context) {
        if uiView.playerLayer.player !== sunrise.player { uiView.playerLayer.player = sunrise.player }
        // 재생이 시작된 뒤 이미 그려질 준비가 되어 있으면 바로 보이게 한다.
        if uiView.playerLayer.isReadyForDisplay { DispatchQueue.main.async { sunrise.firstFrame() } }
    }

    static func dismantleUIView(_ uiView: PlayerView, coordinator: ()) {
        uiView.readyObservation = nil
    }
}
