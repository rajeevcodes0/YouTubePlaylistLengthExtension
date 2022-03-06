function check() {
//   //clear the console
//   //console.clear();

  //wait for 3 seconds, so that js adds the elements that it needs to
  let poller = setInterval(() => {
    let thumbnails = document.querySelectorAll("ytd-item-section-renderer.style-scope.ytd-section-list-renderer");
    
    if(thumbnails.length>1){
        thumbnails=thumbnails[1];
    }else{
        thumbnails=thumbnails[0];
    }
    // console.log("thumbnails",thumbnails);
    let timeTexts = thumbnails.getElementsByClassName(
      "ytd-thumbnail-overlay-time-status-renderer"
    );
    //both the elements with the mentioned classes are added, we need to filter them
    //to apply filter method we need to convert it to an array
    timeTexts = Array.from(timeTexts);

    // console.log("before filtering timetexts",timeTexts);

    if (timeTexts.length) {
        // console.log("Cleared");
      clearInterval(poller);
    }

    //filter out the not required  elements
    timeTexts = timeTexts.filter((element, id) => {
      return !(id % 2 == 0);
    });
    // console.log("after filter timetexts",timeTexts);
    // // console.log(timeTexts, timeTexts.length);

    //let minutes and seconds be zero
    let minutes = 0;
    let seconds = 0;
    for (let i = 0; i < timeTexts.length; i++) {
    //   //console.log(timeTexts[i].getAttribute("aria-label"));

      //get the time string, it is present as "9 minutes, 34 seconds"
      let timeOfVideo = timeTexts[i].getAttribute("aria-label");

    //   console.log("time of video string",timeOfVideo)
    //   //   console.log(
      //     Number(timeOfVideo.split(",")[0].split(" ")[0]),
      //     Number(timeOfVideo.split(",")[1].split(" ")[1])
      //   );
      minutes += Number(timeOfVideo.split(",")[0].split(" ")[0]);
      seconds += Number(timeOfVideo.split(",")[1].split(" ")[1]);
    }
    let hours = Math.floor(minutes / 60);
    minutes = minutes - hours * 60 + Math.floor(seconds / 60);
    seconds = seconds % 60;

    //the string to be show to the user
    let timeString = `,Time:${hours ? hours + "hours" : ""}, ${
      minutes ? (minutes % 60) + "minutes" : ""
    }, ${seconds ? seconds + "seconds" : ""}`;
    // console.log(timeString);

    let statsElement = document.getElementById("stats");

    if(document.getElementById("extension-generated-time")){
        let timeElement = document.getElementById("extension-generated-time");
        timeElement.innerText=timeString;
    }else{
        let timeElement = document.createElement("span");
        timeElement.setAttribute("id","extension-generated-time");
        timeElement.setAttribute("font-weight","bold");
        timeElement.innerText=timeString;
        statsElement.appendChild(timeElement);

    }
    //statsElement.innerText = statsElement.innerText + " " + timeString;
  }, 1000);
}
chrome.runtime.onMessage.addListener((request, sender) => {
    // console.log(sender,request);
  check();
});

window.onload=()=>{
    setTimeout(check,5000);
    
};