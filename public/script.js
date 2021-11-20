window.onload = () => {
  console.log("window onload ready");

  const mainScreen = document.querySelector(".main-screen");
  const pekoNormal = document.querySelector(".normal");
  const pekoPop = document.querySelector(".pop");
  const voiceFilePathLocal = "./public/pekohaha.m4a";
  const voiceFilePathCloud = "https://storage.googleapis.com/jimmmmy-public/pekohaha.m4a?t=1"; // enabled CORS for debug
  // const voiceFilePathCloud = "https://storage.googleapis.com/jimmmmy-public/yeule%20-%20untitled%20(Kin%20Leonn%20Cover).flac"; // enabled CORS for debug

  // [1] play audio with Web API: HTMLAudioElement
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio

  const webApiAudioObject = new Audio(voiceFilePathLocal);
  webApiAudioObject.addEventListener("loadeddata", () => {
    const duration = webApiAudioObject.duration;
    console.log("[webApiAudioObject] audio duration:", duration);
  });
  webApiAudioObject.addEventListener("playing", () => {
    console.log("[webApiAudioObject] on audio playing");
  });
  function playSoundWithWebApiAudioObject() {
    console.log("[playSoundWithWebApiAudioObject] trigger");
    webApiAudioObject.play();
    console.log("[playSoundWithWebApiAudioObject] played");
  }

  // [2] play audio with Web API: HTMLAudioElement, but create new object every time

  function playSoundWithWebApiAudioObjectNewEverytime() {
    const webApiAudioObjectNewEverytime = new Audio(voiceFilePathLocal);
    webApiAudioObjectNewEverytime.play();
  }

  // [3] play audio with Web API: AudioContext
  // https://developer.mozilla.org/en-US/docs/Web/API/webApiAudioContextObject

  // let audioCtx;
  // let source;
  // let songLength;

  // function getAudio() {
  //   source = audioCtx.createBufferSource();
  //   fetch(voiceFilePathLocal)
  //     .then(response => response.arrayBuffer())
  //     .then(buffer => {
  //       let audioData = buffer;
  //       audioCtx.decodeAudioData(audioData, function(buffer) {
  //         // myBuffer = buffer;
  //         songLength = buffer.duration;
  //         source.buffer = buffer;
  //         source.connect(audioCtx.destination);
  //         // source.loop = true;
  //       },
  //       function (e) {
  //         "Error with decoding audio data" + e.error;
  //       });
  //     });
  // }

  const webApiAudioContextObject = new AudioContext();
  const request = new XMLHttpRequest();

  request.open("GET", voiceFilePathCloud, true);
  request.responseType = "arraybuffer";
  let source;

  let responseData;

  request.onload = () => {
    webApiAudioContextObject.decodeAudioData(request.response, (buffer) => {
      source = webApiAudioContextObject.createBufferSource();
      source.buffer = buffer;
      source.connect(webApiAudioContextObject.destination);
      // auto play
      source.start(0);
    });
  };

  request.send();

  function playSoundWithContext() {

    webApiAudioContextObject.resume();

    // if(!audioCtx) {
    //   audioCtx = new window.AudioContext();
    // }

    // getAudio();
    // source.start(0);
  }

  ////////////////////////////////////////////////////////////////////////////

  function isMobile() {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (err) {
      return false;
    }
  }

  function pop() {
    // pekoNormal.setAttribute("style", "visibility: hidden;");
    // pekoPop.setAttribute("style", "visibility: visible;");
    pekoNormal.setAttribute("style", "display: none;");
    pekoPop.setAttribute("style", "display: block;");
  }

  function unpop() {
    setTimeout(() => {
      pekoNormal.setAttribute("style", "display: block;");
      pekoPop.setAttribute("style", "display: none;");
    }, 200);
    // pekoNormal.setAttribute("style", "visibility: visible;");
    // pekoPop.setAttribute("style", "visibility: hidden;");
  }

  if (isMobile()) {
    window.addEventListener("touchmove", (e) => {
      e.preventDefault();
    }, { passive: false });
    mainScreen.addEventListener("touchstart", (e) => {
      pop();
    });
    mainScreen.addEventListener("touchend", (e) => {
      unpop();
    });
  } else {
    mainScreen.addEventListener("mousedown", (e) => {
      console.log("[mousedown] trigger, ready to play sound");
      // playSoundWithWebApiAudioObject();
      // playSoundWithWebApiAudioObjectNewEverytime();
      playSoundWithContext();
      console.log("[mousedown] sound played");
      pop();
    });
    mainScreen.addEventListener("mouseup", (e) => {
      console.log("[mouseup] trigger");
      unpop();
      console.log("///////////////");
    });
  }
};
