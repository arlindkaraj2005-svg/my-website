(function () {
  const data = window.TabachinoData;
  const storage = window.TabachinoStorage;

  if (!data || !storage) {
    throw new Error("TabachinoData and TabachinoStorage must be loaded before UI helpers.");
  }

  const { formatPrice } = data;

  function createElement(tagName, className) {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    return element;
  }

  function clearChildren(element) {
    element.replaceChildren();
  }

  function renderEmptyState(container, message) {
    const emptyState = createElement("p", "empty-state");
    emptyState.textContent = message;
    clearChildren(container);
    container.appendChild(emptyState);
  }

  function renderProductCard(product) {
    const card = createElement("article", "product-card");

    const image = createElement("img");
    image.src = product.image;
    image.alt = product.alt || product.name;
    image.loading = "lazy";

    const title = createElement("h3");
    title.textContent = product.name;

    const price = createElement("p", "product-price");
    price.textContent = formatPrice(product.price);

    const button = createElement("button", "add-to-cart-btn");
    button.type = "button";
    button.textContent = "Add to Cart";
    button.dataset.productId = product.id;
    button.dataset.productName = product.name;
    button.dataset.productPrice = String(product.price);
    button.dataset.productImage = product.image;
    button.dataset.productAlt = product.alt || product.name;

    card.append(image, title, price, button);
    return card;
  }

  function renderProductList(container, products, onAddToCart) {
    clearChildren(container);

    if (!products.length) {
      renderEmptyState(container, "No products available.");
      return;
    }

    products.forEach((product) => {
      const card = renderProductCard(product);
      const button = card.querySelector("button");
      button.addEventListener("click", () => onAddToCart(product));
      container.appendChild(card);
    });
  }

  function renderCartItems(container, cartItems, onRemoveItem) {
    clearChildren(container);

    if (!cartItems.length) {
      renderEmptyState(container, "Your cart is empty.");
      return;
    }

    cartItems.forEach((item, index) => {
      const row = createElement("article", "cart-item");

      const name = createElement("h3");
      name.textContent = item.name;

      const price = createElement("p", "product-price");
      price.textContent = formatPrice(item.price);

      const button = createElement("button", "remove-btn");
      button.type = "button";
      button.textContent = "Remove";
      button.addEventListener("click", () => onRemoveItem(index));

      row.append(name, price, button);
      container.appendChild(row);
    });
  }

  function renderAdminProductList(container, products, onDeleteProduct) {
    clearChildren(container);

    if (!products.length) {
      renderEmptyState(container, "No products saved yet.");
      return;
    }

    products.forEach((product, index) => {
      const row = createElement("article", "admin-product");

      const name = createElement("h3");
      name.textContent = product.name;

      const price = createElement("p", "product-price");
      price.textContent = formatPrice(product.price);

      const button = createElement("button", "delete-btn");
      button.type = "button";
      button.textContent = "Delete";
      button.addEventListener("click", () => onDeleteProduct(index));

      row.append(name, price, button);
      container.appendChild(row);
    });
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = value;
    }
  }

  window.TabachinoUI = {
    renderProductList,
    renderCartItems,
    renderAdminProductList,
    renderEmptyState,
    setText
  };
})();
