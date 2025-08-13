import { initEmailJS, handleContactFormSubmit } from './modules/email.js';
import { initTyping } from './modules/typing.js';
import { initParticles } from './modules/particles.js';
import { initScroll, handleSmoothScroll, scrollToTop, initScrollReveal } from './modules/scroll.js';
import { toggleMobileMenu, closeMobileMenu, initHeadroom } from './modules/ui.js';
import { initGLightbox } from './modules/lightbox.js';

window.addEventListener("load", () => {
	const preloader = document.getElementById("preloader");
	if (preloader) {
		preloader.classList.add("hidden");
	}
	PortfolioApp.init();
});

const PortfolioApp = {
	config: {
		emailjs: {
			publicKey: "BbFvNI4fNDPUdSSRs",
			serviceID: "service_l7pwlsp",
			templateID: "template_23q705u",
			toName: "MD Bashir Ahmed",
			toEmail: "babashir8811@gmail.com",
		},
	},

	elements: {},

	init() {
		this.cacheDOMElements();
		initEmailJS(this.config.emailjs);
		initTyping();
		this.initEventListeners();
		initParticles();
		initScrollReveal();
		initHeadroom();
		initGLightbox();
		this.setActiveNavLink(); // Set active link on load
	},

	cacheDOMElements() {
		this.elements = {
			progressBar: document.getElementById("progress-bar"),
			mobileMenuBtn: document.getElementById("mobile-menu-btn"),
			mobileMenu: document.getElementById("mobile-menu"),
			menuIcon: document.getElementById("menu-icon"),
			closeIcon: document.getElementById("close-icon"),
			desktopNavLinks: document.querySelectorAll(
				'header .hidden.md\\:flex a[href^="#"]'
			),
			mobileNavLinks: document.querySelectorAll("#mobile-menu nav a"),
			sections: document.querySelectorAll("section[id]"),
			contactForm: document.getElementById("contact-form"),
			submitBtn: document.getElementById("submit-btn"),
			btnText: document.getElementById("btn-text"),
			btnLoading: document.getElementById("btn-loading"),
			formMessage: document.getElementById("form-message"),
			scrollTopBtn: document.getElementById("scrollTopBtn"),
			allNavLinks: document.querySelectorAll('a[href^="#"]'),
			skillItems: document.querySelectorAll(".skill-item"),
			animateOnScrollElements: document.querySelectorAll(".animate-on-scroll"),
		};
	},

	initEventListeners() {
		initScroll(this.elements);

		this.elements.mobileMenuBtn.addEventListener("click", () =>
			toggleMobileMenu(this.elements)
		);
		if (this.elements.mobileMenu) {
			this.elements.mobileMenu.setAttribute("aria-hidden", "true");
		}
		if (this.elements.mobileMenuBtn) {
			this.elements.mobileMenuBtn.setAttribute("aria-expanded", "false");
		}
		this.elements.mobileNavLinks.forEach((link) => {
			link.addEventListener("click", () => {
				closeMobileMenu(this.elements);
				this.setActiveNavLink(); // Set active link after closing mobile menu
			});
		});
		this.elements.allNavLinks.forEach((anchor) => {
			anchor.addEventListener("click", (e) => handleSmoothScroll(e));
		});
		this.elements.contactForm.addEventListener("submit", (e) =>
			handleContactFormSubmit(e, this.config.emailjs, this.elements)
		);
		this.elements.scrollTopBtn.addEventListener("click", () =>
			scrollToTop()
		);

		// Update active nav link on scroll
		window.addEventListener("scroll", () => {
			this.setActiveNavLink();
			this.handleScrollAnimations();
		});
	},

	setActiveNavLink() {
		const scrollPos = window.scrollY + 100; // Add offset for fixed header

		this.elements.sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.offsetHeight;
			const sectionId = section.getAttribute("id");

			if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
				// Remove active class from all links
				this.elements.allNavLinks.forEach((link) =>
					link.classList.remove("active-nav-link")
				);

				// Add active class to matching desktop link
				const desktopLink = document.querySelector(
					`header .hidden.md\\:flex a[href="#${sectionId}"]`
				);
				if (desktopLink) {
					desktopLink.classList.add("active-nav-link");
				}

				// Add active class to matching mobile link
				const mobileLink = document.querySelector(
					`#mobile-menu nav a[href="#${sectionId}"]`
				);
				if (mobileLink) {
					mobileLink.classList.add("active-nav-link");
				}
			}
		});
	},

	handleScrollAnimations() {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry, index) => {
					if (entry.isIntersecting) {
						setTimeout(() => {
							entry.target.classList.add("is-visible");
						}, index * 150); // Staggered delay
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		this.elements.animateOnScrollElements.forEach((el) => {
			observer.observe(el);
		});
	},
};
