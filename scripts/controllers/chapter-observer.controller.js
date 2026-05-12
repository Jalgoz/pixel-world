// Chapter Observer Controller - Detects active chapter via IntersectionObserver

import { chapters } from '../config/chapters.js';
import { setActiveChapter } from '../state/story-state.js';
import { updateTheme } from './theme.controller.js';
import { updateScene } from './scene.controller.js';
import { updateNavigation } from './navigation.controller.js';

let observer = null;

function handleChapterIntersect(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const chapterId = entry.target.dataset.chapter;
            const chapter = chapters.find(c => c.id === chapterId);

            if (chapter) {
                setActiveChapter(chapterId);
                updateTheme(chapter.theme);
                updateScene(chapter.scene);
                updateNavigation(chapterId);
            }
        }
    });
}

export function initChapterObserver() {
    const chapterElements = document.querySelectorAll('[data-chapter]');

    if (!chapterElements.length) return;

    const options = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    };

    observer = new IntersectionObserver(handleChapterIntersect, options);

    chapterElements.forEach(element => {
        observer.observe(element);
    });
}

export function destroyChapterObserver() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}