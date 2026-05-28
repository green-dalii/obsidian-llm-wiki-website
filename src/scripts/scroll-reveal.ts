/**
 * Scroll reveal - IntersectionObserver-based entrance animations.
 * Optimized for Astro Islands architecture.
 */

let revealObserver: IntersectionObserver | null = null;

function initReveal() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.delay || '0', 10);
            setTimeout(() => {
              el.classList.add('is-visible');
            }, delay * 80);
            revealObserver!.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
  }

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver!.observe(el);
  });
}

// Run when DOM is ready (for static Astro content)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal);
} else {
  initReveal();
}

// Re-run after React Islands hydrate
document.addEventListener('astro:page-load', initReveal);
