// Initialize EmailJS with error handling
(function() {
    emailjs.init({
        publicKey: "BbFvNI4fNDPUdSSRs",
        blockHeadless: false,
        limitRate: {
            timeout: 1500
        },
        globalVariables: {
            defaultToEmail: 'babashir8811@gmail.com'
        }
    });
})();

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

    // Send email using EmailJS with proper configuration
    const serviceID = 'service_l7pwlsp';    // Your EmailJS service ID
    const templateID = 'template_23q705u';  // Your EmailJS template ID

    // Add template parameters - make sure these match EXACTLY with your EmailJS template variables
    const templateParams = {
        to_name: 'MD Bashir Ahmed',
        to_email: 'babashir8811@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        message: formData.message,
        subject: formData.subject
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
            const liveLink = card.getAttribute('data-live-link');
            const codeLink = card.getAttribute('data-code-link');

            if (liveLink || codeLink) {
                let content = `
                    <p class="mb-4">${description}</p>
                    ${images ? `<img src="${images}" alt="${title}" class="rounded-lg shadow-md mb-4">` : ''}
                    <div class="flex gap-4">
                        ${liveLink ? `<a href="${liveLink}" target="_blank" class="download-btn">View Live</a>` : ''}
                        ${codeLink ? `<a href="${codeLink}" target="_blank" class="download-btn">View Code</a>` : ''}
                    </div>
                `;
                modal.show(title, content);
            }
        });
    });
};

// Initialize Typing Animation
const initTyping = () => {
    const options = {
        strings: [
            " Detail-Oriented Information Technology Professional",
            "Specializing in Data Analysis and System Automation",
            "Transforming Data into Actionable Insights"
        ],
        typeSpeed: 30,
        backSpeed: 15,
        backDelay: 100,
        startDelay: 0,
        loop: true,
        showCursor: true,
        cursorChar: ''
    };
    return new Typed('#typed-text', options);
};

// Scroll to Top functionality
const initScrollToTop = () => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

    // Show or hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) { // Show after 300px of scrolling
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to the top when the button is clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTyping();
    modal.init();
    initProjectHandlers();
    initScrollToTop();
});
