(function () {
  const data = window.TabachinoData;
  const storage = window.TabachinoStorage;
  const ui = window.TabachinoUI;

  if (!data || !storage || !ui) {
    throw new Error("Shared Tabachino modules must load before the cart page script.");
  }

  function updateCartCount() {
    ui.setText("#cart-count", String(storage.getCart().length));
  }

  function updateCartTotal(cartItems) {
    const total = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
    ui.setText("#cart-total", data.formatPrice(total));
  }

  function updateCheckoutState(cartItems) {
    const checkoutButton = document.getElementById("checkout-button");

    if (!checkoutButton) {
      return;
    }

    const hasItems = cartItems.length > 0;
    checkoutButton.classList.toggle("is-disabled", !hasItems);
    checkoutButton.setAttribute("aria-disabled", String(!hasItems));

    if (!hasItems) {
      checkoutButton.setAttribute("tabindex", "-1");
    } else {
      checkoutButton.removeAttribute("tabindex");
    }
  }

  function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");

    if (!cartItemsContainer) {
      return;
    }

    const cartItems = storage.getCart();

    ui.renderCartItems(cartItemsContainer, cartItems, (index) => {
      storage.removeCartItemAt(index);
      renderCart();
    });

    updateCartCount();
    updateCartTotal(cartItems);
    updateCheckoutState(cartItems);
  }

  function initCartPage() {
    renderCart();
  }

  document.addEventListener("DOMContentLoaded", initCartPage);
})();
