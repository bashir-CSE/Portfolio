// Preloader logic to hide it once the page and all its content are fully loaded.
window.addEventListener("load", () => {
	const preloader = document.getElementById("preloader");
	if (preloader) {
		// Add a class to trigger the fade-out animation
		preloader.classList.add("hidden");
	}
	// Initialize the main application after the preloader is handled
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
		typing: {
			strings: [
				"IT Operations",
				"Data Analysis",
				"Process Automation",
				"ERP",
				"Power BI & Advanced Excel"
			],
			speed: 80,
			backSpeed: 30,
			deleteSpeed: 40,
			deleteDelay: 1500,
			startDelay: 500,
			loop: true,
			cursor: true,
			cursorChar: "|",
		},
	},

	elements: {},

	init() {
		this.cacheDOMElements();
		this.initEmailJS();
		// Initialize Typed.js typing effect
		this.initTypedJS();
		this.initEventListeners();
		this.initParticles();
		this.initScrollReveal();
		this.initHeadroom();
		this.initGLightbox();
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
		};
	},

	initEventListeners() {
		// Throttle the scroll event listener for better performance
		const throttledScroll = this.throttle(() => this.handleScroll(), 100);
		window.addEventListener("scroll", throttledScroll);

		this.elements.mobileMenuBtn.addEventListener("click", () =>
			this.toggleMobileMenu()
		);
		// Ensure initial ARIA state
		if (this.elements.mobileMenu) {
			this.elements.mobileMenu.setAttribute("aria-hidden", "true");
		}
		if (this.elements.mobileMenuBtn) {
			this.elements.mobileMenuBtn.setAttribute("aria-expanded", "false");
		}
		this.elements.mobileNavLinks.forEach((link) => {
			link.addEventListener("click", () => this.closeMobileMenu());
		});
		this.elements.allNavLinks.forEach((anchor) => {
			anchor.addEventListener("click", (e) => this.handleSmoothScroll(e));
		});
		this.elements.contactForm.addEventListener("submit", (e) =>
			this.handleContactFormSubmit(e)
		);
		this.elements.scrollTopBtn.addEventListener("click", () =>
			this.scrollToTop()
		);
	},

	handleScroll() {
		const scrollTop = window.pageYOffset;
		const docHeight = document.body.scrollHeight - window.innerHeight;
		const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

		this.elements.progressBar.style.width = `${scrollPercent}%`;
		// Update ARIA for accessibility
		this.elements.progressBar.setAttribute("aria-valuenow", String(Math.round(scrollPercent)));

		let currentSection = "";
		this.elements.sections.forEach((section) => {
			if (scrollTop >= section.offsetTop - 200) {
				currentSection = section.getAttribute("id");
			}
		});

		// Update both desktop and mobile navigation links
		const allLinks = [
			...this.elements.desktopNavLinks,
			...this.elements.mobileNavLinks,
		];
		allLinks.forEach((link) => {
			const isActive = link.getAttribute("href") === `#${currentSection}`;
			link.classList.toggle("active-nav-link", isActive);
			if (isActive) {
				link.setAttribute("aria-current", "page");
			} else {
				link.removeAttribute("aria-current");
			}
		});

		this.elements.scrollTopBtn.classList.toggle("visible", scrollTop > 300);
	},

	toggleMobileMenu() {
		const isNowActive = !this.elements.mobileMenu.classList.contains("active");
		this.elements.mobileMenu.classList.toggle("active");
		this.elements.menuIcon.classList.toggle("hidden");
		this.elements.closeIcon.classList.toggle("hidden");
		// ARIA state updates
		this.elements.mobileMenuBtn.setAttribute("aria-expanded", String(isNowActive));
		this.elements.mobileMenu.setAttribute("aria-hidden", String(!isNowActive));
	},

	closeMobileMenu() {
		this.elements.mobileMenu.classList.remove("active");
		this.elements.menuIcon.classList.remove("hidden");
		this.elements.closeIcon.classList.add("hidden");
		// ARIA state updates
		this.elements.mobileMenuBtn.setAttribute("aria-expanded", "false");
		this.elements.mobileMenu.setAttribute("aria-hidden", "true");
	},

	handleSmoothScroll(e) {
		e.preventDefault();
		const target = document.querySelector(e.currentTarget.getAttribute("href"));
		if (target) {
			target.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	},

	initEmailJS() {
		emailjs.init({ publicKey: this.config.emailjs.publicKey });
	},

	handleContactFormSubmit(e) {
		e.preventDefault();
		this.elements.btnText.classList.add("hidden");
		this.elements.btnLoading.classList.remove("hidden");
		this.elements.submitBtn.disabled = true;

		const templateParams = {
			to_name: this.config.emailjs.toName,
			to_email: this.config.emailjs.toEmail,
			from_name: this.elements.contactForm.name.value,
			from_email: this.elements.contactForm.email.value,
			reply_to: this.elements.contactForm.email.value,
			message: this.elements.contactForm.message.value,
			subject: this.elements.contactForm.subject.value,
		};

		emailjs
			.send(
				this.config.emailjs.serviceID,
				this.config.emailjs.templateID,
				templateParams
			)
			.then(() => {
				this.elements.formMessage.innerHTML =
					'<div class="p-4 bg-green-100 border border-green-400 text-green-700 rounded"><i class="fas fa-check-circle mr-2"></i>Message sent successfully!</div>';
				this.elements.contactForm.reset();
			})
			.catch((error) => {
				console.error("EmailJS error:", error);
				this.elements.formMessage.innerHTML = `<div class="p-4 bg-red-100 border border-red-400 text-red-700 rounded"><i class="fas fa-exclamation-circle mr-2"></i>${
					error.text || "Unable to send message."
				}</div>`;
			})
			.finally(() => {
				this.elements.formMessage.classList.remove("hidden");
				this.elements.btnText.classList.remove("hidden");
				this.elements.btnLoading.classList.add("hidden");
				this.elements.submitBtn.disabled = false;
				setTimeout(
					() => this.elements.formMessage.classList.add("hidden"),
					5000
				);
			});
	},

	/**
	 * Returns a function, that, when invoked, will only be triggered at most once
	 * during a given window of time.
	 * @param {Function} func The function to throttle.
	 * @param {number} limit The throttle limit in milliseconds.
	 * @returns {Function} The throttled function.
	 */
	throttle(func, limit) {
		let inThrottle;
		return function () {
			const args = arguments;
			const context = this;
			if (!inThrottle) {
				func.apply(context, args);
				inThrottle = true;
				setTimeout(() => (inThrottle = false), limit);
			}
		};
	},

	// Initialize Typed.js with shuffled phrases
	initTypedJS() {
		// Require the UMD global `Typed` provided by typed.js
		if (typeof Typed === "undefined") {
			console.error("Typed.js is not loaded.");
			return;
		}
		// Ensure the target element exists (index.html uses #typed5 inside #typed-text)
		const target = document.querySelector("#typed5") || document.querySelector("#typed-text");
		if (!target) return;
		// Configure phrases requested by user
		const phrases = [
			"IT Operations",
			"Data Analysis",
			"Process Automation",
			"ERP",
			"Power BI & Advanced Excel",
		];
		// eslint-disable-next-line no-undef
		new Typed(target, {
			strings: phrases,
			typeSpeed: 40,
			backSpeed: 20,
			cursorChar: "_",
			shuffle: true,
			smartBackspace: false,
			backDelay: 1500,
			startDelay: 500,
			loop: true,
		});
	},

	// Deprecated TypeIt fallback removed since we use Typed.js CDN in index.html

	initParticles() {
		// Initialize Particles.js
		if (typeof particlesJS !== "undefined") {
			particlesJS.load("particles-js", "particles.json", function () {
				console.log("callback - particles.js config loaded");
			});
		}
	},

	initScrollReveal() {
		if (typeof ScrollReveal === "undefined") {
			console.error("ScrollReveal is not loaded.");
			return;
		}

		const sr = ScrollReveal({
			origin: "bottom",
			distance: "60px",
			duration: 1000,
			delay: 200,
			reset: true, // animate once for performance
		});

		// Common reveal for section titles
		sr.reveal("h2", { delay: 200, origin: "top" });

		// Hero Section
		sr.reveal("#home h1", { origin: "left", delay: 400 });
		sr.reveal("#home .flex-col", { origin: "bottom", delay: 600 });

		// About Section
		sr.reveal("#about .card:nth-of-type(1)", { origin: "left", delay: 300 });
		sr.reveal("#about .card:nth-of-type(2)", { origin: "right", delay: 400 });

		// Technical Skills Section - trigger animation on reveal
		// We use afterReveal to trigger the JS-based counter animation
		sr.reveal(".skill-item", {
			distance: "30px",
			interval: 150,
			afterReveal: (el) => {
				const barFill = el.querySelector(".skill-bar-fill");
				const percentage = el.querySelector(".skill-percentage");
				if (barFill && percentage) {
					const goal = parseInt(percentage.dataset.goal, 10);

					// Ensure parent progress container has ARIA role and attributes for accessibility
					const progressContainer = el.querySelector(".skill-bar");
					if (progressContainer) {
						progressContainer.setAttribute("role", "progressbar");
						progressContainer.setAttribute("aria-valuemin", "0");
						progressContainer.setAttribute("aria-valuemax", "100");
						progressContainer.setAttribute("aria-valuenow", "0");
						// Optional label for SR: use preceding skill name text
						const skillName = el.querySelector(".font-medium");
						if (skillName) {
							progressContainer.setAttribute("aria-label", skillName.textContent.trim());
						}
					}

					// Kick off the width transition
					barFill.style.width = barFill.dataset.width;

					// Animate the percentage number and sync aria-valuenow
					this.animateCountUp(percentage, goal, progressContainer);
				}
			},
		});

		// Sections with multiple cards that can have a staggered effect
		sr.reveal("#experience .card", { interval: 200 });
		// Projects: stronger animation, staggered, once for performance
		sr.reveal("#projects .project-card", {
			interval: 120,
			distance: "40px",
			origin: "bottom",
			scale: 0.96,
			opacity: 0,
			duration: 900,
			easing: "cubic-bezier(0.22, 1, 0.36, 1)",
			reset: false,
			viewFactor: 0.15
		});
		// Add a slight inner stagger for the image to create parallax-like feel
		sr.reveal("#projects .project-card img", {
			delay: 150,
			interval: 120,
			distance: "30px",
			origin: "bottom",
			scale: 1.0,
			opacity: 0,
			duration: 700,
			easing: "cubic-bezier(0.22, 1, 0.36, 1)",
			reset: false,
			viewFactor: 0.2
		});
		sr.reveal("#activities .card", { interval: 200 });
		sr.reveal("#recommendations .card", { interval: 200 });

		// Education & Certifications Section
		sr.reveal("#education .card:nth-of-type(1)", { origin: "left" });
		sr.reveal("#education .card:nth-of-type(2)", { origin: "right" });

		// Currently Learning Section
		sr.reveal("#learning .card", { interval: 150, scale: 0.9 });

		// Contact Section
		sr.reveal("#contact .card:nth-of-type(1)", { origin: "left" });
		sr.reveal("#contact .card:nth-of-type(2)", { origin: "right" });
	},

	animateCountUp(el, goal, ariaTarget = null) {
		let start = 0;
		const duration = 2000; // Corresponds to the CSS transition duration
		const startTime = performance.now();

		const step = (currentTime) => {
			const elapsedTime = currentTime - startTime;
			const progress = Math.min(elapsedTime / duration, 1);
			const currentVal = Math.floor(progress * goal);

			el.textContent = `${currentVal}%`;
			if (ariaTarget) {
				ariaTarget.setAttribute("aria-valuenow", String(currentVal));
			}

			if (progress < 1) {
				requestAnimationFrame(step);
			}
		};
		requestAnimationFrame(step);
	},

	scrollToTop() {
		window.scrollTo({ top: 0, behavior: "smooth" });
	},

	initHeadroom() {
		const header = document.querySelector("header");
		if (header && typeof Headroom !== "undefined") {
			const headroom = new Headroom(header, {
				offset: 200, // show/hide header after scrolling 200px
			});
			headroom.init();
		}
	},

	initGLightbox() {
		// Wait a bit to ensure DOM is fully ready
		setTimeout(() => {
			const anchors = document.querySelectorAll('.glightbox');
			const dataAttrEls = document.querySelectorAll('[data-glightbox]');
			console.log('GLightbox candidates => anchors:', anchors.length, 'data-glightbox:', dataAttrEls.length);

			// Load GLightbox if missing
			if (typeof GLightbox === "undefined") {
				console.warn('GLightbox not found. Loading from CDN...');
				const script = document.createElement('script');
				script.src = 'https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/js/glightbox.min.js';
				script.onload = () => {
					console.log('GLightbox loaded dynamically');
					this.initializeGLightbox();
				};
				document.head.appendChild(script);
				return;
			}

			this.initializeGLightbox();
		}, 100);
	},

	initializeGLightbox() {
		try {
			// Use anchors with .glightbox (we wrapped images in anchors)
			const selector = '.glightbox';
			const nodes = document.querySelectorAll(selector);
			console.log('Initializing GLightbox on anchors:', nodes.length);
			if (nodes.length === 0) {
				console.warn('No anchors found for GLightbox initialization.');
				return;
			}
	
			GLightbox({
				selector,
				touchNavigation: true,
				loop: true,
				autoplayVideos: false,
				closeOnOutsideClick: true,
				zoomable: true,
				// Global description position for all slides (can be top | bottom | left | right)
				descPosition: 'bottom'
			});
	
			nodes.forEach(n => n.style.cursor = 'zoom-in');
	
			console.log('GLightbox initialized successfully');
		} catch (error) {
			console.error('Error initializing GLightbox:', error);
		}
	},

};
