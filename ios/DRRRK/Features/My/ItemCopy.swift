import Foundation

// 아이템 상세 시트 글(최종 드르륵 페이지 "토스트 팝업" 섹션 2340:30205, 시트 9장 390 x 393, 2340:30206 ~ 2340:30350).
// 11. 12. 팀이 시트마다 설명 두 줄과 칩 두 개를 새로 썼다. 글은 피그마 글자 그대로다(마지막처럼 둘째 줄 앞 칸 띄움 포함).
// 웹 client/src/app/itemCopy.js와 글자가 같아야 한다.

struct ItemCopy {
    let name: String
    let lines: [String]
    var chips: [String] = []

    var text: String { lines.joined(separator: "\n") }
}

enum ItemCopyData {
    /// 던지기 쿨타임(초). 방 퀵슬롯(RoomView QuickSlot.cooldownSeconds)과 같은 3초다.
    static let throwCooldownSeconds = 3

    static let byKey: [String: ItemCopy] = [
        "shrimp": ItemCopy(name: "새우깡", lines: ["바삭, 하나만 먹으려다 어느새 봉지 바닥.", "자꾸 손이 가는 소리에 이야기도 술술 풀린다."], chips: ["바삭한수다", "손이가요손이가"]),
        "soju": ItemCopy(name: "마지막처럼", lines: ["한 잔 한 잔, 내일은 없다.", " 마음속에 담아둔 이야기도 편하게 꺼내보자."], chips: ["솔직한수다", "한잔해"]),
        "peanut": ItemCopy(name: "오징어땅콩", lines: ["고소한 땅콩과 짭짤한 오징어를 한입에.", "봉지를 돌려 나누다 보면 어색함도 사라진다."], chips: ["고소한수다", "고소짭짤"]),
        "nogari": ItemCopy(name: "노가리", lines: ["질겅질겅 씹는 동안 말문도 천천히 풀린다.", "짭조름한 한 점이 새벽 대화를 오래 붙잡아준다."], chips: ["느긋한수다", "씹고뜯고"]),
        "drrra": ItemCopy(name: "드르라", lines: ["톡 쏘는 첫 모금에 대화도 산뜻하게 시작된다.", "잔을 기울이며 오늘의 이야기를 천천히 이어가자."], chips: ["상쾌한수다", "캬"]),
        "squid": ItemCopy(name: "오징어", lines: ["몸통부터 다리까지 하나씩 뜯어 먹듯,", "복잡한 이야기도 차근차근 풀어보자."], chips: ["쫄깃한수다", "찢어먹자"]),
        "monster": ItemCopy(name: "몬스타", lines: ["톡 쏘는 한 모금에 잠은 달아나고 기운은 번쩍.", "길어진 밤, 대화는 아직 끝나지 않았다."], chips: ["활기찬수다", "잠이번쩍"]),
        "byeollo": ItemCopy(name: "별로", lines: ["목 넘김은 부드럽게, 기분은 말랑하게.", "천천히 한 잔 기울이며 오늘의 이야기를 나눠보자."], chips: ["부드러운수다", "꼴꼴꼴"]),
    ]

    /// 미획득 시트(2116:28586)는 피그마 그대로: 이름 ???, 설명 ??????(두 줄), 칩 ??? 두 개, 자물쇠.
    static let locked = ItemCopy(name: "???", lines: ["??????", "??????"])
    static let lockedChips = ["???", "???"]

    static func chips(for key: String) -> [String] { copy(for: key).chips }

    static func copy(for key: String) -> ItemCopy {
        byKey[key] ?? byKey["shrimp"]!
    }
}
