import SwiftUI

// 대화 다시보기(재방송). 팀 피그마 2322:12283 "대화 다시보기 (재방송)"(390 x 844, 2026. 11. 11. 의정 "라이브다시보기 화면 추가").
// 웹 ReplayScreen.jsx(61)와 같은 글, 같은 값, 같은 동작이다.
// 글 상세의 대화 다시보기 카드를 누르면 밀어 들어오고(router.push), 왼쪽 위 뒤로를 누르면 글 상세로 돌아간다.
// 동작: 06:12에서 재생 중으로 시작해 실제 1초에 1초씩 흐른다. 가운데 버튼은 일시정지와 재생을 오간다(재생 모양은 피그마 play 버튼 2302:12692의 삼각형).
// 10초 버튼은 시간을 10초 옮기고, 배속 칩은 1.0x, 1.5x, 2.0x 순서로 돌며 흐르는 빠르기를 바꾼다. 12:32에 닿으면 멈춘다.
// 피그마 좌표는 화면 맨 위 기준이고 아래 플레이어 컨트롤은 화면 바닥에서 24 위다(글 상세 입력줄과 같은 기준).

enum ReplayData {
    static let title = "둘이 찍은 사진인데\n지만 보정해서 올린 여우"
    static let seats: [(name: String, image: String, on: Bool)] = [
        ("리클라이너21", "R-replay-seat-1", false),
        ("나무스툴12", "R-replay-seat-2", false),
        // 지금 말하는 자리: 바깥 하늘색 테두리 2가 그림에 들어 있다(58 x 58).
        ("가죽소파19", "R-replay-seat-3", true),
    ]
    static let comments: [(name: String, text: String)] = [
        ("구경하는 스툴3", "가죽소파님 목소리 너무 차분해서 더 슬픔"),
        ("폭신한 방석20", "그 친구 원래 그런 스타일이야?"),
    ]
    /// 피그마 "06:12 / 12:32". 진행 바 169 / 342 = 372 / 752.
    static let start: Double = 6 * 60 + 12
    static let total: Double = 12 * 60 + 32
    static let rates: [Double] = [1, 1.5, 2]

    static func mmss(_ s: Double) -> String {
        let v = max(0, Int(s))
        return String(format: "%02d:%02d", v / 60, v % 60)
    }
}

struct ReplayView: View {
    @Environment(Router.self) private var router
    @Environment(\.scenePhase) private var scenePhase
    @State private var pos = ReplayData.start
    @State private var playing = true
    @State private var rateIndex = 0
    /// 앱이 앞에 있는지. 반복문 안에서 scenePhase를 바로 읽으면 화면이 처음 만들어질 때 값(켜지는 중 inactive)에 묶여 시간이 멈췄다(11/11 시뮬레이터 확인).
    @State private var active = true

    private let barWidth: CGFloat = 342

    var body: some View {
        ZStack(alignment: .topLeading) {
            Color.clear
            topBar
            concern.offset(x: 24, y: 321)
            divider
            commentsList.offset(x: 24, y: 540)
        }
        .frame(width: 390, height: 844, alignment: .topLeading)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
        .overlay(alignment: .bottom) {
            VStack(spacing: 24) {
                progressBar
                controls
            }
            .padding(.bottom, 24)
        }
        .background(alignment: .top) { scene }
        .background(DS.Palette.bgSurface)
        .ignoresSafeArea()
        .toolbar(.hidden, for: .navigationBar)
        .task(id: playing) { await tick() }
        .onChange(of: scenePhase) { _, p in active = (p == .active) }
    }

    // MARK: 장면(화면 폭 전체, 피그마 390 폭 기준 값)

    private var scene: some View {
        ZStack(alignment: .top) {
            // scene (방 미리보기) 2322:12284: 0, 0, 390 x 440, 채움 FILL
            Image("R-replay-scene").resizable().scaledToFill()
                .frame(maxWidth: .infinity).frame(height: 440).clipped()
            // scene fade 2322:12285: -7, 300, 404 x 140, #121415 0%에서 100%(장면 아래 끝이 비치지 않게 1 더 덮는다)
            LinearGradient(colors: [DS.Palette.bgSurface.opacity(0), DS.Palette.bgSurface], startPoint: .top, endPoint: .bottom)
                .frame(maxWidth: .infinity).frame(height: 141).padding(.horizontal, -7).offset(y: 300)
            // Rectangle 1954141373 2322:12286: 0, 0, 390 x 125, 검정 100%에서 0%
            LinearGradient(colors: [.black, .black.opacity(0)], startPoint: .top, endPoint: .bottom)
                .frame(maxWidth: .infinity).frame(height: 125)
        }
        .allowsHitTesting(false)
    }

    // MARK: 위 줄(뒤로 24, 79 / 다시보기 배지 56, 78 / 보는 중 313, 78)

    private var topBar: some View {
        ZStack(alignment: .topLeading) {
            Button { router.pop() } label: {
                Image("C-chevron-left").renderingMode(.template).resizable().frame(width: 24, height: 24)
                    .foregroundStyle(.white).frame(width: 44, height: 44)
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel("뒤로")
            .offset(x: 14, y: 69)
            // 다시보기 배지 2322:12352: 79 x 27, 검정 70%, 안쪽 여백 5 10 5 9, 사이 4
            HStack(spacing: 4) {
                Image("R-icon-replay").resizable().frame(width: 14, height: 14)
                Text("다시보기").suit(12, .bold, lineHeight: 17).foregroundStyle(DS.Palette.textPrimary)
            }
            .padding(.leading, 9).padding(.trailing, 10)
            .frame(height: 27)
            .background(.black.opacity(0.7), in: Capsule())
            .offset(x: 56, y: 78)
            // 보는 중 2322:12328: 53 x 27, 오른쪽 끝 366
            HStack(spacing: 4) {
                Image("R-icon-view").resizable().frame(width: 16, height: 16)
                Text("22").suit(12, .bold, tracking: -0.24, lineHeight: 17.4).foregroundStyle(DS.Palette.textPrimary)
            }
            .padding(.leading, 9).padding(.trailing, 10)
            .frame(height: 27)
            .background(.black.opacity(0.7), in: Capsule())
            .frame(width: 390 - 24, alignment: .trailing)
            .offset(y: 78)
        }
    }

    // MARK: 고민 2322:12288 (24, 321)

    private var concern: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(ReplayData.title).suit(21, .bold, lineHeight: 28.4).foregroundStyle(DS.Palette.textPrimary)
                .fixedSize(horizontal: false, vertical: true)
            VStack(alignment: .leading, spacing: 12) {
                HStack(spacing: 6) {
                    Image("R-icon-wave").resizable().frame(width: 18, height: 18)
                    Text("대화한 의자 3").suit(14, .bold, lineHeight: 17.5).foregroundStyle(DS.Palette.textPrimary)
                }
                .frame(height: 18)
                HStack(alignment: .top, spacing: 14) {
                    ForEach(ReplayData.seats, id: \.name) { s in
                        VStack(spacing: 6) {
                            Image(s.image).resizable()
                                .frame(width: s.on ? 58 : 54, height: s.on ? 58 : 54)
                                .frame(width: 54, height: 54)
                            Text(s.name).suit(11, .medium, lineHeight: 13.7)
                                .foregroundStyle(s.on ? DS.Palette.textPrimary : DS.Palette.textSecondary)
                                .lineLimit(1).truncationMode(.tail)
                                .frame(width: 58)
                        }
                        .frame(width: 58)
                    }
                }
            }
        }
    }

    // MARK: 구분선 둘과 안내(0, 519 / 298, 519 / 136, 512)

    private var divider: some View {
        ZStack(alignment: .topLeading) {
            Rectangle().fill(DS.Palette.bgElevated).frame(width: 92, height: 1).offset(y: 519)
            Rectangle().fill(DS.Palette.bgElevated).frame(width: 92, height: 1).offset(x: 298, y: 519)
            Text("라이브 때 달린 댓글이에요").suit(11, .regular, lineHeight: 16).foregroundStyle(DS.Palette.textTertiary)
                .frame(width: 390, height: 16).offset(y: 512)
        }
    }

    // MARK: 댓글 (라이브 채팅) 2322:12315 (24, 540), 사이 8

    private var commentsList: some View {
        VStack(alignment: .leading, spacing: 8) {
            ForEach(ReplayData.comments, id: \.name) { c in
                VStack(alignment: .leading, spacing: 4) {
                    Text(c.name).suit(11, .medium, tracking: -0.22, lineHeight: 15.4).foregroundStyle(DS.Palette.textTertiary)
                        .frame(height: 15)
                    Text(c.text).suit(13, .medium, tracking: -0.26, lineHeight: 18.2).foregroundStyle(DS.Palette.textPrimary)
                        .padding(.horizontal, 12)
                        .frame(height: 32)
                        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.bubble))
                }
            }
        }
    }

    // MARK: 재생 바 2322:12358: 342 x 14, 트랙 4(#33383D), 진행 #36D2FF, 손잡이 14 #F8F8F8

    private var progressBar: some View {
        let p = CGFloat(min(1, max(0, pos / ReplayData.total)))
        return ZStack(alignment: .leading) {
            Capsule().fill(Color(hex: 0x33383D)).frame(width: barWidth, height: 4)
            Capsule().fill(DS.Palette.brandPrimary).frame(width: barWidth, height: 4)
                .scaleEffect(x: p, y: 1, anchor: .leading)
            Circle().fill(DS.Palette.textPrimary).frame(width: 14, height: 14)
                .offset(x: p * barWidth - 7)
        }
        .frame(width: barWidth, height: 14, alignment: .leading)
    }

    // MARK: 플레이어 컨트롤 2322:12362: 342 x 66, #222628, 모서리 32, 안쪽 여백 8 14 8 20, 양 끝 정렬

    private var controls: some View {
        HStack(spacing: 0) {
            (Text(ReplayData.mmss(pos)).font(.custom(SUITWeight.bold.rawValue, fixedSize: 12)).foregroundColor(DS.Palette.textPrimary)
                + Text(" / " + ReplayData.mmss(ReplayData.total)).font(.custom(SUITWeight.medium.rawValue, fixedSize: 12)).foregroundColor(DS.Palette.textSecondary))
                .frame(width: 84, height: 32, alignment: .leading)
            Spacer(minLength: 0)
            HStack(spacing: 12) {
                seekButton("R-icon-back10", label: "10초 뒤로") { seek(-10) }
                Button(action: toggle) {
                    Image(playing ? "R-btn-pause" : "R-btn-play").resizable().frame(width: 48, height: 48)
                }
                .buttonStyle(PressStyle())
                .accessibilityLabel(playing ? "일시정지" : "재생")
                seekButton("R-icon-fwd10", label: "10초 앞으로") { seek(10) }
            }
            Spacer(minLength: 0)
            Button {
                rateIndex = (rateIndex + 1) % ReplayData.rates.count
            } label: {
                Text(String(format: "%.1fx", ReplayData.rates[rateIndex])).suit(12, .bold, lineHeight: 17).foregroundStyle(DS.Palette.textPrimary)
                    .padding(.horizontal, 10)
                    .frame(height: 27)
                    .background(Color(hex: 0x33383D), in: Capsule())
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel("재생 빠르기")
            .frame(width: 84, height: 32, alignment: .trailing)
        }
        .padding(.leading, 20).padding(.trailing, 14)
        .frame(width: 342, height: 66)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.input))
    }

    private func seekButton(_ icon: String, label: String, action: @escaping () -> Void) -> some View {
        Button(action: action) {
            ZStack(alignment: .topLeading) {
                Image(icon).resizable().frame(width: 28, height: 28).offset(x: 2, y: 2)
                Text("10").suit(8, .bold, lineHeight: 10).foregroundStyle(DS.Palette.textPrimary).offset(x: 11, y: 12)
            }
            .frame(width: 32, height: 32, alignment: .topLeading)
        }
        .buttonStyle(PressStyle())
        .accessibilityLabel(label)
    }

    // MARK: 동작

    private func toggle() {
        // 끝까지 간 뒤 재생을 누르면 처음부터 다시 본다(웹과 같다).
        if !playing && pos >= ReplayData.total { pos = 0 }
        playing.toggle()
    }

    private func seek(_ d: Double) {
        pos = min(ReplayData.total, max(0, pos + d))
    }

    /// 재생 중이면 실제 시간만큼(배속을 곱해) 흐른다. 앱이 뒤로 가 있으면 멈춘다.
    private func tick() async {
        guard playing else { return }
        var last = Date()
        while !Task.isCancelled && playing {
            try? await Task.sleep(for: .milliseconds(33))
            let now = Date()
            let dt = min(0.25, now.timeIntervalSince(last))
            last = now
            guard active else { continue }
            pos = min(ReplayData.total, pos + dt * ReplayData.rates[rateIndex])
            if pos >= ReplayData.total { playing = false }
        }
    }
}
