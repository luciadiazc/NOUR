"use strict";

(() => {

  const {
    formatPrice,
    clearCart
  } = window.NOUR_CART;

  const ORDER_KEY =
    "nourOrder";

  const itemsElement =
    document.querySelector(
      "#confirmation-items"
    );

  const deliveryElement =
    document.querySelector(
      "#confirmation-delivery"
    );

  const emailElement =
    document.querySelector(
      "#confirmation-email"
    );

  const totalElement =
    document.querySelector(
      "#confirmation-total"
    );

  const messageElement =
    document.querySelector(
      "#confirmation-message"
    );

  const panel =
    document.querySelector(
      ".confirmation-panel"
    );

  const footerStage =
    document.querySelector(
      ".confirmation-footer-stage"
    );

  function getOrder() {

    try {

      const stored =
        sessionStorage.getItem(
          ORDER_KEY
        );

      if (!stored) {
        return null;
      }

      const parsed =
        JSON.parse(stored);

      if (
        !parsed ||
        typeof parsed !== "object"
      ) {
        return null;
      }

      return parsed;

    } catch {

      return null;

    }

  }

  function getTotalItems(items) {

    if (!Array.isArray(items)) {
      return 0;
    }

    return items.reduce(
      (total, item) => {

        const quantity =
          Number.parseInt(
            item.quantity,
            10
          );

        return (
          total +
          (
            Number.isInteger(
              quantity
            )
              ? quantity
              : 0
          )
        );

      },
      0
    );

  }

  function renderOrder(order) {

    if (!order) {

      if (itemsElement) {
        itemsElement.textContent =
          "—";
      }

      if (deliveryElement) {
        deliveryElement.textContent =
          "—";
      }

      if (emailElement) {
        emailElement.textContent =
          "—";
      }

      if (totalElement) {
        totalElement.textContent =
          "—";
      }

      if (messageElement) {
        messageElement.textContent =
          "No hay ningún pedido reciente que mostrar.";
      }

      return;

    }

    const totalItems =
      getTotalItems(
        order.items
      );

    if (itemsElement) {

      itemsElement.textContent =
        totalItems === 1
          ? "1 producto"
          : `${totalItems} productos`;

    }

    if (deliveryElement) {
      deliveryElement.textContent =
        order.delivery || "—";
    }

    if (emailElement) {
      emailElement.textContent =
        order.email || "—";
    }

    const orderTotal =
      order.subtotal ??
      order.total ??
      0;

    if (totalElement) {

      totalElement.textContent =
        formatPrice(
          orderTotal
        );

    }

    if (messageElement) {

      if (
        order.name &&
        order.email
      ) {

        messageElement.textContent =
          `${order.name}, hemos recibido tu pedido. ` +
          `Te enviaremos la información a ${order.email}.`;

      } else {

        messageElement.textContent =
          "Hemos recibido tu pedido.";

      }

    }

  }

  function completeOrder(order) {

    if (!order) {
      return;
    }

    clearCart();

  }

  let heightFrame =
    null;

  function updateConfirmationHeight() {

    if (
      !panel ||
      !footerStage
    ) {
      return;
    }

    const height =
      Math.ceil(
        panel.scrollHeight
      );

    footerStage.style.setProperty(
      "--confirmation-height",
      `${height}px`
    );

  }

  function requestHeightUpdate() {

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

          updateConfirmationHeight();

        }
      );

  }

  if (
    panel &&
    "ResizeObserver" in window
  ) {

    const observer =
      new ResizeObserver(
        requestHeightUpdate
      );

    observer.observe(
      panel
    );

  }

  window.addEventListener(
    "resize",
    requestHeightUpdate,
    {
      passive: true
    }
  );

  window.addEventListener(
    "load",
    requestHeightUpdate
  );

  const order =
    getOrder();

  renderOrder(order);

  completeOrder(order);

  requestHeightUpdate();

})();