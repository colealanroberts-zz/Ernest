function destroyDialog() {
    var ernestDialog = document.querySelector('.ernest-dialog');
    ernestDialog.classList.remove('ernest-dialog--active');
    setTimeout(function() {
        ernestDialog.parentNode.removeChild(ernestDialog);
    }, 200);
}

function createDialog(obj) {
    var ernestDialog = document.querySelector('.ernest-dialog');

    // Assign var to object
    var data = obj;

    // Iterate through key values
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            obj = data[key];

            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    var words = prop + " = " + obj[prop];
                }
            }
        }
    }

    if (ernestDialog !== null) {
        ernestDialog.innerHTML = words;
    } else {
        ernestDialog = document.createElement('div');
        document.body.appendChild(ernestDialog);

        // Set class
        ernestDialog.classList.add('ernest-dialog', 'ernest-dialog--active');

        // Add text to the button
        ernestDialog.innerHTML = words;
    }

    // Create button
    var btn = document.createElement('button');
    btn.classList.add('ernest__btn-close');
    btn.innerHTML = 'x';
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
      createDialog(request.data);
      sendResponse({type: "test"});
    }
});