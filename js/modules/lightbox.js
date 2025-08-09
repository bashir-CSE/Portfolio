function initializeGLightbox() {
  try {
    const selector = '.glightbox';
    const nodes = document.querySelectorAll(selector);
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
      descPosition: 'bottom'
    });

    nodes.forEach(n => n.style.cursor = 'zoom-in');
    console.log('GLightbox initialized successfully');
  } catch (error) {
    console.error('Error initializing GLightbox:', error);
  }
}

export function initGLightbox() {
  setTimeout(() => {
    if (typeof GLightbox === "undefined") {
      console.warn('GLightbox not found. Loading from CDN...');
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/js/glightbox.min.js';
      script.onload = () => {
        console.log('GLightbox loaded dynamically');
        initializeGLightbox();
      };
      document.head.appendChild(script);
      return;
    }
    initializeGLightbox();
  }, 100);
}
