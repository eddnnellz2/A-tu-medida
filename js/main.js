import { initCart } from './cart.js';
import { initAuth } from './auth.js';
import { loadFeaturedProducts } from './products.js';

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initCart();
    initAuth();
    loadFeaturedProducts();
    
    // Menú activo
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
