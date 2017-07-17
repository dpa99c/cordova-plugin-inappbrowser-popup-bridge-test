var URL = "https://braintree.github.io/popup-bridge-example/";
var $iframe, iframe, $closeButton;

function openIframe(){
    $iframe = $('<iframe></iframe>');
    $iframe.on('load', onLoadFrame);
    $iframe.appendTo('body');
    $iframe.attr('src', URL);
    iframe = $iframe[0];

    $closeButton = $('<button id="close">Close</button>');
    $closeButton.on('click', closeIframe);
    $closeButton.appendTo('body');
}

function onLoadFrame(){
    try{
    if(iframe && iframe.contentWindow && !iframe.contentWindow.popupBridge){
        iframe.contentWindow.popupBridge = window.popupBridge;
    }
    window.popupBridge.onComplete = function(){
        iframe.contentWindow.popupBridge.onComplete.apply(iframe.contentWindow, arguments);
    };
    }catch(e){
        var msg = "Error: " + e;
        console.log(msg);
        alert(msg);
    }
}

function closeIframe(){
    $iframe.remove();
    $closeButton.remove();
}
