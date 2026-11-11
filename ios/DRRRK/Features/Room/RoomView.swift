import SwiftUI

/// 피그마 화면(390 x 844) 좌표를 지금 기기 화면 좌표로 바꾼다. 배경 장면은 화면을 꽉 채우게(cover) 놓이므로
/// 장면 위에 얹는 것(의자 이름표, 테이블, 떨어진 주전부리)은 같은 비율과 같은 가운데 기준으로 옮긴다.
struct SceneMap {
    let size: CGSize
    var scale: CGFloat {
        max(size.width / 390, size.height / 844)
    }

    var dx: CGFloat {
        (size.width - 390 * scale) / 2
    }

    var dy: CGFloat {
        (size.height - 844 * scale) / 2
    }

    func point(_ x: CGFloat, _ y: CGFloat) -> CGPoint {
        CGPoint(x: dx + x * scale, y: dy + y * scale)
    }

    func rect(_ r: CGRect) -> CGRect {
        CGRect(origin: point(r.minX, r.minY), size: CGSize(width: r.width * scale, height: r.height * scale))
    }
}

/// 화면 위쪽 안전 영역 높이(상태 막대). 방 화면들은 머리말을 이 아래에 둔다.
func roomTopInset() -> CGFloat {
    (UIApplication.shared.connectedScenes.first as? UIWindowScene)?.windows.first?.safeAreaInsets.top ?? 47
}

struct RoomView: View {
    /// 시뮬레이터 확인용(onboardingTogether 라우트): 이미 본 적이 있어도 온보딩을 다시 띄운다.
    var forceOnboarding = false
    @Environment(Router.self) private var router
    @State private var model = RoomModel.field()
    @State private var showOnboarding: Bool

    init(forceOnboarding: Bool = false) {
        self.forceOnboarding = forceOnboarding
        _showOnboarding = State(initialValue: forceOnboarding || !OnboardingSeen.together)
    }

    @State private var emojiOpen = false
    @State private var flying: [FlyingEmoji] = []
    @State private var lastMinute = false
    /// 해뜨기 영상(SunriseVideo.swift). 방에 들어오면 만들어 미리 받고, 해 뜨는 단계(lastMinute)가 시작되면 한 번 재생한다.
    @State private var sunrise: SunrisePlayer?
    /// 방 입장 영상(RoomEnterVideo.swift). 이 방이 처음 나타날 때만 만들어 한 번 재생한다. 일반 모드에서 돌아와도 다시 재생하지 않는다.
    @State private var entry: RoomEnterPlayer?
    /// 끌고 있는 주전부리. 손을 떼거나 화면이 바뀌어 끌기가 취소되면 저절로 비워진다(예전 @State는 취소되면 남아 끄는 그림과 테이블 빛이 멈춰 있었다).
    @GestureState private var drag: SnackDrag?
    @Namespace private var dockSpace

    var body: some View {
        GeometryReader { geo in
            let map = SceneMap(size: geo.size)
            ZStack(alignment: .topLeading) {
                // 바닥 그림 하나(11. 11. "이미지 자체를 교체"). 입장 영상을 틀 동안은 영상 첫 장면 그림, 그 밖에는 이야기별 장면
                // (쌍밍아웃 room-scene 2096:22172, 사진보정 E-room-scene-new 2100:24130과 같은 그림)이다. 방이 보이는 첫 순간부터 이 자리에 맞는 그림이 있다.
                // 입장 영상이 끝나면 영상 아래에서 바로 장면 그림으로 바뀌고(같은 구도), 그 위에서 영상이 0.12초 동안 옅어진다.
                backdrop
                    .resizable()
                    .scaledToFill()
                    .frame(width: geo.size.width, height: geo.size.height)
                    .clipped()

                // 해 뜨는 단계: 바닥 그림이 밤 장면에서 해뜨기 영상 첫 장면 그림(같은 구도)으로 0.12초 동안 바뀐다. 영상은 같은 자리에서 첫 장면부터 이어서 흐른다.
                if let sunrise, sunrise.active, let poster = sunrise.poster {
                    Image(uiImage: poster)
                        .resizable()
                        .scaledToFill()
                        .frame(width: geo.size.width, height: geo.size.height)
                        .clipped()
                        .transition(.opacity)
                }

                // 방 입장 영상: 바닥의 첫 장면 그림과 같은 자리. 끝나면 바닥이 같은 구도의 장면 그림으로 바뀌고 영상이 0.12초 동안 옅어진다.
                if let entry, entry.player != nil, entry.visible {
                    RoomEnterVideoView(entry: entry)
                        .frame(width: geo.size.width, height: geo.size.height)
                        .allowsHitTesting(false)
                        .transition(.opacity)
                }

                // 해뜨기 영상: 바닥의 첫 장면 그림과 같은 자리, 이름표와 채팅 아래. 해 뜨는 단계 전에는 보이지 않는다.
                if let sunrise, sunrise.player != nil {
                    SunriseVideoView(sunrise: sunrise)
                        .frame(width: geo.size.width, height: geo.size.height)
                        .opacity(sunrise.active ? 1 : 0)
                        .allowsHitTesting(false)
                }

                sceneLayer(map)

                // 피그마 chat fade: 아래 334 높이, 검정 0에서 65% 지점에 100%
                LinearGradient(stops: [.init(color: .black.opacity(0), location: 0), .init(color: .black, location: 0.65)], startPoint: .top, endPoint: .bottom)
                    .frame(height: 334)
                    .frame(maxHeight: .infinity, alignment: .bottom)
                    .allowsHitTesting(false)

                chrome(map)

                if let d = drag {
                    Image(d.asset).resizable().scaledToFit()
                        .frame(width: 40, height: 40)
                        .position(d.at)
                        .allowsHitTesting(false)
                }
            }
            .coordinateSpace(name: "room")
        }
        .ignoresSafeArea()
        .background(DS.Palette.bgBase)
        .overlay { RoomToastLayer().ignoresSafeArea() }
        // 함께 드르륵 온보딩: 추천에서 방에 처음 들어오면 이 방 위에 어둡게 깔고 다섯 장을 띄운다. 닫으면 방이 그대로 이어진다.
        .overlay {
            if showOnboarding {
                OnboardingOverlay(pages: OnboardingPages.together) {
                    withAnimation(DS.Motion.emphasizedAccel) { showOnboarding = false }
                }
                .transition(.opacity)
            }
        }
        .onAppear {
            OnboardingSeen.together = true
            // 함께 드르륵을 한 판 한 뒤에는 홈이 빈 홈이 된다(Router.clipDone, 웹 live.js resolveTo setClipDone).
            router.clipDone = true
        }
        // 대사 녹음(RoomVoice): 방에 들어오면 파일을 미리 열고, 내 말풍선이 새로 나타나면 같은 대사를 낸다. 방을 나가면 멈춘다.
        // 채팅 줄(RoomChat): 새 방이면 비운 채 시작하고, 일반 모드에서 돌아오면 이미 나온 줄이 남는다. 녹음도 같은 방이면 한 번 난 말풍선에 다시 나지 않는다.
        .onAppear {
            if showOnboarding { model.pauseClock() }
            let fresh = RoomChat.shared.enter(model)
            RoomVoice.shared.enter(covered: showOnboarding, fresh: fresh)
            RoomVoice.shared.show(mineTexts)
        }
        .onAppear {
            // 해뜨기 영상을 미리 받는다. 일반 모드에서 돌아왔고 영상이 도중이면 이어 재생한다.
            if sunrise == nil { sunrise = SunrisePlayer(story: model.story) }
            // 방 입장 영상: 이 방이 처음 나타날 때만 만든다. 온보딩 덮개가 떠 있으면 첫 장면에 세워 두고 닫히면 재생한다.
            if entry == nil {
                let e = RoomEnterPlayer(story: model.story)
                entry = e
                if !showOnboarding { e.start() }
            }
            else if let s = sunrise, s.startedAt != nil, s.endedAt == nil { s.player?.play() }
        }
        .onDisappear {
            sunrise?.stop()
            entry?.stop()
            RoomVoice.shared.leave()
            // 방을 나갔을 때만(현장 모드 방이 길에서 빠졌을 때) 채팅을 닫는다. 일반 모드로 넘어갈 때는 이어 간다.
            if !router.path.contains(.room), !router.path.contains(.onboardingTogether) { RoomChat.shared.leave() }
        }
        // 온보딩 덮개가 떠 있는 동안은 채팅 시계가 멈추고, 닫히면 0.8초 뒤 첫 줄부터 달린다.
        .task(id: showOnboarding) {
            guard !showOnboarding else { return }
            await RoomChat.shared.run { model.stageEntries.count }
        }
        .onChange(of: showOnboarding) { _, up in RoomVoice.shared.setCovered(up) }
        .onChange(of: showOnboarding) { _, up in if !up { entry?.start() } }
        // 온보딩 덮개가 떠 있는 동안 방 시계를 멈추고, 닫히면 멈춘 자리부터 흐른다.
        .onChange(of: showOnboarding) { _, up in if up { model.pauseClock() } else { model.resumeClock() } }
        // 해 뜨는 단계가 시작되면 입장 영상은 멈추고 뺀다(해뜨기 영상과 겹치지 않게). 웹은 40번 화면이 붙을 때 같은 일을 한다.
        .onChange(of: lastMinute) { _, on in if on { entry?.stop() } }
        .onChange(of: mineTexts) { _, texts in RoomVoice.shared.show(texts) }
        .task { await rotateSpeakers() }
        .task { await watchClock() }
        .task(id: showOnboarding) {
            // 온보딩을 닫은 뒤 7초가 지나면 이야기가 무르익은 장면(1979:27515)으로 넘어간다.
            guard !showOnboarding, model.stage == 0 else { return }
            try? await Task.sleep(for: .seconds(7))
            guard !Task.isCancelled else { return }
            withAnimation(DS.Motion.emphasizedDecel) { model.stage = 1 }
        }
        .onChange(of: drag?.over ?? false) { _, over in
            if over { UISelectionFeedbackGenerator().selectionChanged() }
        }
        .toolbar(.hidden, for: .navigationBar)
    }

    // MARK: 바닥 그림

    /// 지금 바닥에 깔 그림. entry가 아직 없는 첫 그리기(onAppear 전)에도 입장 영상을 틀 방이면 영상 첫 장면 그림이다.
    /// 입장 영상이 끝나거나 멈추면(일반 모드로 감, 해 뜨는 단계, 재생 실패) 장면 그림이다.
    private var backdrop: Image {
        if let entry {
            if entry.visible, let img = entry.poster { return Image(uiImage: img) }
            return Image(model.content.scene)
        }
        if RoomEnterPlayer.canPlay(story: model.story), let img = RoomEnterPlayer.poster(for: model.story) { return Image(uiImage: img) }
        return Image(model.content.scene)
    }

    // MARK: 장면 위에 얹는 것

    @ViewBuilder
    private func sceneLayer(_ map: SceneMap) -> some View {
        let table = map.rect(model.dropRect)
        let overTable = drag?.over ?? false
        Ellipse()
            .fill(DS.Palette.success.opacity(0.16))
            .overlay(Ellipse().strokeBorder(DS.Palette.success, lineWidth: 2))
            .frame(width: table.width - 20, height: table.height - 70)
            .position(x: table.midX, y: table.minY + 30 + (table.height - 70) / 2)
            .opacity(overTable ? 1 : 0)
            .animation(DS.Motion.stateIn, value: overTable)
            .allowsHitTesting(false)

        ForEach(model.landed) { item in
            let p = map.point(item.point.x, item.point.y)
            // 피그마 1979:27497: 테이블에 놓인 주전부리 24 x 24
            LandedSnack(asset: item.asset, angle: item.angle, size: 24)
                .position(p)
                .transition(.identity)
        }

        ForEach(model.seats) { seat in
            let speaking = seat.name == model.speaker
            // 이름 글자 상자의 가운데를 피그마 좌표에 맞춘다. 초록 점과 파동은 글자 밖에 겹쳐 그린다.
            let p = map.point(seat.x, seat.y)
            // 의자 이름을 누르면 미니 프로필이 방 위에 겹쳐 뜬다(피그마 1972:22293 "이름 칩 (탭하면 미니 프로필)").
            Button { router.present(.miniProfile) } label: {
                SeatLabel(name: seat.name, speaking: speaking)
                    .fixedSize()
                    .padding(8)
                    .contentShape(Rectangle())
            }
            .buttonStyle(PressStyle())
            .position(p)
            .animation(.timingCurve(0.2, 0, 0, 1, duration: 0.2), value: model.speaker)
            .accessibilityLabel(seat.name + " 프로필")
        }
    }

    // MARK: 화면 틀(머리말, 고민 배너, 퀵슬롯, 채팅, 입력줄)

    private func chrome(_ map: SceneMap) -> some View {
        VStack(spacing: 0) {
            Color.clear.frame(height: max(roomTopInset(), 47))
            // 나가기: 웹 flow.js(29에서 25, 라이브에서 앉은 방은 10)와 같게 그 탭의 첫 화면으로 돌아간다(11/11 흐름 변경, 홈이면 빈 홈).
            RoomHeader(model: model, lastMinute: lastMinute, onBack: { router.popToRoot() }, onToggle: { router.push(.roomNormal) })
                .frame(height: 56)
            TopicBanner(model: model)
                .padding(.horizontal, 24)
                .padding(.top, 5)
                // 퀵슬롯은 고민 배너 아래 28에 붙어 배너를 펼치면 함께 내려간다(피그마 접힘 y 192, 펼침 2096:22269와 2100:24227 y 296).
                // 세로 줄의 자리는 차지하지 않는다. 예전에는 세로 줄 안에 있어 배너를 펼치면 퀵슬롯이 채팅과 입력줄을 밀어내 화면 밖으로 넘치며 겹쳤다.
                // 이름표 줄(장면 위)은 그대로 있고, 퀵슬롯은 채팅보다 위에 그린다(피그마 순서: 장면, 이름표, 채팅, 배너, 퀵슬롯).
                .overlay(alignment: .bottomTrailing) {
                    dock(map)
                        .padding(.trailing, 24)
                        .alignmentGuide(.bottom) { d in d[.top] - 28 }
                }
                .zIndex(1)
            Spacer(minLength: 0)
            ChatColumn(model: model)
                .padding(.horizontal, 24)
                .overlay(alignment: .bottomLeading) {
                    if emojiOpen {
                        EmojiMenu { pick in sendEmoji(pick) }
                            .padding(.leading, 24)
                            .padding(.bottom, -14)
                            .transition(.asymmetric(insertion: .opacity.combined(with: .scale(scale: 0.86, anchor: .bottomLeading)).combined(with: .offset(y: 18)), removal: .opacity.combined(with: .offset(y: 8))))
                    }
                }
                .overlay {
                    ForEach(flying) { e in FlyingEmojiView(item: e) }
                }
            RoomInputBar(emojiOpen: $emojiOpen) { t in
                withAnimation(DS.Motion.emphasizedDecel) { model.send(t) }
            }
                .padding(.horizontal, 24)
                .padding(.top, 20)
                .padding(.bottom, 24)
        }
    }

    @ViewBuilder
    private func dock(_ map: SceneMap) -> some View {
        if model.dockOpen {
            VStack(spacing: 6) {
                Button {
                    withAnimation(DS.Motion.emphasizedAccel) { model.dockOpen = false }
                } label: {
                    DockHandle()
                }
                .buttonStyle(.plain)
                .accessibilityLabel("퀵슬롯 접기")
                .padding(.bottom, 2)

                // 쉬는 칸이 있는 동안만 시계를 돌려 덮개를 줄이고, 끝나는 시각이 지나면 그 칸이 다시 살아난다. 덮개는 던진 칸에만 붙는다.
                TimelineView(.animation(minimumInterval: 1.0 / 30, paused: !model.anyCooling)) { ctx in
                    VStack(spacing: 6) {
                        ForEach(model.snacks) { snack in
                            let mine = model.isCooling(snack.id, at: ctx.date)
                            SnackSlot(snack: snack, selected: mine, cooldown: mine ? model.cooldownLeft(snack.id, at: ctx.date) : 0)
                                .opacity(drag?.id == snack.id ? 0.45 : 1)
                                .matchedGeometryEffect(id: snack.id, in: dockSpace, isSource: model.dockOpen)
                                .onTapGesture { tapSlot(snack) }
                                .gesture(throwGesture(snack, map))
                                .accessibilityLabel(snack.name)
                        }
                    }
                }
            }
            .transition(.asymmetric(insertion: .opacity.combined(with: .scale(scale: 0.9, anchor: .top)), removal: .opacity))
        } else {
            Button {
                withAnimation(DS.Motion.emphasizedDecel) { model.dockOpen = true }
            } label: {
                CollapsedDock(snacks: model.pillSnacks, ns: dockSpace)
            }
            .buttonStyle(.plain)
            .accessibilityLabel("퀵슬롯 열기")
            .transition(.opacity)
        }
    }

    /// 칸을 끌지 않고 누르기만 하면 웹과 같은 안내를 띄운다(웹 tokens.js live.throwHintText, throwEmptyText).
    private func tapSlot(_ snack: RoomModel.Snack) {
        if snack.count == 0 {
            RoomToastCenter.shared.show("남은 주전부리가 없어요")
        } else if !model.isCooling(snack.id) {
            RoomToastCenter.shared.show("가운데 테이블로 끌어서 던져요")
        }
    }

    /// 지금 채팅 칸에 보이는 내 말풍선 글(대사 녹음 짝 찾기용).
    private var mineTexts: [String] {
        model.visibleEntries.compactMap { if case let .mine(t) = $0 { t } else { nil } }
    }

    private func throwGesture(_ snack: RoomModel.Snack, _ map: SceneMap) -> some Gesture {
        DragGesture(minimumDistance: 6, coordinateSpace: .named("room"))
            .updating($drag) { v, state, _ in
                // 개수가 0이거나 그 칸이 쉬는 중이면 끌리지 않는다(다른 칸은 그대로 끌린다).
                guard model.canThrow(snack) else { return }
                if state == nil {
                    UIImpactFeedbackGenerator(style: .light).impactOccurred()
                }
                state = SnackDrag(id: snack.id, asset: snack.asset, at: v.location, over: map.rect(model.dropRect).contains(v.location))
            }
            .onEnded { v in
                guard model.canThrow(snack), map.rect(model.dropRect).contains(v.location) else { return }
                withAnimation(DS.Motion.decel(0.62)) {
                    if let item = model.throwSnack(snack.id) {
                        UIImpactFeedbackGenerator(style: .medium).impactOccurred()
                        // 안내 글은 던진 주전부리 이름을 말한다(예: 새우깡을 테이블에 올렸어요, SoundFiles.throwDoneText).
                        RoomToastCenter.shared.show(SoundFiles.throwDoneText(snack.id))
                        // 여러 개를 연달아 던지면 안내 글은 쌓이지 않고 가장 나중 글로 바뀌며 2.4초를 다시 센다(RoomToastCenter).
                        // 착지하는 순간(날아가는 0.62초, 웹 throwFlyMs와 같은 값) 그 주전부리의 녹음 파일을 낸다.
                        // 아이템마다 통로가 따로라 먼저 던진 다른 주전부리 소리를 끊지 않고 겹쳐 난다.
                        let soundKey = snack.id
                        Task {
                            try? await Task.sleep(for: .seconds(0.62))
                            FileSound.shared.play(soundKey, channel: SoundFiles.channel(soundKey))
                        }
                        Task {
                            // 서서히 사라지는 움직임은 LandedSnack이 맡고, 다 사라진 뒤 목록에서만 지운다.
                            try? await Task.sleep(for: .seconds(LandedSnack.stay))
                            model.removeLanded(item.id)
                        }
                    }
                }
            }
    }

    private func sendEmoji(_ asset: String) {
        UIImpactFeedbackGenerator(style: .light).impactOccurred()
        let item = FlyingEmoji(asset: asset)
        flying.append(item)
        withAnimation(DS.Motion.emphasizedAccel) { emojiOpen = false }
        Task {
            try? await Task.sleep(for: .seconds(1.1))
            flying.removeAll { $0.id == item.id }
        }
    }

    /// 해 뜨기 1분(화면 시계) 전에는 시계가 빨개지고 안내가 한 줄 뜬다. 0이 되면 아침 화면으로 넘어간다.
    private func watchClock() async {
        // 방에 들어온 직후와 앞 단계 직후 3초는 다음 단계로 넘기지 않는다(방 구경에서 이어받은 시계가 이미 짧을 때, RoomClockHandoff).
        var stepAt = model.enteredAt
        var zeroAt: Date?
        if lastMinute, sunrise?.startedAt == nil { sunrise?.start() }
        while !Task.isCancelled {
            let left = model.remaining(at: .now)
            let ready = Date.now.timeIntervalSince(stepAt) >= RoomClockHandoff.graceSeconds
            if left <= RoomModel.lastMinuteShown, !lastMinute, ready {
                withAnimation(DS.Motion.emphasizedDecel) {
                    lastMinute = true
                    model.stage = 2
                }
                // 해 뜨는 단계가 시작되는 순간 해뜨기 영상을 처음부터 재생한다. 01:12에서 0까지 실제 5.4초라 영상 5.17초와 맞는다.
                sunrise?.start()
                stepAt = .now
            }
            if left <= 0, zeroAt == nil { zeroAt = .now }
            // 해가 뜨면(시계 0) 영상 마지막 장면(해 뜬 아침)에 3초 머문 뒤 종료 리포트(피그마 2096:22857, 2100:24606)로 간다.
            // 예전 해 뜬 순간 화면(웹 35, 3초 뒤 종료)의 역할을 영상 마지막 장면이 한다. 영상이 늦게 시작했으면 끝나고 3초 뒤까지 기다린다. 웹 tokens.js live.rooms.B와 sunriseHolding과 같다.
            if let zeroAt, lastMinute, Date.now.timeIntervalSince(stepAt) >= RoomClockHandoff.graceSeconds,
               Date.now.timeIntervalSince(zeroAt) >= SunrisePlayer.holdSeconds, sunrise?.holding() != true {
                // 방 시간이 끝났다: 받아쓰기와 마이크를 바로 놓는다(웹 dictation.js room-end).
                Dictation.shared.end()
                router.push(.roomEnd)
                return
            }
            try? await Task.sleep(for: .seconds(0.25))
        }
    }

    private func rotateSpeakers() async {
        try? await Task.sleep(for: .seconds(1.6))
        while !Task.isCancelled {
            // 말하는 이름표가 바뀔 때 글자 색(회색에서 흰색), 초록 점, 파동이 0.2초 표준 곡선으로 같은 이름표에서 함께 바뀐다(웹 room.js 200ms).
            withAnimation(.timingCurve(0.2, 0, 0, 1, duration: 0.2)) { model.nextSpeaker() }
            try? await Task.sleep(for: .seconds(.random(in: 2.2 ... 4.6)))
        }
    }
}

/// 끌고 있는 주전부리(손가락 자리와 테이블 위인지)
struct SnackDrag: Equatable {
    let id: String
    let asset: String
    let at: CGPoint
    let over: Bool
}

// MARK: - 부품

/// 장면 속 의자 이름표(피그마 1979:27517). 글자만 자리를 차지하고, 말하는 중에는 글자 왼쪽 4 떨어진 곳에 초록 점 7,
/// 글자 가운데 위(글자 위 끝에서 16 위)에 파동 31 x 20이 붙는다.
private struct SeatLabel: View {
    let name: String
    let speaking: Bool
    var body: some View {
        Text(name)
            .suit(speaking ? 12 : 11, speaking ? .bold : .medium, tracking: speaking ? -0.48 : -0.44)
            .foregroundStyle(speaking ? DS.Palette.textPrimary : DS.Palette.textPrimary.opacity(0.5))
            .overlay(alignment: .leading) {
                Circle().fill(DS.Palette.success).frame(width: 7, height: 7)
                    .offset(x: -11)
                    .opacity(speaking ? 1 : 0)
            }
            .overlay(alignment: .top) {
                VoiceWave()
                    .offset(y: -36)
                    .opacity(speaking ? 1 : 0)
            }
    }
}

private struct VoiceWave: View {
    @State private var phase = false
    private let heights: [CGFloat] = [8, 14, 20, 14, 8]
    var body: some View {
        HStack(spacing: 4) {
            ForEach(heights.indices, id: \.self) { i in
                RoundedRectangle(cornerRadius: 2)
                    .fill(DS.Palette.success)
                    .frame(width: 3, height: heights[i])
                    .scaleEffect(y: phase ? [0.45, 1.25, 0.7, 1.1, 0.6][i] : 1, anchor: .center)
                    .animation(.easeInOut(duration: 0.62 + Double(i) * 0.11).repeatForever(autoreverses: true), value: phase)
            }
        }
        .frame(height: 20)
        .onAppear { phase = true }
    }
}

/// 테이블에 떨어진 주전부리. 6초 머무는 동안 마지막 1.2초는 투명해지며 0.9배로 작아진다(웹 throw.js와 같은 값).
struct LandedSnack: View {
    let asset: String
    let angle: Double
    var size: CGFloat = 40
    static let stay: Double = 6
    static let fade: Double = 1.2
    @State private var landed = false
    @State private var fading = false
    var body: some View {
        Image(asset).resizable().scaledToFit()
            .frame(width: size, height: size)
            .rotationEffect(.degrees(landed ? angle : -16))
            .scaleEffect(landed ? (fading ? 0.9 : 1) : 1.15)
            .offset(y: landed ? 0 : -60)
            .opacity(fading ? 0 : 1)
            .onAppear { withAnimation(DS.Motion.decel(0.62)) { landed = true } }
            .task {
                try? await Task.sleep(for: .seconds(Self.stay - Self.fade))
                guard !Task.isCancelled else { return }
                withAnimation(.easeOut(duration: Self.fade)) { fading = true }
            }
    }
}

/// 펼친 퀵슬롯 맨 위 접기 손잡이(피그마 "접기 핸들" 44 x 20, 검정 45%, 모서리 10)
struct DockHandle: View {
    var body: some View {
        RoundedRectangle(cornerRadius: 2).fill(.white.opacity(0.6)).frame(width: 16, height: 3)
            .frame(width: 44, height: 20)
            .background(.black.opacity(0.45), in: RoundedRectangle(cornerRadius: 10))
            .contentShape(Rectangle())
    }
}

/// 퀵슬롯 한 칸(피그마 "slot" 44 x 44, 검정 45%, 흰 12% 1px 테두리, 모서리 12, 그림 32).
/// 혼자 방(1647:24874)에서는 남은 개수 배지와, 막 던진 칸의 하늘색 2px 테두리와 쿨타임 덮개가 붙는다.
struct SnackSlot: View {
    let snack: RoomModel.Snack
    var showCount = false
    var selected = false
    /// 남은 쿨타임 비율(1에서 0으로 줄어든다)
    var cooldown: Double = 0
    var body: some View {
        Image(snack.asset).resizable().scaledToFit()
            .frame(width: 32, height: 32)
            .frame(width: 44, height: 44)
            .background(.black.opacity(0.45), in: RoundedRectangle(cornerRadius: DS.Radius.chip))
            .overlay {
                if selected {
                    PieSlice(progress: cooldown, minimum: 0)
                        .fill(.black.opacity(0.6))
                        .frame(width: 70.4, height: 70.4)
                        .frame(width: 44, height: 44)
                        .clipShape(RoundedRectangle(cornerRadius: DS.Radius.chip))
                        .allowsHitTesting(false)
                }
            }
            .overlay(
                RoundedRectangle(cornerRadius: DS.Radius.chip)
                    .strokeBorder(selected ? DS.Palette.brandPrimary : .white.opacity(0.12), lineWidth: selected ? 2 : 1)
            )
            .overlay(alignment: .topLeading) {
                if showCount {
                    Text("\(snack.count)").suit(12, .bold, lineHeight: 16).foregroundStyle(DS.Palette.textPrimary)
                        .monospacedDigit()
                        .contentTransition(.numericText(countsDown: true))
                        .padding(.horizontal, 5)
                        .frame(minWidth: 20, minHeight: 18)
                        .background(DS.Palette.bgSurface, in: RoundedRectangle(cornerRadius: 8))
                        .overlay(RoundedRectangle(cornerRadius: 8).strokeBorder(.white.opacity(0.2), lineWidth: 1))
                        .offset(x: 28, y: 30)
                }
            }
            .opacity(snack.count > 0 ? 1 : 0.4)
    }
}

struct CollapsedDock: View {
    let snacks: [RoomModel.Snack]
    let ns: Namespace.ID
    var body: some View {
        VStack(spacing: -10) {
            ForEach(snacks) { snack in
                Image(snack.asset).resizable().scaledToFit()
                    .frame(width: 20, height: 20)
                    .frame(width: 28, height: 28)
                    .background(DS.Palette.bgElevated, in: Circle())
                    .overlay(Circle().strokeBorder(.black, lineWidth: 2))
                    .matchedGeometryEffect(id: snack.id, in: ns, isSource: false)
            }
        }
        // 피그마 "퀵슬롯 · 접힘" 42 x 82, 안쪽 8 / 6, 칸 28이 10씩 겹친다.
        .padding(.vertical, 9)
        .padding(.horizontal, 7)
        .background(.black.opacity(0.45), in: RoundedRectangle(cornerRadius: 20))
        .overlay(RoundedRectangle(cornerRadius: 20).strokeBorder(.white.opacity(0.12), lineWidth: 1))
    }
}

struct RoomHeader: View {
    let model: RoomModel
    var lastMinute = false
    var onBack: () -> Void = {}
    var onToggle: () -> Void = {}
    var body: some View {
        HStack {
            Button(action: onBack) {
                Image("icon-chevron-left").renderingMode(.template).resizable()
                    .foregroundStyle(DS.Palette.textPrimary)
                    .frame(width: 24, height: 24)
                    .frame(width: 44, height: 44, alignment: .leading)
                    .contentShape(Rectangle())
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel("나가기")
            Spacer()
            TimelineView(.periodic(from: .now, by: 0.25)) { ctx in
                HStack(spacing: 8) {
                    SunClock(progress: 1 - model.remaining(at: ctx.date) / RoomModel.shownSeconds)
                        .frame(width: 16, height: 16)
                    Text("해 뜨기까지").suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textPrimary)
                    Text(model.clockText(at: ctx.date)).suit(12, .bold, tracking: -0.48).monospacedDigit()
                        .foregroundStyle(lastMinute ? DS.Palette.danger : DS.Palette.brandPrimary)
                        .contentTransition(.numericText(countsDown: true))
                }
                .padding(.leading, 12).padding(.trailing, 16)
                .frame(height: 32)
                // 피그마 1979:27584(평소 #222628)와 2009:12512(1분 전: 빨강 18% 바탕, 빨강 1 안쪽 선)
                .background(lastMinute ? DS.Palette.danger.opacity(0.18) : DS.Palette.bgElevated, in: Capsule())
                .overlay(Capsule().strokeBorder(DS.Palette.danger, lineWidth: 1).opacity(lastMinute ? 1 : 0))
            }
            Spacer()
            Button(action: onToggle) {
                Image("icon-view-grid").renderingMode(.template).resizable()
                    .foregroundStyle(DS.Palette.textPrimary)
                    .frame(width: 16, height: 16)
                    .frame(width: 46, height: 32)
                    .background(DS.Palette.bgOverlay.opacity(0.6), in: Capsule())
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel("일반 모드로 보기")
        }
        // 피그마 Header: 뒤로 아이콘 x 24, 모드 토글 오른쪽 끝 24
        .padding(.leading, 24).padding(.trailing, 24)
    }
}

/// 해 뜨기 시계 아이콘: 지난 시간만큼 원이 채워진다.
private struct SunClock: View {
    let progress: Double
    var body: some View {
        ZStack {
            Circle().strokeBorder(DS.Palette.brandPrimary, lineWidth: 1.5)
            PieSlice(progress: progress).fill(DS.Palette.brandPrimary).padding(3)
        }
    }
}

struct PieSlice: Shape {
    var progress: Double
    var minimum: Double = 0.08
    var animatableData: Double {
        get { progress } set { progress = newValue }
    }

    func path(in rect: CGRect) -> Path {
        var p = Path()
        let c = CGPoint(x: rect.midX, y: rect.midY)
        p.move(to: c)
        p.addArc(center: c, radius: rect.width / 2, startAngle: .degrees(-90), endAngle: .degrees(-90 + 360 * max(minimum, progress)), clockwise: false)
        p.closeSubpath()
        return p
    }
}

struct TopicBanner: View {
    @Bindable var model: RoomModel
    // 본문 행간 140%(11. 10. 피그마 댓글 1884:11435 "행간 140%", 답글 "같은 컴포넌트인 것들 다 반영"). 웹 roomConcern.js와 같은 값이다.
    // SUIT 14 한 줄의 자연 높이는 17.472(글꼴 파일 ascent 13.832 + descent 3.640, leading 0을 CoreText로 쟸 값)이다.
    // SwiftUI lineSpacing은 줄 사이에만 더해지므로 줄 사이 19.6 - 17.472 = 2.128을 두고, 첫 줄 위와 끝 줄 아래에 반씩(1.064)을 더해 피그마 줄 상자와 같게 한다.
    // 피그마 1884:11599 본문 글 상자는 3줄에 60(58.8 + 1.2)이라 끝에 1.2를 더 둔다. 펼친 박스는 3줄 153, 2줄 133.4이다.
    private static let bodyLine: CGFloat = 19.6
    private static let naturalLine: CGFloat = 17.472
    private static var halfLeading: CGFloat { (bodyLine - naturalLine) / 2 }
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            if model.bannerOpen {
                // 라벨 줄 높이 18(피그마 "top" 310 x 18, 화살표는 가운데 y 15)
                HStack {
                    HStack(spacing: 8) {
                        Text("고민").suit(11, .bold, tracking: -0.44).foregroundStyle(DS.Palette.brandPrimary)
                        // 피그마 1979:27707 "나 "는 SemiBold 흰색, "의 고민"은 Medium #9AA1A6
                        (Text("나 ").font(.custom(SUITWeight.semibold.rawValue, size: 12)).foregroundColor(.white)
                            + Text("의 고민").font(.custom(SUITWeight.medium.rawValue, size: 12)).foregroundColor(DS.Palette.textSecondary))
                            .tracking(-0.48)
                    }
                    Spacer()
                    Image("icon-chevron-up").renderingMode(.template).resizable()
                        .foregroundStyle(DS.Palette.textPrimary).frame(width: 16, height: 16)
                }
                .frame(height: 18)
                Text(model.topicBody)
                    .font(.custom(SUITWeight.medium.rawValue, fixedSize: 14))
                    .tracking(-0.56)
                    .lineSpacing(Self.bodyLine - Self.naturalLine)
                    .padding(.top, Self.halfLeading)
                    .padding(.bottom, Self.halfLeading + 1.2)
                    .foregroundStyle(DS.Palette.textPrimary)
                    .fixedSize(horizontal: false, vertical: true)
                    .transition(.opacity.combined(with: .offset(y: -6)))
                // AI 맥락 줄 높이 25(키워드 칩: 위아래 4 + 글 상자 17, 피그마 1884:11599 "AI 맥락")
                HStack(spacing: 6) {
                    Text("AI가 읽은 맥락").suit(11, .medium, tracking: -0.44).foregroundStyle(DS.Palette.textTertiary)
                    ForEach(model.topicTags, id: \.self) { tag in
                        Text(tag).suit(11, .bold, tracking: -0.44).foregroundStyle(DS.Palette.brandPrimary)
                            .frame(height: 17)
                            .padding(.horizontal, 9).padding(.vertical, 4)
                            .background(DS.Palette.brandSubtle, in: RoundedRectangle(cornerRadius: 11))
                    }
                }
                .transition(.opacity.combined(with: .offset(y: -6)))
            } else {
                HStack(spacing: 8) {
                    Text("고민").suit(12, .bold, tracking: -0.48).foregroundStyle(DS.Palette.brandPrimary)
                    // 접힌 한 줄도 행간 140%(피그마 1884:11512). 피그마 글 상자는 높이 17, 위 11.5, 위 맞춤이라 19.6 줄 상자의 글자가
                    // 가운데 정렬보다 1.3 아래에 놓인다(웹 roomConcern.js styleBannerLine과 같은 자리).
                    // 글 폭은 피그마 2340:21460과 같은 261(x 67에서 328, 화살표까지 8)이다. 예전 Spacer는 HStack 간격 8이 한 번 더 붙어
                    // 글 폭이 253으로 줄어 긴 카드 제목의 말줄임 자리가 웹보다 앞에 왔다. 남는 폭을 글이 차지하게 해 간격을 8 하나로 둔다.
                    Text(model.topicShort).suit(14, .medium, tracking: -0.56)
                        .foregroundStyle(DS.Palette.textPrimary).lineLimit(1).truncationMode(.tail)
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .offset(y: (Self.bodyLine - 17) / 2)
                    Image("icon-chevron-down").renderingMode(.template).resizable()
                        .foregroundStyle(DS.Palette.textPrimary).frame(width: 16, height: 16)
                }
                // 접힌 박스 높이 40(위아래 여백 10 + 줄 20, 피그마 1884:11512)
                .frame(height: 20)
            }
        }
        .padding(.horizontal, model.bannerOpen ? 16 : 14)
        .padding(.top, model.bannerOpen ? 14 : 10)
        .padding(.bottom, model.bannerOpen ? 12 : 10)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(DS.Palette.bgOverlay.opacity(0.6), in: RoundedRectangle(cornerRadius: model.bannerOpen ? 18 : 16))
        .contentShape(Rectangle())
        .onTapGesture {
            withAnimation(model.bannerOpen ? DS.Motion.emphasizedAccel : DS.Motion.banner) { model.bannerOpen.toggle() }
        }
        .accessibilityAddTraits(.isButton)
    }
}

/// 현장 모드 채팅 칸(피그마 1979:27515, 1979:27708, 1979:27780). 줄 사이 8, 이름과 말풍선 사이 4.
private struct ChatColumn: View {
    let model: RoomModel
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    /// 줄이 아래에서 8 올라오며 옛게 나타난다(RoomChat). 줄인 움직임을 켜면 옛게만 나타난다.
    private var rise: AnyTransition {
        reduceMotion ? .opacity : .opacity.combined(with: .offset(y: RoomChat.rise))
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            ForEach(model.visibleEntries) { entry in
                switch entry {
                case let .other(line):
                    VStack(alignment: .leading, spacing: 4) {
                        Text(line.name).suit(12, .medium, tracking: -0.48).foregroundStyle(DS.Palette.textPrimary.opacity(0.5))
                        Text(line.text).suit(14, .medium, tracking: -0.56).foregroundStyle(DS.Palette.textPrimary)
                            .padding(.horizontal, 12).padding(.vertical, 8)
                            .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.bubble))
                    }
                    .opacity(line.opacity)
                    .transition(rise)
                case let .mine(text), let .sent(_, text):
                    Text(text).suit(14, .medium, tracking: -0.56).foregroundStyle(.black)
                        .padding(.horizontal, 12).padding(.vertical, 8)
                        .background(DS.Palette.brandPrimary, in: RoundedRectangle(cornerRadius: DS.Radius.bubble))
                        .frame(maxWidth: .infinity, alignment: .trailing)
                        .transition(rise)
                case let .system(text):
                    SystemLine(text: text)
                        .transition(rise)
                }
            }
        }
        // 줄이 한두 줄뿐이라 폭이 좁을 때 가운데로 모이지 않고 피그마처럼 왼쪽 끝(24)에 붙게 한다(11/11 시뮬레이터 확인).
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

struct RoomInputBar: View {
    @Binding var emojiOpen: Bool
    /// 보내기(키보드 보내기 키). 빈 글은 보내지 않는다.
    var onSend: (String) -> Void = { _ in }
    @State private var text = ""
    @FocusState private var typing: Bool
    @Environment(\.scenePhase) private var scenePhase
    @Environment(Router.self) private var router
    /// 마이크 버튼 모양. 꺼짐(빨강)은 사용자가 끄거나 앱이 숨겨지거나 말이 없어 놓았을 때만이다. 처음은 웹 첫 상태처럼 초록이고 듣지는 않는다.
    /// 상태는 Dictation.shared 하나가 들고 있어서 현장 모드와 일반 모드 입력줄이 같은 마이크를 본다.
    private var micOn: Bool { !Dictation.shared.muted }
    /// 받아쓰기(Dictation.swift)가 이 입력칸에 마지막으로 쓴 글. 입력칸 글이 이것과 다르면 사용자가 직접 친 글이다.
    @State private var dictText = ""
    @State private var dictID = UUID()
    var body: some View {
        HStack(spacing: 8) {
            Button {
                withAnimation(emojiOpen ? DS.Motion.emphasizedAccel : DS.Motion.decel(0.42)) { emojiOpen.toggle() }
            } label: {
                // 피그마 btn_더보기: 닫힘은 검정 원에 #F8F8F8 플러스, 열림(속성 1=닫기, 2096:22594)은 #F8F8F8 원에 검정 X 24
                ZStack {
                    Circle().fill(.black)
                    Circle().fill(DS.Palette.textPrimary).opacity(emojiOpen ? 1 : 0)
                    Image("icon-plus").renderingMode(.template).foregroundStyle(DS.Palette.textPrimary)
                        .rotationEffect(.degrees(emojiOpen ? 90 : 0))
                        .opacity(emojiOpen ? 0 : 1)
                    Image("C-close").renderingMode(.template).resizable()
                        .foregroundStyle(.black)
                        .frame(width: 24, height: 24)
                        .rotationEffect(.degrees(emojiOpen ? 0 : -90))
                        .opacity(emojiOpen ? 1 : 0)
                }
                .frame(width: 48, height: 48)
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel(emojiOpen ? "이모지 닫기" : "이모지 열기")
            TextField("", text: $text, prompt: Text("채팅으로 한마디...").foregroundStyle(DS.Palette.textSecondary))
                .suit(16, .regular, tracking: -0.64)
                .foregroundStyle(DS.Palette.textPrimary)
                .focused($typing)
                .submitLabel(.send)
                .onSubmit(send)
                .frame(height: 48)
            Button {
                // 누르면 그때 권한을 묻고 듣는다. 다시 누르면 마이크를 완전히 놓는다(웹 room.js 와 같은 안내 글).
                var on = false
                withAnimation(DS.Motion.stateIn) { on = Dictation.shared.toggleMic() }
                RoomToastCenter.shared.show(on ? Dictation.micOnText : Dictation.micMutedText)
                UIImpactFeedbackGenerator(style: .light).impactOccurred()
            } label: {
                // 피그마 1979:27492: 끈 상태도 검정 아이콘, 바탕만 빨강
                Image(micOn ? "icon-mic" : "icon-mic-off").renderingMode(.template)
                    .foregroundStyle(.black)
                    .frame(width: 48, height: 48)
                    .background(micOn ? DS.Palette.success : DS.Palette.danger, in: Circle())
            }
            .buttonStyle(PressStyle())
            .accessibilityLabel(micOn ? "마이크 끄기" : "마이크 켜기")
        }
        .padding(8)
        .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: DS.Radius.input))
        // 받아쓰기: 마이크가 켜져 있으면 말한 글이 입력칸에 채워지고 1초 뒤 이 입력줄의 보내기로 내 말풍선이 된다.
        .onAppear {
            Dictation.shared.attach(dictID) { sentence in sendDictated(sentence) }
            Dictation.shared.setCovered(router.modal != nil)
            RoomVoice.shared.setMic(on: micOn)
        }
        .onDisappear { Dictation.shared.detach(dictID) }
        // 대사 녹음(RoomVoice)은 버튼이 꺼짐(빨강)일 때 멈춘다. 말 없음과 숨김으로 꺼질 때도 따른다.
        .onChange(of: micOn) { _, on in RoomVoice.shared.setMic(on: on) }
        // 방 위 창(미니프로필, 신고, 차단)이 떠 있으면 받아쓰기만 잠시 멈춘다.
        .onChange(of: router.modal) { _, m in Dictation.shared.setCovered(m != nil) }
        // 앱이 뒤로 가거나 가려지면 바로 마이크를 놓는다. 돌아와도 저절로 켜지지 않는다.
        .onChange(of: scenePhase) { _, phase in Dictation.shared.scene(phase) }
        .onChange(of: Dictation.shared.partial) { _, p in showDictated(p) }
        .onChange(of: text) { _, t in
            guard t != dictText else { return }
            // 사용자가 직접 쳤다. 칸을 비우면 기다리던 받아쓴 글을 다시 쓴다.
            dictText = ""
            if t.isEmpty, !Dictation.shared.partial.isEmpty {
                showDictated(Dictation.shared.partial)
                Dictation.shared.rearm()
            }
        }
    }

    /// 사용자가 직접 친 글이 칸에 있는지.
    private var userTyping: Bool { !text.isEmpty && dictText.isEmpty }

    private func showDictated(_ p: String) {
        guard !userTyping else { return }
        dictText = p
        text = p
    }

    private func sendDictated(_ sentence: String) -> Bool {
        guard !userTyping else { return false }
        dictText = sentence
        text = sentence
        send(focus: false)
        dictText = ""
        return true
    }

    private func send() { send(focus: true) }

    /// 받아쓰기로 보낼 때는 키보드를 올리지 않는다(focus false). 나머지는 키보드 보내기와 같다.
    private func send(focus: Bool) {
        let t = text.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !t.isEmpty else { return }
        UIImpactFeedbackGenerator(style: .light).impactOccurred()
        onSend(t)
        text = ""
        if focus { typing = true }
    }
}

// MARK: - 방 안내 글(토스트)
// 웹 room.js toast와 같은 모양: 342 폭, 안쪽 12 / 16, 모서리 12, #222628, 글자 14 SemiBold 행간 20,
// 입력줄 위 18에 아래에서 8 올라오며 나타나고 2.4초 뒤 옅어진다. 신고 시트처럼 방 위 창이 닫힌 뒤에도 방에 남는다.

@Observable
final class RoomToastCenter {
    static let shared = RoomToastCenter()
    var text: String?
    private var serial = 0

    func show(_ message: String) {
        serial += 1
        let mine = serial
        withAnimation(DS.Motion.decel(0.25)) { text = message }
        Task { @MainActor in
            try? await Task.sleep(for: .seconds(2.4))
            guard mine == self.serial else { return }
            withAnimation(DS.Motion.stateIn) { self.text = nil }
        }
    }
}

struct RoomToastLayer: View {
    @State private var center = RoomToastCenter.shared
    /// 화면 바닥에서 토스트 아래 끝까지(입력줄 아래 여백 24 + 입력줄 64 + 사이 18)
    var bottom: CGFloat = 106
    var body: some View {
        VStack {
            Spacer()
            if let t = center.text {
                Text(t).suit(14, .semibold, tracking: -0.28, lineHeight: 20)
                    .foregroundStyle(DS.Palette.textPrimary)
                    .multilineTextAlignment(.center)
                    .padding(.vertical, 12).padding(.horizontal, 16)
                    .frame(width: 342)
                    .background(DS.Palette.bgElevated, in: RoundedRectangle(cornerRadius: 12))
                    .shadow(color: .black.opacity(0.32), radius: 8, y: 6)
                    .padding(.bottom, bottom)
                    .transition(.opacity.combined(with: .offset(y: 8)))
                    .accessibilityAddTraits(.isStaticText)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .allowsHitTesting(false)
    }
}

#Preview {
    RoomView().environment(Router())
}

// MARK: - 이모지 메뉴(피그마 2096:22600 "플러스 메뉴 · 이모지" 62 x 230: 검정 바탕, #222628 1 안쪽 선, 모서리 30, 안쪽 7,
// 칸 48 원 #222628 투명도 80%, 사이 8, 얼굴 24. 고른 칸은 투명도 100%에 초록 #2EE59D 2 안쪽 선.)

struct FlyingEmoji: Identifiable {
    let id = UUID()
    let asset: String
}

struct EmojiMenu: View {
    let onPick: (String) -> Void
    /// 피그마 칸 이름과 얼굴 컴포넌트 순서 그대로(웃김 sob, 토닥 laugh, 응원 angry, 공감 thinking)
    static let items: [(asset: String, label: String)] = [
        ("Q-emoji-sob", "웃김"),
        ("Q-emoji-laugh", "토닥"),
        ("Q-emoji-angry", "응원"),
        ("Q-emoji-thinking", "공감"),
    ]
    @State private var shown = false
    @State private var picked: String?
    var body: some View {
        VStack(spacing: 8) {
            ForEach(Array(Self.items.enumerated()), id: \.offset) { i, item in
                let on = picked == item.asset
                Button { pick(item.asset) } label: {
                    Image(item.asset).resizable().scaledToFit()
                        .frame(width: 24, height: 24)
                        .frame(width: 48, height: 48)
                        .background(DS.Palette.bgElevated, in: Circle())
                        .overlay(Circle().strokeBorder(DS.Palette.success, lineWidth: 2).opacity(on ? 1 : 0))
                        .opacity(on ? 1 : 0.8)
                        .animation(DS.Motion.stateIn, value: on)
                }
                .buttonStyle(PressStyle())
                .disabled(picked != nil)
                .opacity(shown ? 1 : 0)
                .offset(y: shown ? 0 : 14)
                .scaleEffect(shown ? 1 : 0.9)
                // 아래 칸부터 60ms 간격으로 올라온다.
                .animation(DS.Motion.decel(0.34).delay(0.08 + Double(Self.items.count - 1 - i) * 0.06), value: shown)
                .accessibilityLabel(item.label)
            }
        }
        .padding(7)
        .background(.black, in: RoundedRectangle(cornerRadius: 30))
        .overlay(RoundedRectangle(cornerRadius: 30).strokeBorder(DS.Palette.bgElevated, lineWidth: 1))
        .onAppear { shown = true }
    }

    /// 고른 칸에 선택 표시가 잠깐 보인 뒤 얼굴이 날아가고 메뉴가 닫힌다.
    private func pick(_ asset: String) {
        picked = asset
        Task {
            try? await Task.sleep(for: .seconds(0.16))
            onPick(asset)
        }
    }
}

struct FlyingEmojiView: View {
    let item: FlyingEmoji
    @State private var go = false
    var body: some View {
        Image(item.asset).resizable().scaledToFit()
            .frame(width: 24, height: 24)
            .scaleEffect(go ? 2.4 : 1)
            .offset(x: go ? 52 : 0, y: go ? -190 : 0)
            .opacity(go ? 0 : 1)
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottomLeading)
            .padding(.leading, 36)
            .allowsHitTesting(false)
            .onAppear { withAnimation(DS.Motion.decel(1.0)) { go = true } }
    }
}

/// 카카오톡 관리자 메시지처럼 가운데 한 줄로 뜨는 시스템 안내(피그마 2009:12527 "System / 1분 전" 116 x 28,
/// 안내 아이콘 16, 사이 6, 안쪽 6 / 12, 모서리 14, #0A0B0C 60%).
struct SystemLine: View {
    let text: String
    var body: some View {
        HStack(spacing: 6) {
            Image("E-icon-information").renderingMode(.template).resizable()
                .foregroundStyle(DS.Palette.textPrimary)
                .frame(width: 16, height: 16)
            Text(text).suit(12, .medium, tracking: -0.48)
                .foregroundStyle(DS.Palette.textPrimary)
        }
        .padding(.horizontal, 12).padding(.vertical, 6)
        .background(DS.Palette.bgOverlay.opacity(0.6), in: RoundedRectangle(cornerRadius: 14))
        .frame(maxWidth: .infinity)
    }
}

/// 혼자 방 퀵슬롯(피그마 1647:25199 접힘, 1647:24874 펼침). 펼치면 칸마다 남은 개수가 붙고,
/// 칸을 누르면 그 주전부리가 장면 속 테이블로 떨어진 뒤 3초(RoomModel.throwCooldownSeconds) 동안 하늘색 테두리와 어두운 덮개가 줄어든다.
/// 쉬는 상태는 모델(칸별 coolingUntil)에 있어 퀵슬롯을 접었다 펴도 이어지고, 끝나는 시각이 지나면 개수가 남은 칸은 반드시 다시 눌린다. 쉬는 동안 그 칸만 막힌다.
struct SoloQuickSlot: View {
    @Bindable var model: RoomModel
    let onThrow: (RoomModel.Snack) -> Void
    @Namespace private var ns

    static var cooldownSeconds: Double {
        RoomModel.throwCooldownSeconds
    }

    var body: some View {
        if model.dockOpen {
            VStack(spacing: 6) {
                Button {
                    withAnimation(DS.Motion.emphasizedAccel) { model.dockOpen = false }
                } label: {
                    DockHandle()
                }
                .buttonStyle(.plain)
                .accessibilityLabel("퀵슬롯 접기")
                .padding(.bottom, 2)
                TimelineView(.animation(minimumInterval: 1.0 / 30, paused: !model.anyCooling)) { ctx in
                    VStack(spacing: 6) {
                        ForEach(model.snacks) { snack in
                            let mine = model.isCooling(snack.id, at: ctx.date)
                            Button { tap(snack) } label: {
                                SnackSlot(snack: snack, showCount: true, selected: mine, cooldown: mine ? model.cooldownLeft(snack.id, at: ctx.date) : 0)
                            }
                            .buttonStyle(RoomPressStyle())
                            .disabled(snack.count == 0 || mine)
                            .matchedGeometryEffect(id: snack.id, in: ns, isSource: model.dockOpen)
                            .accessibilityLabel("\(snack.name) \(snack.count)개")
                        }
                    }
                }
            }
            .transition(.asymmetric(insertion: .opacity.combined(with: .scale(scale: 0.9, anchor: .top)), removal: .opacity))
        } else {
            Button {
                withAnimation(DS.Motion.emphasizedDecel) { model.dockOpen = true }
            } label: {
                CollapsedDock(snacks: model.pillSnacks, ns: ns)
            }
            .buttonStyle(.plain)
            .accessibilityLabel("퀵슬롯 열기")
            .transition(.opacity)
        }
    }

    private func tap(_ snack: RoomModel.Snack) {
        guard model.canThrow(snack) else { return }
        // 던지기와 쉬는 시간 시작은 model.throwSnack 한 곳에서 한다.
        onThrow(snack)
    }
}
