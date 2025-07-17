// Load environment variables
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;

// Initialize EmailJS with error handling
try {
    emailjs.init(EMAILJS_PUBLIC_KEY);
} catch (error) {
    console.error('EmailJS initialization failed:', error);
    document.getElementById('contact-form').innerHTML = '<div class="p-4 bg-red-100 border border-red-400 text-red-700 rounded">Contact form temporarily unavailable. Please email me directly at babashir8811@gmail.com</div>';
}

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

mobileMenuBtn.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
});

// Close mobile menu when clicking on navigation links
const mobileNavLinks = mobileMenu.querySelectorAll('a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
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

// Progress bar
function updateProgressBar() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('progress-bar').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateProgressBar);

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-blue-600');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('text-blue-600');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Contact form handling with EmailJS
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');
    const formMessage = document.getElementById('form-message');

    // Show loading state
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    submitBtn.disabled = true;

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

            // Send email using EmailJS with environment variables
            const serviceID = EMAILJS_SERVICE_ID;
            const templateID = EMAILJS_TEMPLATE_ID;    // Add template parameters
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'MD Bashir Ahmed'  // Your name as the recipient
    };

    emailjs.send(serviceID, templateID, templateParams)
        .then(function () {
            formMessage.innerHTML = '<div class="p-4 bg-green-100 border border-green-400 text-green-700 rounded"><i class="fas fa-check-circle mr-2"></i>Message sent successfully! I\'ll get back to you soon.</div>';
            formMessage.classList.remove('hidden');
            document.getElementById('contact-form').reset();
        })
        .catch(function (error) {
            console.error('EmailJS error:', error);
            let errorMessage = 'Unable to send message. Please email me directly at babashir8811@gmail.com';

            // Provide more specific error messages
            if (error.text) {
                errorMessage = error.text;
            } else if (!navigator.onLine) {
                errorMessage = 'No internet connection. Please check your connection and try again.';
            }

            formMessage.innerHTML = `<div class="p-4 bg-red-100 border border-red-400 text-red-700 rounded"><i class="fas fa-exclamation-circle mr-2"></i>${errorMessage}</div>`;
            formMessage.classList.remove('hidden');
        })
        .finally(function () {
            // Reset button state
            btnText.classList.remove('hidden');
            btnLoading.classList.add('hidden');
            submitBtn.disabled = false;

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        });
});

// Modal Functions
const modal = {
    overlay: document.querySelector('.modal-overlay'),
    modal: document.querySelector('.modal'),
    closeBtn: document.querySelector('.modal-close'),

    show: function(title, content) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalContent').innerHTML = content;
        this.overlay.style.display = 'block';
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    },

    hide: function() {
        this.overlay.style.display = 'none';
        this.modal.style.display = 'none';
        document.body.style.overflow = '';
    },

    init: function() {
        this.closeBtn.addEventListener('click', () => this.hide());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.hide();
        });
    }
};

// Project click handlers
const initProjectHandlers = () => {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const description = card.getAttribute('data-description');
            const images = card.getAttribute('data-images');
            
            let content = `
                <p class="mb-4">${description}</p>
                ${images ? `<img src="${images}" alt="${title}" class="rounded-lg shadow-md mb-4">` : ''}
                <div class="flex gap-4">
                    <a href="#" class="download-btn">View Live</a>
                    <a href="#" class="download-btn">View Code</a>
                </div>
            `;
            
            modal.show(title, content);
        });
    });
};

// Initialize AOS
const initAOS = () => {
    AOS.init({
        duration: 800,
        once: true,
        delay: 0
    });
};

// Initialize Typing Animation
const initTyping = () => {
    return new Typed('#typed-text', {
        strings: [
            "Detail-Oriented Information Technology Professional",
            "Specializing in Data Analysis and System Automation",
            "Transforming Data into Actionable Insights"
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        startDelay: 1000,
        loop: true
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    initTyping();
    modal.init();
    initProjectHandlers();
});
