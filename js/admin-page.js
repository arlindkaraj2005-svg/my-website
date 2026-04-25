(function () {
  const data = window.TabachinoData;
  const storage = window.TabachinoStorage;
  const ui = window.TabachinoUI;

  if (!data || !storage || !ui) {
    throw new Error("Shared Tabachino modules must load before the admin page script.");
  }

  function loadFormValues() {
    return {
      name: document.getElementById("name")?.value.trim() || "",
      price: document.getElementById("price")?.value.trim() || "",
      image: document.getElementById("image")?.value.trim() || "",
      alt: document.getElementById("alt")?.value.trim() || ""
    };
  }

  function clearForm() {
    const form = document.getElementById("product-form");
    if (form) {
      form.reset();
    }
  }

  function showAdminMessage(message, type) {
    const messageBox = document.getElementById("admin-message");

    if (!messageBox) {
      window.alert(message);
      return;
    }

    messageBox.textContent = message;
    messageBox.className = `admin-message ${type}`;
  }

  function renderProducts() {
    const container = document.getElementById("admin-products");

    if (!container) {
      return;
    }

    const products = storage.getProducts();
    ui.renderAdminProductList(container, products, (index) => {
      const updatedProducts = storage.getProducts();
      updatedProducts.splice(index, 1);
      storage.setProducts(updatedProducts);
      renderProducts();
      showAdminMessage("Product deleted.", "success");
    });
  }

  function handleAddProduct(event) {
    event.preventDefault();

    const values = loadFormValues();

    if (!values.name || !values.price || !values.image) {
      showAdminMessage("Fill in product name, price, and image.", "error");
      return;
    }

    const price = Number(values.price);

    if (!Number.isFinite(price) || price <= 0) {
      showAdminMessage("Enter a valid product price.", "error");
      return;
    }

    const currentProducts = storage.getProducts();
    const newProduct = {
      id: data.createProductId(values.name),
      name: values.name,
      price,
      image: values.image,
      alt: values.alt || values.name
    };

    storage.setProducts([...currentProducts, newProduct]);
    renderProducts();
    clearForm();
    showAdminMessage("Product added successfully.", "success");
  }

  function initAdminPage() {
    const form = document.getElementById("product-form");

    if (!form) {
      return;
    }

    form.addEventListener("submit", handleAddProduct);
    renderProducts();
  }

  document.addEventListener("DOMContentLoaded", initAdminPage);
})();
