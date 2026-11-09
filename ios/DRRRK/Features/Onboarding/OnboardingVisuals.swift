import SwiftUI

// 온보딩 카드 위쪽 Visual(326 x 220, 하늘색 바탕) 일곱 장. 자리와 크기, 색, 글자는 피그마 Visual 트리 값 그대로이고
// 좌표는 모두 부모 기준(Visual 또는 흰 패널) 왼쪽 위에서 잰 값이다. 피그마 회전(반시계 +)은 SwiftUI에서 부호를 바꾸고
// 왼쪽 위 꼭짓점 기준으로 돌린다.

enum OnboardingVisual {
    case together1, together2, together3, together4, together5, solo1, solo2
}

struct OnboardingVisualView: View {
    let kind: OnboardingVisual

    var body: some View {
        Group {
            switch kind {
            case .together1: ObTogetherMatch()
            case .together2: ObTogetherEmoji()
            case .together3: ObTogetherSnack()
            case .together4: ObTogetherSunrise()
            case .together5: ObTogetherReport()
            case .solo1: ObSoloAI()
            case .solo2: ObSoloFound()
            }
        }
        .frame(width: 326, height: 220, alignment: .topLeading)
        .accessibilityHidden(true)
    }
}

// MARK: - 함께 드르륵 1(1829:11174): 고민 알약, 아바타 줄, 글 줄 스켈레톤, 칩

struct ObTogetherMatch: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var on = false
    @State private var taps = [Int](repeating: 0, count: 5)
    /// avatar / 편의점 의자, 나무 스툴, 소파, 바퀴달린 의자, 리클라이너(피그마 그림 해시 원본)
    private let avatars = ["C-4fdd18ce8a29", "C-51be0a544b5f", "C-eab22a7a4d50", "C-40b4fa7cb4ef", "C-ef3d01c18073"]
    private let worry = Array("둘이 찍은 사진인데…")

    var body: some View {
        ZStack(alignment: .topLeading) {
            ObPanel {
                pill.offset(x: 47, y: 18)
                    .obEnter(on, 0.22, dx: -16)
                HStack(spacing: 7) {
                    ForEach(avatars.indices, id: \.self) { i in
                        Button {
                            if !reduceMotion { taps[i] += 1 }
                        } label: {
                            ObAvatar(asset: avatars[i], size: 36, imageDelay: 0.62 + Double(i) * 0.08)
                        }
                        .buttonStyle(PressStyle())
                        .obBounce(taps[i])
                        .obEnter(on, 0.5 + Double(i) * 0.08, scale: 0.6, animation: ObMotion.pop)
                    }
                }
                .offset(x: 11, y: 66)
                ObSkeleton(width: 170, height: 14, radius: 7, shimmerDelay: 1.3)
                    .offset(x: 30, y: 124)
                    .obEnter(on, 0.95, sx: 0, anchor: .leading)
                ObSkeleton(width: 120, height: 14, radius: 7, shimmerDelay: 1.38)
                    .offset(x: 55, y: 148)
                    .obEnter(on, 1.03, sx: 0, anchor: .leading)
            }
            .offset(x: 48, y: 44)
            .obEnter(on, 0, dy: 16)
            ObChip(label: "함께 드르륵", fontSize: 12, dark: true, width: 104, height: 32) {
                ObTiltIcon(asset: "N-ob-icon-home-chair", size: 16, delay: 1.55)
            }
            .offset(x: 194, y: 168)
            .obEnter(on, 1.2, dx: 10, dy: 12)
        }
        .task { on = true }
    }

    /// 고민 알약(137 x 26): "고민" + 글자 단위로 30ms씩 차례로 나타나는 고민 글
    private var pill: some View {
        HStack(spacing: 6) {
            Text("고민").suit(11, .bold).foregroundStyle(DS.Palette.brandPrimary).fixedSize()
            HStack(spacing: 0) {
                ForEach(worry.indices, id: \.self) { i in
                    Text(String(worry[i])).suit(11, .medium).foregroundStyle(DS.Palette.textPrimary)
                        .fixedSize()
                        .obEnter(on, 0.32 + Double(i) * 0.03, dy: 3, animation: ObMotion.text)
                }
            }
        }
        .padding(.leading, 10)
        .frame(width: 137, height: 26, alignment: .leading)
        .background(DS.Palette.bgSurface, in: Capsule())
    }
}

// MARK: - 함께 드르륵 2(1829:11227): 말풍선 스켈레톤, 이모지 메뉴, + 버튼, 날아가는 하트

struct ObTogetherEmoji: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var on = false
    @State private var selected = 1
    @State private var flights: [ObEmojiFlight] = []
    @State private var nextID = 0
    /// emoji 웃음, 하트(선택), 놀람. 메뉴 안 y 4, 34, 65
    private let glyphs = ["N-ob-glyph-smile", "N-ob-glyph-heart", "N-ob-glyph-wow"]
    private let rowY: [CGFloat] = [4, 34, 65]

    var body: some View {
        ZStack(alignment: .topLeading) {
            ObPanel {
                ObSkeleton(width: 120, height: 24, radius: 12, shimmerDelay: 0.7)
                    .offset(x: 72, y: 20)
                    .obEnter(on, 0.2, sx: 0, anchor: .leading)
                ObSkeleton(width: 96, height: 24, radius: 12, shimmerDelay: 0.78)
                    .offset(x: 72, y: 54)
                    .obEnter(on, 0.28, sx: 0, anchor: .leading)
                menu.offset(x: 16, y: 10)
                    .obEnter(on, 0.45, sy: 0.4, anchor: .bottom)
                plusButton.offset(x: 16, y: 114)
                    .obEnter(on, 0.3, scale: 0.6, animation: ObMotion.pop)
                // 하트 날아가는 반응(166, 96, 36 x 36): 선택한 하트 자리에서 날아와 멈춘다.
                Image("N-ob-heart-fly").resizable().frame(width: 30, height: 26)
                    .shadow(color: DS.Palette.bgSurface.opacity(0.14), radius: 6, x: 0, y: 6)
                    .frame(width: 36, height: 36, alignment: .topLeading)
                    .offset(x: 3, y: 6)
                    .offset(x: 166, y: 96)
                    .obEnter(on, 0.95, scale: 0.5, dx: -151, dy: -57, animation: ObMotion.decel(0.5))
                ForEach(flights) { flight in
                    ObFlyingEmoji(glyph: glyphs[flight.emoji])
                        .offset(x: 20, y: 10 + rowY[flight.emoji])
                }
            }
            .offset(x: 48, y: 44)
            .obEnter(on, 0, dy: 16)
        }
        .task {
            on = true
            guard !reduceMotion, await obWait(1.8) else { return }
            fly(selected)
            // 15초마다 한 번씩 이모지 날리기를 다시 보여 준다.
            while await obWait(15) {
                fly(selected)
            }
        }
    }

    /// 플러스 메뉴 이모지(세로) 34 x 96, 검정, 반경 17, 안쪽 선 #222628 0.55
    private var menu: some View {
        ZStack(alignment: .topLeading) {
            ForEach(glyphs.indices, id: \.self) { i in
                Button {
                    selected = i
                    fly(i)
                } label: {
                    emojiChip(i)
                }
                .buttonStyle(PressStyle())
                .offset(x: 4, y: rowY[i])
                .obEnter(on, 0.55 + Double(glyphs.count - 1 - i) * 0.06, dy: 10)
            }
        }
        .frame(width: 34, height: 96, alignment: .topLeading)
        .background {
            RoundedRectangle(cornerRadius: 17).fill(DS.Palette.bgBase)
                .overlay(RoundedRectangle(cornerRadius: 17).strokeBorder(DS.Palette.bgElevated, lineWidth: 0.55))
        }
    }

    private func emojiChip(_ i: Int) -> some View {
        Image(glyphs[i]).resizable().frame(width: 26, height: 26)
            .background(DS.Palette.bgElevated, in: Circle())
            .overlay {
                // 선택 표시(바깥 선 1.5, 하늘색)
                Circle().inset(by: -0.75).stroke(DS.Palette.brandPrimary, lineWidth: 1.5)
                    .opacity(selected == i ? 1 : 0)
                    .animation(reduceMotion ? nil : ObMotion.quick, value: selected)
            }
    }

    /// btn_더보기 34 x 34, 검정 원, plus 24
    private var plusButton: some View {
        Button { fly(selected) } label: {
            Image("N-ob-icon-plus").resizable().frame(width: 24, height: 24)
                .rotationEffect(.degrees(on ? 0 : -90))
                .animation(reduceMotion ? nil : ObMotion.decel(0.5).delay(0.3), value: on)
                .frame(width: 34, height: 34)
                .background(DS.Palette.bgBase, in: Circle())
        }
        .buttonStyle(PressStyle())
    }

    private func fly(_ emoji: Int) {
        guard !reduceMotion else { return }
        nextID += 1
        flights.append(ObEmojiFlight(id: nextID, emoji: emoji))
        if flights.count > 6 { flights.removeFirst(flights.count - 6) }
        let id = nextID
        Task { @MainActor in
            guard await obWait(1.05) else { return }
            flights.removeAll { $0.id == id }
        }
    }
}

struct ObEmojiFlight: Identifiable {
    let id: Int
    let emoji: Int
}

/// 누른 이모지가 위로 날아가며 두 배로 커졌다 사라진다(translate 36, -120, scale 2, 1000ms).
struct ObFlyingEmoji: View {
    let glyph: String
    @State private var flown = false

    var body: some View {
        Image(glyph).resizable().frame(width: 26, height: 26)
            .background(DS.Palette.bgElevated, in: Circle())
            .scaleEffect(flown ? 2 : 1)
            .offset(x: flown ? 36 : 0, y: flown ? -120 : 0)
            .opacity(flown ? 0 : 1)
            .allowsHitTesting(false)
            .onAppear {
                withAnimation(ObMotion.standard(1.0)) { flown = true }
            }
    }
}

// MARK: - 함께 드르륵 3(1829:11275): 테이블, 테이블 위 주전부리, 날아가는 새우깡, 퀵슬롯(펼침)

struct ObTogetherSnack: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var on = false
    @State private var selected = 0
    @State private var thrown: [ObThrow] = []
    @State private var nextID = 0
    /// slot / 새우깡, 소주, 오징어땅콩
    private let slots = ["D-snack-shrimp", "D-snack-soju", "D-snack-peanut"]
    private let slotY: [CGFloat] = [20, 64, 108]
    /// 던진 주전부리가 앉는 테이블 윗면 자리(패널 기준 왼쪽 위)
    private let landing: [CGPoint] = [CGPoint(x: 58, y: 62), CGPoint(x: 84, y: 58), CGPoint(x: 108, y: 64)]

    var body: some View {
        ZStack(alignment: .topLeading) {
            ObPanel(shadow: false) {
                // 테이블(그림자, 받침, 기둥, 두께, 윗면, 윗면 빛을 피그마에서 한 장으로 내보냄), 10, 68, 148 x 102
                Image("N-ob-table").resizable().frame(width: 148, height: 102)
                    .offset(x: 10, y: 68)
                    .obEnter(on, 0.18, dy: 10)
                snack("D-snack-nogari", x: 34, y: 44, w: 34, h: 38, rot: 14, delay: 0.42)
                snack("D-snack-peanut", x: 70, y: 38, w: 32, h: 36, rot: -6, delay: 0.5)
                snack("D-snack-soju", x: 104, y: 32, w: 22, h: 46, rot: -16, delay: 0.58)
                // 날아가는 새우깡(126, 41, 26 x 30, 회전 -24): 퀵슬롯 새우깡 칸에서 포물선으로 날아와 멈춘다.
                Image("D-snack-shrimp").resizable().scaledToFit().frame(width: 26, height: 30)
                    .shadow(color: DS.Palette.bgSurface.opacity(0.18), radius: 4, x: 0, y: 4)
                    .rotationEffect(.degrees(24), anchor: .topLeading)
                    .offset(x: 126, y: 41)
                    .modifier(ObArc(t: on ? 1 : 0, dx: 59, dy: -3, lift: 26))
                    .opacity(on ? 1 : 0)
                    .animation(reduceMotion ? nil : ObMotion.standard(0.5).delay(0.95), value: on)
                ForEach(thrown) { item in
                    ObThrownSnack(item: item)
                }
                quickSlot.offset(x: 178, y: 12)
            }
            .offset(x: 48, y: 44)
            .obEnter(on, 0, dy: 16)
        }
        .task {
            on = true
            guard !reduceMotion, await obWait(2.2) else { return }
            throwSnack(1)
        }
    }

    private func snack(_ asset: String, x: CGFloat, y: CGFloat, w: CGFloat, h: CGFloat, rot: Double, delay: Double) -> some View {
        Image(asset).resizable().scaledToFit().frame(width: w, height: h)
            .rotationEffect(.degrees(-rot), anchor: .topLeading)
            .offset(x: x, y: y)
            .obEnter(on, delay, dy: -10)
    }

    /// 주전부리 퀵슬롯(펼침) 40 x 146: 접기 핸들, 칸 셋. 위에서 아래로 50ms씩 펼쳐진다.
    private var quickSlot: some View {
        ZStack(alignment: .topLeading) {
            RoundedRectangle(cornerRadius: 8).fill(DS.Palette.bgSurface)
                .frame(width: 40, height: 14)
                .overlay(alignment: .topLeading) {
                    RoundedRectangle(cornerRadius: 2).fill(DS.Palette.textPrimary.opacity(0.6))
                        .frame(width: 14, height: 3)
                        .offset(x: 13, y: 6)
                }
                .obEnter(on, 0.3, dy: -6)
            ForEach(slots.indices, id: \.self) { i in
                Button {
                    selected = i
                    throwSnack(i)
                } label: {
                    Image(slots[i]).resizable().scaledToFit().frame(width: 26, height: 26)
                        .frame(width: 38, height: 38)
                        .background(DS.Palette.bgSurface, in: RoundedRectangle(cornerRadius: 12))
                        .overlay {
                            RoundedRectangle(cornerRadius: 12).strokeBorder(DS.Palette.brandPrimary, lineWidth: 2)
                                .opacity(selected == i ? 1 : 0)
                                .animation(reduceMotion ? nil : ObMotion.quick, value: selected)
                        }
                }
                .buttonStyle(PressStyle())
                .offset(x: 1, y: slotY[i])
                .obEnter(on, 0.38 + Double(i) * 0.05, dy: -10)
            }
        }
        .frame(width: 40, height: 146, alignment: .topLeading)
    }

    private func throwSnack(_ slot: Int) {
        guard !reduceMotion else { return }
        nextID += 1
        let to = landing[nextID % landing.count]
        // 칸 그림의 왼쪽 위(패널 기준 178 + 1 + 6, 12 + y + 6)
        let from = CGPoint(x: 185, y: 18 + slotY[slot])
        thrown.append(ObThrow(id: nextID, asset: slots[slot], to: to, dx: from.x - to.x, dy: from.y - to.y))
        if thrown.count > 5 { thrown.removeFirst(thrown.count - 5) }
    }
}

struct ObThrow: Identifiable {
    let id: Int
    let asset: String
    let to: CGPoint
    let dx: CGFloat
    let dy: CGFloat
}

/// 포물선으로 날아가 테이블에 올라앉고, 6초 뒤 서서히 사라진다.
struct ObThrownSnack: View {
    let item: ObThrow
    @State private var landed = false
    @State private var gone = false

    var body: some View {
        Image(item.asset).resizable().scaledToFit().frame(width: 26, height: 26)
            .offset(x: item.to.x, y: item.to.y)
            .modifier(ObArc(t: landed ? 1 : 0, dx: item.dx, dy: item.dy, lift: 40))
            .opacity(gone ? 0 : 1)
            .allowsHitTesting(false)
            .task {
                withAnimation(ObMotion.standard(0.5)) { landed = true }
                guard await obWait(6) else { return }
                withAnimation(ObMotion.standard(0.5)) { gone = true }
            }
    }
}

// MARK: - 함께 드르륵 4(1829:11323): 타이머 알약, 말풍선 스켈레톤 넷, 해가 떴어요 칩

struct ObTogetherSunrise: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var on = false
    @State private var seconds: Double = 1200
    @State private var spin = false
    @State private var sunUp = false
    @State private var round = 0
    private let bubbles: [(x: CGFloat, y: CGFloat, w: CGFloat, alpha: Double)] = [
        (16, 70, 120, 1), (94, 104, 120, 0.7), (16, 138, 96, 0.45), (110, 172, 104, 0.2),
    ]

    var body: some View {
        ZStack(alignment: .topLeading) {
            ObPanel {
                timerPill.offset(x: 44, y: 18)
                    .obEnter(on, 0.2, dy: -8)
                ForEach(bubbles.indices, id: \.self) { i in
                    let b = bubbles[i]
                    ObSkeleton(width: b.w, height: 24, radius: 12, shimmerDelay: 0.7 + Double(i) * 0.08)
                        .opacity(b.alpha)
                        .offset(x: b.x, y: b.y)
                        .obEnter(on, 0.32 + Double(i) * 0.07, dy: 8)
                }
            }
            .offset(x: 48, y: 44)
            .obEnter(on, 0, dy: 16)
            // 칩 해가 떴어요(20, 150, 110 x 34): 00:00이 되면 아래에서 떠오른다.
            ObChip(label: "해가 떴어요", fontSize: 13, dark: false, width: 110, height: 34) {
                Image("N-ob-icon-sun").resizable().frame(width: 18, height: 18)
                    .rotationEffect(.degrees(sunUp ? 0 : -40))
                    .offset(y: sunUp ? 0 : 6)
                    .opacity(sunUp ? 1 : 0)
                    .animation(reduceMotion ? nil : ObMotion.decel(0.5).delay(0.12), value: sunUp)
            }
            .offset(x: 20, y: 150)
            .obEnter(sunUp, 0, dy: 14, animation: ObMotion.decel(0.42))
        }
        .contentShape(Rectangle())
        .onTapGesture { round += 1 }
        .task(id: round) { await play() }
    }

    /// Timer Pill 142 x 32: timer 14, 해 뜨기까지, 시간
    private var timerPill: some View {
        HStack(spacing: 6) {
            Image("N-ob-icon-timer").resizable().frame(width: 14, height: 14)
                .rotationEffect(.degrees(spin ? 360 : 0))
            Text("해 뜨기까지").suit(12, .medium).foregroundStyle(DS.Palette.textPrimary).fixedSize()
            ObClockText(seconds: seconds)
        }
        .padding(.leading, 12)
        .frame(width: 142, height: 32, alignment: .leading)
        .background(DS.Palette.bgSurface, in: RoundedRectangle(cornerRadius: 20))
    }

    /// 20:00에서 00:00까지 2.4초 동안 빠르게 줄고, 그동안 타이머 아이콘이 천천히 한 바퀴 돈다. 00:00에서 해 칩이 떠오른다.
    private func play() async {
        var reset = Transaction()
        reset.disablesAnimations = true
        withTransaction(reset) {
            seconds = 1200
            spin = false
            sunUp = false
        }
        on = true
        if reduceMotion {
            seconds = 0
            sunUp = true
            return
        }
        guard await obWait(round == 0 ? 0.8 : 0.25) else { return }
        withAnimation(ObMotion.standard(2.4)) {
            seconds = 0
            spin = true
        }
        guard await obWait(2.4) else { return }
        sunUp = true
    }
}

/// 시간 글자(SUIT Bold 12, 하늘색). 값이 움직이는 동안 매 순간 mm:ss로 다시 그린다.
struct ObClockText: View, Animatable {
    var seconds: Double

    var animatableData: Double {
        get { seconds }
        set { seconds = newValue }
    }

    var body: some View {
        let s = max(0, Int(seconds.rounded(.up)))
        Text(String(format: "%02d:%02d", s / 60, s % 60))
            .suit(12, .bold)
            .monospacedDigit()
            .foregroundStyle(DS.Palette.brandPrimary)
            .fixedSize()
    }
}

// MARK: - 함께 드르륵 5(1829:11366): 엉따 온도 카드, 단계 1과 2, 베스트 댓글 줄

struct ObTogetherReport: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var on = false
    @State private var progress: Double = 0
    @State private var bump = 0
    /// 피그마 값 39.2°에서 오른 폭 1.1을 뺀 값에서 시작한다.
    private let start = 38.1
    private let end = 39.2

    var body: some View {
        ZStack(alignment: .topLeading) {
            ObPanel {
                tempCard.offset(x: 16, y: 14)
                    .obEnter(on, 0.2, dy: 10)
                step("1", bar: 120).offset(x: 16, y: 104)
                    .obEnter(on, 0.45, dy: 8)
                step("2", bar: 96).offset(x: 16, y: 128)
                    .obEnter(on, 0.53, dy: 8)
                commentRow.offset(x: 16, y: 152)
                    .obEnter(on, 0.65, dy: 10)
            }
            .offset(x: 48, y: 44)
            .obEnter(on, 0, dy: 16)
        }
        .task {
            on = true
            if reduceMotion {
                progress = 1
                return
            }
            guard await obWait(0.5) else { return }
            withAnimation(ObMotion.standard(1.2)) { progress = 1 }
            guard await obWait(1.2) else { return }
            bump += 1
        }
    }

    /// 엉따 온도 카드 198 x 76(#121415 5%, 반경 14)
    private var tempCard: some View {
        ZStack(alignment: .topLeading) {
            Text("오늘 대화로 엉따 온도가").suit(11, .bold, tracking: -0.22)
                .foregroundStyle(DS.Palette.bgSurface).fixedSize()
                .frame(height: 15)
                .offset(x: 8, y: 9)
            HStack(spacing: 0) {
                Text("1.1°C ").suit(11, .bold, tracking: -0.22).foregroundStyle(DS.Palette.brandPrimary).fixedSize()
                    .obBounce(bump, peak: 1.18, up: 0.12, down: 0.16)
                Text("올랐어요").suit(11, .bold, tracking: -0.22).foregroundStyle(DS.Palette.bgSurface).fixedSize()
            }
            .frame(height: 15)
            .offset(x: 8, y: 24)
            Text("엉따 온도").suit(10, .medium, tracking: -0.2)
                .foregroundStyle(DS.Palette.textTertiary).fixedSize()
                .frame(height: 14)
                .offset(x: 14, y: 46)
            ObTempText(value: start + (end - start) * progress)
                .frame(height: 18)
                .offset(x: 152, y: 43)
            RoundedRectangle(cornerRadius: 3).fill(DS.Palette.textSecondary.opacity(0.28))
                .frame(width: 170, height: 6)
                .offset(x: 14, y: 62)
            ObBarFill(width: 122 * progress)
                .offset(x: 14, y: 62)
        }
        .frame(width: 198, height: 76, alignment: .topLeading)
        .background(DS.Palette.bgSurface.opacity(0.05), in: RoundedRectangle(cornerRadius: 14))
    }

    /// 단계: 번호 원 18(하늘색) + 막대(높이 10, 반경 5)
    private func step(_ number: String, bar: CGFloat) -> some View {
        HStack(spacing: 8) {
            Text(number).suit(11, .bold).foregroundStyle(DS.Palette.textPrimary)
                .frame(width: 18, height: 18)
                .background(DS.Palette.brandPrimary, in: Circle())
            ObSkeleton(width: bar, height: 10, radius: 5, shimmerDelay: 1.0)
        }
    }

    /// 베스트 댓글 줄 198 x 56: avatar / sofa 32, 막대 1(100 x 10), 막대 2(64 x 8)
    private var commentRow: some View {
        ZStack(alignment: .topLeading) {
            ObAvatar(asset: "C-eab22a7a4d50", size: 32, imageDelay: 0.85)
                .offset(x: 12, y: 12)
            ObSkeleton(width: 100, height: 10, radius: 5, shimmerDelay: 1.1)
                .offset(x: 56, y: 16)
            ObSkeleton(width: 64, height: 8, radius: 4, shimmerDelay: 1.18)
                .offset(x: 56, y: 32)
        }
        .frame(width: 198, height: 56, alignment: .topLeading)
        .background(DS.Palette.bgSurface.opacity(0.05), in: RoundedRectangle(cornerRadius: 14))
    }
}

/// 엉따 온도 값(SUIT Bold 13, 하늘색). 오르는 동안 소수 한 자리로 다시 그린다.
struct ObTempText: View, Animatable {
    var value: Double

    var animatableData: Double {
        get { value }
        set { value = newValue }
    }

    var body: some View {
        Text(String(format: "%.1f°", value))
            .suit(13, .bold, tracking: -0.26)
            .monospacedDigit()
            .foregroundStyle(DS.Palette.brandPrimary)
            .fixedSize()
    }
}

/// 온도 막대(하늘색, 높이 6, 반경 3). 왼쪽에서 오른쪽으로 찬다.
struct ObBarFill: View, Animatable {
    var width: CGFloat

    var animatableData: CGFloat {
        get { width }
        set { width = newValue }
    }

    var body: some View {
        RoundedRectangle(cornerRadius: 3).fill(DS.Palette.brandPrimary)
            .frame(width: max(0, width), height: 6)
            .opacity(width > 0.5 ? 1 : 0)
    }
}

// MARK: - 혼자 드르륵 1(1647:22976): AI 드르륵 의자 이름, AI 말풍선, 내 말풍선, 스켈레톤, 기다리는 중 칩

struct ObSoloAI: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var on = false
    @State private var typing = true
    @State private var typed = 0
    @State private var pulse = false
    private let aiLine = Array("많이 당황했겠다. 지금은 좀 어때?")

    var body: some View {
        ZStack(alignment: .topLeading) {
            ObPanel {
                Text("AI 드르륵 의자").suit(11, .medium, tracking: -0.44)
                    .foregroundStyle(DS.Palette.textTertiary).fixedSize()
                    .frame(height: 15.4)
                    .offset(x: 16, y: 18)
                    .obEnter(on, 0.2, dy: 4)
                aiBubble.offset(x: 16, y: 41)
                    .obEnter(on, 0.3, dy: 8, sx: 0.96, sy: 0.96, anchor: .topLeading)
                Text("원래부터 걔가 나한테 좀…").suit(12, .medium, tracking: -0.48)
                    .foregroundStyle(DS.Palette.bgSurface).fixedSize()
                    .padding(.horizontal, 12)
                    .frame(width: 141, height: 37, alignment: .leading)
                    .background(DS.Palette.brandPrimary, in: RoundedRectangle(cornerRadius: 14))
                    .offset(x: 73, y: 86)
                    .obEnter(on, 0.5, dx: 12)
                ObSkeleton(width: 120, height: 24, radius: 12, shimmerDelay: 1.0)
                    .offset(x: 16, y: 131)
                    .obEnter(on, 0.62, sx: 0, anchor: .leading)
            }
            .offset(x: 48, y: 44)
            .obEnter(on, 0, dy: 16)
            ObChip(label: "의자 꺼내두고 기다리는 중", fontSize: 13, dark: false, width: 182, height: 32, labelPulse: pulse) {
                Image("N-ob-icon-clock").resizable().frame(width: 16, height: 16)
            }
            .offset(x: 16, y: 172)
            .obEnter(on, 0.75, dy: 12)
        }
        .task {
            on = true
            if reduceMotion {
                typing = false
                typed = aiLine.count
                return
            }
            guard await obWait(0.3 + 1.2) else { return }
            typing = false
            pulse = true
            for i in 1 ... aiLine.count {
                typed = i
                guard await obWait(0.035) else { return }
            }
        }
    }

    /// AI 말풍선 173 x 37: 스켈레톤 줄이 반짝이다가 1.2초 뒤 글이 타자처럼 나타난다(화면 규칙상 점 모양은 쓰지 않는다, 웹과 같음). 칸 크기는 처음부터 고정한다.
    private var aiBubble: some View {
        ZStack(alignment: .leading) {
            (Text(String(aiLine.prefix(typed))).foregroundStyle(DS.Palette.textPrimary)
                + Text(String(aiLine.dropFirst(typed))).foregroundStyle(Color.clear))
                .suit(12, .medium, tracking: -0.48)
                .fixedSize()
            ObSkeleton(width: 104, height: 12, radius: 6, shimmerDelay: 0)
                .opacity(typing ? 1 : 0)
                .animation(ObMotion.quick, value: typing)
        }
        .padding(.horizontal, 12)
        .frame(width: 173, height: 37, alignment: .leading)
        .background(DS.Palette.bgSurface, in: RoundedRectangle(cornerRadius: 14))
    }
}

// MARK: - 혼자 드르륵 2(1647:23028): 스켈레톤, 발견 알림(아이콘, 글, 버튼 둘)

struct ObSoloFound: View {
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @State private var on = false
    @State private var pulse = 0

    var body: some View {
        ZStack(alignment: .topLeading) {
            ObPanel {
                ObSkeleton(width: 150, height: 20, radius: 10, shimmerDelay: 0.6)
                    .offset(x: 40, y: 18)
                    .obEnter(on, 0.15, sx: 0, anchor: .leading)
                alert.offset(x: 18, y: 48)
                    .obEnter(on, 0.25, scale: 0.92, animation: ObMotion.decel(0.4))
            }
            .offset(x: 48, y: 44)
            .obEnter(on, 0, dy: 16)
        }
        .task {
            on = true
            guard !reduceMotion, await obWait(1.2) else { return }
            // 하늘색 버튼은 1.8초마다 한 번 살짝 커진다.
            while await obWait(1.8) {
                pulse += 1
            }
        }
    }

    /// 발견 알림 194 x 140(#121415, 반경 16)
    private var alert: some View {
        ZStack(alignment: .topLeading) {
            Image("N-ob-icon-home-chair-18").resizable().frame(width: 18, height: 18)
                .frame(width: 34, height: 34)
                .background(DS.Palette.brandSubtle, in: Circle())
                .offset(x: 80, y: 14)
                .obEnter(on, 0.38, scale: 0.5, animation: ObMotion.pop)
            Text("비슷한 고민의 사람들을\n발견했어요!").suit(12, .bold, tracking: -0.48, lineHeight: 16.8)
                .multilineTextAlignment(.center)
                .foregroundStyle(DS.Palette.textPrimary)
                .fixedSize()
                .frame(width: 194, height: 34)
                .offset(x: 0, y: 56)
                .obEnter(on, 0.5, dy: 4)
            HStack(spacing: 6) {
                Button {} label: {
                    Text("마저 얘기하기").suit(10, .bold, tracking: -0.4).foregroundStyle(DS.Palette.textPrimary)
                        .fixedSize()
                        .frame(width: 75, height: 28)
                        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 14))
                }
                .buttonStyle(PressStyle())
                .obEnter(on, 0.62, dy: 8)
                Button {} label: {
                    Text("함께 드르륵 앉기").suit(10, .bold, tracking: -0.4).foregroundStyle(DS.Palette.bgSurface)
                        .fixedSize()
                        .frame(width: 85, height: 28)
                        .background(DS.Palette.brandPrimary, in: RoundedRectangle(cornerRadius: 14))
                }
                .buttonStyle(PressStyle())
                .obBounce(pulse, peak: 1.03, up: 0.18, down: 0.24)
                .obEnter(on, 0.71, dy: 8)
            }
            .offset(x: 14, y: 98)
        }
        .frame(width: 194, height: 140, alignment: .topLeading)
        .background(DS.Palette.bgSurface, in: RoundedRectangle(cornerRadius: 16))
    }
}
