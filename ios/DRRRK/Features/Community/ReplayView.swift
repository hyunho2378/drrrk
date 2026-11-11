import SwiftUI

// 대화 다시보기(재방송). 팀 피그마 2322:12283 "대화 다시보기 (재방송)"(390 x 844, 2026. 11. 11. 의정 "라이브다시보기 화면 추가").
// 웹 ReplayScreen.jsx(61)와 같은 글, 같은 값, 같은 동작이다.
// 글 상세의 대화 다시보기 카드를 누르면 밀어 들어오고(router.push), 왼쪽 위 뒤로를 누르면 글 상세로 돌아간다.
// 2026. 11. 12. 팀이 "자간줄여" 섹션에 두 상태를 나눠 그렸다: 재생 중 2340:30920(btn_일시정지, 두 막대), 일시정지 2351:34663(btn_재생, 원에 둥근 삼각형 구멍). 두 프레임은 버튼만 다르다.
// 동작: 06:12에서 재생 중(2340:30920)으로 시작해 실제 1초에 1초씩 흐른다. 가운데 버튼을 누르면 일시정지(2351:34663)와 재생을 오간다.
// 애니메이션(팀 댓글 "애니메이션"): 진행 바와 손잡이, 시간 글은 TimelineView(.animation)로 화면 그리기마다 기준 시각에서 계산해 끊김 없이 흐르고, 10초 옮김은 180ms 표준 곡선으로 미끄러진다.
// 두 버튼 아이콘은 겹쳐 두고 opacity와 scale(0.9에서 1)을 180ms 표준 곡선으로 바꿔 교차한다(웹 ReplayScreen.jsx와 같은 값).
// 10초 버튼은 시간을 10초 옮기고, 배속 칩은 1.0x, 1.5x, 2.0x 순서로 돌며 흐르는 빠르기를 바꾼다. 12:32에 닿으면 멈춘다.
// 피그마 좌표는 화면 맨 위 기준이고 아래 플레이어 컨트롤은 화면 바닥에서 24 위다(글 상세 입력줄과 같은 기준).

enum ReplayData {
    static let title = "둘이 찍은 사진인데\n지만 보정해서 올린 여우"
    static let seats: [(name: String, image: String, on: Bool)] = [
        ("리클라이너21", "R-replay-seat-1", false),
        ("나무스툴12", "R-replay-seat-2", false),
        // 지금 말하는 자리: 하늘색 테두리(안쪽 2)가 그림에 들어 있다(54 x 54, 피그마 2340:30943 다시 내보냄).
        ("가죽소파19", "R-replay-seat-3", true),
    ]
    static let comments: [(name: String, text: String)] = [
        ("구경하는 스툴3", "가죽소파님 목소리 너무 차분해서 더 슬픔"),
        ("폭신한 방석20", "그 친구 원래 그런 스타일이야?"),
    ]
    /// 글 상세에서 연 글의 제목과 댓글 두 줄(11. 12. 03:13 사용자 지시). 표(CommunityData.scripts)에 없으면 사진보정 원문이다. 웹 ReplayScreen.jsx와 같다.
    static var openedTitle: String { CommunityData.script(for: CommunityData.openedTitle)?.title ?? title }
    static var openedComments: [(name: String, text: String)] { CommunityData.script(for: CommunityData.openedTitle)?.replay ?? comments }
    /// 피그마 "06:12 / 12:32". 진행 바 169 / 342 = 372 / 752.
    static let start: Double = 6 * 60 + 12
    static let total: Double = 12 * 60 + 32
    static let rates: [Double] = [1, 1.5, 2]

    static func mmss(_ s: Double) -> String {
        let v = max(0, Int(s))
        return String(format: "%02d:%02d", v / 60, v % 60)
    }

    /// 표준 곡선 cubic-bezier(0.2, 0, 0, 1)을 푼 값(10초 옮김 미끄러짐에 쓴다).
    static func ease(_ x: Double) -> Double {
        if x <= 0 { return 0 }
        if x >= 1 { return 1 }
        func bz(_ t: Double, _ a: Double, _ b: Double) -> Double { 3 * a * t * (1 - t) * (1 - t) + 3 * b * t * t * (1 - t) + t * t * t }
        var lo = 0.0, hi = 1.0, t = x
        for _ in 0..<24 { t = (lo + hi) / 2; if bz(t, 0.2, 0) < x { lo = t } else { hi = t } }
        return bz(t, 0, 1)
    }
    static let seekGlide: Double = 0.18
    static let iconSwap = Animation.timingCurve(0.2, 0, 0, 1, duration: 0.18)
}

struct ReplayView: View {
    @Environment(Router.self) private var router
    @Environment(\.scenePhase) private var scenePhase
    /// 기준 위치(초)와 그 위치를 정한 시각. 흐르는 중에는 지금 위치 = 기준 위치 + 지난 시간 x 배속.
    @State private var anchorPos = ReplayData.start
    @State private var anchorDate = Date()
    /// 10초 옮김 직전 보이던 위치와 새 위치의 차이(초)와 옮긴 시각. 180ms 동안 0으로 줄어든다.
    @State private var glideGap: Double = 0
    @State private var glideDate = Date()
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
        .task(id: running) { await waitForEnd() }
        .onChange(of: scenePhase) { _, p in
            // 앱이 뒤로 가면 그 순간 위치에 멈추고, 돌아오면 그 위치부터 다시 흐른다.
            reanchor()
            active = (p == .active)
        }
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
            Text(ReplayData.openedTitle).suit(21, .bold, lineHeight: 28.4).foregroundStyle(DS.Palette.textPrimary)
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
            ForEach(ReplayData.openedComments, id: \.name) { c in
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
        TimelineView(.animation(paused: !running && glideGap == 0)) { tl in
            let p = CGFloat(min(1, max(0, shownPos(tl.date) / ReplayData.total)))
            ZStack(alignment: .leading) {
                // 진행 바는 트랙 폭(342) 그대로 두고 둥근 트랙 안에서 왼쪽으로 밀어 낸다(가로 늘이기처럼 끝 모서리가 찌그러지지 않는다).
                Capsule().fill(Color(hex: 0x33383D)).frame(width: barWidth, height: 4)
                    .overlay(alignment: .leading) {
                        Capsule().fill(DS.Palette.brandPrimary).frame(width: barWidth, height: 4)
                            .offset(x: (p - 1) * barWidth)
                    }
                    .clipShape(Capsule())
                Circle().fill(DS.Palette.textPrimary).frame(width: 14, height: 14)
                    .offset(x: p * barWidth - 7)
            }
            .frame(width: barWidth, height: 14, alignment: .leading)
        }
    }

    // MARK: 플레이어 컨트롤 2322:12362: 342 x 66, #222628, 모서리 32, 안쪽 여백 8 14 8 20, 양 끝 정렬

    private var controls: some View {
        HStack(spacing: 0) {
            TimelineView(.animation(paused: !running && glideGap == 0)) { tl in
                (Text(ReplayData.mmss(shownPos(tl.date))).font(.custom(SUITWeight.bold.rawValue, fixedSize: 12)).foregroundColor(DS.Palette.textPrimary)
                    + Text(" / " + ReplayData.mmss(ReplayData.total)).font(.custom(SUITWeight.medium.rawValue, fixedSize: 12)).foregroundColor(DS.Palette.textSecondary))
                    .tracking(SUITTracking.of(12))
            }
            .frame(width: 84, height: 32, alignment: .leading)
            Spacer(minLength: 0)
            HStack(spacing: 12) {
                seekButton("R-icon-back10", label: "10초 뒤로") { seek(-10) }
                Button(action: toggle) {
                    // 두 아이콘을 겹쳐 두고 보이는 쪽만 opacity 1, scale 1. 숨는 쪽은 opacity 0, scale 0.9.
                    ZStack {
                        Image("R-btn-pause").resizable().frame(width: 48, height: 48)
                            .opacity(playing ? 1 : 0).scaleEffect(playing ? 1 : 0.9)
                        Image("R-btn-play").resizable().frame(width: 48, height: 48)
                            .opacity(playing ? 0 : 1).scaleEffect(playing ? 0.9 : 1)
                    }
                    .animation(ReplayData.iconSwap, value: playing)
                }
                .buttonStyle(PressStyle())
                .accessibilityLabel(playing ? "일시정지" : "재생")
                seekButton("R-icon-fwd10", label: "10초 앞으로") { seek(10) }
            }
            Spacer(minLength: 0)
            Button {
                reanchor()
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

    /// 흐르는 중인지(재생 중이고 앱이 앞에 있을 때).
    private var running: Bool { playing && active }

    /// 기준 위치에서 지금 위치를 계산한다(끝 12:32에서 멈춤).
    private func livePos(_ date: Date) -> Double {
        guard running else { return anchorPos }
        return min(ReplayData.total, anchorPos + date.timeIntervalSince(anchorDate) * ReplayData.rates[rateIndex])
    }

    /// 화면에 보이는 위치: 지금 위치에 10초 옮김 미끄러짐 차이를 더한다.
    private func shownPos(_ date: Date) -> Double {
        var v = livePos(date)
        if glideGap != 0 {
            let k = date.timeIntervalSince(glideDate) / ReplayData.seekGlide
            if k < 1 { v += glideGap * (1 - ReplayData.ease(k)) }
        }
        return min(ReplayData.total, max(0, v))
    }

    /// 지금 위치를 새 기준으로 고정한다(재생, 일시정지, 배속, 앱 전환 직전).
    private func reanchor() {
        let now = Date()
        anchorPos = livePos(now)
        anchorDate = now
    }

    private func toggle() {
        reanchor()
        // 끝까지 간 뒤 재생을 누르면 처음부터 다시 본다(웹과 같다).
        if !playing && anchorPos >= ReplayData.total { anchorPos = 0 }
        playing.toggle()
    }

    private func seek(_ d: Double) {
        let now = Date()
        let before = shownPos(now)
        anchorPos = min(ReplayData.total, max(0, livePos(now) + d))
        anchorDate = now
        glideGap = before - anchorPos
        glideDate = now
        Task { @MainActor in
            try? await Task.sleep(for: .milliseconds(Int(ReplayData.seekGlide * 1000) + 20))
            if Date().timeIntervalSince(glideDate) >= ReplayData.seekGlide { glideGap = 0 }
        }
    }

    /// 흐르는 동안 끝(12:32)에 닿는 시각까지 기다렸다가 멈춘다. 배속과 위치가 바뀌면 다시 계산한다.
    private func waitForEnd() async {
        while !Task.isCancelled && running {
            let left = (ReplayData.total - livePos(Date())) / ReplayData.rates[rateIndex]
            if left <= 0 {
                anchorPos = ReplayData.total
                anchorDate = Date()
                playing = false
                return
            }
            try? await Task.sleep(for: .milliseconds(Int(min(left, 0.5) * 1000) + 1))
        }
    }
}
