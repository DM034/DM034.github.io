'use strict';

// Native smooth navigation and Bootstrap 5 collapse support.
document.addEventListener('click', (event) => {
    const link = event.target.closest('.navbar .nav-link[href^="#"]');
    if (!link) return;

    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    event.preventDefault();
    setActiveNavigation(link);
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    history.replaceState(null, '', link.getAttribute('href'));

    const menu = document.getElementById('navbarSupportedContent');
    if (menu && menu.classList.contains('show') && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
});

function setActiveNavigation(activeLink) {
    document.querySelectorAll('.navbar .nav-link[href^="#"]').forEach((link) => {
        const isActive = link === activeLink;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    });
}

const navigationSections = Array.from(document.querySelectorAll('.navbar .nav-link[href^="#"]'))
    .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
    .filter((item) => item.section && item.link.getAttribute('href') !== '#blog');

if ('IntersectionObserver' in window && navigationSections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;
        const activeItem = navigationSections.find((item) => item.section === visible.target);
        if (activeItem) setActiveNavigation(activeItem.link);
    }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });

    navigationSections.forEach(({ section }) => sectionObserver.observe(section));
}
