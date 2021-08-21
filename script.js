window.onload = () => {
  // https://www.youtube.com/watch?v=yGvPPLdMGwc
  console.log("ready");

  var main_screen = document.querySelector(".main-screen");
  var peko_normal = document.querySelector(".normal");
  var peko_pop = document.querySelector(".pop");
  var voiceWithAudioObject = new Audio("./pekohaha.m4a");

  const audioContext = new AudioContext();
  const audioElement = document.querySelector('#voice');
  const track = audioContext.createMediaElementSource(audioElement);
  track.connect(audioContext.destination);

  voiceWithAudioObject.addEventListener("loadeddata", () => {
    let duration = voiceWithAudioObject.duration;
    console.log(duration);
  });

  voiceWithAudioObject.addEventListener("playing", () => {
    console.log('on audio playing');
  });

  function isMobile() {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  }

  function pop() {
    // peko_normal.setAttribute("style", "visibility: hidden;");
    // peko_pop.setAttribute("style", "visibility: visible;");
    peko_normal.setAttribute("style", "display: none;");
    peko_pop.setAttribute("style", "display: block;");
  }

  function unpop() {
    setTimeout(() => {
      peko_normal.setAttribute("style", "display: block;");
      peko_pop.setAttribute("style", "display: none;");
    }, 20);
    // peko_normal.setAttribute("style", "visibility: visible;");
    // peko_pop.setAttribute("style", "visibility: hidden;");

  }

  function playSoundWithAudioObject() {
    console.log('playSound trigger');
    voiceWithAudioObject.play();
    console.log('playSound playED');
  }

  function playSoundWithContext() {
    audioElement.play();
  }

  function playSoundEveryTime() {
    var voice = new Audio("./pekohaha.m4a");
    voice.play();
    voice = null;
  }

  if (isMobile()) {
    window.addEventListener("touchmove", function(e) {
      e.preventDefault();
    }, { passive: false });
    main_screen.addEventListener('touchstart', function (e) {
      pop();
    });
    main_screen.addEventListener('touchend', function (e) {
      unpop();
    });
  } else {
    main_screen.addEventListener("mousedown", function (e) {
      console.log('mousedown trigger, ready to call playSound');
      // playSoundWithAudioObject();
      // playSoundWithContext();
      playSoundEveryTime();
      console.log('playSound callED');
      pop();
    });

    main_screen.addEventListener("mouseup", function (e) {
      console.log('mouseup trigger');
      unpop();
    });
  }



}
