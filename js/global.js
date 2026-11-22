"use strict";

(() => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const cursor = document.querySelector(".custom-cursor");
  const footer = document.querySelector(".site-footer");
  const footerScenes = document.querySelectorAll(
    ".visit-panel, .reservation-before, .privacy-closing-scene, " +
    ".origins-closing, .privacy-content__grid, " +
    ".reservation-confirmation-page .confirmation-panel"
  );
  const backToTop = document.querySelector("[data-footer-top]");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* Flechas: un único dibujo CSS para todas las direcciones. */
  const arrowDirections = {
    "→": "right",
    "↘": "down-right",
    "↓": "down",
    "↙": "down-left",
    "←": "left",
    "↖": "up-left",
    "↑": "up",
    "↗": "up-right"
  };

  function createArrow(character) {
    const direction = arrowDirections[character];
    if (!direction) return null;

    const arrow = document.createElement("span");
    arrow.className = `nour-arrow nour-arrow--${direction}`;
    arrow.setAttribute("aria-hidden", "true");
    return arrow;
  }

  function replaceArrowText(control) {
    if (!control || control.classList?.contains("nour-arrow")) return;

    const walker = document.createTreeWalker(control, NodeFilter.SHOW_TEXT);
    const nodes = [];

    while (walker.nextNode()) {
      if (/[→↘↓↙←↖↑↗]/.test(walker.currentNode.nodeValue)) {
        nodes.push(walker.currentNode);
      }
    }

    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();

      node.nodeValue.split(/([→↘↓↙←↖↑↗])/).forEach(part => {
        if (!part) return;
        fragment.append(createArrow(part) || document.createTextNode(part));
      });

      node.replaceWith(fragment);
    });
  }

  function normalizeArrows(root = document) {
    const selector = "a, button, [role='button']";

    if (root.nodeType === Node.ELEMENT_NODE && root.matches?.(selector)) {
      replaceArrowText(root);
    }

    root.querySelectorAll?.(selector).forEach(replaceArrowText);
  }

  normalizeArrows();

  const arrowObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          normalizeArrows(node);
          return;
        }

        if (node.nodeType === Node.TEXT_NODE) {
          replaceArrowText(node.parentElement?.closest("a, button, [role='button']"));
        }
      });
    });
  });

  if (document.body) {
    arrowObserver.observe(document.body, { childList: true, subtree: true });
  }

  /* Menú responsive. */
  function closeMenu({ restoreFocus = false } = {}) {
    if (!menuToggle) return;

    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "MENÚ";

    if (restoreFocus) menuToggle.focus();
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "CERRAR" : "MENÚ";

    if (header) {
      header.classList.remove("is-hidden");
      header.classList.add("is-visible");
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
      closeMenu({ restoreFocus: true });
    }
  });

  /* Cabecera */
  let previousScrollY = window.scrollY;
  const headerThemeAreas = document.querySelectorAll("[data-header-theme]");
  const alwaysVisibleUntil = 320;
  const minimumMovement = 12;

  function showHeader() {
    if (!header) return;
    header.classList.remove("is-hidden");
    header.classList.add("is-visible");
  }

  function hideHeader() {
    if (!header) return;
    header.classList.add("is-hidden");
    header.classList.remove("is-visible");
  }

  function updateHeaderVisibility() {
    if (!header) return;

    const currentScrollY = window.scrollY;
    const movement = currentScrollY - previousScrollY;

    if (document.body.classList.contains("menu-open") || currentScrollY <= alwaysVisibleUntil) {
      showHeader();
      previousScrollY = currentScrollY;
      return;
    }

    if (movement > minimumMovement) {
      hideHeader();
      previousScrollY = currentScrollY;
    } else if (movement < -minimumMovement) {
      showHeader();
      previousScrollY = currentScrollY;
    }
  }

  function updateHeaderTheme() {
    if (!header) return;

    const sampleY = Math.max(32, header.offsetHeight / 2);
    let activeTheme = "light";

    headerThemeAreas.forEach(area => {
      const rect = area.getBoundingClientRect();
      if (rect.top <= sampleY && rect.bottom > sampleY) activeTheme = area.dataset.headerTheme;
    });

    const isDark = activeTheme === "dark";
    header.classList.toggle("is-on-dark", isDark);
    header.classList.toggle("is-on-light", !isDark);
    header.dataset.cursorColor = isDark ? "warm-cream" : "wine-burgundy";
  }

  /* Cursor personalizado solo donde hay puntero fino. */
  if (cursor && finePointer) {
    document.addEventListener("pointermove", event => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.classList.add("is-visible");

      const area = document.elementFromPoint(
        event.clientX,
        event.clientY
      )?.closest("[data-cursor-color]");
      const isCream = area?.dataset.cursorColor === "warm-cream";

      cursor.classList.toggle("is-warm-cream", isCream);
      cursor.classList.toggle("is-wine-burgundy", !isCream);
    });

    document.documentElement.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-visible");
    });
  }

  /* Revelado progresivo. */
  const revealElements = document.querySelectorAll(".reveal");

  if (reducedMotion) {
    revealElements.forEach(element => element.classList.add("is-visible"));
  } else if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    revealElements.forEach(element => revealObserver.observe(element));
  }

  /* Altura del pie de página */
  function updateFooterHeight() {
    if (!footer) return;
    const height = Math.ceil(footer.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--footer-height", `${height}px`);
  }

  function updateSceneHeights() {
    footerScenes.forEach(scene => {
      const height = Math.ceil(scene.getBoundingClientRect().height);
      scene.parentElement.style.setProperty("--footer-scene-height", `${height}px`);
    });
  }

  if (footer && "ResizeObserver" in window) {
    new ResizeObserver(updateFooterHeight).observe(footer);
    const sceneObserver = new ResizeObserver(updateSceneHeights);
    footerScenes.forEach(scene => sceneObserver.observe(scene));
  }

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });

  let frameRequested = false;

  function updatePage() {
    updateHeaderVisibility();
    updateHeaderTheme();
    frameRequested = false;
  }

  function requestPageUpdate() {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(updatePage);
  }

  window.addEventListener("scroll", requestPageUpdate, { passive: true });
  window.addEventListener("resize", () => {
    updateFooterHeight();
    updateSceneHeights();
    requestPageUpdate();
  });
  window.addEventListener("load", () => {
    updateFooterHeight();
    updateSceneHeights();
    requestPageUpdate();
  });

  updateFooterHeight();
  updateSceneHeights();
  updateHeaderTheme();
})();