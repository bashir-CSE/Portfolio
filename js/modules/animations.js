// Add to your existing JS code
const animateOnScroll = () => {
  const cards = document.querySelectorAll('.project-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  cards.forEach(card => observer.observe(card));
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
});
