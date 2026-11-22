"use strict";

(() => {

  const {
    key: CART_KEY,
    getCart,
    saveCart,
    normalizeQuantity,
    updateCount: updateCartCount
  } = window.NOUR_CART;

  const products =
    window.NOUR_PRODUCTS || {};

  const product =
    products["nour-01"] || {
      id: "nour-01",
      name: "NOUR NÚM. 00",
      meta: "Orígenes",
      price: 18,
      images: [
        "assets/images/nour-space.png"
      ]
    };

  /* Elementos */

  const thumbnails =
    document.querySelector(
      "#origins-thumbnails"
    );

  const mainImage =
    document.querySelector(
      "#origins-main-image"
    );

  const quantityInput =
    document.querySelector(
      "#product-quantity"
    );

  const decreaseButton =
    document.querySelector(
      "#quantity-decrease"
    );

  const increaseButton =
    document.querySelector(
      "#quantity-increase"
    );

  const addButton =
    document.querySelector(
      "#origins-add"
    );

  const addStatus =
    document.querySelector(
      "#origins-add-status"
    );

  const closingAddButton =
    document.querySelector(
      "#origins-add-closing"
    );

  const closingAddStatus =
    document.querySelector(
      "#origins-add-closing-status"
    );

  const cartCount =
    document.querySelector(
      "#cart-count"
    );

  /* Galería */

  function renderGallery() {

    if (
      !thumbnails ||
      !mainImage
    ) {
      return;
    }

    const images =
      Array.isArray(product.images) &&
      product.images.length
        ? product.images
        : [
            "assets/images/nour-space.png"
          ];

    thumbnails.replaceChildren();

    images.forEach(
      (image, index) => {

        const button =
          document.createElement(
            "button"
          );

        button.className =
          "product-gallery__thumb";

        if (index === 0) {

          button.classList.add(
            "is-active"
          );

        }

        button.type =
          "button";

        button.dataset.image =
          image;

        button.setAttribute(
          "aria-label",
          `Ver imagen ${index + 1} de Orígenes`
        );

        button.setAttribute(
          "aria-pressed",
          String(index === 0)
        );

        const thumbnailImage =
          document.createElement(
            "img"
          );

        thumbnailImage.src =
          image;

        thumbnailImage.alt =
          "";

        button.appendChild(
          thumbnailImage
        );

        button.addEventListener(
          "click",
          () => {

            selectImage(
              button
            );

          }
        );

        thumbnails.appendChild(
          button
        );

      }
    );

    mainImage.src =
      images[0];

    mainImage.alt =
      "NOUR Nº00 — Orígenes";

  }

  function selectImage(button) {

    if (
      !thumbnails ||
      !mainImage
    ) {
      return;
    }

    const buttons =
      thumbnails.querySelectorAll(
        ".product-gallery__thumb"
      );

    buttons.forEach(
      thumbnail => {

        const isActive =
          thumbnail === button;

        thumbnail.classList.toggle(
          "is-active",
          isActive
        );

        thumbnail.setAttribute(
          "aria-pressed",
          String(isActive)
        );

      }
    );

    mainImage.src =
      button.dataset.image;

  }

  /* Cantidad */

  function getQuantity() {

    if (!quantityInput) {
      return 1;
    }

    return normalizeQuantity(
      quantityInput.value
    );

  }

  function setQuantity(value) {

    if (!quantityInput) {
      return;
    }

    quantityInput.value =
      String(
        normalizeQuantity(value)
      );

  }

  decreaseButton?.addEventListener(
    "click",
    () => {

      setQuantity(
        getQuantity() - 1
      );

    }
  );

  increaseButton?.addEventListener(
    "click",
    () => {

      setQuantity(
        getQuantity() + 1
      );

    }
  );

  quantityInput?.addEventListener(
    "change",
    () => {

      setQuantity(
        quantityInput.value
      );

    }
  );

  /* Cesta */

  function addOriginsToCart(quantity) {

    const safeQuantity =
      normalizeQuantity(
        quantity
      );

    const cart =
      getCart();

    const existing =
      cart.find(
        item => {

          const productId =
            item.productId ||
            item.id;

          return (
            productId ===
            "nour-01"
          );

        }
      );

    if (existing) {

      existing.quantity =
        (
          Number(existing.quantity) ||
          0
        ) +
        safeQuantity;

    } else {

      cart.push({
        id: "nour-01",
        productId: "nour-01",
        name: "ORÍGENES",
        price:
          Number(product.price) ||
          18,
        quantity:
          safeQuantity,
        image:
          product.images?.[0] ||
          "assets/images/nour-space.png"
      });

    }

    saveCart(
      cart
    );

  }

  /* Mensaje de añadido */

  const statusTimers =
    new WeakMap();

  function showAddStatus(
    element,
    quantity
  ) {

    if (!element) {
      return;
    }

    const previousTimer =
      statusTimers.get(
        element
      );

    if (previousTimer) {

      window.clearTimeout(
        previousTimer
      );

    }

    element.hidden =
      false;

    element.textContent =
      quantity === 1
        ? "Añadido a tu cesta."
        : `${quantity} unidades añadidas a tu cesta.`;

    const timer =
      window.setTimeout(
        () => {

          element.hidden =
            true;

        },
        2600
      );

    statusTimers.set(
      element,
      timer
    );

  }

  /* Botón superior */

  addButton?.addEventListener(
    "click",
    () => {

      const quantity =
        getQuantity();

      addOriginsToCart(
        quantity
      );

      showAddStatus(
        addStatus,
        quantity
      );

    }
  );

  /* Botón inferior */

  closingAddButton?.addEventListener(
    "click",
    () => {

      

      addOriginsToCart(
        1
      );

      showAddStatus(
        closingAddStatus,
        1
      );

    }
  );

  /* Sincronización */

  window.addEventListener(
    "storage",
    event => {

      if (
        event.key ===
        CART_KEY
      ) {

        updateCartCount();

      }

    }
  );

  /* Inicio */

  renderGallery();

  updateCartCount();

})();