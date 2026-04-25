(function () {
  const STORAGE_KEYS = {
    cart: "tabachino-cart",
    products: "tabachino-products"
  };

  const DEFAULT_PRODUCTS = [
    {
      id: "marlboro-red",
      name: "Marlboro E Kuqe",
      price: 500,
      image: "assets/marlboro-red.jpg",
      alt: "Marlboro Red"
    },
    {
      id: "marlboro-gold",
      name: "Marlboro Gold",
      price: 420,
      image: "assets/marlboro-gold.jpg",
      alt: "Marlboro Gold"
    },
    {
      id: "ocb-rizla",
      name: "Rizla OCB",
      price: 150,
      image: "assets/ocb rizla.jpg",
      alt: "Rolling Paper"
    }
  ];

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function createProductId(name) {
    const base = slugify(name) || "product";
    return `${base}-${Date.now().toString(36)}`;
  }

  function formatPrice(value) {
    const numericValue = Number(value);
    const safeValue = Number.isFinite(numericValue) ? numericValue : 0;
    return `${safeValue.toLocaleString("en-US")} Lek`;
  }

  function normalizeProduct(product, fallbackIndex = 0) {
    if (!product || typeof product !== "object") {
      return null;
    }

    const name = String(product.name || "").trim();
    const price = Number(product.price);

    if (!name || !Number.isFinite(price)) {
      return null;
    }

    const image = String(product.image || "").trim();
    const alt = String(product.alt || name).trim();
    const id = String(product.id || "").trim() || slugify(name) || `product-${fallbackIndex + 1}`;

    return {
      id,
      name,
      price,
      image,
      alt
    };
  }

  function normalizeCartItem(item, fallbackIndex = 0) {
    if (!item || typeof item !== "object") {
      return null;
    }

    const name = String(item.name || "").trim();
    const price = Number(item.price);

    if (!name || !Number.isFinite(price)) {
      return null;
    }

    const image = String(item.image || "").trim();
    const alt = String(item.alt || name).trim();
    const id = String(item.id || "").trim() || `cart-${slugify(name) || "item"}-${fallbackIndex + 1}`;

    return {
      id,
      name,
      price,
      image,
      alt
    };
  }

  function cloneProducts(products) {
    return products.map((product, index) => normalizeProduct(product, index)).filter(Boolean);
  }

  window.TabachinoData = {
    STORAGE_KEYS,
    DEFAULT_PRODUCTS: cloneProducts(DEFAULT_PRODUCTS),
    slugify,
    createProductId,
    formatPrice,
    normalizeProduct,
    normalizeCartItem,
    cloneProducts
  };
})();
