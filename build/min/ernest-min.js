!function(){"use strict";function e(e){console.log(e),chrome.tabs.query({active:!0,currentWindow:!0},function(t){chrome.tabs.sendMessage(t[0].id,{text:"createDialog",data:e})})}function t(t,n){var s=t.selectionText.toLowerCase(),c,r=new XMLHttpRequest;r.open("GET","http://words.bighugelabs.com/api/2/"+o+"/"+s+"/json",!0),r.onload=function(){if(r.status>=200&&r.status<400){var t=JSON.parse(r.responseText);e(t)}else console.log("We returned an error")},r.onerror=function(){},r.send()}var o="4f369c814c0d91e72780ce036d7ab0ba";chrome.contextMenus.create({title:"Earnest lookup '%s'",contexts:["selection"],onclick:t})}();