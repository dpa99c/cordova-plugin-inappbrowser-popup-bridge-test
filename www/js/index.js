var URL = "https://braintree.github.io/popup-bridge-example/";

var webView, iabOpts, useIAB, osVersion, iab;

function log(msg){
    console.log(msg);
    $('#log').append("<p>"+msg+"</p>");
}

function openIAB(){
    var target = useIAB ? '_blank' : '_system';
    iab = cordova.InAppBrowser.open(URL, target, iabOpts);

    iab.addEventListener('loadstart', function(e) {
        log("received 'loadstart' for URL: "+ e.url);
    });
    iab.addEventListener('loadstop', function(e) {
        log("received 'loadstop' for URL: "+ e.url);
        testInjection();
    });
    iab.addEventListener('loaderror', function(e) {
        log("received 'loaderror' for URL: "+ e.url);
    });
}

function testInjection(){
    iab.executeScript({
        code: "document.getElementsByTagName('h1')[0].innerHTML = document.getElementsByTagName('h1')[0].innerHTML + \" (injected)\";(function() { var body = document.querySelector('body'); var bottom = document.createElement('div'); bottom.innerHTML = 'Absolute Bottom'; bottom.classList.add('bottom'); body.appendChild(bottom); })();"
    }, function(returnValue){
        returnValue = returnValue[0];

       log("executeScript returned value: " + returnValue);
    });

    iab.insertCSS({
                  code: "body *{color: red !important;} \
                  .bottom { position: fixed; bottom: 0; z-index: 500; width: 100%; background: #fff; color: #495965; -moz-box-shadow: 0 0 5px #888; -webkit-box-shadow: 0 0 5px #888; box-shadow: 0 0 5px #888; padding: 10px; font-size: 20px;}"
    }, function(){
        log("insertCSS returned");
    });
}

function onDeviceReady(){
    console.log("deviceready");

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
        iabOpts = 'location=no';
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
