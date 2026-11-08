import SwiftUI

@main
struct DRRRKApp: App {
    var body: some Scene {
        WindowGroup {
            RootView()
                .preferredColorScheme(.dark)
                .statusBarHidden(false)
        }
    }
}
