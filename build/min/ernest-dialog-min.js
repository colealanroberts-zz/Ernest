function destroyDialog(){var e=document.querySelector(".ernest-dialog");e.parentNode.removeChild(e)}function createDialog(e){var t=document.querySelector(".ernest-dialog"),n=e;for(var r in n)if(n.hasOwnProperty(r)){var e=n[r];for(var o in e)if(e.hasOwnProperty(o))var a=o+" = "+e[o]}if(null!==t)t.innerHTML=a;else{var i=document.createElement("div");document.body.appendChild(i),i.classList.add("ernest-dialog"),i.innerHTML=a;var d=document.createElement("button");d.classList.add("ernest__close-btn"),d.innerHTML="x",document.body.appendChild(d),d.addEventListener("click",function(e){e.preventDefault(),destroyDialog(),setTimeout(function(){d.parentNode.removeChild(d)},0)})}}chrome.runtime.onMessage.addListener(function(e,t,n){"createDialog"==e.text&&(createDialog(e.data),n({type:"test"}))});