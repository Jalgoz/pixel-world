// Chapter Observer Controller - Detects active chapter via IntersectionObserver

import { chapters } from '../config/chapters.js';
import { setActiveChapter } from '../state/story-state.js';
import { updateTheme } from './theme.controller.js';
import { updateScene } from './scene.controller.js';
import { updateNavigation } from './navigation.controller.js';

let activeChapterId = null;
let observer = null;
let observedTargets = [];

function usesLinearStoryLayout() {
    return window.matchMedia('(max-width: 1024px)').matches;
}

function updateChapterPanel(chapterId) {
    const panels = document.querySelectorAll('.chapter-panel[data-chapter-panel]');
    panels.forEach((panel) => {
        const isActive = panel.dataset.chapterPanel === chapterId;
        panel.classList.toggle('is-active', isActive);
    });
}

function getCenteredTarget() {
    const viewportCenter = window.innerHeight / 2;

    return observedTargets.reduce((currentBest, target) => {
        const rect = target.getBoundingClientRect();
        const targetCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(targetCenter - viewportCenter);
        const crossesViewportCenter = rect.top <= viewportCenter && rect.bottom >= viewportCenter;
        const score = crossesViewportCenter ? 0 : distanceFromCenter;

        if (!currentBest || score < currentBest.score) {
            return { target, score };
        }

        return currentBest;
    }, null)?.target;
}

function activateChapter(chapterId) {
    if (!chapterId || chapterId === activeChapterId) return;

    const chapter = chapters.find(c => c.id === chapterId);
    if (!chapter) return;

    activeChapterId = chapterId;

    setActiveChapter(chapterId);
    updateTheme(chapter.theme);
    updateScene(chapter.scene);
    updateNavigation(chapterId);
    updateChapterPanel(chapterId);
}

function handleChapterIntersect(entries) {
    const hasVisibleTarget = entries.some((entry) => entry.isIntersecting);
    if (!hasVisibleTarget) return;

    activateChapter(getCenteredTarget()?.dataset?.chapter);
}

export function initChapterObserver() {
    const stepElements = document.querySelectorAll('.story-step[data-chapter]');
    const chapterElements = document.querySelectorAll('.chapter[data-chapter]');
    observedTargets = Array.from(usesLinearStoryLayout() ? chapterElements : stepElements);

    if (!observedTargets.length) return;

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: [0]
    };

    observer = new IntersectionObserver(handleChapterIntersect, options);

    observedTargets.forEach(element => {
        observer.observe(element);
    });

    if (!activeChapterId) {
        const initialChapter = chapterElements[0]?.dataset.chapter;
        if (initialChapter) {
            updateChapterPanel(initialChapter);
        }
    }
}

export function destroyChapterObserver() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}
