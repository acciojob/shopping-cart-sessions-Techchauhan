// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Utility function to get cart data from session storage
function getCartFromSession() {
  const cart = sessionStorage.getItem("shoppingCart");
  return cart ? JSON.parse(cart) : [];
}

// Utility function to save cart data to session storage
function saveCartToSession(cart) {
  sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Add click event to all "Add to Cart" buttons
  productList.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart-btn")) {
      const productId = parseInt(event.target.dataset.id, 10);
      addToCart(productId);
    }
  });
}

// Render cart list
function renderCart() {
  const cart = getCartFromSession();
  cartList.innerHTML = ""; // Clear the existing cart list
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price} 
      <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  // Add click event to all "Remove" buttons
  cartList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-from-cart-btn")) {
      const productId = parseInt(event.target.dataset.id, 10);
      removeFromCart(productId);
    }
  });
}

// Add item to cart
function addToCart(productId) {
  const cart = getCartFromSession();
  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push(product);
    saveCartToSession(cart);
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = getCartFromSession();
  cart = cart.filter((item) => item.id !== productId);
  saveCartToSession(cart);
  renderCart();
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("shoppingCart");
  renderCart();
}

// Attach event listener to "Clear Cart" button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
