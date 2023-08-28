// carousel with buttons and indicators
function carouselInit(targetId, autoplay) {
  // connects button signals and handle images sliding
  // takes obj id and autoplay bool arg

  // get the container and buttons and indicator
  const slideContainer = targetId.querySelector(".slide-container");
  const nextButton = targetId.querySelector(".next-btn");
  const prevButton = targetId.querySelector(".prev-btn");
  const indicatorCon = targetId.querySelector(".indicator-container");

  // set the total slide and index counter
  const totalSlide = slideContainer.childElementCount;
  let index = 0;

  // if guard no input during sliding (works for multiple carousels)
  let isSliding = false;

  // if guard no sliding when mouse is over slides
  let isMouseover = false;

  // attach the button signals
  nextButton.addEventListener("click", onNextButtonPress);
  prevButton.addEventListener("click", onPrevButtonPress);

  // next button press func
  function onNextButtonPress() {
    // no input during sliding
    if (isSliding === true) {
      return;
    }

    // no input
    isSliding = true;

    // stop timer
    if (autoplay === true) {
      stopAutoplay();
    }

    // get the currentSlide and indicator, update index, then get the nextSlide
    const currentSlide = slideContainer.children[index];
    const currentIndicator = indicatorCon.children[index];
    index = (index + 1) % totalSlide;
    const nextSlide = slideContainer.children[index];
    const nextIndicator = indicatorCon.children[index];

    // move current from mid to left, show next and move from right to mid
    currentSlide.classList.add("mid-left");
    nextSlide.classList.add("left-mid");
    nextSlide.classList.add("show");
    currentIndicator.classList.remove("show");
    nextIndicator.classList.add("show");

    // after anim
    function onSlideAnimationEnd() {
      // detach signal
      currentSlide.removeEventListener("animationend", onSlideAnimationEnd);

      // remove anim
      currentSlide.classList.remove("mid-left");
      nextSlide.classList.remove("left-mid");

      // hide current
      currentSlide.classList.remove("show");

      // can input
      isSliding = false;

      // start timer
      if (autoplay === true) {
        startAutoplay();
      }
    }

    // attach anim signal to current
    currentSlide.addEventListener("animationend", onSlideAnimationEnd);
  }

  function onPrevButtonPress() {
    // no input during sliding
    if (isSliding === true) {
      return;
    }

    // no input
    isSliding = true;

    // stop timer
    if (autoplay === true) {
      stopAutoplay();
    }

    // get the currentSlide and indicator, update index, then get the nextSlide
    const currentSlide = slideContainer.children[index];
    const currentIndicator = indicatorCon.children[index];
    index = (index + totalSlide - 1) % totalSlide;
    const nextSlide = slideContainer.children[index];
    const nextIndicator = indicatorCon.children[index];

    // move current from mid to right, show next and move from right to mid
    currentSlide.classList.add("mid-right");
    nextSlide.classList.add("right-mid");
    nextSlide.classList.add("show");
    currentIndicator.classList.remove("show");
    nextIndicator.classList.add("show");

    // after anim
    function onSlideAnimationEnd() {
      // detach signal
      currentSlide.removeEventListener("animationend", onSlideAnimationEnd);

      // remove anim
      currentSlide.classList.remove("mid-right");
      nextSlide.classList.remove("right-mid");

      // hide current
      currentSlide.classList.remove("show");

      // can input
      isSliding = false;

      // start timer
      if (autoplay === true) {
        startAutoplay();
      }
    }

    // attach anim signal to current
    currentSlide.addEventListener("animationend", onSlideAnimationEnd);
  }

  // store the autoplay interval ID
  let autoplayInterval;

  function stopAutoplay() {
    // clear the existing autoplay interval
    clearInterval(autoplayInterval);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      if (isMouseover === true) {
        return;
      }
      onNextButtonPress();
    }, 5000);
  }

  if (autoplay === true) {
    startAutoplay();
  }

  // attach mouseover signal to slide container
  slideContainer.addEventListener("mouseover", function () {
    isMouseover = true;
  });

  // attach mouseover signal to slide container
  slideContainer.addEventListener("mouseout", function () {
    isMouseover = false;
  });

  // Populate indicator con based on the number of slide con children
  for (let i = 0; i < totalSlide; i++) {
    const listItem = document.createElement("li");
    listItem.classList.add("indicator");
    if (i === 0) {
      listItem.classList.add("show");
    }
    indicatorCon.appendChild(listItem);
  }
}

carouselInit(document.querySelector("#carousel-1"), (autoplay = true));
// carouselInit(document.querySelector("#carousel-2"), (autoplay = true));
