/**
 * Scroll reveal - IntersectionObserver-based entrance animations.
 * Optimized for Astro Islands architecture - waits for React components to render.
 */

let revealObserver: IntersectionObserver | null = null;

function initReveal() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
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

// Strategy 1: Run when DOM is ready (for static Astro content)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal);
} else {
  initReveal();
}

// Strategy 2: Wait for React Islands to hydrate (Astro official recommendation)
document.addEventListener('astro:page-load', initReveal);

// Strategy 3: Delayed initialization as fallback (ensures React mounted)
setTimeout(initReveal, 300);

// Strategy 4: MutationObserver for dynamic content
const mutationObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) {
        const el = node as Element;
        if (el.classList?.contains('reveal') && revealObserver) {
          revealObserver.observe(el);
        }
        if (el.querySelectorAll && revealObserver) {
          el.querySelectorAll('.reveal').forEach((child) => {
            revealObserver.observe(child);
          });
        }
      }
    });
  });
});

mutationObserver.observe(document.body, {
  childList: true,
  subtree: true
});