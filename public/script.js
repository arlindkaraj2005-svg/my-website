let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [
  { name: "Marlboro Red", price: 8, image: "https://via.placeholder.com/200" },
  { name: "Davidoff Gold", price: 10, image: "https://via.placeholder.com/200" }
];

// ---------------- CART ----------------
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart!");
}

function updateCartCount() {
  let count = document.getElementById("cart-count");
  if (count) count.innerText = cart.length;
}

function loadCart() {
  let container = document.getElementById("cart-items");
  if (!container) return;

  let total = 0;
  container.innerHTML = "";

  cart.forEach((item, index) => {
    let div = document.createElement("div");
    div.innerHTML = `
      <p>${item.name} - $${item.price}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    container.appendChild(div);
    total += item.price;
  });

  document.getElementById("total").innerText = "Total: $" + total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

// ---------------- PRODUCTS ----------------
function displayProducts() {
  let container = document.getElementById("product-list");
  if (!container) return;

  container.innerHTML = "";

  products.forEach(p => {
    let div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

// ---------------- ADMIN ----------------
function addProduct() {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let image = document.getElementById("image").value;

  if (!name || !price || !image) {
    alert("Fill all fields");
    return;
  }

  products.push({ name, price: Number(price), image });
  localStorage.setItem("products", JSON.stringify(products));

  alert("Product added!");
  loadAdminProducts();
}

function loadAdminProducts() {
  let container = document.getElementById("admin-products");
  if (!container) return;

  container.innerHTML = "";

  products.forEach((p, index) => {
    let div = document.createElement("div");
    div.innerHTML = `
      <p>${p.name} - $${p.price}</p>
      <button onclick="deleteProduct(${index})">Delete</button>
    `;
    container.appendChild(div);
  });
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  loadAdminProducts();
}

// ---------------- CHECKOUT ----------------
function placeOrder(e) {
  e.preventDefault();
  alert("Order placed successfully!");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

// ---------------- INIT ----------------
updateCartCount();
loadCart();
displayProducts();
loadAdminProducts();