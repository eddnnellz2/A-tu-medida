import { auth } from './firebase-config.js';
import { addToCart } from './cart.js';

// Login con Email
document.getElementById('loginBtn').addEventListener('click', async () => {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  try {
    await auth.signInWithEmailAndPassword(email, password);
    alert('Bienvenido!');
  } catch (error) {
    alert('Error: ' + error.message);
  }
});

// Login con Google
document.getElementById('googleLogin').addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
});

// Escuchar cambios de autenticación
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById('authModal').style.display = 'none';
  }
});
