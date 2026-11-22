/* Nour — carta navegación entre secciones */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    /* Referencias */

    const cartaNav =
      document.querySelector(
        ".carta-nav"
      );

    const cartaLinks =
      Array.from(
        document.querySelectorAll(
          "[data-carta-target]"
        )
      );

    const cartaSections =
      Array.from(
        document.querySelectorAll(
          "[data-carta-section]"
        )
      );

    if (
      !cartaNav
      ||
      cartaLinks.length === 0
      ||
      cartaSections.length === 0
    ) {
      return;
    }

    const cartaReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    /* Activo */

    function setCartaActive(
      id
    ) {

      cartaLinks.forEach(
        function (link) {

          const isActive =
            link.dataset.cartaTarget === id;

          link.classList.toggle(
            "is-active",
            isActive
          );

          if (isActive) {

            link.setAttribute(
              "aria-current",
              "location"
            );

          } else {

            link.removeAttribute(
              "aria-current"
            );

          }

        }
      );

    }

    /* Scroll a sección */

    function scrollToCartaSection(
      id
    ) {

      const target =
        document.getElementById(
          id
        );

      if (!target) {
        return;
      }

      const navHeight =
        cartaNav.offsetHeight;

      const targetTop =
        target.getBoundingClientRect().top
        +
        window.scrollY;

      const offset =
        navHeight
        +
        40;

      const destination =
        Math.max(
          0,
          targetTop - offset
        );

      window.scrollTo({

        top:
          destination,

        behavior:
          cartaReducedMotion
            ? "auto"
            : "smooth"

      });

      setCartaActive(
        id
      );

      const url =
        new URL(
          window.location.href
        );

      url.hash =
        id;

      window.history.replaceState(
        {},
        "",
        url.pathname
        +
        url.search
        +
        url.hash
      );

    }

    /* Clics */

    cartaLinks.forEach(
      function (link) {

        link.addEventListener(
          "click",
          function (event) {

            event.preventDefault();

            const id =
              link.dataset.cartaTarget;

            if (!id) {
              return;
            }

            scrollToCartaSection(
              id
            );

          }
        );

      }
    );

    /* Activo según scroll */

    function updateCartaActive() {

      const navHeight =
        cartaNav.offsetHeight;

      const referenceY =
        navHeight
        +
        120;

      let activeId =
        cartaSections[0]
          .dataset
          .cartaSection;

      cartaSections.forEach(
        function (section) {

          const rect =
            section.getBoundingClientRect();

          if (
            rect.top <= referenceY
          ) {

            activeId =
              section.dataset.cartaSection;

          }

        }
      );

      setCartaActive(
        activeId
      );

    }

    /* Scroll optimizado */

    let cartaScrollFrame =
      null;

    window.addEventListener(
      "scroll",
      function () {

        if (
          cartaScrollFrame !== null
        ) {
          return;
        }

        cartaScrollFrame =
          window.requestAnimationFrame(
            function () {

              updateCartaActive();

              cartaScrollFrame =
                null;

            }
          );

      },
      {
        passive:
          true
      }
    );

    /* Si entramos con hash */

    function handleCartaHash() {

      const id =
        window.location.hash
          .replace(
            "#",
            ""
          );

      if (!id) {

        updateCartaActive();

        return;

      }

      const targetExists =
        cartaSections.some(
          function (section) {

            return (
              section.dataset.cartaSection
              ===
              id
            );

          }
        );

      if (!targetExists) {

        updateCartaActive();

        return;

      }

      window.requestAnimationFrame(
        function () {

          window.requestAnimationFrame(
            function () {

              scrollToCartaSection(
                id
              );

            }
          );

        }
      );

    }

    /* Resize */

    window.addEventListener(
      "resize",
      function () {

        updateCartaActive();

      },
      {
        passive:
          true
      }
    );

    /* Inicio */

    handleCartaHash();

  }
);