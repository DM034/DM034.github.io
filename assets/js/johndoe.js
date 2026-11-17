'use strict';

// Native smooth navigation and Bootstrap 5 collapse support.
document.addEventListener('click', (event) => {
    const link = event.target.closest('.navbar .nav-link[href^="#"]');
    if (!link) return;

    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    history.replaceState(null, '', link.getAttribute('href'));

    const menu = document.getElementById('navbarSupportedContent');
    if (menu && menu.classList.contains('show') && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
});
