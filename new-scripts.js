// Initialize ScrollReveal for animations
ScrollReveal().reveal('.hero-content', {
    delay: 200,
    distance: '50px',
    duration: 1000,
    origin: 'bottom'
});

ScrollReveal().reveal('.hero-image', {
    delay: 400,
    distance: '50px',
    duration: 1000,
    origin: 'right'
});

ScrollReveal().reveal('.course-card', {
    delay: 200,
    distance: '30px',
    duration: 1000,
    origin: 'bottom',
    interval: 200
});

ScrollReveal().reveal('.feature-card', {
    delay: 200,
    distance: '30px',
    duration: 1000,
    origin: 'bottom',
    interval: 200
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    if (navToggle.classList.contains('active')) {
        navToggle.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        navToggle.children[1].style.opacity = '0';
        navToggle.children[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        navToggle.children[0].style.transform = 'none';
        navToggle.children[1].style.opacity = '1';
        navToggle.children[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.children[0].style.transform = 'none';
        navToggle.children[1].style.opacity = '1';
        navToggle.children[2].style.transform = 'none';
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.children[0].style.transform = 'none';
            navToggle.children[1].style.opacity = '1';
            navToggle.children[2].style.transform = 'none';
        }
    });
});

// Testimonials Slider
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonials[index].classList.add('active');
    testimonials[index].classList.add('fade-in');
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    // Auto-advance testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Initialize EmailJS with debug mode
(function() {
    emailjs.init("WSwMJeOjPmVGzS2s6", { debug: true });
})();

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            const templateParams = {
                to_email: 'omarnourr77@gmail.com',
                from_name: contactForm.querySelector('[name="name"]').value,
                from_email: contactForm.querySelector('[name="email"]').value,
                phone: contactForm.querySelector('[name="phone"]').value,
                course: contactForm.querySelector('[name="course"]').value,
                message: contactForm.querySelector('[name="message"]').value,
                time: new Date().toLocaleString('en-US', { 
                    timeZone: 'Africa/Cairo',
                    dateStyle: 'full',
                    timeStyle: 'short'
                })
            };

            console.log('Sending email with params:', templateParams);
            
            const response = await emailjs.send(
                'service_03gbjlt',
                'template_5qsk7ju',
                templateParams
            );
            
            console.log('Email sent successfully:', response);
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('EmailJS Detailed Error:', {
                message: error.message,
                name: error.name,
                text: error.text,
                stack: error.stack
            });
            showNotification('Error sending message. Please try again.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    const text = document.createElement('span');
    text.textContent = message;
    
    notification.appendChild(icon);
    notification.appendChild(text);
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');

function animateValue(element, start, end, duration) {
    let current = start;
    const range = end - start;
    const increment = range / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, 16);
}

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const value = parseInt(target.textContent);
            animateValue(target, 0, value, 2000);
            observer.unobserve(target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.5
});

stats.forEach(stat => {
    const value = stat.textContent;
    stat.textContent = '0+';
    observer.observe(stat);
});
