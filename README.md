# DRRRK

피그마 화면 47장을 React로 옮기고 화면 사이를 이은 프로토타입이다.

- 사이트: https://hyunho2378.github.io/drrrk/
- 스택: React 18, Vite, JavaScript(JSX), Tailwind CSS, React Router v6
- 배포: main에 올리면 GitHub Actions가 `client`를 빌드해 GitHub Pages에 올린다.

## 폴더

| 경로 | 내용 |
|---|---|
| client/src/figma | 피그마에서 생성한 화면 47장과 컴포넌트. 손으로 고치지 않는다. 피그마를 고친 뒤 다시 생성한다. |
| client/src/app | 화면 목록, 화면 연결(flow.js), 화면 전환과 누름 반응 |
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
