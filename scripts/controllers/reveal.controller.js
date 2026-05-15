// Reveal Controller - Activates editorial elements when they enter the viewport.

const revealSelector = '[data-reveal]';

export function initReveal() {
    const revealElements = document.querySelectorAll(revealSelector);
    if (!revealElements.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        revealElements.forEach(element => element.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        root: null,
        rootMargin: '0px 0px -18% 0px',
        threshold: 0.18
    });

    revealElements.forEach(element => observer.observe(element));
}
