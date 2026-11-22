"use strict";

(() => {

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

  const heroStage =
    document.querySelector(
      ".archive-hero-stage"
    );

  const hero =
    document.querySelector(
      ".archive-hero"
    );

  const yearSection =
    document.querySelector(
      ".archive-year"
    );

  const issueSection =
    document.querySelector(
      ".archive-issue"
    );

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  function getSectionProgress(section) {

    if (!section) {
      return 0;
    }

    const rect =
      section.getBoundingClientRect();

    const totalDistance =
      window.innerHeight +
      rect.height;

    return clamp(
      (
        window.innerHeight -
        rect.top
      ) /
      totalDistance
    );
  }

  function updateHero() {

    if (
      !heroStage ||
      !hero ||
      reducedMotion
    ) {
      return;
    }

    const rect =
      heroStage.getBoundingClientRect();

    const progress =
      clamp(
        -rect.top /
        window.innerHeight
      );

    hero.style.setProperty(
      "--archive-hero-back-x",
      `${(progress * -115).toFixed(2)}px`
    );

    hero.style.setProperty(
      "--archive-hero-front-x",
      `${(progress * 115).toFixed(2)}px`
    );

    hero.style.setProperty(
      "--archive-hero-image-y",
      `${(progress * -32).toFixed(2)}px`
    );

    hero.style.setProperty(
      "--archive-hero-image-scale",
      (
        1 +
        progress * 0.08
      ).toFixed(4)
    );
  }

  function updateYear() {

    if (
      !yearSection ||
      reducedMotion
    ) {
      return;
    }

    const progress =
      getSectionProgress(
        yearSection
      );

    yearSection.style.setProperty(
      "--archive-year-image-y",
      `${(progress * -22).toFixed(2)}px`
    );

    yearSection.style.setProperty(
      "--archive-year-image-scale",
      (
        1 +
        progress * 0.055
      ).toFixed(4)
    );
  }

  function updateIssue() {

    if (
      !issueSection ||
      reducedMotion
    ) {
      return;
    }

    const progress =
      getSectionProgress(
        issueSection
      );

    issueSection.style.setProperty(
      "--archive-issue-image-y",
      `${(progress * -34).toFixed(2)}px`
    );

    issueSection.style.setProperty(
      "--archive-issue-image-scale",
      (
        1 +
        progress * 0.08
      ).toFixed(4)
    );
  }

  let ticking = false;

  function updateArchivePage() {

    updateHero();
    updateYear();
    updateIssue();

    ticking = false;
  }

  function onScroll() {

    if (ticking) {
      return;
    }

    ticking = true;

    window.requestAnimationFrame(
      updateArchivePage
    );
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
    updateArchivePage
  );

  window.addEventListener(
    "load",
    updateArchivePage
  );

  updateArchivePage();

})();