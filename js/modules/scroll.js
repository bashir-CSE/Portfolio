function handleScroll(elements) {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  elements.progressBar.style.width = `${scrollPercent}%`;
  elements.progressBar.setAttribute("aria-valuenow", String(Math.round(scrollPercent)));

  let currentSection = "";
  elements.sections.forEach((section) => {
    if (scrollTop >= section.offsetTop - 200) {
      currentSection = section.getAttribute("id");
    }
  });

  const allLinks = [
    ...elements.desktopNavLinks,
    ...elements.mobileNavLinks,
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

  elements.scrollTopBtn.classList.toggle("visible", scrollTop > 300);
}

function throttle(func, limit) {
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
}

export function initScroll(elements) {
  const throttledScroll = throttle(() => handleScroll(elements), 100);
  window.addEventListener("scroll", throttledScroll);
}

export function handleSmoothScroll(e) {
  e.preventDefault();
  const target = document.querySelector(e.currentTarget.getAttribute("href"));
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function initScrollReveal() {
  if (typeof ScrollReveal === "undefined") {
    console.error("ScrollReveal is not loaded.");
    return;
  }

  const sr = ScrollReveal({
    origin: "bottom",
    distance: "60px",
    duration: 1000,
    delay: 200,
    reset: true,
  });

  sr.reveal("h2", { delay: 200, origin: "top" });
  sr.reveal("#home h1", { origin: "left", delay: 400 });
  sr.reveal("#home .flex-col", { origin: "bottom", delay: 600 });
  sr.reveal("#experience .card", { interval: 200 });
  sr.reveal("#projects .project-card", {
    interval: 200,
    distance: "40px",
    origin: "bottom",
    scale: 0.9,
    easing: "ease-in-out",
  });
  sr.reveal("#activities .card", { interval: 200 });
  sr.reveal("#education .card:nth-of-type(1)", { origin: "left" });
  sr.reveal("#education .card:nth-of-type(2)", { origin: "right" });
  sr.reveal("#contact .card:nth-of-type(1)", { origin: "left" });
  sr.reveal("#contact .card:nth-of-type(2)", { origin: "right" });
  
  // Simplified skill animation to avoid conflicts
  sr.reveal(".skill-item", {
    distance: "30px",
    interval: 150,
  });
}

function animateCountUp(el, goal, ariaTarget = null) {
  let start = 0;
  const duration = 2000;
  const startTime = performance.now();
  let animationId = null;

  const step = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const currentVal = Math.floor(progress * goal);

    el.textContent = `${currentVal}%`;
    if (ariaTarget) {
      ariaTarget.setAttribute("aria-valuenow", String(currentVal));
    }

    if (progress < 1) {
      animationId = requestAnimationFrame(step);
    }
  };
  
  animationId = requestAnimationFrame(step);
  
  // Cleanup function to cancel animation if element is removed
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };
}
