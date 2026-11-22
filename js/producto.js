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

  const params =
    new URLSearchParams(
      window.location.search
    );

  const requestedId =
    params.get("id");

  if (
    requestedId ===
    "nour-01"
  ) {

    window.location.replace(
      "origenes.html"
    );

    return;

  }

  if (
    requestedId ===
    "cafe-nour-en-grano"
  ) {

    window.location.replace(
      "producto.html?id=cafe-nour-molido"
    );

    return;

  }

  const defaultProductId =
    "cafe-nour-molido";

  const product =
    products[requestedId] ||
    products[defaultProductId];

  if (!product) {
    return;
  }

  const metaDescription =
    document.querySelector(
      "#product-meta-description"
    );

  const categoryLink =
    document.querySelector(
      "#product-category-link"
    );

  const breadcrumbCurrent =
    document.querySelector(
      "#product-breadcrumb-current"
    );

  const thumbnails =
    document.querySelector(
      "#product-thumbnails"
    );

  const mainImage =
    document.querySelector(
      "#product-main-image"
    );

  const eyebrow =
    document.querySelector(
      "#product-eyebrow"
    );

  const productTitle =
    document.querySelector(
      "#product-title"
    );

  const productMeta =
    document.querySelector(
      "#product-meta"
    );

  const productDescription =
    document.querySelector(
      "#product-description"
    );

  const productPrice =
    document.querySelector(
      "#product-price"
    );

  const productOption =
    document.querySelector(
      "#product-option"
    );

  const productOptionLabel =
    document.querySelector(
      "#product-option-label"
    );

  const productOptionChoices =
    document.querySelector(
      "#product-option-choices"
    );

  const productPurchase =
    document.querySelector(
      ".product-purchase"
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
      "#product-add"
    );

  const addStatus =
    document.querySelector(
      "#product-add-status"
    );

  const accordions =
    document.querySelector(
      "#product-accordions"
    );

  const relatedGrid =
    document.querySelector(
      "#product-related-grid"
    );

  const relatedSection =
    document.querySelector(
      ".product-related"
    );

  const footerStage =
    document.querySelector(
      ".product-footer-stage"
    );

  function renderProduct() {

    document.title =
      `${product.name} — NOUR`;

    if (metaDescription) {
      metaDescription.content =
        product.description;
    }

    if (categoryLink) {

      categoryLink.textContent =
        product.categoryLabel;

      categoryLink.href =
        `coleccion.html?filter=${product.category}`;

    }

    if (breadcrumbCurrent) {
      breadcrumbCurrent.textContent =
        product.name.toUpperCase();
    }

    if (eyebrow) {
      eyebrow.textContent =
        `NOUR / ${product.categoryLabel}`;
    }

    if (productTitle) {
      productTitle.innerHTML =
        product.titleLines.join("<br>");
    }

    if (productMeta) {

      productMeta.textContent =
        product.meta || "";

      productMeta.hidden =
        !product.meta;

    }

    if (productDescription) {
      productDescription.textContent =
        product.description;
    }

    if (productPrice) {
      productPrice.textContent =
        `${product.price} €`;
    }

    renderGallery();
    renderOption();
    renderAccordions();
    renderRelatedProducts();

  }

  function renderGallery() {

    if (
      !thumbnails ||
      !mainImage
    ) {
      return;
    }

    thumbnails.replaceChildren();

    product.images.forEach(
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
          `Ver imagen ${index + 1} de ${product.name}`
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
            selectImage(button);
          }
        );

        thumbnails.appendChild(
          button
        );

      }
    );

    mainImage.src =
      product.images[0];

    mainImage.alt =
      product.name;

    thumbnails.setAttribute(
      "aria-label",
      `Imágenes de ${product.name}`
    );

  }

  function selectImage(button) {

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

  function renderOption() {

    if (
      !productOption ||
      !productOptionLabel ||
      !productOptionChoices
    ) {
      return;
    }

    productOptionChoices.replaceChildren();

    if (!product.option) {

      productOption.hidden =
        true;

      if (productPurchase) {
        productPurchase.style.marginTop =
          "var(--space-32)";
      }

      return;

    }

    productOption.hidden =
      false;

    if (productPurchase) {
      productPurchase.style.marginTop =
        "";
    }

    productOptionLabel.textContent =
      product.option.label;

    product.option.values.forEach(
      value => {

        const label =
          document.createElement(
            "label"
          );

        label.className =
          "product-option__choice";

        const input =
          document.createElement(
            "input"
          );

        input.type =
          "radio";

        input.name =
          "product-option";

        input.value =
          value;

        input.checked =
          value ===
          product.option.defaultValue;

        const text =
          document.createElement(
            "span"
          );

        text.className =
          "label";

        text.textContent =
          value;

        input.addEventListener(
          "change",
          syncOptionCursor
        );

        label.append(
          input,
          text
        );

        productOptionChoices.appendChild(
          label
        );

      }
    );

    syncOptionCursor();

  }

  function syncOptionCursor() {

    if (!productOptionChoices) {
      return;
    }

    productOptionChoices
      .querySelectorAll(
        ".product-option__choice"
      )
      .forEach(
        choice => {

          const input =
            choice.querySelector(
              'input[type="radio"]'
            );

          choice.dataset.cursorColor =
            input?.checked
              ? "warm-cream"
              : "wine-burgundy";

        }
      );

  }

  function getSelectedOption() {

    if (!product.option) {
      return "";
    }

    const selected =
      productOptionChoices.querySelector(
        'input[type="radio"]:checked'
      );

    return selected
      ? selected.value
      : product.option.defaultValue;

  }

  function renderAccordions() {

    if (!accordions) {
      return;
    }

    accordions.replaceChildren();

    product.details.forEach(
      detail => {

        const item =
          document.createElement(
            "details"
          );

        item.className =
          "product-accordion";

        const summary =
          document.createElement(
            "summary"
          );

        const label =
          document.createElement(
            "span"
          );

        label.className =
          "label";

        label.textContent =
          detail.label;

        const icon =
          document.createElement(
            "span"
          );

        icon.className =
          "product-accordion__icon";

        icon.setAttribute(
          "aria-hidden",
          "true"
        );

        icon.textContent =
          "+";

        summary.append(
          label,
          icon
        );

        const content =
          document.createElement(
            "div"
          );

        content.className =
          "product-accordion__content";

        const paragraph =
          document.createElement(
            "p"
          );

        paragraph.className =
          "body-text-small";

        paragraph.textContent =
          detail.text;

        content.appendChild(
          paragraph
        );

        item.append(
          summary,
          content
        );

        accordions.appendChild(
          item
        );

      }
    );

  }

  function getProductHref(item) {

    if (
      item.id ===
      "nour-01"
    ) {
      return "origenes.html";
    }

    if (
      item.id ===
        "cafe-nour-en-grano"
      ||
      item.id ===
        "cafe-nour-molido"
    ) {
      return "producto.html?id=cafe-nour-molido";
    }

    return `producto.html?id=${item.id}`;

  }

  function renderRelatedProducts() {

    if (!relatedGrid) {
      return;
    }

    relatedGrid.replaceChildren();

    const relatedProducts =
      Object.values(products)
        .filter(
          item => {

            if (
              item.id ===
              "cafe-nour-en-grano"
            ) {
              return false;
            }

            return (
              item.id !== product.id
            );

          }
        )
        .slice(0, 4);

    relatedProducts.forEach(
      item => {

        relatedGrid.appendChild(
          createRelatedCard(item)
        );

      }
    );

    requestRelatedHeightUpdate();

  }

  function createRelatedCard(item) {

    const article =
      document.createElement(
        "article"
      );

    article.className =
      "related-product";

    const visual =
      document.createElement(
        "a"
      );

    visual.className =
      "related-product__visual";

    visual.href =
      getProductHref(item);

    visual.setAttribute(
      "aria-label",
      `Ver ${item.name}`
    );

    const image =
      document.createElement(
        "img"
      );

    image.src =
      item.images[0];

    image.alt =
      item.name;

    visual.appendChild(
      image
    );

    const meta =
      document.createElement(
        "div"
      );

    meta.className =
      "related-product__meta";

    const information =
      document.createElement(
        "div"
      );

    const name =
      document.createElement(
        "h3"
      );

    name.className =
      "related-product__name";

    name.textContent =
      item.name.toUpperCase();

    const description =
      document.createElement(
        "p"
      );

    description.className =
      "related-product__description";

    description.textContent =
      item.meta;

    const price =
      document.createElement(
        "p"
      );

    price.className =
      "related-product__price";

    price.textContent =
      `${item.price}€`;

    information.append(
      name,
      description
    );

    meta.append(
      information,
      price
    );

    article.append(
      visual,
      meta
    );

    return article;

  }

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

  function slugify(value) {

    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .replace(
        /^-+|-+$/g,
        ""
      );

  }

  function getCartItemId() {

    const selectedOption =
      getSelectedOption();

    if (!selectedOption) {
      return product.id;
    }

    return `${product.id}-${slugify(selectedOption)}`;

  }

  function addProductToCart() {

    const quantity =
      getQuantity();

    const selectedOption =
      getSelectedOption();

    const cart =
      getCart();

    const cartItemId =
      getCartItemId();

    const existingItem =
      cart.find(
        item =>
          item.id ===
          cartItemId
      );

    if (existingItem) {

      existingItem.quantity =
        (
          Number(
            existingItem.quantity
          ) || 0
        ) +
        quantity;

    } else {

      cart.push({
        id: cartItemId,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        variant: selectedOption,
        image: product.images[0]
      });

    }

    saveCart(cart);

    showAddStatus(
      quantity
    );

  }

  function showAddStatus(quantity) {

    if (!addStatus) {
      return;
    }

    addStatus.hidden =
      false;

    addStatus.textContent =
      quantity === 1
        ? "Añadido a tu cesta."
        : `${quantity} unidades añadidas a tu cesta.`;

    window.clearTimeout(
      showAddStatus.timer
    );

    showAddStatus.timer =
      window.setTimeout(
        () => {
          addStatus.hidden =
            true;
        },
        2600
      );

  }

  addButton?.addEventListener(
    "click",
    addProductToCart
  );

  let relatedHeightFrame =
    null;

  function updateRelatedHeight() {

    if (
      !footerStage ||
      !relatedSection
    ) {
      return;
    }

    const relatedHeight =
      Math.ceil(
        relatedSection.scrollHeight
      );

    footerStage.style.setProperty(
      "--product-related-height",
      `${relatedHeight}px`
    );

  }

  function requestRelatedHeightUpdate() {

    if (
      relatedHeightFrame !== null
    ) {

      cancelAnimationFrame(
        relatedHeightFrame
      );

    }

    relatedHeightFrame =
      requestAnimationFrame(
        () => {

          relatedHeightFrame =
            null;

          updateRelatedHeight();

        }
      );

  }

  if (
    relatedSection &&
    "ResizeObserver" in window
  ) {

    const observer =
      new ResizeObserver(
        requestRelatedHeightUpdate
      );

    observer.observe(
      relatedSection
    );

  }

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

  window.addEventListener(
    "resize",
    requestRelatedHeightUpdate,
    {
      passive: true
    }
  );

  window.addEventListener(
    "load",
    requestRelatedHeightUpdate
  );

  renderProduct();

  setQuantity(1);

  updateCartCount();

  requestRelatedHeightUpdate();

})();