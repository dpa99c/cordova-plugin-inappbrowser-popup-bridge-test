var URL = "https://m.buytickets.greateranglia.co.uk/";

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
    iabOpts = 'location=yes';
    if(navigator.userAgent.toLowerCase().indexOf('crosswalk') > -1) {
        webView = "Crosswalk" ;
    } else {
        webView = "System" ;
    }
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
