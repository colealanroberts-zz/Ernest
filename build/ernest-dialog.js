function detectKeyPress() {
    var e = event;
    window.addEventListener('keydown', function(e) {
        if (e.shiftKey && e.keyCode == 69) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {text: 'createDialog', data: obj, wordChosen: word});
            });
        }
    });
}

function destroyDialog() {
    var ernestDialog = document.querySelector('.ernest-dialog');
    ernestDialog.classList.remove('ernest-dialog--active');
    setTimeout(function() {
        ernestDialog.parentNode.removeChild(ernestDialog);
    }, 225);
}

function createDialog(wordPassed, obj) {
    var ernestDialog       = document.querySelector('.ernest-dialog'),
        ernestWordPassed   = document.querySelector('.ernest__word-passed'),
        ernestResults      = document.querySelector('.ernest__results'),
        ernestResultsCount = document.querySelector('.ernest__results-count');

    // Assign var to object
    var data = obj;

    console.log(data);

    // Iterate through key value
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            obj = data[key];
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    var words = obj[prop].join(', ');
                    var plainText;
                    if (prop == 'syn') {
                        plainText = 'synonyms';
                    }
                    if (prop == 'ant') {
                        plainText = 'antonyms';
                    }
                    var propCount = 'Found ' + obj[prop].length + ' ' + plainText + '.';
                }
            }
        }
    }

    if (ernestDialog !== null) {
        ernestWordPassed.innerHTML   = wordPassed;
        ernestResults.innerHTML      = words;
        ernestResultsCount.innerHTML = propCount;
    } else {
        ernestDialog = document.createElement('div');
        document.body.appendChild(ernestDialog);

        // Set class
        ernestDialog.classList.add('ernest-dialog', 'ernest-dialog--active');

        // Create word passed
        ernestWordPassed = document.createElement('span');
        ernestWordPassed.classList.add('ernest__word-passed');
        ernestDialog.appendChild(ernestWordPassed);

        // Create results count
        ernestResultsCount = document.createElement('span')
        ernestResultsCount.classList.add('ernest__results-count');
        ernestDialog.appendChild(ernestResultsCount)

        // Create results
        ernestResults = document.createElement('span');
        ernestResults.classList.add('ernest__results');
        ernestDialog.appendChild(ernestResults);

        // Add text
        ernestWordPassed.innerHTML   = wordPassed;
        ernestResults.innerHTML      = words;
        ernestResultsCount.innerHTML = propCount;
    }

    // Create button
    var btn = document.createElement('button');
    btn.classList.add('ernest__btn-close');
    ernestDialog.appendChild(btn);

    // Button event listener
    btn.addEventListener('click', function(event) {
        event.preventDefault();
        destroyDialog();
        setTimeout(function() {
            // Remove the button after it's clicked
            btn.parentNode.removeChild(btn);
        }, 0);
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.text == "createDialog") {
      createDialog(request.wordChosen, request.data);
    }
});

detectKeyPress();