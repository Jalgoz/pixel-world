// Footer signal controller - gives the decorative pixel a subtle evasive motion.

const signalSelector = '[data-footer-signal]';
const escapeRadius = 128;
const maxOffsetX = 44;
const maxOffsetY = 14;

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function resetSignal(signal) {
    signal.style.setProperty('--footer-signal-x', '0px');
    signal.style.setProperty('--footer-signal-y', '0px');
}

function moveSignalAway(signal, pointerX, pointerY) {
    const rect = signal.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = centerX - pointerX;
    const deltaY = centerY - pointerY;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance > escapeRadius) {
        resetSignal(signal);
        return;
    }

    const safeDistance = distance || 1;
    const force = (escapeRadius - distance) / escapeRadius;
    const offsetX = (deltaX / safeDistance) * maxOffsetX * force;
    const offsetY = (deltaY / safeDistance) * maxOffsetY * force;

    signal.style.setProperty('--footer-signal-x', `${offsetX.toFixed(2)}px`);
    signal.style.setProperty('--footer-signal-y', `${offsetY.toFixed(2)}px`);
}

export function initFooterSignal() {
    const signal = document.querySelector(signalSelector);
    if (!signal || prefersReducedMotion()) return;

    const footer = signal.closest('.footer');
    if (!footer) return;

    footer.addEventListener('pointermove', (event) => {
        moveSignalAway(signal, event.clientX, event.clientY);
    });

    footer.addEventListener('pointerleave', () => resetSignal(signal));
}
