// Chapter Observer Controller - Detects active chapter via IntersectionObserver

import { chapters } from '../config/chapters.js';
import { setActiveChapter } from '../state/story-state.js';
import { updateTheme } from './theme.controller.js';
import { updateScene } from './scene.controller.js';
import { updateNavigation } from './navigation.controller.js';

let activeChapterId = null;
let observer = null;
let observedTargets = [];
let storyArea = null;
let storySteps = null;
let scrollFrame = null;

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

function getDesktopScrollTarget() {
    if (!storyArea || !observedTargets.length) return null;

    const storyTop = storyArea.getBoundingClientRect().top + window.scrollY;
    const firstStepHeight = observedTargets[0].getBoundingClientRect().height;
    const progress = window.scrollY - storyTop;
    const targetIndex = Math.min(
        Math.max(Math.floor(progress / firstStepHeight), 0),
        observedTargets.length - 1
    );

    return observedTargets[targetIndex];
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

    const target = usesLinearStoryLayout() ? getCenteredTarget() : getDesktopScrollTarget();
    activateChapter(target?.dataset?.chapter);
}

function updateActiveChapterFromScroll() {
    scrollFrame = null;

    const target = usesLinearStoryLayout() ? getCenteredTarget() : getDesktopScrollTarget();
    activateChapter(target?.dataset?.chapter);
}

function requestScrollUpdate() {
    if (scrollFrame) return;

    scrollFrame = window.requestAnimationFrame(updateActiveChapterFromScroll);
}

export function initChapterObserver() {
    const stepElements = document.querySelectorAll('.story-step[data-chapter]');
    const chapterElements = document.querySelectorAll('.chapter[data-chapter]');
    storyArea = document.querySelector('.story-area');
    storySteps = document.querySelector('.story-steps');
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

    window.addEventListener('scroll', requestScrollUpdate, { passive: true });

    if (!activeChapterId) {
        const initialChapter = chapterElements[0]?.dataset.chapter;
        if (initialChapter) {
            activateChapter(initialChapter);
        }
    }
}

export function destroyChapterObserver() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }

    window.removeEventListener('scroll', requestScrollUpdate);

    if (scrollFrame) {
        window.cancelAnimationFrame(scrollFrame);
        scrollFrame = null;
    }

    observedTargets = [];
    storyArea = null;
    storySteps = null;
}
