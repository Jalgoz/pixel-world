// Chapter Observer Controller - Detects active chapter via IntersectionObserver

import { chapters } from '../config/chapters.js';
import { setActiveChapter } from '../state/story-state.js';
import { updateTheme } from './theme.controller.js';
import { updateScene } from './scene.controller.js';
import { updateNavigation } from './navigation.controller.js';

let activeChapterId = null;
let observer = null;

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

function handleChapterIntersect(entries) {
    const visibleEntries = entries.filter((entry) => entry.isIntersecting);
    if (!visibleEntries.length) return;

    const bestEntry = visibleEntries.reduce((currentBest, entry) => {
        if (!currentBest) return entry;
        return entry.intersectionRatio > currentBest.intersectionRatio ? entry : currentBest;
    }, null);

    const chapterId = bestEntry?.target?.dataset?.chapter;
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

export function initChapterObserver() {
    const stepElements = document.querySelectorAll('.story-step[data-chapter]');
    const chapterElements = document.querySelectorAll('.chapter[data-chapter]');
    const observerTargets = usesLinearStoryLayout() ? chapterElements : stepElements;

    if (!observerTargets.length) return;

    const options = {
        root: null,
        rootMargin: '-35% 0px -35% 0px',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
    };

    observer = new IntersectionObserver(handleChapterIntersect, options);

    observerTargets.forEach(element => {
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
