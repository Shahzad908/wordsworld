// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formProps = Object.fromEntries(formData);
    
    // Basic validation
    if (!formProps.name || !formProps.email || !formProps.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formProps.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Prepare form data for WhatsApp
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Create WhatsApp message with form data
    const whatsappMessage = `New Contact Form Submission:

Name: ${formProps.name}
Email: ${formProps.email}
Service: ${formProps.service || 'Not specified'}
Deadline: ${formProps.deadline || 'Not specified'}

Message:
${formProps.message}

Please respond to: ${formProps.email}`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Simulate API call
    setTimeout(() => {
        // Show success message with WhatsApp option
        const successMessage = `Thank you for your message! I will get back to you soon.

Would you like to chat on WhatsApp for faster response?`;

        if (confirm(successMessage)) {
            // Open WhatsApp with form data
            window.open(`https://wa.me/923196814798?text=${encodedMessage}`, '_blank');
        }

        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .process-step');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animation styles
document.querySelectorAll('.service-card, .portfolio-item, .process-step').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'white';
        navbar.style.backdropFilter = 'none';
    }
});

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.hero');
    
    if (!statsSection) return;
    
    const sectionTop = statsSection.getBoundingClientRect().top;
    const sectionVisible = 200;
    
    if (sectionTop < window.innerHeight - sectionVisible) {
        stats.forEach(stat => {
            if (!stat.classList.contains('animated')) {
                stat.classList.add('animated');
                const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
                const suffix = stat.textContent.replace(/[\d\s]/g, '');
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    if (target >= 100) {
                        stat.textContent = Math.floor(current) + suffix;
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                }, 30);
            }
        });
    }
}

window.addEventListener('scroll', animateStats);

// Form input focus effects
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
    const parent = input.parentElement;
    
    input.addEventListener('focus', function() {
        parent.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            parent.classList.remove('focused');
        }
    });
    
    // Check if input has value on load
    if (input.value) {
        parent.classList.add('focused');
    }
});

// Add loading animation to service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Theme toggle functionality (optional)
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    
    // Add styles
    themeToggle.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
}

// Initialize theme toggle
// createThemeToggle();

// Dark theme styles (optional)
const darkThemeStyles = `
    .dark-theme {
        background-color: #0f172a;
        color: #e2e8f0;
        transition: all 0.3s ease;
    }
    
    .dark-theme .navbar {
        background-color: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .dark-theme .service-card,
    .dark-theme .portfolio-item,
    .dark-theme .contact-form {
        background-color: #1e293b;
        color: #e2e8f0;
        border-color: #334155;
    }
    
    .dark-theme .hero {
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    }
    
    .dark-theme .section-header h2 {
        color: #e2e8f0;
    }
    
    .dark-theme .footer {
        background-color: #020617;
    }
`;

// Add dark theme styles to head
const style = document.createElement('style');
style.textContent = darkThemeStyles;
document.head.appendChild(style);

// WhatsApp Contact Functionality
function initializeWhatsAppFeatures() {
    // WhatsApp and Telegram button click tracking
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    const telegramButtons = document.querySelectorAll('a[href*="t.me"]');

    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track WhatsApp click (you can replace this with your analytics)
            console.log('WhatsApp contact button clicked');

            // Optional: Show a brief notification
            showWhatsAppNotification();
        });
    });

    telegramButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track Telegram click (you can replace this with your analytics)
            console.log('Telegram contact button clicked');

            // Optional: Show a brief notification
            showTelegramNotification();
        });
    });
    
    // Generate contextual WhatsApp messages based on current page section
    function generateContextualMessage() {
        const currentSection = getCurrentVisibleSection();
        let baseMessage = "Hi! I'm interested in your writing services. Can we discuss my project?";
        
        switch(currentSection) {
            case 'services':
                baseMessage = "Hi! I saw your services and I'm interested. Can we discuss my project requirements?";
                break;
            case 'portfolio':
                baseMessage = "Hi! I'm impressed with your portfolio. Can we discuss a similar project?";
                break;
            case 'about':
                baseMessage = "Hi! I learned about your background and I'd like to discuss working together.";
                break;
            case 'contact':
                baseMessage = "Hi! I'm on your contact page and would like to discuss my project with you.";
                break;
        }
        
        return encodeURIComponent(baseMessage);
    }
    
    // Get currently visible section
    function getCurrentVisibleSection() {
        const sections = ['home', 'about', 'services', 'portfolio', 'contact'];
        const scrollPosition = window.scrollY + 200;
        
        for (let section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const offsetTop = element.offsetTop;
                const offsetHeight = element.offsetHeight;
                
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    return section;
                }
            }
        }
        
        return 'home';
    }
    
    // Show brief notification when WhatsApp is clicked
    function showWhatsAppNotification() {
        // Remove existing notification
        const existingNotification = document.querySelector('.whatsapp-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'whatsapp-notification';
        notification.innerHTML = `
            <i class="fab fa-whatsapp"></i>
            <span>Opening WhatsApp...</span>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: #25d366;
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
            font-weight: 500;
            z-index: 1001;
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }

    // Show brief notification when Telegram is clicked
    function showTelegramNotification() {
        // Remove existing notification
        const existingNotification = document.querySelector('.telegram-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'telegram-notification';
        notification.innerHTML = `
            <i class="fab fa-telegram"></i>
            <span>Opening Telegram...</span>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: #0088cc;
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
            font-weight: 500;
            z-index: 1001;
            box-shadow: 0 4px 15px rgba(0, 136, 204, 0.3);
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }
    
    // Add CSS animations
    const animationStyles = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    const animationStyleSheet = document.createElement('style');
    animationStyleSheet.textContent = animationStyles;
    document.head.appendChild(animationStyleSheet);
}

// Initialize WhatsApp features when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeWhatsAppFeatures);