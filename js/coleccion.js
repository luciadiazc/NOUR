"use strict";

(() => {

  const {
    key: CART_KEY,
    getCart,
    saveCart,
    updateCount: updateCartCount
  } = window.NOUR_CART;

  const filters =
    document.querySelectorAll(
      ".collection-filter"
    );

  const primarySection =
    document.querySelector(
      ".collection-products--primary"
    );

  const featuredSection =
    document.querySelector(
      ".collection-featured"
    );

  const secondarySection =
    document.querySelector(
      ".collection-products--secondary"
    );

  const filteredCatalog =
    document.querySelector(
      "#collection-filtered-catalog"
    );

  const filteredGrid =
    document.querySelector(
      "#collection-filtered-grid"
    );

  const cartCount =
    document.querySelector(
      "#cart-count"
    );

  const featuredAdd =
    document.querySelector(
      "#featured-add"
    );

  const featuredStatus =
    document.querySelector(
      "#featured-status"
    );

  const newsletterForm =
    document.querySelector(
      "#home-newsletter-form"
    );

  const newsletterSuccess =
    document.querySelector(
      "#newsletter-success"
    );

  const grindInputs =
    document.querySelectorAll(
      'input[name="featured-grind"]'
    );

  const endStage =
    document.querySelector(
      ".collection-end-stage"
    );

  const endScene =
    document.querySelector(
      ".collection-end-scene"
    );

  const validFilters =
    new Set([
      "all",
      "publicaciones",
      "cafe",
      "merch"
    ]);

  const products = [

    {
      id: "nour-01",
      category: "publicaciones",
      name: "ORÍGENES",
      description: "NOUR Núm. 00",
      price: "18€",
      image: "assets/images/portada-nour-00.webp",
      alt: "NOUR número 00, Orígenes",
      href: "origenes.html"
    },

    {
      id: "cafe-nour-en-grano",
      category: "cafe",
      name: "CAFÉ NOUR",
      description: "En grano · 250gr",
      price: "12€",
      image: "assets/images/cafe-nour-coleccion.webp",
      alt: "Café NOUR en grano",
      href: "producto.html?id=cafe-nour-en-grano"
    },

    {
      id: "tote-nour",
      category: "merch",
      name: "TOTE BAG NOUR",
      description: "Algodón natural",
      price: "14€",
      image: "assets/images/tote-1-coleccion.webp",
      alt: "Tote Bag NOUR"
    },

    {
      id: "lanyard-nour",
      category: "merch",
      name: "LANYARD NOUR",
      description: "Lanyard NOUR",
      price: "8€",
      image: "assets/images/lanyard-coleccion.webp",
      alt: "Lanyard NOUR"
    },

    {
      id: "cafe-colombia",
      category: "cafe",
      name: "CAFÉ NOUR | COLOMBIA",
      description: "Molido · 250gr",
      price: "12€",
      image: "assets/images/cafe-colombia-coleccion.webp",
      alt: "Café NOUR Colombia"
    },

    {
      id: "taza-nour",
      category: "merch",
      name: "TAZA NOUR",
      description: "Cerámica",
      price: "16€",
      image: "assets/images/taza-1-coleccion.webp",
      alt: "Taza NOUR"
    },

    {
      id: "journal-nour",
      category: "merch",
      name: "JOURNAL NOUR",
      description: "Oliva",
      price: "14€",
      image: "assets/images/journal-1-coleccion.webp",
      alt: "Journal NOUR"
    },

    {
      id: "cafe-brasil",
      category: "cafe",
      name: "CAFÉ NOUR | BRASIL",
      description: "En grano · 250gr",
      price: "16€",
      image: "assets/images/cafe-brasil-coleccion.webp",
      alt: "Café NOUR Brasil"
    },

    {
      id: "gorra-nour",
      category: "merch",
      name: "GORRA NOUR",
      description: "Burdeos",
      price: "24€",
      image: "assets/images/gorra-coleccion.webp",
      alt: "Gorra NOUR"
    },

    {
      id: "camiseta-nour",
      category: "merch",
      name: "CAMISETA NOUR",
      description: "Crudo",
      price: "35€",
      image: "assets/images/camiseta-1.webp",
      alt: "Camiseta NOUR"
    },

    {
      id: "cafe-nour-molido",
      category: "cafe",
      name: "CAFÉ NOUR",
      description: "Molido · 250gr",
      price: "11€",
      image: "assets/images/cafe-nour-coleccion.webp",
      alt: "Café NOUR molido",
      href: "producto.html?id=cafe-nour-molido"
    }

  ];

  products.forEach(
    product => {

      if (!product.href) {

        product.href =
          `producto.html?id=${product.id}`;

      }

    }
  );

  function normalizeName(value) {

    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .replace(
        /[^a-z0-9]+/g,
        ""
      );

  }

  function prepareEditorialProducts() {

    document
      .querySelectorAll(
        ".collection-product"
      )
      .forEach(
        card => {

          const nameElement =
            card.querySelector(
              ".collection-product__name"
            );

          const descriptionElement =
            card.querySelector(
              ".collection-product__description"
            );

          const priceElement =
            card.querySelector(
              ".collection-product__price"
            );

          if (!nameElement) {
            return;
          }

          const normalizedName =
            normalizeName(
              nameElement.textContent
            );

          const normalizedDescription =
            normalizeName(
              descriptionElement?.textContent || ""
            );

          const isOrigins =
            normalizedName ===
              normalizeName("NOUR NÚM. 00")
            ||
            normalizedName ===
              normalizeName("ORÍGENES")
            ||
            normalizedDescription ===
              normalizeName("ORÍGENES")
            ||
            normalizedDescription ===
              normalizeName("NOUR NÚM. 00");

          if (isOrigins) {

            nameElement.textContent =
              "ORÍGENES";

            if (descriptionElement) {
              descriptionElement.textContent =
                "NOUR Núm. 00";
            }

            if (priceElement) {
              priceElement.textContent =
                "18€";
            }

            return;
          }

          const isOldSecondIssue =
            normalizedName ===
              normalizeName("NOUR NÚM. 02")
            ||
            normalizedDescription ===
              normalizeName("Rituales");

          if (isOldSecondIssue) {

            nameElement.textContent =
              "LANYARD NOUR";

            if (descriptionElement) {
              descriptionElement.textContent =
                "Lanyard NOUR";
            }

            if (priceElement) {
              priceElement.textContent =
                "8€";
            }

          }

        }
      );

  }

  function findProductForCard(
    name,
    description
  ) {

    const normalizedName =
      normalizeName(name);

    const normalizedDescription =
      normalizeName(description);

    if (
      normalizedName ===
        normalizeName("ORÍGENES")
      ||
      normalizedDescription ===
        normalizeName("NOUR Núm. 00")
    ) {

      return products.find(
        product =>
          product.id ===
          "nour-01"
      );

    }

    if (
      normalizedName ===
      normalizeName("LANYARD NOUR")
    ) {

      return products.find(
        product =>
          product.id ===
          "lanyard-nour"
      );

    }

    if (
      normalizedName ===
      normalizeName("CAFÉ NOUR")
    ) {

      const coffeeId =
        normalizedDescription ===
        normalizeName("En grano · 250gr")
          ? "cafe-nour-en-grano"
          : "cafe-nour-molido";

      return products.find(
        product =>
          product.id ===
          coffeeId
      );

    }

    return products.find(
      product =>
        normalizeName(product.name) ===
        normalizedName
    );

  }

  function linkEditorialProducts() {

    document
      .querySelectorAll(
        ".collection-product"
      )
      .forEach(
        card => {

          const nameElement =
            card.querySelector(
              ".collection-product__name"
            );

          const descriptionElement =
            card.querySelector(
              ".collection-product__description"
            );

          const visual =
            card.querySelector(
              ".collection-product__visual"
            );

          if (
            !nameElement ||
            !visual
          ) {
            return;
          }

          const product =
            findProductForCard(
              nameElement.textContent,
              descriptionElement?.textContent || ""
            );

          if (!product) {
            return;
          }

          const imageElement =
            visual.querySelector("img");

          if (imageElement) {
            imageElement.src =
              product.image;

            imageElement.alt =
              product.alt;
          }

          if (
            visual.tagName === "A"
          ) {

            visual.href =
              product.href;

            visual.setAttribute(
              "aria-label",
              `Ver ${product.name}`
            );

            return;
          }

          const link =
            document.createElement(
              "a"
            );

          link.className =
            visual.className;

          link.href =
            product.href;

          link.setAttribute(
            "aria-label",
            `Ver ${product.name}`
          );

          while (
            visual.firstChild
          ) {

            link.appendChild(
              visual.firstChild
            );

          }

          visual.replaceWith(
            link
          );

        }
      );

  }

  function getFilterFromUrl() {

    const params =
      new URLSearchParams(
        window.location.search
      );

    const filter =
      params.get("filter");

    if (
      filter &&
      validFilters.has(filter)
    ) {

      return filter;
    }

    return "all";

  }

  function updateFilterUrl(filter) {

    const url =
      new URL(
        window.location.href
      );

    if (
      filter === "all"
    ) {

      url.searchParams.delete(
        "filter"
      );

    } else {

      url.searchParams.set(
        "filter",
        filter
      );

    }

    window.history.replaceState(
      {},
      "",
      `${url.pathname}${url.search}${url.hash}`
    );

  }

  function syncEndSceneHeight() {

    if (
      !endStage ||
      !endScene
    ) {
      return;
    }

    const height =
      Math.ceil(
        endScene.scrollHeight
      );

    endStage.style.setProperty(
      "--collection-end-scene-height",
      `${height}px`
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

  function updateFilterButtons(filter) {

    filters.forEach(
      button => {

        const active =
          button.dataset.filter ===
          filter;

        button.classList.toggle(
          "is-active",
          active
        );

        button.setAttribute(
          "aria-pressed",
          String(active)
        );

      }
    );

  }

  function createProductCard(product) {

    const article =
      document.createElement(
        "article"
      );

    article.className =
      "filtered-product";

    const visual =
      document.createElement(
        "a"
      );

    visual.className =
      "filtered-product__visual";

    visual.href =
      product.href;

    visual.setAttribute(
      "aria-label",
      `Ver ${product.name}`
    );

    const image =
      document.createElement(
        "img"
      );

    image.src =
      product.image;

    image.alt =
      product.alt;

    visual.appendChild(
      image
    );

    const metadata =
      document.createElement(
        "div"
      );

    metadata.className =
      "filtered-product__meta";

    const information =
      document.createElement(
        "div"
      );

    const name =
      document.createElement(
        "h3"
      );

    name.className =
      "filtered-product__name";

    name.textContent =
      product.name;

    const description =
      document.createElement(
        "p"
      );

    description.className =
      "filtered-product__description";

    description.textContent =
      product.description;

    const price =
      document.createElement(
        "p"
      );

    price.className =
      "filtered-product__price";

    price.textContent =
      product.price;

    information.append(
      name,
      description
    );

    metadata.append(
      information,
      price
    );

    article.append(
      visual,
      metadata
    );

    return article;

  }

  function showAllProducts() {

    document.body.classList.remove(
      "collection-is-filtered"
    );

    if (primarySection) {
      primarySection.hidden =
        false;
    }

    if (featuredSection) {
      featuredSection.hidden =
        false;
    }

    if (secondarySection) {
      secondarySection.hidden =
        false;
    }

    if (filteredCatalog) {
      filteredCatalog.hidden =
        true;
    }

    if (filteredGrid) {
      filteredGrid.replaceChildren();
    }

    requestEndSceneSync();

  }

  function showFilteredProducts(filter) {

    if (
      !filteredCatalog ||
      !filteredGrid
    ) {
      return;
    }

    document.body.classList.add(
      "collection-is-filtered"
    );

    if (primarySection) {
      primarySection.hidden =
        true;
    }

    if (featuredSection) {
      featuredSection.hidden =
        true;
    }

    if (secondarySection) {
      secondarySection.hidden =
        true;
    }

    filteredGrid.replaceChildren();

    const matchingProducts =
      products.filter(
        product =>
          product.category ===
          filter
      );

    matchingProducts.forEach(
      product => {

        filteredGrid.appendChild(
          createProductCard(product)
        );

      }
    );

    filteredCatalog.hidden =
      false;

    requestAnimationFrame(
      () => {

        requestAnimationFrame(
          requestEndSceneSync
        );

      }
    );

  }

  function setFilter(
    filter,
    options = {}
  ) {

    const {
      updateUrl = true
    } = options;

    const safeFilter =
      validFilters.has(filter)
        ? filter
        : "all";

    updateFilterButtons(
      safeFilter
    );

    if (
      safeFilter === "all"
    ) {

      showAllProducts();

    } else {

      showFilteredProducts(
        safeFilter
      );

    }

    if (updateUrl) {

      updateFilterUrl(
        safeFilter
      );

    }

  }

  filters.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          setFilter(
            button.dataset.filter
          );

        }
      );

    }
  );

  window.addEventListener(
    "popstate",
    () => {

      setFilter(
        getFilterFromUrl(),
        {
          updateUrl: false
        }
      );

    }
  );

  function addFeaturedCoffee() {

    const selectedGrind =
      document.querySelector(
        'input[name="featured-grind"]:checked'
      );

    const grind =
      selectedGrind
        ? selectedGrind.value
        : "En grano";

    const cart =
      getCart();

    const id =
      grind === "Molido"
        ? "cafe-nour-molido"
        : "cafe-nour-en-grano";

    const existing =
      cart.find(
        item =>
          item.id === id
      );

    if (existing) {

      existing.quantity += 1;

    } else {

      cart.push({
        id,
        productId: id,
        name: "Café NOUR",
        price: 11,
        quantity: 1,
        variant: grind,
        image: "assets/images/cafe-nour.webp"
      });

    }

    saveCart(
      cart
    );

    if (featuredStatus) {

      featuredStatus.hidden =
        false;

      featuredStatus.textContent =
        `${grind} añadido a tu cesta.`;

      window.clearTimeout(
        addFeaturedCoffee.statusTimer
      );

      addFeaturedCoffee.statusTimer =
        window.setTimeout(
          () => {

            featuredStatus.hidden =
              true;

          },
          2600
        );

    }

  }

  featuredAdd?.addEventListener(
    "click",
    addFeaturedCoffee
  );

  function syncGrindCursor() {

    document
      .querySelectorAll(
        ".collection-featured__pill"
      )
      .forEach(
        label => {

          const input =
            label.querySelector(
              'input[type="radio"]'
            );

          if (
            input?.checked
          ) {

            label.dataset.cursorColor =
              "wine-burgundy";

          } else {

            label.removeAttribute(
              "data-cursor-color"
            );

          }

        }
      );

  }

  grindInputs.forEach(
    input => {

      input.addEventListener(
        "change",
        syncGrindCursor
      );

    }
  );

  newsletterForm?.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const email =
        newsletterForm.querySelector(
          'input[type="email"]'
        );

      if (
        !email ||
        !email.checkValidity()
      ) {

        email?.reportValidity();

        return;
      }

      newsletterForm.reset();

      if (
        newsletterSuccess
      ) {

        newsletterSuccess.hidden =
          false;

        requestEndSceneSync();

      }

    }
  );

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

  function initCollection() {

    prepareEditorialProducts();

    linkEditorialProducts();

    setFilter(
      getFilterFromUrl(),
      {
        updateUrl: false
      }
    );

    updateCartCount();

    syncGrindCursor();

    requestEndSceneSync();

  }

  initCollection();

})();