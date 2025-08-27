// Objeto que contiene todos los datos del menú, organizados por idioma.
// Puedes agregar más idiomas como 'en' (inglés), 'pt' (portugués), etc.
const menuData = {
    es: { // Español
        restaurantName: "[Nombre del Restaurante]",
        slogan: "El sabor de Villa Carlos Paz en tu pantalla",
        dailySpecialTitle: "Plato del Día",
        dailySpecial: {
            name: "Milanesa a Caballo",
            description: "Milanesa de ternera rebozada, cubierta con dos huevos fritos y acompañada de papas fritas caseras.",
            price: "$9.800"
        },
        mainDishesTitle: "Platos Principales",
        mainDishes: [
            {
                name: "Lomo a la Pimienta",
                description: "Un clásico irresistible de lomo tierno en salsa cremosa de pimienta negra, con puré de papas.",
                price: "$11.500"
            },
            {
                name: "Ravioles de Calabaza",
                description: "Ravioles caseros rellenos de calabaza asada y especias, con una suave salsa de manteca y salvia.",
                price: "$10.200"
            }
        ],
        footerText: "© 2025 [Nombre del Restaurante].",
        // Aquí puedes seguir agregando más secciones y platos
        // Por ejemplo:
        // beveragesTitle: "Bebidas",
        // dessertsTitle: "Postres",
    },
    en: { // Inglés
        restaurantName: "[Restaurant Name]",
        slogan: "The taste of Villa Carlos Paz on your screen",
        dailySpecialTitle: "Daily Special",
        dailySpecial: {
            name: "Argentinian Style Steak",
            description: "Breaded beef steak topped with two fried eggs and served with homemade french fries.",
            price: "$9.800"
        },
        mainDishesTitle: "Main Courses",
        mainDishes: [
            {
                name: "Loin Steak with Pepper Sauce",
                description: "An irresistible classic of tender loin steak in a creamy black pepper sauce, with mashed potatoes.",
                price: "$11.500"
            },
            {
                name: "Pumpkin Ravioli",
                description: "Homemade ravioli filled with roasted pumpkin and spices, with a delicate butter and sage sauce.",
                price: "$10.200"
            }
        ],
        footerText: "© 2025 [Restaurant Name].",
    }
};

// Esta función carga el contenido del menú
function loadMenu(lang) {
    const data = menuData[lang];

    // Actualiza los elementos HTML con el texto del idioma seleccionado
    document.querySelector('.restaurant-name').textContent = data.restaurantName;
    document.querySelector('.slogan').textContent = data.slogan;
    document.querySelector('.daily-special-section .category-title').textContent = data.dailySpecialTitle;
    document.querySelector('.daily-special .item-name').textContent = data.dailySpecial.name;
    document.querySelector('.daily-special .item-description').textContent = data.dailySpecial.description;
    document.querySelector('.daily-special .item-price').textContent = data.dailySpecial.price;
    document.querySelector('.main-dishes-section .category-title').textContent = data.mainDishesTitle;
    document.querySelector('.footer').textContent = data.footerText;
    
    // Aquí actualizamos los platos principales de manera dinámica
    const mainDishesContainer = document.querySelector('.main-dishes-container'); // Necesitas agregar este ID en tu HTML
    mainDishesContainer.innerHTML = ''; // Limpiamos el contenido anterior
    
    data.mainDishes.forEach(dish => {
        const itemHTML = `
            <div class="menu-item">
                <div class="item-details">
                    <h3 class="item-name">${dish.name}</h3>
                    <p class="item-description">${dish.description}</p>
                </div>
                <span class="item-price">${dish.price}</span>
            </div>
        `;
        mainDishesContainer.innerHTML += itemHTML;
    });
}

// Escucha el evento de carga de la página
document.addEventListener('DOMContentLoaded', () => {
    // Carga el menú en español por defecto
    loadMenu('es');
});