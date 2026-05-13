// Navigation Controller - Controls chapter navigation links and active state

import { chapters } from '../config/chapters.js';

let navItems = null;

function scrollToChapter(chapterId) {
    const element = document.getElementById(chapterId);
    if (element) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        element.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'center'
        });
    }
}

export function updateNavigation(activeChapterId) {
    if (!navItems) {
        navItems = document.querySelectorAll('.chapter-nav__item');
    }

    navItems.forEach(item => {
        const itemChapter = item.dataset.chapter;
        if (itemChapter === activeChapterId) {
            item.classList.add('chapter-nav__item--active');
            item.setAttribute('aria-current', 'true');
        } else {
            item.classList.remove('chapter-nav__item--active');
            item.removeAttribute('aria-current');
        }
    });
}

export function initNavigation() {
    navItems = document.querySelectorAll('.chapter-nav__item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const chapterId = item.dataset.chapter;
            scrollToChapter(chapterId);
        });
    });

    // Set initial active state
    const firstChapter = chapters[0];
    if (firstChapter) {
        updateNavigation(firstChapter.id);
    }
}
