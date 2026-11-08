import SwiftUI

extension ClipData {
    /// 장면 데이터를 새로 읽어 상태(좋아요, 저장, 소리, 댓글 수)에 맞게 바꾼 목록. 웹 ClipPlayer.jsx decorate와 같다.
    static func player(like: Bool, save: Bool, mute: Bool, comments: Int) -> [ClipItem] {
        let url = Bundle.main.url(forResource: "clip-scenes", withExtension: "json")!
        let items = (try? JSONDecoder().decode(File.self, from: Data(contentsOf: url)).player) ?? []
        return items.compactMap { it in
            switch it.n {
            case "드르륵 에이전트 버튼": return nil
            case "Icon / 좋아요": if like {
                    it.asset = "A-clipsvg-like-on"
                }
            case "좋아요 수": if like {
                    it.text = "2,414"
                }
            case "Icon / 저장": if save {
                    it.asset = "A-clipsvg-save-on"
                }
            case "저장 라벨": if save {
                    it.text = "저장됨"
                }
            case "Icon / 소리": if mute {
                    it.asset = "A-clipsvg-mute"
                }
            case "댓글 수": it.text = String(comments)
            default: break
            }
            return it
        }
    }
}

/// 화면을 나갔다 들어와도 켜 둔 상태가 남는다.
@Observable
final class ClipState {
    static let shared = ClipState()
    var like = false
    var save = false
    var mute = false
    var comments = ClipComment.seed
    var liked: Set<Int> = []
    var total: Int {
        187 + comments.count - ClipComment.seed.count
    }
}

struct ClipComment: Identifiable, Hashable {
    let id: Int
    let name: String
    let avatar: String?
    let text: String
    let when: String
    let order: Int
    var likes: Int

    static let seed: [ClipComment] = [
        .init(id: 1, name: "유니별84", avatar: "A-clip-av2", text: "앗.. 이거 완전 내 얘기잖아. 셋이 있는 자리에서 말하는 건 진짜 선 넘었다", when: "3일 전", order: 3, likes: 355),
        .init(id: 2, name: "inflection", avatar: "A-clip-av1", text: "얼굴 화끈거리는 마음 너무 알아서 두 번 봤어", when: "2일 전", order: 2, likes: 128),
        .init(id: 3, name: "모카빵굽는밤", avatar: nil, text: "일단 그 친구한테 바로 따지지 말고 마음 정리부터 해 보자", when: "1일 전", order: 1, likes: 76),
        .init(id: 4, name: "새벽세시", avatar: nil, text: "이럴 땐 드르륵에서 비슷한 고민 방을 열어 보는 것도 방법이야", when: "20시간 전", order: 0, likes: 41),
    ]
}

/// 누를 때 살짝 작아지는 반응(웹 cp-btn: 0.92, 110ms).
struct ClipPressStyle: ButtonStyle {
    var radius: CGFloat = 12
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .clipShape(RoundedRectangle(cornerRadius: radius))
            .scaleEffect(configuration.isPressed ? 0.92 : 1)
            .opacity(configuration.isPressed ? 0.8 : 1)
            .animation(.timingCurve(0.2, 0, 0, 1, duration: 0.11), value: configuration.isPressed)
    }
}

// MARK: - 콘텐츠 리스트(55)

struct ClipListView: View {
    @Environment(Router.self) private var router

    var body: some View {
        ClipCanvas(items: ClipData.file.list, background: Color(hex: 0x131313)) {
            Button { router.push(.clipPlayer) } label: {
                Color.clear.frame(width: 183, height: 326).contentShape(Rectangle())
            }
            .buttonStyle(ClipPressStyle(radius: 12))
            .offset(x: 8, y: 109)
            .accessibilityLabel("쌍밍아웃 영상")
        }
        .toolbar(.hidden, for: .navigationBar)
    }
}

// MARK: - 영상 보기(56)

struct ClipPlayerView: View {
    @Environment(Router.self) private var router
    @State private var st = ClipState.shared
    @State private var popped = false
    @State private var sheet: ClipSheetKind?
    @State private var sheetOpen = false
    @State private var toast: String?

    enum ClipSheetKind { case comments, info, more }

    var body: some View {
        let items = ClipData.player(like: st.like, save: st.save, mute: st.mute, comments: st.total)
        ClipCanvas(items: items, background: .black) {
            agent
            hit("소리", 340, 53, 46, 44, 22) { st.mute.toggle() }
            hit("뒤로", 0, 56, 64, 44, 0) { router.pop() }
            hit("이벤트 댓글 남기기", 333, 410, 52, 56, 26) { open(.comments) }
            hit("좋아요", 338, 483, 44, 62, 12) { flip(\.like) }
            hit("댓글", 338, 552, 44, 62, 12) { open(.comments) }
            hit("저장", 338, 622, 44, 62, 12) { flip(\.save); say(st.save ? "저장했어요" : "저장을 취소했어요") }
            hit("더보기", 336, 696, 48, 32, 16) { open(.more) }
            hit("댓글 미리보기", 12, 580, 240, 38, 19) { open(.comments) }
            hit("댓글 입력", 15, 759, 359, 47, 24) { open(.comments) }
            hit("캡션 더보기", 12, 664, 330, 28, 8) { open(.info) }
            sheets
            if let toast {
                Text(toast).suit(13.5, .semibold, tracking: -0.27)
                    .foregroundStyle(Color(hex: 0xF2F2F7))
                    .padding(.horizontal, 16).padding(.vertical, 10)
                    .background(Color(hex: 0x2C2C2E, alpha: 0.96), in: RoundedRectangle(cornerRadius: 14))
                    .fixedSize()
                    .frame(width: 390)
                    .offset(y: 692)
                    .transition(.opacity.combined(with: .offset(y: 8)))
                    .allowsHitTesting(false)
            }
        }
        .toolbar(.hidden, for: .navigationBar)
        .task {
            try? await Task.sleep(for: .seconds(1.0))
            withAnimation(.spring(response: 0.55, dampingFraction: 0.6)) { popped = true }
        }
    }

    /// 드르륵 에이전트 버튼: 영상이 보인 뒤 오른쪽에서 튀어나오고, 누르면 로고 스플래시를 거쳐 드르륵 홈으로 들어간다.
    private var agent: some View {
        Button {
            UIImpactFeedbackGenerator(style: .medium).impactOccurred()
            withAnimation(.easeOut(duration: 0.3)) { router.enterFromClip() }
        } label: {
            Image("A-clip-agent").resizable().scaledToFill()
                .frame(width: 60, height: 60)
                .clipShape(RoundedRectangle(cornerRadius: 13))
                .shadow(color: .black.opacity(0.35), radius: 4, x: 0, y: 2)
        }
        .buttonStyle(ClipPressStyle(radius: 13))
        .scaleEffect(popped ? 1 : 0.7)
        .offset(x: popped ? 344 : 410, y: 298)
        .opacity(popped ? 1 : 0)
        .accessibilityLabel("드르륵 에이전트")
    }

    private func hit(_ label: String, _ x: CGFloat, _ y: CGFloat, _ w: CGFloat, _ h: CGFloat, _ r: CGFloat, _ action: @escaping () -> Void) -> some View {
        Button(action: action) { Color.clear.frame(width: w, height: h).contentShape(Rectangle()) }
            .buttonStyle(ClipPressStyle(radius: r))
            .offset(x: x, y: y)
            .accessibilityLabel(label)
    }

    private func flip(_ key: ReferenceWritableKeyPath<ClipState, Bool>) {
        UIImpactFeedbackGenerator(style: .light).impactOccurred()
        withAnimation(.spring(response: 0.3, dampingFraction: 0.55)) { st[keyPath: key].toggle() }
    }

    private func say(_ text: String) {
        withAnimation(DS.Motion.decel(0.24)) { toast = text }
        Task {
            try? await Task.sleep(for: .seconds(1.9))
            withAnimation(.easeOut(duration: 0.2)) {
                if toast == text {
                    toast = nil
                }
            }
        }
    }

    private func open(_ kind: ClipSheetKind) {
        sheet = kind
        Task {
            try? await Task.sleep(for: .milliseconds(30))
            withAnimation(.timingCurve(0.05, 0.7, 0.1, 1, duration: 0.36)) { sheetOpen = true }
        }
    }

    private func close(then: (() -> Void)? = nil) {
        withAnimation(.timingCurve(0.05, 0.7, 0.1, 1, duration: 0.36)) { sheetOpen = false }
        Task {
            try? await Task.sleep(for: .seconds(0.4))
            sheet = nil
            then?()
        }
    }

    @ViewBuilder
    private var sheets: some View {
        switch sheet {
        case .comments, .info:
            ClipCommentSheet(open: sheetOpen, info: sheet == .info, state: st, onClose: { close() }, say: say)
        case .more:
            ClipMoreSheet(open: sheetOpen, state: st, onClose: { close() }) { action in
                switch action {
                case "like": flip(\.like)
                case "save": flip(\.save); say(st.save ? "저장했어요" : "저장을 취소했어요")
                case "comments": close { open(.comments) }
                case "play": close(); say("반복 재생으로 설정했어요")
                case "hide": close(); say("이 콘텐츠를 숨겼어요")
                case "hideCreator": close(); say("쌍수일기 콘텐츠를 숨겼어요")
                case "report": close(); say("신고가 접수됐어요")
                case "share": close(); say("링크를 복사했어요")
                default: close()
                }
            }
        case nil:
            EmptyView()
        }
    }
}
