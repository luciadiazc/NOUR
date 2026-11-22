"use strict";

(() => {

  /* Helpers */

  const clamp = (
    value,
    min = 0,
    max = 1
  ) => {
    return Math.min(
      Math.max(value, min),
      max
    );
  };

  /* Referencias */

  const homeHero =
    document.querySelector(".home-hero");

  const heroRevealStage =
    document.querySelector(".hero-reveal-stage");

  const spaceStory =
    document.querySelector(".space-story");

  const spaceWord =
    document.querySelector("#space-word");

  const spaceCurrent =
    document.querySelector("#space-current");

  const spaceDescription =
    document.querySelector("#space-description");

  const archiveSection =
    document.querySelector(".archive-scroll");

  const archiveViewport =
    document.querySelector(".archive-scroll__viewport");

  const archiveTrack =
    document.querySelector(".archive-scroll__track");

  const newsletterForm =
    document.querySelector("#home-newsletter-form");

  const newsletterSuccess =
    document.querySelector("#newsletter-success");

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  /* Hero */

  function updateHero() {

    if (
      !homeHero ||
      !heroRevealStage ||
      reducedMotion
    ) {
      return;
    }

    const rect =
      heroRevealStage.getBoundingClientRect();

    const heroHeight =
      homeHero.offsetHeight;

    const progress =
      clamp(
        -rect.top / heroHeight
      );

    const scale =
      1 - progress * 0.08;

    const positionY =
      progress * -35;

    const opacity =
      1 - progress * 0.08;

    homeHero.style.setProperty(
      "--hero-wordmark-scale",
      scale.toFixed(4)
    );

    homeHero.style.setProperty(
      "--hero-wordmark-y",
      `${positionY.toFixed(2)}px`
    );

    homeHero.style.setProperty(
      "--hero-wordmark-opacity",
      opacity.toFixed(3)
    );

  }

  /* El espacio */

  const spaceStates = [

    {
      word: "leer",
      index: "01",
      description:
        "Un tiempo para ti mismo."
    },

    {
      word: "trabajar",
      index: "02",
      description:
        "Cuando necesitas concentrarte."
    },

    {
      word: "conversar",
      index: "03",
      description:
        "Cuando quedarse significa compartir."
    },

    {
      word: "estar",
      index: "04",
      description:
        "Sin necesidad de hacer nada más."
    }

  ];

  let currentSpaceState =
    -1;

  function animateSpaceElement(
    element,
    distance = 24
  ) {

    if (
      !element ||
      reducedMotion
    ) {
      return;
    }

    element.animate(

      [
        {
          opacity: 0,
          transform:
            `translateY(${distance}px)`
        },

        {
          opacity: 1,
          transform:
            "translateY(0)"
        }
      ],

      {
        duration: 520,

        easing:
          "cubic-bezier(0.22, 1, 0.36, 1)"
      }

    );

  }

  function showSpaceState(
    stateIndex,
    animate = true
  ) {

    const state =
      spaceStates[stateIndex];

    if (!state) {
      return;
    }

    if (spaceWord) {
      spaceWord.textContent = state.word;
    }

    if (spaceCurrent) {
      spaceCurrent.textContent =
        state.index;
    }

    if (spaceDescription) {
      spaceDescription.textContent = state.description;
      spaceDescription.classList.toggle(
        "space-story__description--single",
        state.word === "conversar"
      );
    }

    if (animate) {

      animateSpaceElement(
        spaceWord,
        32
      );

      animateSpaceElement(
        spaceCurrent,
        16
      );

      animateSpaceElement(
        spaceDescription,
        18
      );

    }

  }

  function updateSpaceStory() {

    if (
      !spaceStory ||
      reducedMotion
    ) {
      return;
    }

    const rect =
      spaceStory.getBoundingClientRect();

    /*
       Distancia durante la que
       la escena permanece sticky.
    */

    const scrollDistance =
      spaceStory.offsetHeight -
      window.innerHeight;

    if (scrollDistance <= 0) {
      return;
    }

    /*
       Posición recorrida dentro
       de la sección.
    */

    const distanceTravelled =
      clamp(
        -rect.top,
        0,
        scrollDistance
      );

    const progress =
      distanceTravelled /
      scrollDistance;

    

    let nextState =
      Math.floor(
        progress *
        spaceStates.length
      );

    nextState =
      Math.min(
        spaceStates.length - 1,
        nextState
      );

    nextState =
      Math.max(
        0,
        nextState
      );

    if (
      nextState ===
      currentSpaceState
    ) {
      return;
    }

    currentSpaceState =
      nextState;

    showSpaceState(
      currentSpaceState,
      true
    );

  }

  /* Archivo horizontal */

  let archiveMaxTranslate =
    0;

  let archiveScrollDistance =
    0;

  function measureArchive() {

    if (
      !archiveSection ||
      !archiveViewport ||
      !archiveTrack
    ) {
      return;
    }

    /*
       En móvil se mantiene el
       desplazamiento horizontal manual.
    */

    if (
      window.innerWidth <= 600 ||
      reducedMotion
    ) {

      archiveSection.style.height =
        "auto";

      archiveTrack.style.transform =
        "none";

      return;

    }

    

    archiveMaxTranslate =
      Math.max(
        0,
        archiveTrack.scrollWidth -
        archiveViewport.clientWidth
      );

    

    archiveScrollDistance =
      Math.max(
        archiveMaxTranslate * 1.15,
        window.innerHeight * 0.85
      );

    

    archiveSection.style.height =
      `${
        window.innerHeight +
        archiveScrollDistance
      }px`;

    updateArchive();

  }

  function updateArchive() {

    if (
      !archiveSection ||
      !archiveViewport ||
      !archiveTrack ||
      reducedMotion ||
      window.innerWidth <= 600
    ) {
      return;
    }

    const rect =
      archiveSection.getBoundingClientRect();

    

    if (rect.top > 0) {

      archiveTrack.style.transform =
        "translate3d(0px, 0px, 0px)";

      return;

    }

    /*
       Avance vertical dentro del
       recorrido sticky.
    */

    const distanceTravelled =
      clamp(
        -rect.top,
        0,
        archiveScrollDistance
      );

    const progress =
      archiveScrollDistance > 0
        ? distanceTravelled /
          archiveScrollDistance
        : 0;

    const translateX =
      -archiveMaxTranslate *
      progress;

    archiveTrack.style.transform =
      `translate3d(
        ${translateX.toFixed(2)}px,
        0px,
        0px
      )`;

  }

  /* Newsletter */

  if (newsletterForm) {

    newsletterForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        const email =
          newsletterForm.querySelector(
            'input[type="email"]'
          );

        if (
          !email ||
          !email.checkValidity()
        ) {

          email?.reportValidity();

          return;

        }

        if (newsletterSuccess) {

          newsletterSuccess.hidden =
            false;

        }

        newsletterForm.reset();

      }
    );

  }

  /* Loop */

  let ticking =
    false;

  function updatePage() {

    updateHero();

    updateSpaceStory();

    updateArchive();

    ticking =
      false;

  }

  function onScroll() {

    if (ticking) {
      return;
    }

    ticking =
      true;

    window.requestAnimationFrame(
      updatePage
    );

  }

  /* Resize */

  let resizeTimer;

  function onResize() {

    window.clearTimeout(
      resizeTimer
    );

    resizeTimer =
      window.setTimeout(
        () => {

          measureArchive();

          updateSpaceStory();

          updatePage();

        },
        100
      );

  }

  /* Inicio */

  function initHome() {

    

    currentSpaceState =
      -1;

    showSpaceState(
      0,
      false
    );

    measureArchive();

    updatePage();

  }

  window.addEventListener(
    "scroll",
    onScroll,
    {
      passive: true
    }
  );

  window.addEventListener(
    "resize",
    onResize
  );

  window.addEventListener(
    "load",
    initHome
  );

  

  if (document.fonts) {

    document.fonts.ready.then(
      () => {

        measureArchive();

        updatePage();

      }
    );

  }

  initHome();

})();