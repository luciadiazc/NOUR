"use strict";

(() => {

  const {
    key: CART_KEY,
    getCart,
    normalizeQuantity,
    formatPrice,
    getSubtotal,
    getTotalQuantity
  } = window.NOUR_CART;

  const ORDER_KEY =
    "nourOrder";

  const products =
    window.NOUR_PRODUCTS || {};

  const form =
    document.querySelector(
      "#checkout-form"
    );

  const cartCount =
    document.querySelector(
      "#cart-count"
    );

  const productsList =
    document.querySelector(
      "#checkout-products"
    );

  const subtotalElement =
    document.querySelector(
      "#checkout-subtotal"
    );

  const deliveryElement =
    document.querySelector(
      "#checkout-delivery"
    );

  const totalElement =
    document.querySelector(
      "#checkout-total"
    );

  const submitButton =
    document.querySelector(
      "#checkout-submit"
    );

  const pickupInput =
    document.querySelector(
      "#delivery-pickup"
    );

  const shippingInput =
    document.querySelector(
      "#delivery-shipping"
    );

  const shippingFields =
    document.querySelector(
      "#shipping-fields"
    );

  const addressInput =
    document.querySelector(
      "#checkout-address"
    );

  const postalInput =
    document.querySelector(
      "#checkout-postal"
    );

  const cityInput =
    document.querySelector(
      "#checkout-city"
    );

  const provinceInput =
    document.querySelector(
      "#checkout-province"
    );

  const checkoutContent =
    document.querySelector(
      ".checkout-content"
    );

  const footerStage =
    document.querySelector(
      ".checkout-footer-stage"
    );

  /* Cesta */

  function getProduct(item) {

    return (
      products[item.productId] ||
      products[item.id] ||
      null
    );

  }

  function isOrigins(item) {

    return (
      item.productId === "nour-01" ||
      item.id === "nour-01"
    );

  }

  function getProductDetail(
    item,
    product
  ) {

    if (isOrigins(item)) {
      return "NOUR Núm. 00";
    }

    if (item.variant) {
      return item.variant;
    }

    if (item.format) {
      return item.format;
    }

    if (product?.meta) {
      return product.meta;
    }

    return "";

  }

  /* Productos del resumen */

  function createSummaryProduct(item) {

    const product =
      getProduct(item);

    const quantity =
      normalizeQuantity(
        item.quantity
      );

    const lineTotal =
      (Number(item.price) || 0) *
      quantity;

    const detail =
      getProductDetail(
        item,
        product
      );

    const listItem =
      document.createElement(
        "li"
      );

    listItem.className =
      "checkout-summary__product";

    const information =
      document.createElement(
        "div"
      );

    const name =
      document.createElement(
        "p"
      );

    name.className =
      "body-text checkout-summary__product-name";

    const displayName =
      isOrigins(item)
        ? "ORÍGENES"
        : (
            item.name ||
            product?.name ||
            "Producto NOUR"
          );

    name.textContent =
      `${quantity} × ${displayName}`;

    information.appendChild(
      name
    );

    if (detail) {

      const detailElement =
        document.createElement(
          "span"
        );

      detailElement.className =
        "body-text-small checkout-summary__product-detail";

      detailElement.textContent =
        detail;

      information.appendChild(
        detailElement
      );

    }

    const price =
      document.createElement(
        "p"
      );

    price.className =
      "body-text checkout-summary__product-price";

    price.textContent =
      formatPrice(
        lineTotal
      );

    listItem.append(
      information,
      price
    );

    return listItem;

  }

  /* Resumen */

  function renderSummary() {

    if (!productsList) {
      return;
    }

    const cart =
      getCart();

    productsList.replaceChildren();

    const subtotal =
      getSubtotal(
        cart
      );

    const totalQuantity =
      getTotalQuantity(
        cart
      );

    if (cart.length === 0) {

      const emptyItem =
        document.createElement(
          "li"
        );

      emptyItem.className =
        "body-text-small checkout-summary__empty";

      emptyItem.textContent =
        "Tu cesta está vacía.";

      productsList.appendChild(
        emptyItem
      );

    } else {

      cart.forEach(
        item => {

          productsList.appendChild(
            createSummaryProduct(
              item
            )
          );

        }
      );

    }

    if (cartCount) {

      cartCount.textContent =
        String(
          totalQuantity
        );

    }

    if (subtotalElement) {

      subtotalElement.textContent =
        formatPrice(
          subtotal
        );

    }

    if (totalElement) {

      totalElement.textContent =
        formatPrice(
          subtotal
        );

    }

    if (submitButton) {

      submitButton.disabled =
        cart.length === 0;

    }

    requestCheckoutHeightUpdate();

  }

  /* Entrega */

  function updateDelivery() {

    if (
      !shippingInput ||
      !shippingFields
    ) {
      return;
    }

    const shippingSelected =
      shippingInput.checked;

    shippingFields.hidden =
      !shippingSelected;

    const requiredFields = [
      addressInput,
      postalInput,
      cityInput,
      provinceInput
    ];

    requiredFields.forEach(
      field => {

        if (!field) {
          return;
        }

        field.required =
          shippingSelected;

        field.disabled =
          !shippingSelected;

      }
    );

    if (deliveryElement) {

      deliveryElement.textContent =
        shippingSelected
          ? "A CALCULAR"
          : "RECOGIDA";

    }

    requestCheckoutHeightUpdate();

  }

  /* Pedido */

  function getOrderData(cart) {

    const shippingSelected =
      Boolean(
        shippingInput?.checked
      );

    return {

      name:
        document.querySelector(
          "#checkout-name"
        )?.value.trim() || "",

      surname:
        document.querySelector(
          "#checkout-surname"
        )?.value.trim() || "",

      email:
        document.querySelector(
          "#checkout-email"
        )?.value.trim() || "",

      phone:
        document.querySelector(
          "#checkout-phone"
        )?.value.trim() || "",

      delivery:
        shippingSelected
          ? "Envío a domicilio"
          : "Recogida en NOUR",

      address:
        shippingSelected
          ? {
              street:
                addressInput?.value.trim() || "",

              postal:
                postalInput?.value.trim() || "",

              city:
                cityInput?.value.trim() || "",

              province:
                provinceInput?.value.trim() || ""
            }
          : null,

      items:
        cart,

      subtotal:
        getSubtotal(
          cart
        )

    };

  }

  function handleSubmit(event) {

    event.preventDefault();

    const cart =
      getCart();

    if (cart.length === 0) {

      window.location.href =
        "cesta.html";

      return;

    }

    const order =
      getOrderData(
        cart
      );

    sessionStorage.setItem(
      ORDER_KEY,
      JSON.stringify(order)
    );

    window.location.href =
      "confirmacion-pedido.html";

  }

  /* Altura de la escena */

  let heightFrame =
    null;

  function updateCheckoutHeight() {

    if (
      !checkoutContent ||
      !footerStage
    ) {
      return;
    }

    const height =
      Math.ceil(
        checkoutContent.scrollHeight
      );

    footerStage.style.setProperty(
      "--checkout-content-height",
      `${height}px`
    );

  }

  function requestCheckoutHeightUpdate() {

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

          updateCheckoutHeight();

        }
      );

  }

  if (
    checkoutContent &&
    "ResizeObserver" in window
  ) {

    const observer =
      new ResizeObserver(
        requestCheckoutHeightUpdate
      );

    observer.observe(
      checkoutContent
    );

  }

  /* Eventos */

  pickupInput?.addEventListener(
    "change",
    updateDelivery
  );

  shippingInput?.addEventListener(
    "change",
    updateDelivery
  );

  form?.addEventListener(
    "submit",
    handleSubmit
  );

  window.addEventListener(
    "storage",
    event => {

      if (
        event.key ===
        CART_KEY
      ) {

        renderSummary();

      }

    }
  );

  window.addEventListener(
    "resize",
    requestCheckoutHeightUpdate,
    {
      passive: true
    }
  );

  window.addEventListener(
    "load",
    requestCheckoutHeightUpdate
  );

  /* Inicio */

  renderSummary();

  updateDelivery();

})();