export function toggleMobileMenu(elements) {
  const isNowActive = !elements.mobileMenu.classList.contains("active");
  elements.mobileMenu.classList.toggle("active");
  if (isNowActive) {
    elements.menuIcon.classList.add("hidden");
    elements.closeIcon.classList.remove("hidden");
  } else {
    elements.menuIcon.classList.remove("hidden");
    elements.closeIcon.classList.add("hidden");
  }
  elements.mobileMenuBtn.setAttribute("aria-expanded", String(isNowActive));
  elements.mobileMenu.setAttribute("aria-hidden", String(!isNowActive));
}

export function closeMobileMenu(elements) {
  elements.mobileMenu.classList.remove("active");
  elements.menuIcon.classList.remove("hidden");
  elements.closeIcon.classList.add("hidden");
  elements.mobileMenuBtn.setAttribute("aria-expanded", "false");
  elements.mobileMenu.setAttribute("aria-hidden", "true");
}

export function initHeadroom() {
  const header = document.querySelector("header");
  if (header && typeof Headroom !== "undefined") {
    const headroom = new Headroom(header, {
      offset: 200,
    });
    headroom.init();
  }
}
