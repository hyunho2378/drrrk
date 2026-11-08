# DRRRK

이 저장소에는 웹 프로토타입(client)과 iOS 앱(ios) 두 가지가 함께 있다.

## iOS 앱

- 위치: `ios/`
- 스택: SwiftUI, iOS 17 이상, XcodeGen(`ios/project.yml`)
- 실행: `cd ios && xcodegen && open DRRRK.xcodeproj`, 또는 `DEV="iPhone 17" ios/run.sh build home`
- 화면 값(크기, 색, 글자, 아래 탭)은 팀 피그마 값을 그대로 옮겼다. 규칙은 `ios/RULES.md`

## 웹 프로토타입

피그마 화면 47장을 React로 옮기고 화면 사이를 이은 프로토타입이다.

- 사이트: https://hyunho2378.github.io/drrrk/
- 스택: React 18, Vite, JavaScript(JSX), Tailwind CSS, React Router v6
- 배포: main에 올리면 GitHub Actions가 `client`를 빌드해 GitHub Pages에 올린다.

## 폴더

| 경로 | 내용 |
|---|---|
| client/src/figma | 피그마에서 생성한 화면 47장과 컴포넌트. 손으로 고치지 않는다. 피그마를 고친 뒤 다시 생성한다. |
| client/src/app | 화면 연결(flow.js), 화면 전환과 누름 반응. 처음 들어오면 로고 스플래시 뒤 홈(25)부터 시작한다. |
| client/src/tokens.js | 색, 모션, 크기 토큰. 앱 레이어는 이 파일을 거쳐서만 값을 쓴다. |
| client/src/styles | 피그마 변수(DRRRK / Color)에서 만든 CSS 변수와 글자, 효과 스타일 |
| client/public | 그림, 글꼴(SUIT) |

## 실행

```
cd client
npm install
npm run dev
```

## 화면 연결

FLOW.md에 화면마다 누르는 곳과 가는 화면, 전환 종류를 적었다.

## 아이폰에 직접 설치

맥과 Xcode가 있어야 하며, 무료 Apple 계정으로도 된다. 설치한 앱은 7일 뒤 다시 설치해야 열린다.

1. 저장소를 받고 `brew install xcodegen` 뒤 `cd ios && xcodegen generate`를 실행한다.
2. Xcode 설정의 Apple Accounts에서 본인 Apple 계정으로 로그인한다.
3. `ios/Config/Team.local.xcconfig` 파일을 만들고 아래 두 줄을 적는다. 이 파일은 깃에 올라가지 않는다.

```
DEVELOPMENT_TEAM = 본인 팀 ID
PRODUCT_BUNDLE_IDENTIFIER = app.drrrk.ios.본인영문이름
```

4. 팀 ID는 Xcode의 Signing & Capabilities 탭 Team 칸에서 본인 이름을 고르면 확인할 수 있다. 무료 계정은 번들 ID가 사람마다 달라야 해서 끝에 이름을 붙인다.
5. 아이폰을 케이블로 연결하고 `ios/DRRRK.xcodeproj`를 연 뒤 실행 기기에서 아이폰을 골라 실행한다.
6. 아이폰 설정의 개인정보 보호 및 보안에서 개발자 모드를 켜고, 일반의 VPN 및 기기 관리에서 본인 계정을 신뢰로 바꾼다.
