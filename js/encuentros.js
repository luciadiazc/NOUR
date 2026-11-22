"use strict";

(() => {

  /* Helpers */

  const clamp = (
    value,
    min,
    max
  ) => {

    return Math.min(
      Math.max(
        value,
        min
      ),
      max
    );

  };

  /* Referencias */

  const newsletterForm =
    document.querySelector(
      "#newsletter-form"
    );

  const newsletterSuccess =
    document.querySelector(
      "#newsletter-success"
    );

  const reserveLinks =
    document.querySelectorAll(
      ".encounter-row__link"
    );

  const endStage =
    document.querySelector(
      ".encounters-end-stage"
    );

  const endScene =
    document.querySelector(
      ".encounters-end-scene"
    );

  const gallery =
    document.querySelector(
      "[data-horizontal-gallery]"
    );

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

  /* Escena final sticky */

  function syncEndSceneHeight() {

    if (
      !endStage ||
      !endScene
    ) {
      return;
    }

    const sceneHeight =
      Math.ceil(
        endScene.scrollHeight
      );

    endStage.style.setProperty(
      "--sticky-footer-scene-height",
      `${sceneHeight}px`
    );

  }

  let sceneFrame =
    null;

  function requestEndSceneSync() {

    if (
      sceneFrame !== null
    ) {

      cancelAnimationFrame(
        sceneFrame
      );

    }

    sceneFrame =
      requestAnimationFrame(
        () => {

          sceneFrame =
            null;

          syncEndSceneHeight();

        }
      );

  }

  if (
    endScene &&
    "ResizeObserver" in window
  ) {

    const sceneObserver =
      new ResizeObserver(
        requestEndSceneSync
      );

    sceneObserver.observe(
      endScene
    );

  }

  /* Galería horizontal */

  if (gallery) {

    let dragging =
      false;

    let pointerId =
      null;

    let startX =
      0;

    let startScrollLeft =
      0;

    let dragDistance =
      0;

    let blockClick =
      false;

    /* Desactivar drag nativo */

    gallery.addEventListener(
      "dragstart",
      event => {

        event.preventDefault();

      }
    );

    gallery.addEventListener(
      "wheel",
      event => {

        const maxScroll =
          Math.max(
            0,
            gallery.scrollWidth
            -
            gallery.clientWidth
          );

        if (
          maxScroll <= 1
        ) {
          return;
        }

        let delta;

        if (
          Math.abs(
            event.deltaX
          )
          >
          Math.abs(
            event.deltaY
          )
        ) {

          delta =
            event.deltaX;

        } else {

          delta =
            event.deltaY;

        }

        if (
          event.deltaMode === 1
        ) {

          delta *= 18;

        }

        if (
          event.deltaMode === 2
        ) {

          delta *=
            gallery.clientWidth;

        }

        if (
          Math.abs(
            delta
          )
          <
          0.1
        ) {
          return;
        }

        const current =
          gallery.scrollLeft;

        const atStart =
          current <= 0.5;

        const atEnd =
          current
          >=
          maxScroll - 0.5;

        const wantsLeft =
          delta < 0;

        const wantsRight =
          delta > 0;

        if (
          (
            wantsLeft &&
            atStart
          )
          ||
          (
            wantsRight &&
            atEnd
          )
        ) {

          return;

        }

        /* Scroll horizontal */

        event.preventDefault();

        event.stopPropagation();

        gallery.scrollLeft =
          clamp(
            current
            +
            delta,
            0,
            maxScroll
          );

      },
      {
        passive: false,
        capture: true
      }
    );

    /* Arrastre con ratón */

    gallery.addEventListener(
      "pointerdown",
      event => {

        /* Desplazamiento táctil */

        if (
          event.pointerType !==
          "mouse"
        ) {
          return;
        }

        if (
          event.button !== 0
        ) {
          return;
        }

        dragging =
          true;

        pointerId =
          event.pointerId;

        startX =
          event.clientX;

        startScrollLeft =
          gallery.scrollLeft;

        dragDistance =
          0;

        blockClick =
          false;

        gallery.classList.add(
          "is-dragging"
        );

        gallery.setPointerCapture?.(
          pointerId
        );

      }
    );

    gallery.addEventListener(
      "pointermove",
      event => {

        if (
          !dragging
          ||
          event.pointerId !==
            pointerId
        ) {
          return;
        }

        const movement =
          event.clientX
          -
          startX;

        dragDistance =
          Math.max(
            dragDistance,
            Math.abs(
              movement
            )
          );

        if (
          dragDistance > 4
        ) {

          blockClick =
            true;

        }

        gallery.scrollLeft =
          startScrollLeft
          -
          movement;

      }
    );

    function stopDragging(
      event
    ) {

      if (!dragging) {
        return;
      }

      if (
        event &&
        event.pointerId !==
          pointerId
      ) {
        return;
      }

      dragging =
        false;

      gallery.classList.remove(
        "is-dragging"
      );

      if (
        pointerId !== null
      ) {

        try {

          gallery.releasePointerCapture?.(
            pointerId
          );

        } catch {

        }

      }

      pointerId =
        null;

      window.setTimeout(
        () => {

          blockClick =
            false;

        },
        0
      );

    }

    gallery.addEventListener(
      "pointerup",
      stopDragging
    );

    gallery.addEventListener(
      "pointercancel",
      stopDragging
    );

    gallery.addEventListener(
      "lostpointercapture",
      () => {

        dragging =
          false;

        pointerId =
          null;

        gallery.classList.remove(
          "is-dragging"
        );

      }
    );

    /* Evitar abrir link al arrastrar */

    gallery.addEventListener(
      "click",
      event => {

        if (
          !blockClick
        ) {
          return;
        }

        event.preventDefault();

        event.stopPropagation();

      },
      true
    );

    /* Teclado */

    gallery.addEventListener(
      "keydown",
      event => {

        if (
          event.key !==
            "ArrowRight"
          &&
          event.key !==
            "ArrowLeft"
        ) {
          return;
        }

        event.preventDefault();

        const amount =
          gallery.clientWidth
          *
          0.35;

        const direction =
          event.key ===
          "ArrowRight"
            ? 1
            : -1;

        gallery.scrollBy({

          left:
            direction
            *
            amount,

          behavior:
            reducedMotion.matches
              ? "auto"
              : "smooth"

        });

      }
    );

  }

  /* Newsletter */

  newsletterForm?.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const emailField =
        newsletterForm.querySelector(
          'input[type="email"]'
        );

      if (
        !emailField
        ||
        !emailField.checkValidity()
      ) {

        emailField?.reportValidity();

        return;

      }

      newsletterForm.reset();

      if (
        newsletterSuccess
      ) {

        newsletterSuccess.hidden =
          false;

      }

      requestEndSceneSync();

    }
  );

  /* Reserva */

  reserveLinks.forEach(
    link => {

      link.addEventListener(
        "click",
        () => {

          const selectedEvent = {

            id:
              link.dataset.eventId
              ||
              "",

            title:
              link.dataset.eventTitle
              ||
              "",

            type:
              link.dataset.eventType
              ||
              "",

            date:
              link.dataset.eventDate
              ||
              "",

            time:
              link.dataset.eventTime
              ||
              "",

            capacity:
              Number(
                link.dataset.eventCapacity
              )
              ||
              0

          };

          try {

            localStorage.setItem(
              "nourPendingEvent",
              JSON.stringify(
                selectedEvent
              )
            );

          } catch {

          }

        }
      );

    }
  );

  /* Recálculo */

  window.addEventListener(
    "resize",
    requestEndSceneSync,
    {
      passive: true
    }
  );

  window.addEventListener(
    "load",
    requestEndSceneSync
  );

  if (
    document.fonts
  ) {

    document.fonts.ready.then(
      requestEndSceneSync
    );

  }

  requestAnimationFrame(
    () => {

      requestAnimationFrame(
        requestEndSceneSync
      );

    }
  );

})();