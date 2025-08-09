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
  sr.reveal("#about .card:nth-of-type(1)", { origin: "left", delay: 300 });
  sr.reveal("#about .card:nth-of-type(2)", { origin: "right", delay: 400 });
  sr.reveal(".skill-item", {
    distance: "30px",
    interval: 150,
    afterReveal: (el) => {
      const barFill = el.querySelector(".skill-bar-fill");
      const percentage = el.querySelector(".skill-percentage");
      if (barFill && percentage) {
        const goal = parseInt(percentage.dataset.goal, 10);
        const progressContainer = el.querySelector(".skill-bar");
        if (progressContainer) {
          progressContainer.setAttribute("role", "progressbar");
          progressContainer.setAttribute("aria-valuemin", "0");
          progressContainer.setAttribute("aria-valuemax", "100");
          progressContainer.setAttribute("aria-valuenow", "0");
          const skillName = el.querySelector(".font-medium");
          if (skillName) {
            progressContainer.setAttribute("aria-label", skillName.textContent.trim());
          }
        }
        barFill.style.width = barFill.dataset.width;
        animateCountUp(percentage, goal, progressContainer);
      }
    },
  });
  sr.reveal("#experience .card", { interval: 200 });
  sr.reveal("#projects .project-card", {
    interval: 200,
    distance: "40px",
    origin: "bottom",
    scale: 0.9,
    easing: "ease-in-out",
  });
  sr.reveal("#activities .card", { interval: 200 });
  sr.reveal("#recommendations .card", { interval: 200 });
  sr.reveal("#education .card:nth-of-type(1)", { origin: "left" });
  sr.reveal("#education .card:nth-of-type(2)", { origin: "right" });
  sr.reveal("#learning .card", { interval: 150, scale: 0.9 });
  sr.reveal("#contact .card:nth-of-type(1)", { origin: "left" });
  sr.reveal("#contact .card:nth-of-type(2)", { origin: "right" });
}

function animateCountUp(el, goal, ariaTarget = null) {
  let start = 0;
  const duration = 2000;
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
}
