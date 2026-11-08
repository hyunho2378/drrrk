#!/bin/zsh
# 사용: ios/run.sh <빌드폴더 이름> [화면 이름]  예) ios/run.sh build_main room
# 프로젝트를 다시 만들고 시뮬레이터용으로 빌드한 뒤, 화면 이름이 있으면 그 화면으로 바로 띄워 /tmp/drrrk_<화면>.png로 찍는다.
cd "$(dirname "$0")"
OUT=${1:-build}
ROUTE=${2:-}
DEV="${DEV:-iPhone 17}"
xcodegen generate -q || exit 1
xcodebuild -project DRRRK.xcodeproj -scheme DRRRK -destination "platform=iOS Simulator,name=$DEV" -derivedDataPath "$OUT" CODE_SIGNING_ALLOWED=NO build > "/tmp/xb_$OUT.log" 2>&1
CODE=$?
grep -E "error:" "/tmp/xb_$OUT.log" | sort -u | head -20
echo "BUILD_EXIT=$CODE"
echo "BUILD_EXIT=$CODE" > "/tmp/xb_$OUT.done"
[ $CODE -ne 0 ] && exit $CODE
xcrun simctl boot "$DEV" 2>/dev/null
xcrun simctl install "$DEV" "$OUT/Build/Products/Debug-iphonesimulator/DRRRK.app"
if [ -n "$ROUTE" ]; then
  xcrun simctl terminate "$DEV" app.drrrk.ios 2>/dev/null
  xcrun simctl launch "$DEV" app.drrrk.ios -route "$ROUTE" >/dev/null
  sleep ${WAIT:-4}
  xcrun simctl io "$DEV" screenshot "/tmp/drrrk_${OUT}_$ROUTE.png" >/dev/null 2>&1 && echo "SHOT=/tmp/drrrk_${OUT}_$ROUTE.png"
fi
