// ============== MÓDULOS ==============
import { initCart } from './cart.js';
import { loadFeaturedProducts } from './api.js';

// ============== FUNCIONES PRINCIPALES ==============
function initMobileMenu() {
    const menuBtn = document.createElement('button');
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    menuBtn.classList.add('mobile-menu-btn');
    menuBtn.addEventListener('click', toggleMenu);
    
    document.querySelector('.main-header .container').prepend(menuBtn);
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

// ============== INICIALIZACIÓN ==============
document.addEventListener('DOMContentLoaded', () => {
    initCart();
    loadFeaturedProducts();
    initMobileMenu();
    
    // Efecto smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
