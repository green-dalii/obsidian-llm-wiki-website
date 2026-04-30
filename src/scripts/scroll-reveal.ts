/**
 * Scroll reveal - IntersectionObserver-based entrance animations.
 * Apply `.reveal` to any element you want to animate on scroll.
 * Add `data-delay="N"` for staggered delays (in 80ms units).
 */

function initReveal() {
  console.log('[scroll-reveal] Initializing...');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = parseInt(el.dataset.delay || '0', 10);
          setTimeout(() => {
            el.classList.add('is-visible');
            console.log('[scroll-reveal] Revealing element with delay:', delay);
          }, delay * 80);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  const revealElements = document.querySelectorAll('.reveal');
  console.log('[scroll-reveal] Found', revealElements.length, 'elements to reveal');

  revealElements.forEach((el) => {
    observer.observe(el);
  });
}

// Run immediately when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal);
} else {
  // DOM already loaded, run now
  initReveal();
}

// Also run after a small delay to ensure all elements are rendered
setTimeout(initReveal, 100);
