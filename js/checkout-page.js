(function () {
  const storage = window.TabachinoStorage;
  const ui = window.TabachinoUI;

  if (!storage || !ui) {
    throw new Error("Shared Tabachino modules must load before the checkout page script.");
  }

  function updateCartCount() {
    ui.setText("#cart-count", String(storage.getCart().length));
  }

  function renderOrderSummary() {
    const summaryContainer = document.getElementById("order-summary");

    if (!summaryContainer) {
      return;
    }

    const cartItems = storage.getCart();

    if (!cartItems.length) {
      summaryContainer.textContent = "Your cart is empty.";
      return;
    }

    const total = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
    const itemCount = cartItems.length;
    summaryContainer.textContent = `${itemCount} item${itemCount === 1 ? "" : "s"} • ${window.TabachinoData.formatPrice(total)}`;
  }

  function showMessage(message, type) {
    const messageBox = document.getElementById("checkout-message");

    if (!messageBox) {
      window.alert(message);
      return;
    }

    messageBox.textContent = message;
    messageBox.className = `checkout-message ${type}`;
  }

  function handleCheckoutSubmit(event) {
    event.preventDefault();

    const cartItems = storage.getCart();

    if (!cartItems.length) {
      showMessage("Your cart is empty. Add items before checking out.", "error");
      return;
    }

    storage.clearCart();
    updateCartCount();
    renderOrderSummary();
    showMessage("Order placed successfully. Thanks for shopping with Tabachino A&E.", "success");
    event.currentTarget.reset();
  }

  function initCheckoutPage() {
    const form = document.getElementById("checkout-form");

    if (!form) {
      return;
    }

    form.addEventListener("submit", handleCheckoutSubmit);
    updateCartCount();
    renderOrderSummary();
  }

  document.addEventListener("DOMContentLoaded", initCheckoutPage);
})();
