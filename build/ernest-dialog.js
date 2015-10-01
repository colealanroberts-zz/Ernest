function createDialog(obj) {
    var div = document.createElement('div');
    document.body.appendChild(div);

    // Set class
    div.classList.add('ernest-dialog');
    div.innerHTML = obj;
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