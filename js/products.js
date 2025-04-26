export function loadFeaturedProducts() {
    // En una implementación real, esto vendría de una API
    const products = [
        {
            id: 1,
            name: "Mesa de Roble",
            price: 350,
            artisan: "Juan Pérez",
            image: "images/mesa-roble.jpg"
        },
        {
            id: 2,
            name: "Sillón de Cuero",
            price: 280,
            artisan: "María González",
            image: "images/sillon-cuero.jpg"
        }
    ];
    
    console.log('Productos cargados:', products);
