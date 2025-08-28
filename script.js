// script.js (Código actualizado y completo)

const menuData = {}; // Objeto vacío para almacenar los datos cargados desde el JSON

// Esta función carga el contenido del menú en base al idioma y los datos
function loadMenu(lang) {
    const langData = menuData[lang];
    if (!langData) {
        console.error(`Idioma '${lang}' no encontrado.`);
        return;
    }

    // Actualiza los elementos HTML con el texto del idioma seleccionado
    document.querySelector('.restaurant-name').textContent = langData.restaurantName;
    document.querySelector('.slogan').textContent = langData.slogan;
    document.querySelector('.daily-special-section .category-title').textContent = langData.dailySpecialTitle;
    document.querySelector('.daily-special .item-name').textContent = langData.dailySpecial.name;
    document.querySelector('.daily-special .item-description').textContent = langData.dailySpecial.description;
    document.querySelector('.daily-special .item-price').textContent = langData.dailySpecial.price;
    document.querySelector('.main-dishes-section .category-title').textContent = langData.mainDishesTitle;
    document.querySelector('.footer p').textContent = langData.footerText;

    // Aquí mostramos todos los platos principales al cargar el menú
    displayDishes(langData.mainDishes);
}

// Nueva función para renderizar los platos en el HTML
function displayDishes(dishes) {
    const mainDishesContainer = document.getElementById('menu-grid');
    mainDishesContainer.innerHTML = ''; // Limpiamos el contenido anterior

    dishes.forEach(dish => {
        const itemHTML = `
            <div class="card">
                <img src="${dish.image}" alt="${dish.name}">
                <div class="card-body">
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                    <span class="item-price">${dish.price}</span>
                </div>
            </div>
        `;
        mainDishesContainer.innerHTML += itemHTML;
    });
}

// Lógica para el buscador
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const currentLang = document.querySelector('.language-switcher button.active').dataset.lang;
    const allDishes = menuData[currentLang].mainDishes;
    
    const filteredDishes = allDishes.filter(dish => {
        return dish.name.toLowerCase().includes(searchTerm) || dish.description.toLowerCase().includes(searchTerm);
    });

    displayDishes(filteredDishes);
}

// Esta función carga los datos del menú desde el archivo JSON
async function fetchMenuData() {
    try {
        const response = await fetch('menu-data.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo del menú.');
        }
        const data = await response.json();
        Object.assign(menuData, data); // Almacena los datos en el objeto global

        // Configura los botones de idioma
        const langButtons = document.querySelectorAll('.language-switcher button');
        langButtons.forEach(button => {
            button.addEventListener('click', () => {
                langButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                loadMenu(button.dataset.lang);
            });
        });

        // Configura el buscador
        document.getElementById('buscador').addEventListener('input', handleSearch);

        // Carga el menú en español por defecto
        document.querySelector('button[data-lang="es"]').classList.add('active');
        loadMenu('es');

    } catch (error) {
        console.error("Error al cargar los datos del menú:", error);
    }
}

// Escucha el evento de carga de la página
document.addEventListener('DOMContentLoaded', fetchMenuData);