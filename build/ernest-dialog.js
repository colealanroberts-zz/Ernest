function destroyDialog() {
    var ernestDialog = document.querySelector('.ernest-dialog');
    ernestDialog.classList.remove('ernest-dialog--active');
    setTimeout(function() {
        ernestDialog.parentNode.removeChild(ernestDialog);
    }, 225);
}

function createDialog(wordPassed, obj) {
    console.log('Word passsed: '  + wordPassed);
    var ernestDialog     = document.querySelector('.ernest-dialog'),
        ernestWordPassed = document.querySelector('.ernest__word-passed'),
        ernestResults    = document.querySelector('.ernest__results');

    // Assign var to object
    var data = obj;

    // Iterate through key values
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            obj = data[key];

            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    var words = prop + ": " + ' ' + obj[prop];
                }
            }
        }
    }

    if (ernestDialog !== null) {
        ernestWordPassed.innerHTML = wordPassed;
        ernestResults.innerHTML = words;
    } else {
        ernestDialog = document.createElement('div');
        document.body.appendChild(ernestDialog);

        // Set class
        ernestDialog.classList.add('ernest-dialog', 'ernest-dialog--active');

        // Create word passed
        ernestWordPassed = document.createElement('span');
        ernestWordPassed.classList.add('ernest__word-passed');
        ernestDialog.appendChild(ernestWordPassed);

        // Create results
        ernestResults = document.createElement('span');
        ernestResults.classList.add('ernest__results');
        ernestDialog.appendChild(ernestResults);

        // Add text
        ernestWordPassed.innerHTML = wordPassed;
        ernestResults.innerHTML = words;
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