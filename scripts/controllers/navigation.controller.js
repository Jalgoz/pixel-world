// Navigation Controller - Controls chapter navigation links and active state

import { chapters } from '../config/chapters.js';

let navItems = null;

function scrollToChapter(chapterId) {
    const element = document.querySelector(`[data-chapter="${chapterId}"]`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
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
        } else {
            item.classList.remove('chapter-nav__item--active');
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