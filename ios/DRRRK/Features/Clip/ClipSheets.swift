import SwiftUI

// 클립 댓글 시트와 더보기 시트. 웹 ClipSheets.jsx(원본 캡처에 맞춘 값)를 그대로 옮겼다. 좌표는 390 x 844 기준이다.

private let SHEET = Color(hex: 0x1F1F1F)
private let BODY = Color(hex: 0xEDEDEE)
private let SUB = Color(hex: 0x9A9A9A)
private let SUB2 = Color(hex: 0xA7A7A7)
private let TILE = Color(hex: 0x2D2D2D)
private let ROW = Color(hex: 0x282828)
private let HANDLE = Color(hex: 0x505050)

/// 아래에서 올라오는 시트 틀. 손잡이를 아래로 70 넘게 끌면 닫힌다.
private struct SheetFrame<Content: View>: View {
    let open: Bool
    let top: CGFloat
    let onClose: () -> Void
    @ViewBuilder var content: () -> Content
    @State private var dy: CGFloat = 0

    var body: some View {
        ZStack(alignment: .topLeading) {
            content()
            Color.clear.frame(width: 390, height: 32).contentShape(Rectangle())
                .overlay(alignment: .top) { Capsule().fill(HANDLE).frame(width: 40, height: 4).padding(.top, 12) }
                .gesture(DragGesture().onChanged { dy = max(0, $0.translation.height) }.onEnded { v in
                    if v.translation.height > 70 {
                        onClose()
                    }
                    withAnimation(DS.Motion.decel(0.3)) { dy = 0 }
                })
        }
        .frame(width: 390, height: 844 - top, alignment: .topLeading)
        .background(SHEET)
        .clipShape(UnevenRoundedRectangle(topLeadingRadius: 24, topTrailingRadius: 24))
        .offset(y: open ? top + dy : 844)
    }
}

// MARK: - 댓글 시트

struct ClipCommentSheet: View {
    let open: Bool
    let info: Bool
    @Bindable var state: ClipState
    let onClose: () -> Void
    let say: (String) -> Void
    @State private var sortByLike = true
    @State private var draft = ""

    private let emojis = ["👍", "❤️", "🤣", "🎉", "🥰", "👏", "😄", "🔥"]
    /// 피그마 1910:11768~11775 이모지 그림(28 x 28) 가운데 x
    private let emojiX: [CGFloat] = [42, 85, 129, 172, 216, 260, 303, 347]

    var body: some View {
        ZStack(alignment: .topLeading) {
            // 시트가 올라오면 영상이 위쪽 카드(110.5, 0, 169 x 299)로 줄어들고 바탕은 검정이 된다.
            Color.black.opacity(open ? 1 : 0).frame(width: 390, height: 844)
                .contentShape(Rectangle())
                .onTapGesture { onClose() }
            Image("G-clip-vid").resizable().scaledToFill()
                .frame(width: open ? 169 : 390, height: open ? 299 : 750)
                .clipShape(UnevenRoundedRectangle(bottomLeadingRadius: open ? 14 : 0, bottomTrailingRadius: open ? 14 : 0))
                .offset(x: open ? 110.5 : 0)
                .opacity(open ? 1 : 0)
                .allowsHitTesting(false)
            SheetFrame(open: open, top: 310, onClose: onClose) {
                ZStack(alignment: .topLeading) {
                    // 배너 위 의자 그림이 배너 위로 35 튀어나와(피그마 2006:11799, 화면 y 362) 목록 영역을 y 52부터 연다.
                    ScrollView(showsIndicators: false) {
                        VStack(alignment: .leading, spacing: 0) {
                            if info {
                                infoBlock
                            } else {
                                Color.clear.frame(height: 23)
                                banner; cleanbot
                            }
                            ForEach(list) { row($0) }
                            Color.clear.frame(height: 30)
                        }
                    }
                    .frame(width: 390, height: info ? 362 : 340)
                    .offset(y: info ? 30 : 52)
                    if !info {
                        header
                    }
                    inputArea.offset(y: 392)
                }
            }
        }
    }

    private var list: [ClipComment] {
        state.comments.sorted { sortByLike ? $0.likes > $1.likes : $0.order > $1.order }
    }

    private var header: some View {
        ZStack(alignment: .topLeading) {
            Text("댓글 \(state.total)").suit(17, .medium, tracking: -0.34).foregroundStyle(Color(hex: 0xF9F9F9)).offset(x: 20, y: 38)
            HStack(spacing: 12.5) {
                sortButton("순공감순", on: sortByLike) { sortByLike = true }
                sortButton("최신순", on: !sortByLike) { sortByLike = false }
            }
            .frame(width: 369, alignment: .trailing)
            .offset(y: 38)
        }
    }

    private func sortButton(_ t: String, on: Bool, _ a: @escaping () -> Void) -> some View {
        Button(action: { withAnimation(DS.Motion.standard) { a() } }) {
            HStack(spacing: 7.5) {
                Circle().fill(on ? DS.Palette.textPrimary : SUB2).frame(width: 5, height: 5)
                Text(t).suit(15, .medium, tracking: -0.3).foregroundStyle(on ? DS.Palette.textPrimary : SUB2)
            }
        }
        .buttonStyle(.plain)
    }

    private var banner: some View {
        // 피그마 1910:11689 배너(359 x 67, #36D2FF, 반경 6). 아래 좌표는 배너 왼쪽 위(화면 15, 397) 기준이다.
        ZStack(alignment: .topLeading) {
            RoundedRectangle(cornerRadius: 6).fill(Color(hex: 0x36D2FF)).frame(width: 359, height: 67)
            // 1910:11690 글자 바깥 흰 테두리 2
            Text("드르륙 칵, 잼컨 썰 여기 다 있네").suit(15.5, .extrabold, tracking: -0.31, lineHeight: 22)
                .foregroundStyle(.black)
                .shadow(color: .white, radius: 0, x: 2, y: 0).shadow(color: .white, radius: 0, x: -2, y: 0)
                .shadow(color: .white, radius: 0, x: 0, y: 2).shadow(color: .white, radius: 0, x: 0, y: -2)
                .shadow(color: .white, radius: 0, x: 1.4, y: 1.4).shadow(color: .white, radius: 0, x: -1.4, y: -1.4)
                .shadow(color: .white, radius: 0, x: 1.4, y: -1.4).shadow(color: .white, radius: 0, x: -1.4, y: 1.4)
                .offset(x: 16, y: 10)
            // 1910:11691 배너 버튼(로고, 지금 다운받기, 오른쪽 화살표)
            HStack(spacing: 4) {
                Image("G-clip-drrrk-logo").resizable().frame(width: 29.2, height: 11)
                Text("지금 다운받기").suit(11.5, .semibold, tracking: -0.23, lineHeight: 16)
                    .foregroundStyle(Color(hex: 0xE7E0FA))
                Image("G-clip-chevron").resizable().frame(width: 7, height: 11)
            }
            .padding(.horizontal, 9).frame(height: 19)
            .background(Color(hex: 0x222628), in: RoundedRectangle(cornerRadius: 5))
            .offset(x: 16, y: 36)
            // 2006:11816, 2006:11817, 2006:11844, 2006:11799 장식 그림(회전과 흐림은 그림에 들어 있음)
            Image("G-clip-cb-drrra").resizable().frame(width: 55.3, height: 55.3).offset(x: 216, y: -18)
            Image("G-clip-cb-squid").resizable().frame(width: 56, height: 56.4).offset(x: 319, y: 8)
            Image("G-clip-cb-shadow").resizable().frame(width: 86, height: 32).offset(x: 249, y: 40)
            Image("G-clip-cb-chair").resizable().frame(width: 110.2, height: 110.2).offset(x: 242, y: -35)
        }
        .allowsHitTesting(false)
        .frame(width: 359, height: 67, alignment: .topLeading)
        .padding(.leading, 15).padding(.top, 12)
    }

    private var cleanbot: some View {
        HStack(spacing: 0) {
            Image(systemName: "face.smiling.inverse").font(.system(size: 14)).foregroundStyle(Color(hex: 0x00C859)).frame(width: 20)
            (Text("클린봇").foregroundColor(Color(hex: 0x00C859)) + Text("이 악성댓글을 감지합니다.").foregroundColor(Color(hex: 0xE9E9E9)))
                .suit(15, .medium, tracking: -0.3).padding(.leading, 5)
            Spacer()
            HStack(spacing: 4) {
                Image(systemName: "gearshape.fill").font(.system(size: 12))
                Text("설정").suit(14, .medium)
            }
            .foregroundStyle(Color(hex: 0xA2A2A2))
        }
        .padding(.leading, 14).padding(.trailing, 13)
        .frame(width: 350, height: 42)
        .background(ROW, in: RoundedRectangle(cornerRadius: 8))
        .padding(.leading, 20).padding(.top, 16)
    }

    /// 캡션의 더보기를 누르면 나오는 설명 부분(원본 15번): 만든 사람, 글, 재생수, AI 활용 칩, 구분선 순서다.
    private var infoBlock: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(spacing: 6) {
                Image("G-clip-av-webd").resizable().scaledToFill().frame(width: 32, height: 32).clipShape(Circle())
                Text("흔한 웹드").suit(15, .bold, tracking: -0.3).foregroundStyle(Color(hex: 0xF6F6F6)).padding(.leading, 4)
                Image(systemName: "checkmark.seal.fill").font(.system(size: 13)).foregroundStyle(Color(hex: 0xF9A825))
                Text("팔로우").suit(13.5, .medium, tracking: -0.27).foregroundStyle(Color(hex: 0xEFEFEF))
                    .padding(.horizontal, 9).frame(height: 26)
                    .overlay(RoundedRectangle(cornerRadius: 8).strokeBorder(Color(hex: 0x343436)))
                    .padding(.leading, 6)
            }
            Text("베프가 내 비밀을 까발린다 ep.01").suit(16.5, .regular, tracking: -0.33).foregroundStyle(Color(hex: 0xF5F5F5)).padding(.top, 11)
            Text("#친구관계 #연애").suit(16.5, .bold, tracking: -0.33).foregroundStyle(Color(hex: 0xF5F5F5))
            HStack(spacing: 6) {
                Text("재생수 2.4만")
                Circle().frame(width: 3.5, height: 3.5)
                Text("3일 전")
            }
            .suit(15, .regular, tracking: -0.3).foregroundStyle(SUB).padding(.top, 8)
            Text("AI 활용").suit(14, .regular, tracking: -0.28).foregroundStyle(Color(hex: 0xEDEDED))
                .frame(width: 52, height: 29)
                .background(ROW, in: RoundedRectangle(cornerRadius: 8))
                .overlay(RoundedRectangle(cornerRadius: 8).strokeBorder(Color(hex: 0x343436)))
                .padding(.top, 17)
            Spacer(minLength: 0)
        }
        .padding(.horizontal, 20)
        .frame(width: 390, height: 182, alignment: .topLeading)
        .overlay(alignment: .bottom) { Rectangle().fill(Color(hex: 0x292929)).frame(height: 1) }
        .padding(.top, 10)
    }

    private func row(_ c: ClipComment) -> some View {
        let on = state.liked.contains(c.id)
        return HStack(alignment: .top, spacing: 11) {
            Group {
                if let av = c.avatar {
                    Image(av).resizable().scaledToFill()
                } else {
                    Text(String(c.name.prefix(1))).suit(13, .bold).foregroundStyle(Color(hex: 0xD1D1D6))
                        .frame(maxWidth: .infinity, maxHeight: .infinity).background(Color(hex: 0x3A3A3C))
                }
            }
            .frame(width: 32, height: 32).clipShape(Circle())
            VStack(alignment: .leading, spacing: 0) {
                Text(c.name).suit(15, .bold, tracking: -0.3).foregroundStyle(Color(hex: 0xF6F6F6))
                Text(c.text).suit(15, .regular, tracking: -0.3, lineHeight: 20).foregroundStyle(BODY).padding(.top, 3)
                    .fixedSize(horizontal: false, vertical: true)
                Text(c.when).suit(13).foregroundStyle(SUB).padding(.top, 1)
                Button { say("답글 쓰기는 준비 중이에요") } label: {
                    Text("답글 쓰기").suit(14, .regular, tracking: -0.28).foregroundStyle(Color(hex: 0xEBEBEB)).frame(height: 34)
                }
                .buttonStyle(.plain)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            VStack(spacing: 1.3) {
                Image(systemName: "ellipsis").font(.system(size: 14, weight: .bold)).foregroundStyle(Color(hex: 0xB5B5B5)).padding(.bottom, 12)
                Button {
                    UIImpactFeedbackGenerator(style: .light).impactOccurred()
                    withAnimation(.spring(response: 0.3, dampingFraction: 0.55)) {
                        if let i = state.comments.firstIndex(where: { $0.id == c.id }) {
                            if on {
                                state.liked.remove(c.id); state.comments[i].likes -= 1
                            } else {
                                state.liked.insert(c.id); state.comments[i].likes += 1
                            }
                        }
                    }
                } label: {
                    VStack(spacing: 1.3) {
                        Image(systemName: on ? "heart.fill" : "heart").font(.system(size: 16))
                            .foregroundStyle(on ? Color(hex: 0xFF3B5C) : Color(hex: 0xC4C4C4))
                            .scaleEffect(on ? 1.1 : 1)
                        Text("\(c.likes)").suit(14).foregroundStyle(on ? Color(hex: 0xFF3B5C) : Color(hex: 0xCACACA))
                    }
                }
                .buttonStyle(.plain)
                .accessibilityLabel("공감")
            }
            .frame(width: 44)
        }
        .padding(.leading, 19).padding(.trailing, 14)
        .padding(.top, 20)
    }

    private var inputArea: some View {
        ZStack(alignment: .topLeading) {
            SHEET.frame(width: 390, height: 142)
            Rectangle().fill(Color(hex: 0x292929)).frame(width: 390, height: 1)
            Circle().fill(.white).frame(width: 44, height: 44)
                .overlay(Image(systemName: "person.fill").font(.system(size: 26)).foregroundStyle(Color(hex: 0xC9C9CE)).offset(y: 4))
                .clipShape(Circle())
                .offset(x: 19, y: 13)
            HStack {
                TextField("", text: $draft, prompt: Text("힘이 되는 말 한마디 남겨보세요.").foregroundStyle(Color(hex: 0x797979)))
                    .suit(15, .regular, tracking: -0.3).foregroundStyle(DS.Palette.textPrimary)
                    .onSubmit(send)
                Image(systemName: "face.smiling").font(.system(size: 19)).foregroundStyle(Color(hex: 0x8E8E8E))
            }
            .padding(.leading, 14).padding(.trailing, 12)
            .frame(width: 263, height: 45)
            .overlay(Capsule().strokeBorder(Color(hex: 0x343436)))
            .offset(x: 70, y: 11)
            Button(action: send) {
                Image(systemName: "arrow.up").font(.system(size: 17, weight: .bold))
                    .foregroundStyle(draft.isEmpty ? Color(hex: 0x6E6E6E) : .black)
                    .frame(width: 38, height: 38)
                    .background(draft.isEmpty ? ROW : DS.Palette.brandPrimary, in: Circle())
            }
            .buttonStyle(.plain)
            .offset(x: 340, y: 19)
            ForEach(emojis.indices, id: \.self) { i in
                Button { draft += emojis[i] } label: {
                    Image("G-clip-emoji-\(i + 1)").resizable().frame(width: 28, height: 28).frame(width: 40, height: 40)
                }
                    .buttonStyle(ClipPressStyle(radius: 20))
                    .offset(x: emojiX[i] - 20, y: 66)
            }
        }
    }

    private func send() {
        let v = draft.trimmingCharacters(in: .whitespaces)
        guard !v.isEmpty else { return }
        draft = ""
        withAnimation(DS.Motion.emphasizedDecel) {
            state.comments.insert(.init(id: 100 + state.comments.count, name: "새벽2시", avatar: nil, text: v, when: "방금 전", order: 99 + state.comments.count, likes: 0), at: 0)
            sortByLike = false
        }
        say("댓글을 남겼어요")
    }
}

// MARK: - 더보기 시트

struct ClipMoreSheet: View {
    let open: Bool
    let state: ClipState
    let onClose: () -> Void
    let onAction: (String) -> Void

    var body: some View {
        ZStack(alignment: .topLeading) {
            Color.black.opacity(open ? 0.5 : 0).frame(width: 390, height: 844)
                .contentShape(Rectangle())
                .onTapGesture { onClose() }
            SheetFrame(open: open, top: 413, onClose: onClose) {
                ZStack(alignment: .topLeading) {
                    tile(19.5, state.like ? "heart.fill" : "heart", "좋아요 " + (state.like ? "2,414" : "2,413"), state.like ? Color(hex: 0xFF3B5C) : DS.Palette.textPrimary, "like")
                    tile(138, "ellipsis.bubble", "댓글 \(state.total)", DS.Palette.textPrimary, "comments")
                    tile(256.5, state.save ? "bookmark.fill" : "bookmark", "Keep", DS.Palette.textPrimary, "save")
                    rowView("arrow.up.left.and.arrow.down.right", "몰입 모드로 보기", nil, 109, "immersive")
                    rowView("play.rectangle", "재생 방식 설정", "반복 재생", 151, "play")
                    Rectangle().fill(.white.opacity(0.07)).frame(width: 350, height: 1).offset(x: 20, y: 204)
                    rowView("eye.slash", "이 콘텐츠 숨기기", nil, 214, "hide")
                    rowView("person.slash", nil, nil, 256, "hideCreator")
                    rowView("arrowshape.turn.up.right", "공유하기", nil, 298, "share")
                    rowView("light.beacon.max", "신고하기", nil, 340, "report")
                }
            }
        }
    }

    private func tile(_ x: CGFloat, _ icon: String, _ text: String, _ color: Color, _ action: String) -> some View {
        Button { onAction(action) } label: {
            VStack(spacing: 6) {
                Image(systemName: icon).font(.system(size: 20)).foregroundStyle(color)
                Text(text).suit(14.5, .regular, tracking: -0.3).foregroundStyle(Color(hex: 0xF2F2F2))
            }
            .frame(width: 113.5, height: 70)
            .background(TILE, in: RoundedRectangle(cornerRadius: 8))
        }
        .buttonStyle(ClipPressStyle(radius: 8))
        .offset(x: x, y: 28)
    }

    private func rowView(_ icon: String, _ label: String?, _ tail: String?, _ top: CGFloat, _ action: String) -> some View {
        Button { onAction(action) } label: {
            HStack(spacing: 0) {
                Image(systemName: icon).font(.system(size: 18)).frame(width: 22).padding(.leading, 20)
                HStack(spacing: 7) {
                    if let label {
                        Text(label).suit(15.5, .semibold, tracking: -0.31)
                    } else {
                        (Text("웹드플리").foregroundColor(Color(hex: 0x4F96FF)) + Text(" 콘텐츠 숨기기")).suit(15.5, .semibold, tracking: -0.31)
                    }
                    if let tail {
                        Circle().fill(SUB).frame(width: 3.5, height: 3.5)
                        Text(tail).suit(14.5, .regular, tracking: -0.3).foregroundStyle(Color(hex: 0xAEAEAE))
                    }
                }
                .padding(.leading, 12)
                Spacer()
            }
            .foregroundStyle(DS.Palette.textPrimary)
            .frame(width: 390, height: 42)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .offset(y: top)
    }
}
