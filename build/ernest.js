(function() {
    'use strict';

    var apiKey = "4f369c814c0d91e72780ce036d7ab0ba";

    function sendToListener(word, obj) {

        'use strict';

        console.log(obj);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {text: 'createDialog', data: obj, wordChosen: word});
        });
    }

    function searchWord(info, tab) {

        'use strict';
        var selectedWord = info.selectionText.toLowerCase(),
            data;

        function searchThesuarus() {
            var requestThesarus = new XMLHttpRequest();
            requestThesarus.open('GET', 'http://words.bighugelabs.com/api/2/' + apiKey + '/' + selectedWord + '/json', true);

            requestThesarus.onload = function() {
                if (requestThesarus.status >= 200 && requestThesarus.status < 400) {
                    var data = JSON.parse(requestThesarus.responseText);
                    sendToListener(selectedWord, data);
                } else {
                    console.log('We returned an error');
                }
            };

            requestThesarus.onerror = function() {
                // Connection error
            };

            // get JSON
            requestThesarus.send();

        }

        function searchDictionary() {
            var requestDictionary = new XMLHttpRequest();

            console.log('Searching dictionary for: ' + selectedWord);

            requestDictionary.open('GET', 'url', true);

            requestDictionary.onload = function() {
                if (requestDictionary.status >= 200 && requestDictionary.status < 400) {
                    var data = JSON.parse(requestDictionary.responseText);
                    sendToListener(selectedWord, data);
                } else {
                    console.log('We returned an error');
                }
            }

            requestDictionary.onload = function() {
                // Connection erro
            };

            // get JSON
            requestDictionary.send();
        }

        searchThesuarus();
        searchDictionary();
    }

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.text == "createDialog") {
            createDialog(request.wordChosen, request.data);
        }

        if (request.text == "searchWord") {
            searchWord();
        }
    });

    // Right click menu
    chrome.contextMenus.create({
        title: "Earnest lookup '%s'",
        contexts: ["selection"],
        onclick: searchWord
    });
})();

