const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');
const revealItems = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('main section[id]');
const year = document.getElementById('year');

if (year) {
    year.textContent = new Date().getFullYear();
}

if (menuToggle && nav) {
    menuToggle.setAttribute('aria-expanded', 'false');

    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        nav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(nav.classList.contains('open')));
    });

    document.addEventListener('click', (event) => {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 720) {
            nav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        if (menuToggle) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

const revealOnScroll = () => {
    revealItems.forEach((item) => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < window.innerHeight - 80) {
            item.classList.add('visible');
        }
    });

    let currentSection = '';
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
