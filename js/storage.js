(function () {
  const data = window.TabachinoData;

  if (!data) {
    throw new Error("TabachinoData must be loaded before storage helpers.");
  }

  const { STORAGE_KEYS, DEFAULT_PRODUCTS, cloneProducts, normalizeCartItem, normalizeProduct } = data;

  function readJSON(key, fallbackValue) {
    const rawValue = localStorage.getItem(key);

    if (!rawValue) {
      return fallbackValue;
    }

    try {
      return JSON.parse(rawValue);
    } catch (error) {
      console.warn(`Could not parse stored value for ${key}`, error);
      return fallbackValue;
    }
  }

  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getProducts() {
    const storedProducts = readJSON(STORAGE_KEYS.products, null);

    if (!Array.isArray(storedProducts) || storedProducts.length === 0) {
      return cloneProducts(DEFAULT_PRODUCTS);
    }

    const normalizedProducts = storedProducts
      .map((product, index) => normalizeProduct(product, index))
      .filter(Boolean);

    return normalizedProducts.length > 0 ? normalizedProducts : cloneProducts(DEFAULT_PRODUCTS);
  }

  function setProducts(products) {
    const normalizedProducts = products
      .map((product, index) => normalizeProduct(product, index))
      .filter(Boolean);

    writeJSON(STORAGE_KEYS.products, normalizedProducts);
    return normalizedProducts;
  }

  function resetProducts() {
    const freshProducts = cloneProducts(DEFAULT_PRODUCTS);
    writeJSON(STORAGE_KEYS.products, freshProducts);
    return freshProducts;
  }

  function getCart() {
    const storedCart = readJSON(STORAGE_KEYS.cart, []);

    if (!Array.isArray(storedCart)) {
      return [];
    }

    return storedCart
      .map((item, index) => normalizeCartItem(item, index))
      .filter(Boolean);
  }

  function setCart(cartItems) {
    const normalizedItems = cartItems
      .map((item, index) => normalizeCartItem(item, index))
      .filter(Boolean);

    writeJSON(STORAGE_KEYS.cart, normalizedItems);
    return normalizedItems;
  }

  function addCartItem(product) {
    const normalizedProduct = normalizeCartItem(product);
    if (!normalizedProduct) {
      return getCart();
    }

    const cart = getCart();
    cart.push(normalizedProduct);
    return setCart(cart);
  }

  function removeCartItemAt(index) {
    const cart = getCart();
    if (!Number.isInteger(index) || index < 0 || index >= cart.length) {
      return cart;
    }

    cart.splice(index, 1);
    return setCart(cart);
  }

  function clearCart() {
    localStorage.removeItem(STORAGE_KEYS.cart);
  }

  window.TabachinoStorage = {
    getProducts,
    setProducts,
    resetProducts,
    getCart,
    setCart,
    addCartItem,
    removeCartItemAt,
    clearCart
  };
})();
