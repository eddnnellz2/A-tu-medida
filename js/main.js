// Módulos
import { initCart } from './cart.js';
import { initAuth } from './auth.js';

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Sistema de carrito
    initCart();
    
    // Autenticación
    initAuth();
    
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
    
    console.log('Sitio cargado correctamente');
});
