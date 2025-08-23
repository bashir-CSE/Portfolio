function handleScroll(elements) {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  // Update progress bar using GPU-accelerated transform when available
  if (elements.progressBarInner) {
    const scale = Math.max(0, Math.min(1, scrollPercent / 100));
    elements.progressBarInner.style.transform = `scaleX(${scale})`;
    elements.progressBar.setAttribute("aria-valuenow", String(Math.round(scrollPercent)));
  } else if (elements.progressBar) {
    elements.progressBar.style.width = `${scrollPercent}%`;
    elements.progressBar.setAttribute("aria-valuenow", String(Math.round(scrollPercent)));
  }

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
  // Use a slightly tighter throttle for smoother updates
  const throttledScroll = throttle(() => handleScroll(elements), 50);
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
