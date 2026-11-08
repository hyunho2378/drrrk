import Observation
import SwiftUI

/// 의자 꾸미기에서 고른 의자(종류와 스타일)를 앱 어디서든 내 의자로 쓴다. 웹 client/src/app/chairs.js를 그대로 옮겼다.
/// 종류와 스타일 이름, 그림은 팀 피그마 "의자 꾸미기 · 소파 선택" 다섯 장과 "잠긴 의자 선택"에 있는 그대로다.
/// 그림은 피그마 원본 PNG(큰 자리, D-chair-)와 같은 그림을 256px로 줄인 PNG(작은 자리, D-chairt-)다.
@Observable
final class ChairStore {
    static let shared = ChairStore()

    struct Kind: Identifiable {
        let id: String
        let name: String
        let label: String
        let nick: String
        let colors: [String]
        let files: [String]
    }

    static let kinds: [Kind] = [
        Kind(id: "conv", name: "편의점 의자", label: "편의점의자", nick: "졸린 편의점의자12",
             colors: ["미드나잇 블루", "포그 그레이", "오프 화이트", "네오 라임", "울트라 퍼플"],
             files: ["4fdd18ce8a", "5e85ee935b", "b5c25c4cae", "33871c043e", "6bfc511e24"]),
        Kind(id: "stool", name: "딱딱한 스툴", label: "나무 스툴", nick: "졸린 스툴12",
             colors: ["클래식 우드", "엔틱 우드", "화이티 우드", "파스텔 퍼플", "에너제틱 레드", "클리어 블루"],
             files: ["51be0a544b", "bbab91fe74", "450692c4db", "d7b0bb5005", "90255286ed", "964281ee34"]),
        Kind(id: "sofa", name: "푹신한 가죽 소파", label: "소파", nick: "졸린 소파12",
             colors: ["브라운 레더", "세이지 그린", "엔틱 레더", "파스텔 핑크", "클라우디 화이트", "버터 옐로우"],
             files: ["eab22a7a4d", "6e90eda49e", "b684e5de0a", "4a2fafbdd2", "66dbe89dae", "ff57f81938"]),
        Kind(id: "swivel", name: "슝슝 바퀴달린 의자", label: "바퀴달린 의자", nick: "졸린 바퀴의자12",
             colors: ["미디엄 그레이", "라이트 그레이", "스카이 블루", "크림 옐로우", "글로시 레더", "클래식 레드"],
             files: ["40b4fa7cb4", "f77c03c1bf", "801d8aedde", "cf2670f44f", "ad12677ce6", "db7b9eb9ee"]),
        Kind(id: "recl", name: "꿀잠 솔솔 리클라이너", label: "리클라이너", nick: "졸린 리클라이너12",
             colors: ["뮤트 그레이", "빈티지 레더", "크림 화이트", "소프트 블루", "라임 그린", "토프 그레이"],
             files: ["ef3d01c180", "3ff806dcf7", "ad4a1456", "7c2f0480", "25629e6f", "07c35f83d0"]),
    ]

    // 리클라이너는 엉따가 40.0°가 될 때까지 잠겨 있다(지금 내 엉따는 39.2°). 문구와 6색은 피그마 1951:13839 그대로다.
    static let lockNeed = "엉따 온도 40.0°가 되면 획득할 수 있어요"
    static func isLocked(_ k: Int) -> Bool {
        kinds[k].id == "recl"
    }

    /// 8자리 이름은 2026. 11. 9. 피그마에서 새로 받은 투명판 원본(D2-chair-, 큰 자리와 작은 자리 같이 쓴다)이다.
    static func big(_ k: Int, _ c: Int) -> String {
        let f = kinds[k].files[c]
        return f.count == 8 ? "D2-chair-" + f : "D-chair-" + f
    }

    static func thumb(_ k: Int, _ c: Int) -> String {
        let f = kinds[k].files[c]
        return f.count == 8 ? "D2-chair-" + f : "D-chairt-" + f
    }

    private static let key = "drrrk.chair.v1"

    private(set) var savedK = 0
    private(set) var savedC = 0
    var draftK = 0
    var draftC = 0
    private var last = [0, 0, 0, 0, 0]

    var myBig: String {
        Self.big(savedK, savedC)
    }

    var myThumb: String {
        Self.thumb(savedK, savedC)
    }

    var myKind: Kind {
        Self.kinds[savedK]
    }

    init() {
        if let d = UserDefaults.standard.dictionary(forKey: Self.key),
           let k = d["k"] as? Int, let c = d["c"] as? Int,
           Self.kinds.indices.contains(k), Self.kinds[k].colors.indices.contains(c), !Self.isLocked(k)
        {
            savedK = k
            savedC = c
        }
        draftK = savedK
        draftC = savedC
        last[savedK] = savedC
    }

    func lastColor(_ k: Int) -> Int {
        last[k]
    }

    /// 종류를 누르면 그 종류에서 마지막으로 보던 스타일이 열린다.
    func pickKind(_ k: Int) {
        guard draftK != k else { return }
        draftK = k
        draftC = last[k]
    }

    func pickColor(_ c: Int) {
        last[draftK] = c
        draftC = c
    }

    /// 의자 꾸미기를 열 때 보는 의자: 지금 앉은 의자, 새로 얻은 의자는 소파 브라운 레더.
    func openStudio(fresh: Bool) {
        let k = fresh ? 2 : savedK
        let c = fresh ? 0 : savedC
        last[k] = c
        draftK = k
        draftC = c
    }

    /// 잠긴 의자는 앉을 수 없다. 저장되면 true.
    @discardableResult
    func commit() -> Bool {
        guard !Self.isLocked(draftK) else { return false }
        savedK = draftK
        savedC = draftC
        UserDefaults.standard.set(["k": savedK, "c": savedC], forKey: Self.key)
        return true
    }
}
