var URL = "https://braintree.github.io/popup-bridge-example/";

var webView;
if( navigator.platform.substr(0,2) === 'iP' ) {    // iOS detected
    if( window.webkit && window.webkit.messageHandlers ) {
        webView = "WKWebView" ;
    }else{
        webView = "UIWebView" ;
    }
}else{
    webView = "Chromium" ;
}


function openIAB(){
    cordova.InAppBrowser.open(URL, '_blank', 'location=no,toolbar=yes');
}

function onDeviceReady(){
    console.log("deviceready");
    $('#webview').html(webView);
}

$(document).on('deviceready', onDeviceReady);
