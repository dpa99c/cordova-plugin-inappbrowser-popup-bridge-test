var URL = "https://braintree.github.io/popup-bridge-example/";

var webView, platform, iabOpts;
if( navigator.platform.substr(0,2) === 'iP' ) {    // iOS detected
    platform = "iOS";
    iabOpts = 'location=no,toolbar=yes';
    if( window.webkit && window.webkit.messageHandlers ) {
        webView = "WKWebView" ;
    }else{
        webView = "UIWebView" ;
    }
}else{
    platform = "Android";
    webView = "Chromium" ;
    iabOpts = 'location=yes';
}


function openIAB(){
    cordova.InAppBrowser.open(URL, '_blank', iabOpts);
}

function onDeviceReady(){
    console.log("deviceready");
    console.log("PopupBridge present on Cordova Webview: " + window.popupBridge);
    $('#platform').html(platform);
    $('#webview').html(webView);
}

$(document).on('deviceready', onDeviceReady);
