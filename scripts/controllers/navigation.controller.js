// Navigation Controller - Controls chapter navigation links and active state

import { chapters } from '../config/chapters.js';
import { updateScene } from './scene.controller.js';
import { updateTheme } from './theme.controller.js';
import { setActiveChapter, setIsNavigating } from '../state/story-state.js';

let navItems = null;
let navigationTimeout = null;

function updateChapterPanel(chapterId) {
    const panels = document.querySelectorAll('.chapter-panel[data-chapter-panel]');
    panels.forEach((panel) => {
        panel.classList.toggle('is-active', panel.dataset.chapterPanel === chapterId);
    });
}

function applySelectedChapter(chapterId) {
    const chapter = chapters.find(c => c.id === chapterId);
    if (!chapter) return;

    setActiveChapter(chapterId);
    updateNavigation(chapterId);
    updateTheme(chapter.theme);
    updateScene(chapter.scene);
    updateChapterPanel(chapterId);
}

function scrollToChapter(chapterId) {
    const usesLinearStoryLayout = window.matchMedia('(max-width: 1024px)').matches;
    const stepElement = document.getElementById(`step-${chapterId}`);
    const chapterElement = document.getElementById(chapterId);
    const element = usesLinearStoryLayout ? chapterElement : (stepElement || chapterElement);
    if (element) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (navigationTimeout) {
            window.clearTimeout(navigationTimeout);
        }

        setIsNavigating(true);
        applySelectedChapter(chapterId);

        element.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: usesLinearStoryLayout ? 'center' : 'start'
        });

        navigationTimeout = window.setTimeout(() => {
            setIsNavigating(false);
            applySelectedChapter(chapterId);
            navigationTimeout = null;
        }, prefersReducedMotion ? 50 : 700);
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
