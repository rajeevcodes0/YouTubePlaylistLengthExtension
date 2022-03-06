chrome.tabs.onUpdated.addListener(function (tabID, changeInfo, tab) {
  // console.log("tabID",tabID,"changeInfo",changeInfo,"tab",tab);
  // console.log(typeof changeInfo.url);

  function sendMessage(queryResult) {
    console.log(queryResult[0].id);
    chrome.tabs.sendMessage(queryResult[0].id, { message: "fire" });
    console.log(queryResult);
  }
  //if the url has changed, check if we are on the playlist page
  if (changeInfo.url) {
    if ( changeInfo.url.includes("list=") ) {
        console.log("this is a playlist");
      chrome.tabs.query({ active: true }, sendMessage);
      //send message to content.js
    }
  }
});
