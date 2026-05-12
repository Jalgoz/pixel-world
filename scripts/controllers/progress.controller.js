// Progress Controller - Controls the reading progress indicator

let progressBar = null;
let progressFill = null;
let animationFrame = null;

function updateProgress() {
    const scrollTop = window.scrollY;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
    const clampedProgress = Math.min(100, Math.max(0, progress));

    if (progressFill) {
        progressFill.style.width = `${clampedProgress}%`;
    }

    if (progressBar) {
        progressBar.setAttribute('aria-valuenow', String(Math.round(clampedProgress)));
    }
}

function requestProgressUpdate() {
    if (animationFrame) return;

    animationFrame = window.requestAnimationFrame(() => {
        updateProgress();
        animationFrame = null;
    });
}

export function initProgress() {
    progressBar = document.querySelector('.progress-bar');
    progressFill = document.querySelector('.progress-bar__fill');

    if (!progressBar || !progressFill) return;

    window.addEventListener('scroll', requestProgressUpdate, { passive: true });
    window.addEventListener('resize', requestProgressUpdate);
    updateProgress();
}

export function destroyProgress() {
    window.removeEventListener('scroll', requestProgressUpdate);
    window.removeEventListener('resize', requestProgressUpdate);

    if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }
}
