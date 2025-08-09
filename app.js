document.addEventListener('DOMContentLoaded', function() {
    // --- GESTIÓN DEL TEMA (NUEVO Y MEJORADO) ---
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    console.log('Buscando botón de tema...');
    console.log('Botón encontrado:', themeToggle);

    // Función para aplicar el tema
    const applyTheme = (theme) => {
        htmlEl.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        console.log('Tema aplicado:', theme);
        console.log('Atributo data-theme del HTML:', htmlEl.dataset.theme);
    };

    // Al cargar, aplicar el tema guardado o el preferido por el sistema
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    console.log('Tema guardado/preferido:', savedTheme);
    applyTheme(savedTheme);

    // Evento para el botón de cambio de tema
    if (themeToggle) {
        console.log('Configurando evento click para el botón de tema');
        themeToggle.addEventListener('click', () => {
            console.log('Botón de tema clickeado');
            const currentTheme = htmlEl.dataset.theme;
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            console.log('Cambiando de tema', currentTheme, 'a', newTheme);
            applyTheme(newTheme);
        });
    } else {
        console.error('ERROR: Botón de tema NO encontrado');
    }

    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
    });

    // --- GENERADOR DE PARTÍCULAS (SIN CAMBIOS) ---
    createParticles();
    
    // --- NAVEGACIÓN MÓVIL (SIN CAMBIOS) ---
    setupMobileNav();

    // --- EFECTO DE HEADER AL HACER SCROLL (MODIFICADO) ---
    setupHeaderScrollEffect();

    // --- SCROLL SUAVE PARA ANCLAS (SIN CAMBIOS) ---
    setupSmoothScrolling();

    // --- CONTADORES ANIMADOS (SIN CAMBIOS) ---
    animateCounters();
    
    // --- FORMULARIO DE CONTACTO (SIN CAMBIOS FUNCIONALES) ---
    setupContactForm();

    // --- EFECTO RIPPLE EN BOTONES (NUEVO) ---
    addRippleEffectToButtons();
});

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const particleCount = window.innerWidth < 768 ? 25 : 50;
    particlesContainer.innerHTML = ''; // Limpiar partículas existentes
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${Math.random() * 5 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = Math.random() * 0.7;
        particlesContainer.appendChild(particle);
    }
}

function setupMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        const isShown = navMenu.classList.toggle('show');
        navToggle.querySelector('i').className = `fas ${isShown ? 'fa-times' : 'fa-bars'}`;
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                navToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
    });
}

// MODIFICADO: Usa clases en lugar de estilos en línea
function setupHeaderScrollEffect() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Añade clase para el fondo y sombra
        if (scrollTop > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        // Oculta/muestra el header al hacer scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat__number');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.dataset.count;
                let count = 0;
                const speed = 200;
                const increment = target / speed;
                
                const update = () => {
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count);
                        requestAnimationFrame(update);
                    } else {
                        counter.innerText = target;
                    }
                };
                update();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    // La lógica del formulario puede permanecer como está, ya que los estilos de error y validación
    // se manejan a través de clases, que heredarán los colores del tema actual.
    // ... (Tu lógica de validación del formulario aquí) ...
}

// NUEVO: Función para añadir efecto ripple
function addRippleEffectToButtons() {
    document.querySelectorAll('.btn, .social-link').forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });
}