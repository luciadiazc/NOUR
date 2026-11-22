"use strict";

const NOUR_PRODUCTS = {

  "nour-01": {
    id: "nour-01",
    category: "publicaciones",
    categoryLabel: "PUBLICACIONES",
    name: "Orígenes",
    titleLines: ["Orígenes"],
    meta: "NOUR NÚM. 00",
    description: "El primer número del archivo editorial de NOUR.",
    price: 18,
    images: [
      "assets/images/portada-nour-00.webp"
    ],
    details: [
      {
        label: "DESCRIPCIÓN",
        text: "El primer número del archivo editorial de NOUR."
      },
      {
        label: "ENVÍO Y RECOGIDA",
        text: "Las opciones disponibles se muestran durante el proceso de compra."
      },
      {
        label: "EDICIÓN",
        text: "NOUR NÚM. 00 — Orígenes."
      }
    ]
  },

  "cafe-nour-en-grano": {
    id: "cafe-nour-en-grano",
    category: "cafe",
    categoryLabel: "CAFÉ",
    name: "Café NOUR",
    titleLines: ["Café", "NOUR"],
    meta: "250gr",
    description: "El café que servimos en NOUR, también para preparar en casa.",
    price: 12,
    images: [
      "assets/images/cafe-nour.webp"
    ],
    details: [
      {
        label: "DESCRIPCIÓN",
        text: "El café que servimos en NOUR, también para preparar en casa."
      },
      {
        label: "ENVÍO Y RECOGIDA",
        text: "Las opciones disponibles se muestran durante el proceso de compra."
      },
      {
        label: "CONSERVACIÓN",
        text: "Conservar cerrado, en un lugar fresco y seco, " +
          "alejado de la humedad y de fuentes de calor."
      }
    ]
  },

  "tote-nour": {
    id: "tote-nour",
    category: "merch",
    categoryLabel: "MERCH",
    name: "Tote Bag NOUR",
    titleLines: ["Tote Bag", "NOUR"],
    meta: "Algodón natural",
    description: "Tote Bag NOUR en algodón natural.",
    price: 14,
    images: [
      "assets/images/tote-1.webp",
      "assets/images/tote-2.webp",
      "assets/images/tote-3.webp"
    ],
    details: [
      {
        label: "DESCRIPCIÓN",
        text: "Tote Bag NOUR en algodón natural."
      },
      {
        label: "ENVÍO Y RECOGIDA",
        text: "Las opciones disponibles se muestran durante el proceso de compra."
      },
      {
        label: "MATERIAL",
        text: "Algodón natural."
      }
    ]
  },

  "lanyard-nour": {
    id: "lanyard-nour",
    category: "merch",
    categoryLabel: "MERCH",
    name: "Lanyard NOUR",
    titleLines: ["Lanyard", "NOUR"],
    meta: "NOUR",
    description: "Lanyard NOUR.",
    price: 8,
    images: [
      "assets/images/lanyard-1.webp",
      "assets/images/lanyard-2.webp",
      "assets/images/lanyard-3.webp"
    ],
    details: [
      {
        label: "DESCRIPCIÓN",
        text: "Lanyard NOUR."
      },
      {
        label: "ENVÍO Y RECOGIDA",
        text: "Las opciones disponibles se muestran durante el proceso de compra."
      }
    ]
  },

  "cafe-colombia": {
    id: "cafe-colombia",
    category: "cafe",
    categoryLabel: "CAFÉ",
    name: "Café NOUR | Colombia",
    titleLines: ["Café NOUR", "Colombia"],
    meta: "Molido · 250gr",
    description: "Café NOUR, edición Colombia.",
    price: 12,
    images: [
      "assets/images/cafe-colombia.webp"
    ],
    details: [
      {
        label: "DESCRIPCIÓN",
        text: "Café NOUR, edición Colombia."
      },
      {
        label: "ENVÍO Y RECOGIDA",
        text: "Las opciones disponibles se muestran durante el proceso de compra."
      },
      {
        label: "CONSERVACIÓN",
        text: "Conservar cerrado, en un lugar fresco y seco, " +
          "alejado de la humedad y de fuentes de calor."
      }
    ]
  },

  "taza-nour": {
    id: "taza-nour",
    category: "merch",
    categoryLabel: "MERCH",
    name: "Taza NOUR",
    titleLines: ["Taza", "NOUR"],
    meta: "Cerámica",
    description: "Taza NOUR de cerámica.",
    price: 16,
    images: [
      "assets/images/taza-1.webp",
      "assets/images/taza-2.webp",
      "assets/images/taza-3.webp"
    ],
    details: [
      {
        label: "DESCRIPCIÓN",
        text: "Taza NOUR de cerámica."
      },
      {
        label: "ENVÍO Y RECOGIDA",
        text: "Las opciones disponibles se muestran durante el proceso de compra."
      },
      {
        label: "MATERIAL",
        text: "Cerámica."
      }
    ]
  },

  "journal-nour": {
    id: "journal-nour",
    category: "merch",
    categoryLabel: "MERCH",
    name: "Journal NOUR",
    titleLines: ["Journal", "NOUR"],
    meta: "Oliva",
    description: "Journal NOUR en acabado oliva.",
    price: 14,
    images: [
      "assets/images/journal-1.webp",
      "assets/images/journal-2.webp",
      "assets/images/journal-3.webp"
    ],
    details: [
      {
        label: "DESCRIPCIÓN",
        text: "Journal NOUR en acabado oliva."
      },
      {
        label: "ENVÍO Y RECOGIDA",
        text: "Las opciones disponibles se muestran durante el proceso de compra."
      },
      {
        label: "ACABADO",
        text: "Oliva."
      }
    ]
  },

  "cafe-brasil": {
    id: "cafe-brasil",
    category: "cafe",
    categoryLabel: "CAFÉ",
    name: "Café NOUR | Brasil",
    titleLines: ["Café NOUR", "Brasil"],
    meta: "En grano · 250gr",
    description: "Café NOUR, edición Brasil.",
    price: 16,
    images: [
      "assets/images/cafe-brasil.webp"
    ],
    details: [
      {
        label: "DESCRIPCIÓN",
        text: "Café NOUR, edición Brasil."
      },
      {
        label: "ENVÍO Y RECOGIDA",
        text: "Las opciones disponibles se muestran durante el proceso de compra."
      },
      {
        label: "CONSERVACIÓN",
        text: "Conservar cerrado, en un lugar fresco y seco, " +
          "alejado de la humedad y de fuentes de calor."
      }
    ]
  },

  "gorra-nour": {
    id: "gorra-nour",
    category: "merch",
    categoryLabel: "MERCH",
    name: "Gorra NOUR",
    titleLines: ["Gorra", "NOUR"],
    meta: "Burdeos",
    description: "Gorra NOUR en color burdeos.",
    price: 24,
    images: [
      "assets/images/gorra-1.webp",
      "assets/images/gorra-2.webp",
      "assets/images/gorra-3.webp",
      "assets/images/gorra-4.webp"
    ],
    details: [
      {
        label: "DESCRIPCIÓN",
        text: "Gorra NOUR en color burdeos."
      },
      {
        label: "ENVÍO Y RECOGIDA",
        text: "Las opciones disponibles se muestran durante el proceso de compra."
      },
      {
        label: "COLOR",
        text: "Burdeos."
      }
    ]
  },

  "camiseta-nour": {
    id: "camiseta-nour",
    category: "merch",
    categoryLabel: "MERCH",
    name: "Camiseta NOUR",
    titleLines: ["Camiseta", "NOUR"],
    meta: "Crudo",
    description: "Camiseta NOUR en color crudo.",
    price: 35,
    images: [
      "assets/images/nour-space.png",
      "assets/images/nour-space.png",
      "assets/images/nour-space.png"
    ],
    details: [
      {
        label: "DESCRIPCIÓN",
        text: "Camiseta NOUR en color crudo."
      },
      {
        label: "ENVÍO Y RECOGIDA",
        text: "Las opciones disponibles se muestran durante el proceso de compra."
      },
      {
        label: "COLOR",
        text: "Crudo."
      }
    ]
  },

  "cafe-nour-molido": {
    id: "cafe-nour-molido",
    category: "cafe",
    categoryLabel: "CAFÉ",
    name: "Café NOUR",
    titleLines: ["Café", "NOUR"],
    meta: "250gr",
    description: "El café que servimos en NOUR, también para preparar en casa.",
    price: 11,
    images: [
      "assets/images/cafe-nour.webp"
    ],
    option: {
      label: "MOLIENDA",
      values: [
        "En grano",
        "Molido"
      ],
      defaultValue: "En grano"
    },
    details: [
      {
        label: "DESCRIPCIÓN",
        text: "El café que servimos en NOUR, también para preparar en casa."
      },
      {
        label: "ENVÍO Y RECOGIDA",
        text: "Las opciones disponibles se muestran durante el proceso de compra."
      },
      {
        label: "CONSERVACIÓN",
        text: "Conservar cerrado, en un lugar fresco y seco, " +
          "alejado de la humedad y de fuentes de calor."
      }
    ]
  }

};

window.NOUR_PRODUCTS =
  NOUR_PRODUCTS;