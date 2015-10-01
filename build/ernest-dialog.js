function createDialog() {
    var div = document.createElement('div');
    document.body.appendChild(div);

    // Set class
    div.classList.add('ernest-dialog');
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.text == "createDialog") {
      createDialog();
      sendResponse({type: "test"});
    }
});