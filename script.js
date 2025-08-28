// script.js

const menuData = {};

function loadMenu(lang) {
    const langData = menuData[lang];
    if (!langData) {
        console.error(`Idioma '${lang}' no encontrado.`);
        return;
    }

    // Actualiza los elementos HTML estáticos
    document.querySelector('.restaurant-name').textContent = langData.restaurantName;
    document.querySelector('.slogan').textContent = langData.slogan;
    document.querySelector('.daily-special-section .category-title').textContent = langData.dailySpecialTitle;
    document.querySelector('.main-dishes-section .category-title').textContent = langData.mainDishesTitle;
    document.querySelector('.footer p').textContent = langData.footerText;

    // Carga el plato del día
    displayDishes([langData.dailySpecial], '.daily-special-section');

    // Carga los platos principales
    displayDishes(langData.mainDishes, '.main-dishes-section');
}

function displayDishes(dishes, containerSelector) {
    const container = document.querySelector(containerSelector);
    let dishesHTML = '';

    dishes.forEach(dish => {
        dishesHTML += `
            <div class="card">
                <img src="${dish.image}" alt="${dish.name}">
                <div class="card-body">
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                </div>
                <span class="item-price">${dish.price}</span>
            </div>
        `;
    });
    container.innerHTML += dishesHTML;
}

async function fetchMenuData() {
    try {
        const response = await fetch('menu-data.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo del menú.');
        }
        const data = await response.json();
        Object.assign(menuData, data);

        const langButtons = document.querySelectorAll('.language-switcher button');
        langButtons.forEach(button => {
            button.addEventListener('click', () => {
                langButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                loadMenu(button.dataset.lang);
            });
        });

        document.querySelector('button[data-lang="es"]').classList.add('active');
        loadMenu('es');

    } catch (error) {
        console.error("Error al cargar los datos del menú:", error);
    }
}

document.addEventListener('DOMContentLoaded', fetchMenuData);