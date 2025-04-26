// Configura Supabase
const SUPABASE_URL = 'https://yxcttkfhxzcuqjsjmsmd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Configura Socket.io (reemplaza con tu URL de Render)
const socket = io('https://tuservidor-chat.onrender.com');

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const categoryFilter = document.getElementById('category-filter');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const chatContainer = document.getElementById('chat-container');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');

// Cargar productos iniciales
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    checkAuth();
});

// Función para cargar productos
async function loadProducts(category = 'all') {
    let query = supabase.from('productos').select(`
        nombre, precio, imagen_url, categoria,
        artesanos (nombre, ubicacion, avatar_url)
    `);

    if (category !== 'all') {
        query = query.eq('categoria', category);
    }

    const { data: productos, error } = await query;

    if (error) {
        console.error('Error loading products:', error);
        return;
    }

    renderProducts(productos);
}

// Renderizar productos
function renderProducts(productos) {
    productsGrid.innerHTML = productos.map(product => `
        <div class="product-card">
            <img src="${product.imagen_url}" alt="${product.nombre}" loading="lazy">
            <div class="product-info">
                <h3>${product.nombre}</h3>
                <div class="artisan-info">
                    <img src="${product.artesanos.avatar_url}" class="artisan-avatar">
                    <span>Por: ${product.artesanos.nombre}</span>
                </div>
                <div class="price">$${product.precio.toFixed(2)}</div>
                <button class="btn-contact" data-artisan-id="${product.artesano_id}">
                    <i class="fas fa-comments"></i> Contactar
                </button>
            </div>
        </div>
    `).join('');

    // Eventos para botones de contacto
    document.querySelectorAll('.btn-contact').forEach(btn => {
        btn.addEventListener('click', () => {
            chatContainer.classList.remove('hidden');
        });
    });
}

// Autenticación
async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        loginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
    }
}

loginBtn.addEventListener('click', async () => {
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.href }
    });
    if (error) alert('Error al iniciar sesión: ' + error.message);
});

logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.reload();
});

// Chat
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.value) {
        socket.emit('mensaje', { 
            user: 'Usuario', 
            text: e.target.value 
        });
        e.target.value = '';
    }
});

socket.on('nuevo_mensaje', (data) => {
    messagesDiv.innerHTML += `<p><strong>${data.user}:</strong> ${data.text}</p>`;
});

// Filtros
categoryFilter.addEventListener('change', (e) => {
    loadProducts(e.target.value);
});

