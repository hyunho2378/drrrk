import SwiftUI

/// 의자 꾸미기. 팀 피그마 "의자 꾸미기 · 소파 선택"(1647:23223, 1951:13222, 1951:13140, 1951:13308, 1951:13839)과
/// "잠긴 의자 선택"(1647:23282)의 자리와 값을 옮겼다(390 x 844 기준 좌표). 큰 의자 100,151 190, 이름 349, 스타일 이름 384.
/// 종류를 누르면 그 종류의 의자가, 스타일을 누르면 큰 그림 하나만 바뀐다(화면 전체는 움직이지 않는다).
/// 리클라이너는 고를 수는 있지만 저장할 수 없다.
struct ChairStudioView: View {
    @Environment(Router.self) private var router
    @State private var store = ChairStore.shared
    @State private var note: String?
    @State private var noteTask: Task<Void, Never>?

    private let primary = DS.Palette.brandPrimary
    private let subtle = DS.Palette.brandSubtle
    private let elevated = DS.Palette.bgElevated

    var body: some View {
        let k = store.draftK
        let c = store.draftC
        let kind = ChairStore.kinds[k]
        let locked = ChairStore.isLocked(k)

        // 피그마 390 x 844 값을 그대로 두고 화면 폭에 맞춰 키운다(다른 화면과 같은 Canvas 방식).
        ClipCanvas(items: [], background: DS.Palette.bgSurface) {
        ZStack(alignment: .topLeading) {
            // 머리말
            Button { router.pop() } label: {
                Image("D-icon-chevron-left").renderingMode(.template).resizable()
                    .foregroundStyle(DS.Palette.textPrimary)
                    .frame(width: 24, height: 24)
                    .padding(10)
                    .contentShape(Rectangle())
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel("뒤로")
            .offset(x: 14, y: 69)

            Text("의자 꾸미기").suit(17, .bold, tracking: -0.34)
                .foregroundStyle(DS.Palette.textPrimary)
                .frame(width: 390, height: 24)
                .offset(y: 79)

            Text("엉따 39.2°").suit(12, .bold, tracking: -0.24)
                .foregroundStyle(DS.Palette.accentOrange)
                .padding(.horizontal, 10)
                .frame(height: 25)
                .background(DS.Palette.accentOrange.opacity(0.15), in: Capsule())
                .frame(width: 73, alignment: .trailing)
                .offset(x: 293, y: 79)

            // 큰 의자 그림. 바뀔 때 새 그림이 옅게 커지며 들어온다.
            ZStack {
                // 잠긴 의자는 큰 그림을 30%로 둔다(최종 피그마 2340:24031 그림 채우기 불투명도 0.3, 웹 ChairStudio.jsx와 같다).
                Image(ChairStore.big(k, c)).resizable().scaledToFit()
                    .opacity(locked ? 0.3 : 1)
                    .id(ChairStore.big(k, c))
                    .transition(.asymmetric(
                        insertion: .opacity.combined(with: .scale(scale: 0.95)).combined(with: .offset(y: 8)),
                        removal: .opacity
                    ))
            }
            .frame(width: 190, height: 190)
            .animation(DS.Motion.decel(0.34), value: ChairStore.big(k, c))
            .offset(x: 100, y: 151)

            if locked {
                Image("D-icon-lock").renderingMode(.template).resizable()
                    .foregroundStyle(DS.Palette.textPrimary)
                    .frame(width: 24, height: 24)
                    .frame(width: 56, height: 56)
                    .background(.black.opacity(0.6), in: Circle())
                    .offset(x: 167, y: 221)
                    .transition(.opacity.combined(with: .scale(scale: 0.9)))
            }

            VStack(spacing: 8) {
                Text(kind.name).suit(19, .bold, tracking: -0.38, lineHeight: 26.6)
                    .foregroundStyle(DS.Palette.textPrimary)
                    .frame(height: 27)
                Text(locked ? ChairStore.lockNeed : kind.colors[c]).suit(13, .medium, tracking: -0.26, lineHeight: 18.2)
                    .foregroundStyle(locked ? DS.Palette.accentOrange : DS.Palette.textSecondary)
                    .frame(height: 18)
            }
            .id("\(k)-\(c)")
            .transition(.opacity.combined(with: .offset(y: 4)))
            .frame(width: 390)
            .offset(y: 349)

            Text("의자").suit(15, .bold, tracking: -0.6).foregroundStyle(DS.Palette.textPrimary)
                .offset(x: 24, y: 430)

            // 의자 종류 다섯 칸
            HStack(spacing: 8) {
                ForEach(ChairStore.kinds.indices, id: \.self) { i in
                    let on = i == k
                    Button {
                        withAnimation(DS.Motion.decel(0.34)) { store.pickKind(i) }
                        UISelectionFeedbackGenerator().selectionChanged()
                    } label: {
                        ZStack {
                            Image(ChairStore.thumb(i, 0)).resizable().scaledToFit()
                                .frame(width: 46, height: 46)
                                .opacity(ChairStore.isLocked(i) ? 0.3 : 1)
                            if ChairStore.isLocked(i) {
                                Image("D-icon-lock").renderingMode(.template).resizable()
                                    .foregroundStyle(DS.Palette.textPrimary)
                                    .frame(width: 16, height: 16)
                            }
                        }
                        .frame(width: 62, height: 62)
                        .background(on ? subtle : elevated, in: RoundedRectangle(cornerRadius: 14))
                        .overlay(RoundedRectangle(cornerRadius: 14).strokeBorder(primary, lineWidth: on ? 2 : 0))
                    }
                    .buttonStyle(ChairPressStyle())
                    .accessibilityLabel(ChairStore.kinds[i].name)
                    .accessibilityAddTraits(on ? .isSelected : [])
                }
            }
            .animation(DS.Motion.stateIn, value: k)
            .offset(x: 24, y: 459)

            Text("스타일").suit(15, .bold, tracking: -0.6).foregroundStyle(DS.Palette.textPrimary)
                .offset(x: 24, y: 566)

            // 스타일 가로 목록
            ScrollViewReader { proxy in
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        ForEach(kind.colors.indices, id: \.self) { j in
                            let on = j == c
                            Button {
                                guard !locked else { return }
                                withAnimation(DS.Motion.decel(0.34)) { store.pickColor(j) }
                                UISelectionFeedbackGenerator().selectionChanged()
                            } label: {
                                ZStack(alignment: .topLeading) {
                                    Image(ChairStore.thumb(k, j)).resizable().scaledToFit()
                                        .frame(width: 76, height: 76)
                                        .opacity(locked ? 0.23 : 1)
                                        .offset(x: 16, y: 8)
                                    if locked {
                                        Image("D-icon-lock").renderingMode(.template).resizable()
                                            .foregroundStyle(DS.Palette.textPrimary)
                                            .frame(width: 24, height: 24)
                                            .offset(x: 42, y: 34)
                                    }
                                    Text(kind.colors[j]).suit(12, on && !locked ? .bold : .medium, tracking: -0.48)
                                        .foregroundStyle(on && !locked ? primary : DS.Palette.textSecondary)
                                        .lineLimit(1)
                                        .frame(width: 108)
                                        .offset(y: 88)
                                }
                                .frame(width: 108, height: 116, alignment: .topLeading)
                                .background(on && !locked ? subtle : elevated, in: RoundedRectangle(cornerRadius: DS.Radius.card))
                                .overlay(RoundedRectangle(cornerRadius: DS.Radius.card).strokeBorder(primary, lineWidth: on && !locked ? 2 : 0))
                            }
                            .buttonStyle(ChairPressStyle())
                            .id(j)
                            .accessibilityLabel(kind.colors[j])
                            .accessibilityAddTraits(on ? .isSelected : [])
                        }
                    }
                    .padding(.horizontal, 24)
                    .animation(DS.Motion.stateIn, value: c)
                }
                .frame(width: 390, height: 116)
                .onChange(of: k) { withAnimation(DS.Motion.standard) { proxy.scrollTo(0, anchor: .leading) } }
            }
            .offset(y: 595)

            if let note {
                Text(note).suit(14, .semibold, tracking: -0.28)
                    .foregroundStyle(DS.Palette.accentOrange)
                    .frame(width: 342, height: 44)
                    .background(Color(hex: 0x2C2C2E, alpha: 0.96), in: RoundedRectangle(cornerRadius: 14))
                    .offset(x: 24, y: 704)
                    .transition(.opacity.combined(with: .offset(y: 8)))
                    .accessibilityAddTraits(.updatesFrequently)
            }

            Button(action: save) {
                // 피그마 1951:13839: 잠긴 리클라이너를 골라도 저장하기는 하늘색 그대로이고, 누르면 잠금 안내가 뜬다.
                Text("저장하기").suit(16, .bold, tracking: -0.32)
                    .foregroundStyle(.black)
                    .frame(width: 342, height: 56)
                    .background(primary, in: Capsule())
            }
            .buttonStyle(ChairPressStyle())
            .offset(x: 24, y: 764)
        }
        .frame(width: 390, height: 844, alignment: .topLeading)
        }
        .toolbar(.hidden, for: .navigationBar)
    }

    private func save() {
        if store.commit() {
            UINotificationFeedbackGenerator().notificationOccurred(.success)
            router.pop()
        } else {
            UINotificationFeedbackGenerator().notificationOccurred(.warning)
            noteTask?.cancel()
            withAnimation(DS.Motion.decel(0.34)) { note = ChairStore.lockNeed }
            noteTask = Task {
                try? await Task.sleep(for: .seconds(2.2))
                guard !Task.isCancelled else { return }
                withAnimation(.easeOut(duration: 0.22)) { note = nil }
            }
        }
    }
}

/// 앱 전체 눌림 반응(PressStyle)과 같다. 예전 이름을 쓰는 자리를 위해 남겨 둔다.
struct ChairPressStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        PressStyle().makeBody(configuration: configuration)
    }
}
