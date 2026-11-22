"use strict";

window.NOUR_CART = (() => {
  const key = "nourCart";
  const countElement = document.querySelector("#cart-count");

  function normalizeQuantity(value) {
    const quantity = Number.parseInt(value, 10);
    return Number.isInteger(quantity) ? Math.min(Math.max(quantity, 1), 9) : 1;
  }

  function getCart() {
    try {
      const stored = localStorage.getItem(key);
      const cart = stored ? JSON.parse(stored) : [];
      return Array.isArray(cart) ? cart : [];
    } catch {
      return [];
    }
  }

  function getTotalQuantity(cart = getCart()) {
    return cart.reduce((total, item) => total + normalizeQuantity(item.quantity), 0);
  }

  function getSubtotal(cart = getCart()) {
    return cart.reduce((total, item) => {
      const price = Number(item.price) || 0;
      return total + price * normalizeQuantity(item.quantity);
    }, 0);
  }

  function formatPrice(value) {
    const price = Number(value) || 0;
    return Number.isInteger(price) ? `${price}€` : `${price.toFixed(2).replace(".", ",")}€`;
  }

  function updateCount() {
    if (countElement) countElement.textContent = String(getTotalQuantity());
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(key, JSON.stringify(Array.isArray(cart) ? cart : []));
    } finally {
      updateCount();
    }
  }

  function clearCart() {
    localStorage.removeItem(key);
    updateCount();
  }

  window.addEventListener("storage", event => {
    if (event.key === key) updateCount();
  });

  updateCount();

  return {
    key,
    getCart,
    saveCart,
    clearCart,
    normalizeQuantity,
    formatPrice,
    getSubtotal,
    getTotalQuantity,
    updateCount
  };
})();