(function() {
    'use strict';

    var apiKey = "4f369c814c0d91e72780ce036d7ab0ba";

    function sendToListener(obj) {
        console.log(obj);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {text: 'createDialog', data: obj});
        });
    }

    function searchWord(info, tab) {
        var selectedWord = info.selectionText.toLowerCase();
        var data;

        var request = new XMLHttpRequest();
        request.open('GET', 'http://words.bighugelabs.com/api/2/' + apiKey + '/' + selectedWord + '/json', true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
                sendToListener(data);
            } else {
                console.log('We returned an error');
            }
        };

        request.onerror = function() {
            // Connection error
        };

        // get JSON
        request.send();
    }

    // Right click menu
    chrome.contextMenus.create({
        title: "Earnest lookup '%s'",
        contexts: ["selection"],
        onclick: searchWord
    });
})();