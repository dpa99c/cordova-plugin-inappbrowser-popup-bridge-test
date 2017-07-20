var URL = "https://braintree.github.io/popup-bridge-example/";

var webView, iabOpts, useIAB, osVersion, iab;

function openIAB(){
    var target = useIAB ? '_blank' : '_system';
    iab = cordova.InAppBrowser.open(URL, target, iabOpts);

    iab.addEventListener('loadstart', function(e) {
        console.log("received 'loadstart' for URL: "+ e.url);
    });
    iab.addEventListener('loadstop', function(e) {
        console.log("received 'loadstop' for URL: "+ e.url);
        testInjection();
    });
    iab.addEventListener('loaderror', function(e) {
        console.log("received 'loaderror' for URL: "+ e.url);
    });
}

function testInjection(){
    iab.executeScript({
        code: "alert('foo')"
    }, function(returnValue){
       console.log("executeScript returned value: " + JSON.stringify(returnValue));
    });

    iab.insertCSS({
        code: "body *{color: red !important;}"
    }, function(){
        console.log("insertCSS returned");
    });
}

function onDeviceReady(){
    console.log("deviceready");
    console.log("PopupBridge present on Cordova Webview: " + window.popupBridge);

    osVersion = parseFloat(device.version);

    if( device.platform === "iOS" ) {
        iabOpts = 'location=no,toolbar=yes';
        if(window.webkit && window.webkit.messageHandlers ) {
            webView = "WKWebView" ;
        }else{
            webView = "UIWebView" ;
        }

        useIAB = osVersion >= 9 && webView === "WKWebView";

    }else{
        iabOpts = 'location=yes';
        if(navigator.userAgent.toLowerCase().indexOf('crosswalk') > -1) {
            webView = "Crosswalk" ;
        } else {
            webView = "System" ;
        }
        useIAB = osVersion >= 4.4;
    }

    $('#platform').html(device.platform + " " + device.version);
    $('#webview').html(webView);
    $('#popupbridge').html(useIAB ? "YES" : "NO");
}

$(document).on('deviceready', onDeviceReady);
