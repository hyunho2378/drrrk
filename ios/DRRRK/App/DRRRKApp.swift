import SwiftUI

@main
struct DRRRKApp: App {
    var body: some Scene {
        WindowGroup {
            RoomView()
                .preferredColorScheme(.dark)
                .statusBarHidden(false)
        }
    }
}
