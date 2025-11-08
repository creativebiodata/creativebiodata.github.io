// Universal Website Template - Main JavaScript
class UniversalWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTheme();
        this.setupNavigation();
        this.setupAnimations();
        this.setupPerformanceMonitoring();
        this.handleAccessibility();
        this.updateFooterYear();
        this.registerServiceWorker();
    }

    // Event Listeners
    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle?.addEventListener('click', () => this.toggleTheme());

        // Mobile navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        const toggleMenu = () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            const isExpanded = navToggle.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        };

        navToggle?.addEventListener('click', toggleMenu);

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (
                navMenu?.classList.contains('active') &&
                !navToggle?.contains(e.target) &&
                !navMenu?.contains(e.target)
            ) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', this.smoothScroll.bind(this));
        });
    }

    // Theme Management
    setupTheme() {
        const savedTheme = localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
        this.announceToScreenReader(`Theme changed to ${newTheme} mode`);
    }

    updateThemeIcon(theme) {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }

    // Navigation: Highlight active section
    setupNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        if (sections.length === 0 || navLinks.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        link.removeAttribute('aria-current');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                            link.setAttribute('aria-current', 'page');
                        }
                    });
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-20% 0px -20% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    // Scroll Animations
    setupAnimations() {
        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.trackEvent('element_view', {
                        element: entry.target.tagName,
                        id: entry.target.id || 'unknown'
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        document.querySelectorAll('.feature-card, .hero-content, .section-header').forEach(el => {
            el.classList.add('animate-on-scroll');
            animateOnScroll.observe(el);
        });
    }

    // Performance Monitoring
    setupPerformanceMonitoring() {
        // Core Web Vitals
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.name === 'LCP') {
                        this.trackEvent('web_vital', {
                            metric: 'LCP',
                            value: Math.round(entry.value),
                            rating: entry.value < 2500 ? 'good' : entry.value < 4000 ? 'needs_improvement' : 'poor'
                        });
                    }
                });
            });
            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        }

        // Page load time (note: performance.timing is deprecated but still works)
        window.addEventListener('load', () => {
            // Use modern Navigation Timing API if available
            const navEntry = performance.getEntriesByType('navigation')[0];
            const loadTime = navEntry ? navEntry.duration : 
                performance.timing.loadEventEnd - performance.timing.navigationStart;

            console.log(`Page load time: ${Math.round(loadTime)}ms`);
            this.trackEvent('page_load', {
                load_time: Math.round(loadTime),
                connection: navigator.connection?.effectiveType || 'unknown'
            });
        });
    }

    // Accessibility Enhancements
    handleAccessibility() {
        // Keyboard navigation indicator
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Reduced motion
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const toggleReducedMotion = (e) => {
            document.documentElement.classList.toggle('reduced-motion', e.matches);
        };
        toggleReducedMotion(reducedMotion);
        reducedMotion.addEventListener('change', toggleReducedMotion);
    }

    // Smooth Scroll Utility
    smoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        history.pushState(null, null, targetId);
    }

    // Auto-update footer year
    updateFooterYear() {
        const footerYear = document.getElementById('footer-year');
        if (footerYear) {
            const year = new Date().getFullYear();
            footerYear.innerHTML = `&copy; ${year} Universal Template. All rights reserved.`;
        }
    }

    // Screen reader announcements
    announceToScreenReader(message) {
        let announcer = document.getElementById('screen-reader-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'screen-reader-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.style.cssText = `
                position: absolute;
                left: -10000px;
                width: 1px;
                height: 1px;
                overflow: hidden;
            `;
            document.body.appendChild(announcer);
        }
        announcer.textContent = message;
    }

    // Analytics placeholder
    trackEvent(action, data) {
        console.log('Event tracked:', action, data);
        // In production, integrate with GA4, Plausible, etc.
    }

    // Register Service Worker
    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(reg => console.log('SW registered:', reg.scope))
                    .catch(err => console.warn('SW registration failed:', err));
            });
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new UniversalWebsite();
});

// For module environments (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UniversalWebsite;
}