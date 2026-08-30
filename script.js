// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // aria-expanded
    const expanded = navMenu.classList.contains('active');
    hamburger.setAttribute('aria-expanded', expanded);
});

// Close menu on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== SCROLL REVEAL (Intersection Observer) =====
const revealElements = document.querySelectorAll('.section, .hero, .about-card, .edu-card, .skill-category, .project-card, .exp-card, .career-card, .contact-card, .cv-card, .ps-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
});

revealElements.forEach(el => {
    el.classList.add('reveal-hidden');
    revealObserver.observe(el);
});

// ===== DARK / LIGHT MODE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const body = document.body;

function setTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light');
        themeIcon.textContent = '☀️';
    } else {
        body.classList.remove('light');
        themeIcon.textContent = '🌙';
    }
    localStorage.setItem('theme', theme);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = body.classList.contains('light') ? 'dark' : 'light';
    setTheme(current);
});

// ===== CURRENT YEAR IN FOOTER =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== TYPING ANIMATION (optional) =====
// Simple typewriter effect for hero tagline
const taglineEl = document.querySelector('.hero-tagline');
if (taglineEl) {
    const words = ['Aspiring Cyber Security Engineer', 'Ethical Hacker', 'Penetration Tester'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            taglineEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            taglineEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 120;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1500; // pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // start after a small delay
    setTimeout(typeEffect, 600);
}

// ===== CLOSE MOBILE MENU ON RESIZE =====
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// ===== SMOOTH SCROLL FOR NAV LINKS (fallback) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== ADD REVEALED CLASS TO HERO ON LOAD =====
window.addEventListener('load', () => {
    document.querySelector('.hero')?.classList.add('revealed');
});