import AVFoundation
import SwiftUI
import UIKit

/// 함께 드르륵 방에 들어올 때 배경에서 한 번 재생하는 입장 영상(11. 10. 피그마 댓글 1807:23214 "영상으로 반영").
/// 쌍밍아웃은 room-enter-ssang.mp4(피그마 2096:22459, 1807:23214 영상), 사진보정은 room-enter-photo.mp4(피그마 2100:24322, 1979:27708 영상)이다.
/// 둘 다 640 x 1148, 24fps, 3.08초이고 카메라가 멀리서 테이블 쪽으로 다가온다. 팀이 넣은 소리 트랙이 있어 소리를 켠 채 재생한다(volume).
/// 영상 마지막 장면은 방 장면 그림과 같은 구도라서, 끝나면 영상이 0.12초 동안 옅어지며 아래의 장면 그림이 그대로 이어진다.
/// 방(RoomView)이 처음 나타날 때만 만든다. 일반 모드에 갔다 돌아와도 다시 재생하지 않고, 방을 나갔다가 새로 들어오면(새 RoomView) 다시 재생한다.
/// 온보딩 덮개가 떠 있는 동안은 첫 장면에 세워 두고 덮개가 닫히면 재생한다. 파일이 없거나 재생이 막히면 영상을 빼서 장면 그림이 그대로 남는다.
/// 소리 세션은 RoomVoice.enter가 이미 ambient(다른 앱 소리와 섞임)로 맞추므로 여기서는 건드리지 않는다.
/// 웹 client/src/app/roomEnterVideo.js와 같은 동작이다. 구조는 SunriseVideo.swift를 따른다.
@Observable
@MainActor
final class RoomEnterPlayer {
    /// 영상 소리 음량(0에서 1). 0이면 소리를 끈다. 웹 tokens.js live.roomEnterVolume과 같다.
    static let volume: Float = 0.6
    /// 끝난 뒤 영상이 옅어지며 장면 그림으로 이어지는 시간. 웹 live.roomEnterFadeMs 120과 같다.
    static let fadeSeconds: TimeInterval = 0.12

    let player: AVPlayer?
    /// 영상을 보이는지. 처음부터 true라 덮개 뒤에서도 첫 장면이 보이고, 끝나거나 실패하면 false가 된다.
    var visible = true
    private(set) var started = false
    private(set) var finished = false
    @ObservationIgnored private var endObserver: NSObjectProtocol?
    @ObservationIgnored private var failObserver: NSObjectProtocol?
    @ObservationIgnored private var statusObservation: NSKeyValueObservation?

    static func fileName(for story: StoryKind) -> String {
        story == .photo ? "room-enter-photo" : "room-enter-ssang"
    }

    init(story: StoryKind) {
        guard !UIAccessibility.isReduceMotionEnabled,
              let url = Bundle.main.url(forResource: Self.fileName(for: story), withExtension: "mp4") else {
            player = nil
            visible = false
            finished = true
            return
        }
        let item = AVPlayerItem(url: url)
        let p = AVPlayer(playerItem: item)
        p.volume = Self.volume
        p.isMuted = Self.volume <= 0
        p.actionAtItemEnd = .pause
        p.preventsDisplaySleepDuringVideoPlayback = false
        player = p
        endObserver = NotificationCenter.default.addObserver(forName: AVPlayerItem.didPlayToEndTimeNotification, object: item, queue: .main) { [weak self] _ in
            MainActor.assumeIsolated { self?.finish() }
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
    }

    /// 덮개가 없을 때 부른다. 처음부터 한 번 재생한다.
    func start() {
        guard let player, !started, !finished else { return }
        started = true
        player.seek(to: .zero, toleranceBefore: .zero, toleranceAfter: .zero)
        player.play()
    }

    /// 방 화면이 사라지면(일반 모드로 가거나 방을 나가면) 멈추고 영상을 뺀다. 돌아와도 다시 재생하지 않는다.
    func stop() {
        guard !finished else { return }
        finished = true
        player?.pause()
        visible = false
    }

    private func finish() {
        guard !finished else { return }
        finished = true
        withAnimation(.linear(duration: Self.fadeSeconds)) { visible = false }
    }

    private func fail() {
        finished = true
        player?.pause()
        visible = false
    }
}

/// AVPlayerLayer를 화면 크기에 꽉 채운다(videoGravity .resizeAspectFill, 가운데 기준으로 좌우를 자름). 조작 막대가 나오는 VideoPlayer는 쓰지 않는다.
struct RoomEnterVideoView: UIViewRepresentable {
    let entry: RoomEnterPlayer

    final class PlayerView: UIView {
        override static var layerClass: AnyClass { AVPlayerLayer.self }
        var playerLayer: AVPlayerLayer { layer as! AVPlayerLayer }
    }

    func makeUIView(context: Context) -> PlayerView {
        let v = PlayerView()
        v.isUserInteractionEnabled = false
        v.backgroundColor = .clear
        v.playerLayer.videoGravity = .resizeAspectFill
        v.playerLayer.player = entry.player
        return v
    }

    func updateUIView(_ uiView: PlayerView, context: Context) {
        if uiView.playerLayer.player !== entry.player { uiView.playerLayer.player = entry.player }
    }
}
