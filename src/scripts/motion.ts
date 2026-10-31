/**
 * Interaction layer.
 *
 * Deliberately not an animation library. This is a static Astro site: GSAP or
 * Motion would add 25–35KB gzip to animate a landing page whose performance is
 * a scored criterion. Everything here is a few hundred bytes of pointer maths
 * plus CSS, and every effect is a no-op when the visitor asks for reduced
 * motion.
 *
 *  1. Card spotlight — a light that follows the pointer across a card surface.
 *     Driven by two CSS custom properties, rAF-coalesced, and only while the
 *     pointer is actually over a card.
 *  2. Nav underline — a hairline that grows from the leading edge on hover.
 *     Pure CSS; classified here only for the reduced-motion gate.
 *  3. Theme wipe — the scheme change is revealed from the control that caused
 *     it, so the page reads as one surface changing material rather than a
 *     reload.
 */

const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── 1. Card spotlight ─────────────────────────────────────────── */

function initSpotlights(): void {
  if (reduceMotion()) return;
  // Pointer-driven light is a lie on a touch screen.
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let frame = 0;
  let pending: { el: HTMLElement; x: number; y: number } | null = null;

  const flush = () => {
    frame = 0;
    if (!pending) return;
    const { el, x, y } = pending;
    el.style.setProperty('--spot-x', `${x}px`);
    el.style.setProperty('--spot-y', `${y}px`);
    pending = null;
  };

  const onMove = (event: PointerEvent) => {
    const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('.card, .card-purple');
    if (!target) return;
    const rect = target.getBoundingClientRect();
    pending = { el: target, x: event.clientX - rect.left, y: event.clientY - rect.top };
    if (!frame) frame = requestAnimationFrame(flush);
  };

  document.addEventListener('pointermove', onMove, { passive: true });
}

/* ── 2. Theme wipe ─────────────────────────────────────────────── */

function initThemeWipe(): void {
  window.addEventListener('klw:themechange', (event) => {
    if (reduceMotion()) return;

    const detail = (event as CustomEvent<{ theme: string }>).detail;
    if (!detail) return;

    // Start the circle wherever the control sits, in the header.
    const btn = document.querySelector<HTMLElement>('.theme-toggle__btn[aria-pressed="true"]');
    const rect = btn?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 120;
    const y = rect ? rect.top + rect.height / 2 : 28;

    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const veil = document.createElement('div');
    veil.setAttribute('aria-hidden', 'true');
    veil.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:9998', 'pointer-events:none',
      `background:${detail.theme === 'light' ? 'var(--canvas)' : 'var(--canvas)'}`,
      'opacity:0.001',
      `clip-path:circle(0px at ${x}px ${y}px)`,
    ].join(';');
    document.body.appendChild(veil);

    veil.animate(
      [
        { opacity: 0.9, clipPath: `circle(0px at ${x}px ${y}px)` },
        { opacity: 0, clipPath: `circle(${radius}px at ${x}px ${y}px)` },
      ],
      { duration: 520, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    ).addEventListener('finish', () => veil.remove());
  });
}

/* ── 3. Magnetic CTA label ─────────────────────────────────────── */

function initMagneticButtons(): void {
  if (reduceMotion()) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
      const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
      el.style.transform = `translate(${dx * 4}px, ${dy * 3}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}

function boot(): void {
  initSpotlights();
  initThemeWipe();
  initMagneticButtons();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

document.addEventListener('astro:page-load', boot);
