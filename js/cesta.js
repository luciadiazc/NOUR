"use strict";

(() => {

  const {
    key: CART_KEY,
    getCart,
    normalizeQuantity,
    formatPrice
  } = window.NOUR_CART;

  function saveCart(cart) {
    window.NOUR_CART.saveCart(cart);
    renderCart();
  }

  const products =
    window.NOUR_PRODUCTS || {};

  const cartCount =
    document.querySelector(
      "#cart-count"
    );

  const cartList =
    document.querySelector(
      "#cart-items-list"
    );

  const cartEmpty =
    document.querySelector(
      "#cart-empty"
    );

  const summaryCount =
    document.querySelector(
      "#cart-summary-count"
    );

  const summarySubtotal =
    document.querySelector(
      "#cart-summary-subtotal"
    );

  const summaryTotal =
    document.querySelector(
      "#cart-summary-total"
    );

  const checkoutButton =
    document.querySelector(
      "#cart-checkout"
    );

  const cartContent =
    document.querySelector(
      ".cart-content"
    );

  const footerStage =
    document.querySelector(
      ".cart-footer-stage"
    );

  /* Producto */

  function getProductId(item) {

    return (
      item.productId ||
      item.id ||
      ""
    );

  }

  function isOrigins(item) {

    return (
      getProductId(item) ===
      "nour-01"
    );

  }

  function isCoffeeNour(item) {

    const productId =
      getProductId(item);

    const itemId =
      item.id || "";

    return (
      productId ===
        "cafe-nour-en-grano"
      ||
      productId ===
        "cafe-nour-molido"
      ||
      itemId ===
        "cafe-nour-en-grano"
      ||
      itemId ===
        "cafe-nour-molido"
      ||
      itemId.startsWith(
        "cafe-nour-molido-"
      )
    );

  }

  function getProductData(item) {

    if (isCoffeeNour(item)) {

      return (
        products["cafe-nour-molido"] ||
        products["cafe-nour-en-grano"] ||
        null
      );

    }

    const productId =
      getProductId(item);

    return (
      products[productId] ||
      products[item.id] ||
      null
    );

  }

  function getProductUrl(item) {

    if (isOrigins(item)) {

      return "origenes.html";

    }

    if (isCoffeeNour(item)) {

      return (
        "producto.html?id=cafe-nour-molido"
      );

    }

    const productId =
      getProductId(item);

    return (
      `producto.html?id=${encodeURIComponent(productId)}`
    );

  }

  function getDisplayName(
    item,
    product
  ) {

    if (isOrigins(item)) {

      return "ORÍGENES";

    }

    return (
      item.name ||
      product?.name ||
      "Producto NOUR"
    );

  }

  function getSecondaryText(
    item,
    product
  ) {

    if (isOrigins(item)) {

      return "NOUR Núm. 00";

    }

    if (item.variant) {

      return item.variant;

    }

    if (product?.meta) {

      return product.meta;

    }

    return "";

  }

  /* Crear producto */

  function createCartItem(
    item,
    index
  ) {

    const product =
      getProductData(item);

    const displayName =
      getDisplayName(
        item,
        product
      );

    const productUrl =
      getProductUrl(item);

    const article =
      document.createElement(
        "article"
      );

    article.className =
      "cart-item";

    /* Imagen */

    const visual =
      document.createElement(
        "a"
      );

    visual.className =
      "cart-item__visual";

    visual.href =
      productUrl;

    visual.setAttribute(
      "aria-label",
      `Ver ${displayName}`
    );

    const image =
      document.createElement(
        "img"
      );

    image.src =
      product?.images?.[0] ||
      item.image ||
      "assets/images/camiseta-1.webp";

    image.alt =
      displayName;

    visual.appendChild(
      image
    );

    /* Información */

    const information =
      document.createElement(
        "div"
      );

    information.className =
      "cart-item__information";

    const category =
      document.createElement(
        "p"
      );

    category.className =
      "label cart-item__category";

    category.textContent =
      product?.categoryLabel ||
      "COLECCIÓN";

    const name =
      document.createElement(
        "h2"
      );

    name.className =
      "cart-item__name";

    const nameLink =
      document.createElement(
        "a"
      );

    nameLink.href =
      productUrl;

    nameLink.textContent =
      displayName;

    name.appendChild(
      nameLink
    );

    const secondaryText =
      getSecondaryText(
        item,
        product
      );

    if (secondaryText) {

      const variant =
        document.createElement(
          "p"
        );

      variant.className =
        "cart-item__variant";

      variant.textContent =
        secondaryText;

      information.append(
        category,
        name,
        variant
      );

    } else {

      information.append(
        category,
        name
      );

    }

    /* Controles */

    const controls =
      document.createElement(
        "div"
      );

    controls.className =
      "cart-item__controls";

    const quantityControl =
      document.createElement(
        "div"
      );

    quantityControl.className =
      "cart-quantity";

    const decreaseButton =
      document.createElement(
        "button"
      );

    decreaseButton.className =
      "cart-quantity__button";

    decreaseButton.type =
      "button";

    decreaseButton.textContent =
      "−";

    decreaseButton.setAttribute(
      "aria-label",
      `Reducir cantidad de ${displayName}`
    );

    const quantityInput =
      document.createElement(
        "input"
      );

    quantityInput.type =
      "number";

    quantityInput.min =
      "1";

    quantityInput.max =
      "9";

    quantityInput.value =
      String(
        normalizeQuantity(
          item.quantity
        )
      );

    quantityInput.setAttribute(
      "aria-label",
      `Cantidad de ${displayName}`
    );

    const increaseButton =
      document.createElement(
        "button"
      );

    increaseButton.className =
      "cart-quantity__button";

    increaseButton.type =
      "button";

    increaseButton.textContent =
      "+";

    increaseButton.setAttribute(
      "aria-label",
      `Aumentar cantidad de ${displayName}`
    );

    quantityControl.append(
      decreaseButton,
      quantityInput,
      increaseButton
    );

    const removeButton =
      document.createElement(
        "button"
      );

    removeButton.className =
      "cart-item__remove";

    removeButton.type =
      "button";

    removeButton.textContent =
      "ELIMINAR";

    removeButton.setAttribute(
      "aria-label",
      `Eliminar ${displayName} de la cesta`
    );

    controls.append(
      quantityControl,
      removeButton
    );

    information.appendChild(
      controls
    );

    /* Precio */

    const price =
      document.createElement(
        "p"
      );

    price.className =
      "cart-item__price";

    price.textContent =
      formatPrice(
        (Number(item.price) || 0) *
        normalizeQuantity(
          item.quantity
        )
      );

    /* Eventos */

    decreaseButton.addEventListener(
      "click",
      () => {

        updateQuantity(
          index,
          normalizeQuantity(
            item.quantity
          ) - 1
        );

      }
    );

    increaseButton.addEventListener(
      "click",
      () => {

        updateQuantity(
          index,
          normalizeQuantity(
            item.quantity
          ) + 1
        );

      }
    );

    quantityInput.addEventListener(
      "change",
      () => {

        updateQuantity(
          index,
          quantityInput.value
        );

      }
    );

    removeButton.addEventListener(
      "click",
      () => {

        removeItem(
          index
        );

      }
    );

    article.append(
      visual,
      information,
      price
    );

    return article;

  }

  /* Modificar cesta */

  function updateQuantity(
    index,
    value
  ) {

    const cart =
      getCart();

    if (!cart[index]) {
      return;
    }

    cart[index].quantity =
      normalizeQuantity(
        value
      );

    saveCart(
      cart
    );

  }

  function removeItem(index) {

    const cart =
      getCart();

    cart.splice(
      index,
      1
    );

    saveCart(
      cart
    );

  }

  /* Resumen */

  function updateSummary(cart) {

    const totalQuantity =
      cart.reduce(
        (total, item) => {

          return (
            total +
            normalizeQuantity(
              item.quantity
            )
          );

        },
        0
      );

    const subtotal =
      cart.reduce(
        (total, item) => {

          return (
            total +
            (
              Number(item.price) || 0
            ) *
            normalizeQuantity(
              item.quantity
            )
          );

        },
        0
      );

    if (cartCount) {

      cartCount.textContent =
        String(
          totalQuantity
        );

    }

    if (summaryCount) {

      summaryCount.textContent =
        String(
          totalQuantity
        );

    }

    if (summarySubtotal) {

      summarySubtotal.textContent =
        formatPrice(
          subtotal
        );

    }

    if (summaryTotal) {

      summaryTotal.textContent =
        formatPrice(
          subtotal
        );

    }

    if (checkoutButton) {

      const isEmpty =
        cart.length === 0;

      checkoutButton.classList.toggle(
        "is-disabled",
        isEmpty
      );

      checkoutButton.setAttribute(
        "aria-disabled",
        String(isEmpty)
      );

      if (isEmpty) {

        checkoutButton.setAttribute(
          "tabindex",
          "-1"
        );

      } else {

        checkoutButton.removeAttribute(
          "tabindex"
        );

      }

    }

  }

  /* Render */

  function renderCart() {

    if (!cartList) {
      return;
    }

    const cart =
      getCart();

    cartList.replaceChildren();

    const isEmpty =
      cart.length === 0;

    if (cartEmpty) {

      cartEmpty.hidden =
        !isEmpty;

    }

    cartList.hidden =
      isEmpty;

    if (!isEmpty) {

      cart.forEach(
        (item, index) => {

          cartList.appendChild(
            createCartItem(
              item,
              index
            )
          );

        }
      );

    }

    updateSummary(
      cart
    );

    requestCartHeightUpdate();

  }

  /* Altura del contenido */

  let heightFrame =
    null;

  function updateCartHeight() {

    if (
      !cartContent ||
      !footerStage
    ) {
      return;
    }

    const height =
      Math.ceil(
        cartContent.scrollHeight
      );

    footerStage.style.setProperty(
      "--cart-content-height",
      `${height}px`
    );

  }

  function requestCartHeightUpdate() {

    if (
      heightFrame !== null
    ) {

      cancelAnimationFrame(
        heightFrame
      );

    }

    heightFrame =
      requestAnimationFrame(
        () => {

          heightFrame =
            null;

          updateCartHeight();

        }
      );

  }

  if (
    cartContent &&
    "ResizeObserver" in window
  ) {

    const observer =
      new ResizeObserver(
        requestCartHeightUpdate
      );

    observer.observe(
      cartContent
    );

  }

  /* Eventos */

  window.addEventListener(
    "storage",
    event => {

      if (
        event.key ===
        CART_KEY
      ) {

        renderCart();

      }

    }
  );

  window.addEventListener(
    "resize",
    requestCartHeightUpdate,
    {
      passive: true
    }
  );

  window.addEventListener(
    "load",
    requestCartHeightUpdate
  );

  /* Inicio */

  renderCart();

})();