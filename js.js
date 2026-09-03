// js_new.js - Modern portfolio functionality

// ===========================
// Theme Toggle Functionality
// ===========================

class ThemeManager {
    constructor() {
        this.htmlElement = document.documentElement;
        this.themeToggle = document.getElementById('theme-toggle');
        this.init();
    }

    init() {
        // Load saved theme or use system preference
        const savedTheme = localStorage.getItem('theme') || this.getSystemPreference();
        this.setTheme(savedTheme);

        // Add event listener to toggle button
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    getSystemPreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }
        return 'dark';
    }

    setTheme(theme) {
        this.htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateToggleButton(theme);
    }

    toggleTheme() {
        const currentTheme = this.htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    updateToggleButton(theme) {
        if (this.themeToggle) {
            this.themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
        }
    }
}

// ===========================
// Mobile Menu Functionality
// ===========================

class MobileMenu {
    constructor() {
        this.menuBtn = document.querySelector('.mobile-menu-btn');
        this.navLinks = document.querySelector('.nav-links');
        this.links = document.querySelectorAll('.nav-links a');
        this.init();
    }

    init() {
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => this.toggleMenu());
            this.links.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
        }
    }

    toggleMenu() {
        if (this.navLinks) {
            this.navLinks.classList.toggle('active');
        }
    }

    closeMenu() {
        if (this.navLinks) {
            this.navLinks.classList.remove('active');
        }
    }
}

// ===========================
// Form Handling
// ===========================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            this.showError('Please fill all fields correctly.');
            return;
        }

        this.submitForm();
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const isEmpty = value === '';

        if (isEmpty) {
            this.setFieldError(field, true);
            return false;
        }

        if (type === 'email') {
            const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            this.setFieldError(field, !isValidEmail);
            return isValidEmail;
        }

        this.setFieldError(field, false);
        return true;
    }

    setFieldError(field, hasError) {
        if (hasError) {
            field.classList.add('form-error');
        } else {
            field.classList.remove('form-error');
        }
    }

    async submitForm() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        try {
            // Simulate form submission
            this.showLoadingState(true);

            // Add artificial delay for better UX
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In production, this would send to a server
            console.log('Form submitted:', data);

            this.showSuccess('Message sent successfully! I will get back to you soon.');
            this.form.reset();
            this.clearFieldErrors();
        } catch (error) {
            this.showError('An error occurred. Please try again.');
            console.error('Form submission error:', error);
        } finally {
            this.showLoadingState(false);
        }
    }

    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success show';
        successDiv.innerHTML = `<span>${message}</span>`;

        // Remove previous success message
        const existingSuccess = this.form.querySelector('.form-success');
        if (existingSuccess) {
            existingSuccess.remove();
        }

        this.form.prepend(successDiv);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            successDiv.classList.remove('show');
            setTimeout(() => successDiv.remove(), 300);
        }, 5000);
    }

    showError(message) {
        alert(message);
    }

    showLoadingState(isLoading) {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = isLoading;
            submitBtn.textContent = isLoading ? 'Sending...' : 'Send Message';
        }
    }

    clearFieldErrors() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => this.setFieldError(input, false));
    }
}

// ===========================
// Scroll Animations
// ===========================

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe all sections and cards
        const elementsToObserve = document.querySelectorAll(
            'section, .card, .project-card, .expertise-card, .education-card, .stat-card'
        );

        elementsToObserve.forEach(el => {
            observer.observe(el);
        });
    }
}

// ===========================
// Smooth Scroll Navigation
// ===========================

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ===========================
// Navbar Scroll Effect
// ===========================

class NavbarScroll {
    constructor() {
        this.header = document.querySelector('header');
        this.init();
    }

    init() {
        if (this.header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    this.header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
                } else {
                    this.header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                }
            });
        }
    }
}

// ===========================
// Initialization
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    new ThemeManager();
    new MobileMenu();
    new ContactForm();
    new ScrollAnimations();
    new SmoothScroll();
    new NavbarScroll();

    console.log('Portfolio initialized successfully');
});

// Handle resize to close mobile menu
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    }
});
