(function() {
    'use strict';

    var apiKey = "4f369c814c0d91e72780ce036d7ab0ba";

    function searchWord(info, tab) {
        var selectedWord = info.selectionText.toLowerCase();

        var request = new XMLHttpRequest();
        request.open('GET', 'http://words.bighugelabs.com/api/2/4f369c814c0d91e72780ce036d7ab0ba/' + selectedWord + '/json', true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText),
                    dLen = Object.keys(data).length;

                console.log(data);

                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var obj = data[key];

                        for (var prop in obj) {
                            if (obj.hasOwnProperty(prop)) {
                                console.log(prop + " = " + obj[prop]);
                            }
                        }
                    }
                }

            } else {
                console.log('We returned an error');
            }
        };

        request.onerror = function() {
            // Connection error
        };

        // get JSON
        request.send();

        //
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {text: 'createDialog'}, function(response) {
                if (response.type == "test") {
                    console.log('test received');
                }
            });
        });
    }

    // Right click menu
    chrome.contextMenus.create({
        title: "Earnest lookup '%s'",
        contexts: ["selection"],
        onclick: searchWord
    });
})();