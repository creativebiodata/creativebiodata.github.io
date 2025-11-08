// Enhanced Main JavaScript with modern features
class CreativeBiodataApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupServiceWorker();
        this.initializeAnalytics();
        this.handleFirstVisit();
    }

    setupEventListeners() {
        const menuIcon = document.getElementById("menu-icon");
        const slideoutMenu = document.getElementById("slideout-menu");
        const searchIcon = document.getElementById("search-icon");
        const searchBox = document.getElementById("searchbox");
        const searchInputs = document.querySelectorAll('input[type="text"]');
        const cards = document.querySelectorAll('.card');
        const links = document.querySelectorAll('a[href^="#"]');

        // Menu functionality
        menuIcon?.addEventListener('click', (e) => {
            this.toggleMenu(slideoutMenu, menuIcon);
            e.stopPropagation();
        });

        // Search functionality
        searchIcon?.addEventListener('click', () => {
            this.toggleSearch(searchBox, searchIcon);
        });

        // Close menus when clicking outside
        document.addEventListener('click', (e) => {
            if (!slideoutMenu?.contains(e.target) && !menuIcon?.contains(e.target)) {
                this.closeMenu(slideoutMenu, menuIcon);
            }
            if (!searchBox?.contains(e.target) && !searchIcon?.contains(e.target)) {
                this.closeSearch(searchBox);
            }
        });

        // Escape key to close menus
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu(slideoutMenu, menuIcon);
                this.closeSearch(searchBox);
            }
        });

        // Enhanced search with debouncing
        searchInputs.forEach(input => {
            input.addEventListener('input', this.debounce(this.handleSearch, 300));
        });

        // Card interactions
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-download')) {
                    e.preventDefault();
                    this.handleDownload(card);
                }
            });

            // Keyboard navigation for cards
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });

        // Smooth scrolling for anchor links
        links.forEach(link => {
            link.addEventListener('click', this.smoothScroll);
        });

        // Lazy loading for images
        this.setupLazyLoading();

        // Performance monitoring
        this.monitorPerformance();
    }

    toggleMenu(menu, icon) {
        const isExpanded = menu?.classList.toggle('active');
        icon?.setAttribute('aria-expanded', isExpanded);
        
        // Add animation class
        if (isExpanded) {
            menu.style.display = 'block';
            setTimeout(() => menu.classList.add('active'), 10);
        } else {
            menu.classList.remove('active');
            setTimeout(() => menu.style.display = 'none', 300);
        }
    }

    closeMenu(menu, icon) {
        menu?.classList.remove('active');
        icon?.setAttribute('aria-expanded', 'false');
        setTimeout(() => menu.style.display = 'none', 300);
    }

    toggleSearch(searchBox, icon) {
        const isActive = searchBox?.classList.toggle('active');
        
        if (isActive) {
            const input = searchBox?.querySelector('input');
            input?.focus();
        }
    }

    closeSearch(searchBox) {
        searchBox?.classList.remove('active');
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    handleSearch(e) {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase();
            const description = card.querySelector('p')?.textContent.toLowerCase();
            const isVisible = title?.includes(query) || description?.includes(query);
            
            card.style.display = isVisible ? 'block' : 'none';
            card.setAttribute('aria-hidden', !isVisible);
        });

        // Announce results to screen readers
        const visibleCards = document.querySelectorAll('.card[style="display: block"]');
        this.announceToScreenReader(`${visibleCards.length} templates found`);
    }

    handleDownload(card) {
        const templateName = card.querySelector('h3')?.textContent || 'template';
        this.showLoadingSpinner();
        
        // Simulate download process
        setTimeout(() => {
            this.hideLoadingSpinner();
            this.showNotification(`Downloading ${templateName}...`, 'success');
            
            // Track download in analytics
            this.trackEvent('download', {
                template: templateName,
                category: 'biodata'
            });
        }, 1500);
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Track visibility for analytics
                    if (entry.target.classList.contains('card')) {
                        this.trackEvent('impression', {
                            element: 'card',
                            id: entry.target.id
                        });
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        // Observe cards and sections
        document.querySelectorAll('.card, .section-heading').forEach(el => {
            observer.observe(el);
        });
    }

    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    showLoadingSpinner() {
        let spinner = document.getElementById('loading-spinner');
        if (!spinner) {
            spinner = document.createElement('div');
            spinner.id = 'loading-spinner';
            spinner.innerHTML = '<div class="spinner"></div>';
            document.body.appendChild(spinner);
        }
        spinner.classList.remove('hidden');
    }

    hideLoadingSpinner() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.classList.add('hidden');
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');

        // Add styles for notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    announceToScreenReader(message) {
        const announcer = document.getElementById('screen-reader-announcer') || 
                         this.createScreenReaderAnnouncer();
        announcer.textContent = message;
    }

    createScreenReaderAnnouncer() {
        const announcer = document.createElement('div');
        announcer.id = 'screen-reader-announcer';
        announcer.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        document.body.appendChild(announcer);
        return announcer;
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    initializeAnalytics() {
        // Basic analytics setup
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        // Track page views
        this.trackPageView();
    }

    trackPageView() {
        const pageData = {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
        };
        console.log('Page view:', pageData);
    }

    trackEvent(action, data) {
        const eventData = {
            event: action,
            ...data,
            timestamp: new Date().toISOString()
        };
        console.log('Event tracked:', eventData);
    }

    monitorPerformance() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    console.log(`${entry.name}: ${entry.value}`);
                });
            });

            observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input'] });
        }

        // Log page load time
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        });
    }

    handleFirstVisit() {
        if (!localStorage.getItem('firstVisit')) {
            this.showNotification('Welcome to Creative Biodata! Explore our templates.', 'info');
            localStorage.setItem('firstVisit', 'true');
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CreativeBiodataApp();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CreativeBiodataApp;
}