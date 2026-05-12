// Progress Controller - Controls the reading progress indicator

let progressBar = null;
let progressFill = null;

function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    if (progressFill) {
        progressFill.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
}

export function initProgress() {
    progressBar = document.querySelector('.progress-bar');
    progressFill = document.querySelector('.progress-bar__fill');

    if (!progressBar || !progressFill) return;

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}

export function destroyProgress() {
    window.removeEventListener('scroll', updateProgress);
}