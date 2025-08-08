// Initialize AOS (Animate On Scroll) with custom settings
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav__link');

    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 0,
        anchorPlacement: 'top-bottom'
    });

});


// Generate floating particles for hero background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';

        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;

        particlesContainer.appendChild(particle);
    }
}

// Enhanced mobile navigation with smooth animations
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');

        // Animate hamburger to X
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('show')) {
            icon.style.transform = 'rotate(90deg)';
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.style.transform = 'rotate(0deg)';
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking on nav links with smooth animation
navLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
        if (navMenu && navMenu.classList.contains('show')) {
            // Add delay for staggered closing animation
            setTimeout(() => {
                navMenu.classList.remove('show');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }

            }, index * 50);
        }
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function (event) {
        const nav = document.getElementById('nav-menu');
        const toggle = document.getElementById('nav-toggle');

        if (nav && nav.classList.contains('show')) {
            if (!nav.contains(event.target) && !toggle.contains(event.target)) {
                nav.classList.remove('show');

                // Resetear ícono del hamburguesa
                const icon = toggle.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
});

// Enhanced header scroll effects with parallax
const header = document.getElementById('header');
let lastScrollTop = 0;
let ticking = false;

function updateHeader() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (header) {
        // Add glass morphism effect and shadow on scroll
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.1)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.05)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = 'none';
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }

        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    }

    lastScrollTop = scrollTop;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

// Smooth scrolling for anchor links with offset
function scrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Handle all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId && targetId !== '#') {
            scrollToSection(targetId);
        }
    });
});

// Animated statistics counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat__number');
    const speed = 200; // Animation speed

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                let count = 0;
                const increment = target / speed;

                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCount();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Enhanced contact form with advanced animations and validation
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    // Form field animations
    const formInputs = contactForm.querySelectorAll('.form-control');

    formInputs.forEach(input => {
        // Add focus animations
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');

            // Animate the input line
            const inputLine = this.parentElement.querySelector('.input-line');
            if (inputLine) {
                inputLine.style.width = '100%';
            }
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');

                // Reset input line
                const inputLine = this.parentElement.querySelector('.input-line');
                if (inputLine) {
                    inputLine.style.width = '0';
                }
            }

            // Mark as valid if has value
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });

        // Check if already has value on load
        if (input.value) {
            input.parentElement.classList.add('has-value', 'focused');
        }

        // Real-time validation feedback
        input.addEventListener('input', function () {
            clearFieldError(this);
            validateField(this);
        });
    });

    // Form submission with enhanced animations
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            products: formData.get('products'),
            message: formData.get('message')
        };

        // Clear previous errors
        clearAllFormErrors();

        // Validate all fields
        let hasErrors = false;
        const requiredFields = ['name', 'email', 'phone', 'products'];

        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (!validateField(field)) {
                hasErrors = true;
            }
        });

        if (hasErrors) {
            showNotification('Por favor, corrige los errores en el formulario.', 'error');
            return;
        }

        // Animate submit button
        const submitButton = contactForm.querySelector('.submit-btn');
        submitButton.classList.add('loading');
        submitButton.disabled = true;

        // Simulate API call with enhanced feedback
        setTimeout(() => {
            submitButton.classList.remove('loading');
            submitButton.classList.add('success');

            showNotification('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');

            // Reset form with animation
            setTimeout(() => {
                resetFormWithAnimation();
                submitButton.disabled = false;
                submitButton.classList.remove('success');
            }, 2000);

        }, 2500);
    });
}

// Enhanced field validation
function validateField(field) {
    if (!field) return false;

    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    switch (fieldName) {
        case 'name':
            if (!value) {
                errorMessage = 'El nombre de la empresa es obligatorio';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'El nombre debe tener al menos 2 caracteres';
                isValid = false;
            }
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                errorMessage = 'El correo electrónico es obligatorio';
                isValid = false;
            } else if (!emailRegex.test(value)) {
                errorMessage = 'Por favor, ingresa un correo electrónico válido';
                isValid = false;
            }
            break;

        case 'phone':
            const phoneRegex = /^(\+57\s?)?[3][0-9]{9}$|^[0-9]{7,10}$/;
            if (!value) {
                errorMessage = 'El teléfono es obligatorio';
                isValid = false;
            } else if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                errorMessage = 'Por favor, ingresa un número de teléfono válido';
                isValid = false;
            }
            break;

        case 'products':
            if (!value) {
                errorMessage = 'Por favor, selecciona el tipo de productos';
                isValid = false;
            }
            break;
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
        field.parentElement.classList.add('valid');
    }

    return isValid;
}

// Enhanced error handling with animations
function showFieldError(field, message) {
    const fieldContainer = field.parentElement;

    // Remove existing error
    clearFieldError(field);

    // Add error state
    fieldContainer.classList.add('error');
    fieldContainer.classList.remove('valid');

    // Create and animate error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #EF4444;
        font-size: 12px;
        margin-top: 8px;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    `;

    fieldContainer.appendChild(errorElement);

    // Animate in
    requestAnimationFrame(() => {
        errorElement.style.opacity = '1';
        errorElement.style.transform = 'translateY(0)';
    });

    // Change input line color
    const inputLine = fieldContainer.querySelector('.input-line');
    if (inputLine) {
        inputLine.style.background = '#EF4444';
    }
}

function clearFieldError(field) {
    const fieldContainer = field.parentElement;
    const errorElement = fieldContainer.querySelector('.field-error');

    if (errorElement) {
        errorElement.style.opacity = '0';
        errorElement.style.transform = 'translateY(-10px)';
        setTimeout(() => errorElement.remove(), 300);
    }

    fieldContainer.classList.remove('error');

    // Reset input line color
    const inputLine = fieldContainer.querySelector('.input-line');
    if (inputLine) {
        inputLine.style.background = 'linear-gradient(90deg, var(--color-primary), var(--color-teal-400))';
    }
}

function clearAllFormErrors() {
    const errorElements = contactForm.querySelectorAll('.field-error');
    errorElements.forEach(error => {
        error.style.opacity = '0';
        setTimeout(() => error.remove(), 300);
    });

    const fieldContainers = contactForm.querySelectorAll('.error');
    fieldContainers.forEach(container => {
        container.classList.remove('error');
    });
}

function resetFormWithAnimation() {
    const formInputs = contactForm.querySelectorAll('.form-control');

    formInputs.forEach((input, index) => {
        setTimeout(() => {
            input.value = '';
            input.parentElement.classList.remove('has-value', 'focused', 'valid');

            const inputLine = input.parentElement.querySelector('.input-line');
            if (inputLine) {
                inputLine.style.width = '0';
            }
        }, index * 100);
    });
}

// Enhanced notification system with better animations
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        closeNotification(notification);
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;

    const content = document.createElement('div');
    content.className = 'notification__content';
    content.innerHTML = `
        <div class="notification__icon">
            <i class="fas ${getNotificationIcon(type)}"></i>
        </div>
        <div class="notification__text">
            <div class="notification__title">${getNotificationTitle(type)}</div>
            <div class="notification__message">${message}</div>
        </div>
        <button class="notification__close" type="button">
            <i class="fas fa-times"></i>
        </button>
    `;

    notification.appendChild(content);

    // Enhanced notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${getNotificationBackground(type)};
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        transform: translateX(400px) scale(0.8);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        max-width: 400px;
        min-width: 320px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
    `;

    content.style.cssText = `
        display: flex;
        align-items: flex-start;
        gap: 16px;
    `;

    const icon = content.querySelector('.notification__icon');
    icon.style.cssText = `
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        flex-shrink: 0;
    `;

    const text = content.querySelector('.notification__text');
    text.style.cssText = `
        flex: 1;
    `;

    const title = content.querySelector('.notification__title');
    title.style.cssText = `
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 4px;
    `;

    const messageEl = content.querySelector('.notification__message');
    messageEl.style.cssText = `
        font-size: 14px;
        opacity: 0.9;
        line-height: 1.4;
    `;

    const closeButton = content.querySelector('.notification__close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 8px;
        border-radius: 6px;
        transition: all 0.2s ease;
        opacity: 0.7;
    `;

    closeButton.addEventListener('mouseover', () => {
        closeButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        closeButton.style.opacity = '1';
    });

    closeButton.addEventListener('mouseout', () => {
        closeButton.style.backgroundColor = 'transparent';
        closeButton.style.opacity = '0.7';
    });

    // Add to document
    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0) scale(1)';
    });

    // Close button functionality
    closeButton.addEventListener('click', () => {
        closeNotification(notification);
    });

    // Auto close
    setTimeout(() => {
        if (document.body.contains(notification)) {
            closeNotification(notification);
        }
    }, 5000);

    // Add progress bar
    if (type === 'success' || type === 'info') {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 0 0 12px 12px;
            animation: progress 5s linear;
        `;

        notification.appendChild(progressBar);

        // Add progress animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes progress {
                from { width: 100%; }
                to { width: 0%; }
            }
        `;
        document.head.appendChild(style);
    }
}

function closeNotification(notification) {
    notification.style.transform = 'translateX(400px) scale(0.8)';
    notification.style.opacity = '0';
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.remove();
        }
    }, 400);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationTitle(type) {
    switch (type) {
        case 'success': return '¡Éxito!';
        case 'error': return 'Error';
        case 'warning': return 'Advertencia';
        default: return 'Información';
    }
}

function getNotificationBackground(type) {
    switch (type) {
        case 'success': return 'linear-gradient(135deg, #10B981, #047857)';
        case 'error': return 'linear-gradient(135deg, #EF4444, #DC2626)';
        case 'warning': return 'linear-gradient(135deg, #F59E0B, #D97706)';
        default: return 'linear-gradient(135deg, #3B82F6, #2563EB)';
    }
}

// Enhanced button ripple effects
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .social-link, .contact__item');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;

            // Ensure button has relative positioning
            if (getComputedStyle(this).position === 'static') {
                this.style.position = 'relative';
            }
            this.style.overflow = 'hidden';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Parallax scrolling effects
function addParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero__background');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Enhanced card hover effects with 3D transforms
function enhanceCardEffects() {
    const cards = document.querySelectorAll('.service__card, .other-service__card, .example__card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) rotateX(0deg)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        });

        // Add mouse move effect for subtle 3D tilt
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

// Initialize all enhancements when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Initialize particles
    createParticles();

    // Initialize counter animations
    animateCounters();

    // Add ripple effects
    addRippleEffect();

    // Add parallax effects
    addParallaxEffects();

    // Enhance card effects
    enhanceCardEffects();

    // Add loading animation to the page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // Add custom cursor effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav__link');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
        });

        element.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'default';
        });
    });

    // Enhanced typing effect for hero title
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';

        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            typeWriter();
        }, 1000);
    }

    // Add intersection observer for advanced animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for custom animations
    const animateElements = document.querySelectorAll('.service__card, .other-service__card, .example__card, .process__step');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Add smooth page transitions
    const pageLinks = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])');
    pageLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = this.href;
            }, 300);
        });
    });

    console.log('🚀 LeadGen Pro - Modern landing page loaded successfully!');
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add resize handler for responsive adjustments
window.addEventListener('resize', throttle(() => {
    // Refresh AOS on resize
    AOS.refresh();

    // Adjust particles on mobile
    const particles = document.querySelectorAll('.particle');
    if (window.innerWidth < 768) {
        particles.forEach(particle => {
            particle.style.display = 'none';
        });
    } else {
        particles.forEach(particle => {
            particle.style.display = 'block';
        });
    }
}, 250));

// Add custom styles for enhanced animations
const customStyles = document.createElement('style');
customStyles.textContent = `
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .ripple-effect {
        animation: ripple 0.6s ease-out;
    }
    
    .error .form-control {
        border-bottom-color: #EF4444 !important;
        background: rgba(239, 68, 68, 0.1) !important;
    }
    
    .valid .form-control {
        border-bottom-color: #10B981 !important;
        background: rgba(16, 185, 129, 0.1) !important;
    }
    
    .focused .form-label,
    .has-value .form-label {
        top: -5px !important;
        left: 8px !important;
        font-size: 12px !important;
        color: var(--color-primary) !important;
        background: var(--color-surface) !important;
        padding: 0 4px !important;
    }
`;

document.head.appendChild(customStyles);