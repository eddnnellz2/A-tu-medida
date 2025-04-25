import { db } from './firebase-config.js';

let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(product) {
  cart.push(product);
  updateCart();
}

export function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  document.getElementById('cartCount').textContent = cart.length;
  
  // Renderizar items del carrito
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <p>${item.name} - ${item.price}</p>
    </div>
  `).join('');
}

// Event listeners
document.getElementById('cartIcon').addEventListener('click', () => {
  document.getElementById('cartModal').style.display = 'block';
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
  alert('Redirigiendo a pasarela de pago');
});
