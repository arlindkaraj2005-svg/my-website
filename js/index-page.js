(function () {
  const data = window.TabachinoData;
  const storage = window.TabachinoStorage;
  const ui = window.TabachinoUI;

  if (!data || !storage || !ui) {
    throw new Error("Shared Tabachino modules must load before the index page script.");
  }

  function updateCartCount() {
    ui.setText("#cart-count", String(storage.getCart().length));
  }

  function handleAddToCart(product) {
    storage.addCartItem(product);
    updateCartCount();
    window.alert(`${product.name} was added to your cart.`);
  }

  function initIndexPage() {
    const productList = document.getElementById("product-list");

    if (!productList) {
      return;
    }

    const products = storage.getProducts();
    ui.renderProductList(productList, products, handleAddToCart);
    updateCartCount();
  }

  document.addEventListener("DOMContentLoaded", initIndexPage);
})();
