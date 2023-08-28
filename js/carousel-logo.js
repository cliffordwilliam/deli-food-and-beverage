// carousel for logo auto scroll
function carouseLogolInit(targetId) {
  // handle images sliding
  // takes obj id arg

  // get the container
  const slideContainer = targetId.querySelector(".slide-container");

  // set the total slide and index counter
  const totalSlide = slideContainer.childElementCount;
  let index = 0;

  // scroll func
  function scroll() {
    // get the currentSlide and indicator, update index, then get the nextSlide
    const currentSlide = slideContainer.children[index];
    index = (index + 1) % totalSlide;
    const nextSlide = slideContainer.children[index];

    // move current from mid to left, show next and move from right to mid
    currentSlide.classList.add("mid-left");
    nextSlide.classList.add("left-mid");
    nextSlide.classList.add("show");

    // after anim
    function onSlideAnimationEnd() {
      // detach signal
      currentSlide.removeEventListener("animationend", onSlideAnimationEnd);

      // remove anim
      currentSlide.classList.remove("mid-left");
      nextSlide.classList.remove("left-mid");

      // hide current
      currentSlide.classList.remove("show");

      // scroll again
      window.requestAnimationFrame(scroll);
    }

    // attach anim signal to current
    currentSlide.addEventListener("animationend", onSlideAnimationEnd);
  }

  // attach mouseover signal to slide container
  slideContainer.addEventListener("mouseover", function () {
    for (let i = 0; i < totalSlide; i++) {
      const slide = slideContainer.children[i];
      slide.classList.add("paused");
    }
  });

  // attach mouseover signal to slide container
  slideContainer.addEventListener("mouseout", function () {
    for (let i = 0; i < totalSlide; i++) {
      const slide = slideContainer.children[i];
      slide.classList.remove("paused");
    }
  });

  scroll();
}

carouseLogolInit(document.querySelector("#carousel-logo-1"));
