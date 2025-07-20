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
				"A Detail-Oriented Information Technology Professional.",
				"Specializing in Data Analysis and System Automation.",
				"Transforming Data into Actionable Insights.",
			],
			speed: 40,
			deleteSpeed: 20,
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
		this.initTyping();
		this.initEventListeners();
		this.initParticles();
		this.initScrollReveal();
		this.initHeadroom();
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
			link.classList.toggle(
				"active-nav-link",
				link.getAttribute("href") === `#${currentSection}`
			);
		});

		this.elements.scrollTopBtn.classList.toggle("visible", scrollTop > 300);
	},

	toggleMobileMenu() {
		this.elements.mobileMenu.classList.toggle("active");
		this.elements.menuIcon.classList.toggle("hidden");
		this.elements.closeIcon.classList.toggle("hidden");
	},

	closeMobileMenu() {
		this.elements.mobileMenu.classList.remove("active");
		this.elements.menuIcon.classList.remove("hidden");
		this.elements.closeIcon.classList.add("hidden");
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

	initTyping() {
		if (typeof TypeIt !== "undefined") {
			new TypeIt("#typed-text", this.config.typing).go();
		}
	},

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
			reset: true, // reveal elements on every scroll
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
				const bar = el.querySelector(".skill-bar-fill");
				const percentage = el.querySelector(".skill-percentage");
				if (bar && percentage) {
					const goal = parseInt(percentage.dataset.goal, 10);
					// The CSS transition for the bar width is handled in styles.css
					bar.style.width = bar.dataset.width;
					// We animate the percentage number
					this.animateCountUp(percentage, goal);
				}
			},
		});

		// Sections with multiple cards that can have a staggered effect
		sr.reveal("#experience .card", { interval: 200 });
		sr.reveal("#projects .card", { interval: 200 });
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

	animateCountUp(el, goal) {
		let start = 0;
		const duration = 1500; // Corresponds to the CSS transition duration
		const startTime = performance.now();

		const step = (currentTime) => {
			const elapsedTime = currentTime - startTime;
			const progress = Math.min(elapsedTime / duration, 1);
			const currentVal = Math.floor(progress * goal);

			el.textContent = `${currentVal}%`;

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
};
