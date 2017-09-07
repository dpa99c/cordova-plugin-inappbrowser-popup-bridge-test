Test App for cordova-plugin-inappbrowser-popup-bridge 
=====================================================

This repo contains a [Cordova](http://cordova.apache.org/) project which builds a test app for Android and iOS to illustrate usage of [cordova-plugin-inappbrowser-popup-bridge](https://github.com/dpa99c/cordova-plugin-inappbrowser-popup-bridge), a fork of [cordova-plugin-inappbrowser](https://github.com/apache/cordova-plugin-inappbrowser).

`cordova-plugin-inappbrowser-popup-bridge` adds support for Braintree's PopupBridge libraries for [Android](https://github.com/braintree/popup-bridge-android) and [iOS](https://github.com/braintree/popup-bridge-ios) to support PayPal payments within the context of the InappBrowser element of a Cordova-based app.

The purpose of PopupBridge is to allow Webviews to open popup windows in a browser and send data back to the parent page in the Webview. This is essential for Web-based PayPal checkout flows which use the [Braintree JS SDK](https://github.com/braintree/braintree-web) which supports popup emulation via PopupBridge.

# Supported platform versions
This test app supports iOS 8.0+ and Android 4.1+.

PopupBridge itself supports iOS 9.0+ and Android 4.4+, so when running on earlier versions on which PopupBridge is not supported, the test app falls back to launching the system browser instead of in-app browser. This means the user is taken out of the original app to the default browser app, but at least can fulfill their PayPal payment before manually navigating back to the original app.

## iOS notes

- By default, the Cordova app and cordova-plugin-inappbrowser use the legacy [UIWebView](https://developer.apple.com/documentation/uikit/uiwebview).
- PopupBridge requires the newer [WKWebview](https://developer.apple.com/documentation/webkit/wkwebview).
    - The PopupBridge code contained in the plugin has been modified with pre-compile directives to enable it to compile on iOS 8.0 but have null functionality.
- The [modified version](https://github.com/dpa99c/cordova-plugin-themeablebrowser/tree/popup_bridge) of [cordova-plugin-inappbrowser](https://github.com/apache/cordova-plugin-inappbrowser) has also been adapted to use WKWebView instead of UIWebView.
- `cordova-ios@4.4.0` dropped support for iOS 8, so this app is pinned to use `cordova-ios@4.3.1`.


# Test app functionality
- The app consists of a simple, single page Cordova app written with basic HTML5
- The "Open Test Page In IAB" button opens the [Braintree PopupBridge Example webpage](https://braintree.github.io/popup-bridge-example) in:
    - PopupBridge-enabled in-appbrowser on iOS 9.0+ and Android 4.4+
    - Default web browser app on iOS 8.x and Android 4.1 to 4.3 
- This webpage contains a "Launch Popup" button which opens popup content in:
    - PopupBridge Webview instance on iOS 9.0+ and Android 4.4+
    - A web browser app popup window on iOS 8.x and Android 4.1 to 4.3
- Selecting a color choice in the popup closes the popup and displays your choice in the parent PopupBridge Example webpage, demonstrating the cross-window messaging is working.
- To return to the Cordova app:
    - on iOS 9.0+ press the "Done" button in the bottom-left
    - on Android 4.4+ press the "X" button in the top-right or hardware back button
    - on Android 4.1 to 4.3
        - press the hardware back button to go back from the web browser app to the test app
        - or press the home buttom and re-launch the test app from the home screen
    - on iOS 8.x
        - press the home buttom and re-launch the test app from the home screen

# Pre-requisites
The instruction below presume you have Cordova-capable development environment setup.
If not, see the [Cordova Getting Started guide](http://cordova.apache.org/#getstarted).

# Building and running
- Clone this repo: `git clone https://github.com/dpa99c/cordova-plugin-inappbrowser-popup-bridge-test` 

## Android
- From the root directory, add the Android platform: `cordova platform add android`
- Connect a test device
- Run the app: `cordova run android --device`

## iOS
- From the root directory, add the iOS platform: `cordova platform add ios`
- Add the WKWebview plugin: `cordova plugin add cordova-plugin-wkwebview-engine`
- Connect a test device
- Run the app: `cordova run ios --device --developmentTeam=TEAM_ID`
    - Note: if you don't specify your Apple Team ID on the command line, you'll need to open the iOS project `platforms/ios/PopupBridge Test.xcodeproj` in Xcode and manually configure signing.