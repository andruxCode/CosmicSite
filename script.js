const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const langToggle = document.getElementById('langToggle');
const menuToggle = document.getElementById('menuToggle');
const menuPanel = document.getElementById('menuPanel');

let currentLang = localStorage.getItem('cosmic-language') === 'ru' ? 'ru' : 'en';

function applyLanguage() {
    document.documentElement.lang = currentLang;
    langToggle.textContent = currentLang.toUpperCase();

    document.querySelectorAll('[data-en]').forEach(element => {
        const translation = element.getAttribute(`data-${currentLang}`);
        const icon = element.querySelector('i');

        if (icon) {
            element.replaceChildren(icon, document.createTextNode(` ${translation}`));
        } else {
            element.textContent = translation;
        }
    });
}

function applyTheme() {
    const isLightTheme = localStorage.getItem('cosmic-theme') === 'light';
    document.body.classList.toggle('light-theme', isLightTheme);
    themeIcon.className = isLightTheme ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
}

menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    menuPanel.hidden = isExpanded;
});

menuPanel.addEventListener('click', event => {
    if (event.target.closest('a')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuPanel.hidden = true;
    }
});

document.addEventListener('click', event => {
    if (!menuToggle.contains(event.target) && !menuPanel.contains(event.target)) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuPanel.hidden = true;
    }
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuPanel.hidden = true;
    }
});

themeToggle.addEventListener('click', () => {
    const isLightTheme = !document.body.classList.contains('light-theme');
    localStorage.setItem('cosmic-theme', isLightTheme ? 'light' : 'dark');
    applyTheme();
});

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    localStorage.setItem('cosmic-language', currentLang);
    applyLanguage();
});

applyTheme();
applyLanguage();
