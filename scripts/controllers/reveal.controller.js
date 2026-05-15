// Reveal Controller - Activates editorial elements and viewport-aware videos.

const revealSelector = '[data-reveal]';
const revealGroupSelector = '[data-reveal-group]';
const controlledVideoSelector = '[data-controlled-video]';
const staggerStep = 90;

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function applyRevealStagger() {
    const revealGroups = document.querySelectorAll(revealGroupSelector);

    revealGroups.forEach((group) => {
        const groupedReveals = group.querySelectorAll(revealSelector);

        groupedReveals.forEach((element, index) => {
            element.style.setProperty('--reveal-delay', `${index * staggerStep}ms`);
        });
    });
}

function initRevealElements() {
    const revealElements = document.querySelectorAll(revealSelector);
    if (!revealElements.length) return;

    if (prefersReducedMotion()) {
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

function initControlledVideos() {
    const videos = document.querySelectorAll(controlledVideoSelector);
    if (!videos.length) return;

    if (prefersReducedMotion()) {
        videos.forEach((video) => {
            video.pause();
            video.removeAttribute('autoplay');
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const video = entry.target;

            if (entry.isIntersecting) {
                video.play().catch(() => {
                    video.controls = true;
                });
                return;
            }

            video.pause();
        });
    }, {
        root: null,
        rootMargin: '18% 0px 18% 0px',
        threshold: 0.12
    });

    videos.forEach(video => observer.observe(video));
}

export function initReveal() {
    applyRevealStagger();
    initRevealElements();
    initControlledVideos();
}
