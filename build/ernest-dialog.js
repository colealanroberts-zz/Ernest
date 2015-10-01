function destroyDialog() {
    var ernestDialog = document.querySelector('.ernest-dialog');
    ernestDialog.parentNode.removeChild(ernestDialog);
}

function createDialog(obj) {
    var ernestDialog = document.querySelector('.ernest-dialog');

    if (ernestDialog !==null) {
        ernestDialog.innerHTML = obj;
    } else {
        var div = document.createElement('div');
        document.body.appendChild(div);

        // Set class
        div.classList.add('ernest-dialog');

        // Add text to the button
        div.innerHTML = obj;

        // Create button
        var btn = document.createElement('button');
        btn.classList.add('ernest__close-btn')
        btn.innerHTML = 'x';
        document.body.appendChild(btn);

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
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var data = request.data;
	for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var obj = data[key];

            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                	var words = prop + " = " + obj[prop];
                }
            }
        }
    }
    if (request.text == "createDialog") {
      createDialog(words);
      sendResponse({type: "test"});
    }
});