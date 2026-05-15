// Story state - minimal shared UI state for the storytelling interface.

import { defaultChapterId, getChapterById } from '../config/chapters.js';

const state = {
    activeChapter: defaultChapterId,
    activeScene: getChapterById(defaultChapterId)?.scene || null,
    activeTheme: getChapterById(defaultChapterId)?.theme || null,
    selectedProfile: null,
    prefersReducedMotion: false,
    isNavigating: false
};

const subscribers = new Set();

export function getState() {
    return { ...state };
}

export function subscribe(listener) {
    if (typeof listener !== 'function') return () => {};

    subscribers.add(listener);
    return () => subscribers.delete(listener);
}

function notify() {
    const currentState = getState();
    subscribers.forEach((listener) => listener(currentState));
}

function updateState(partialState) {
    Object.assign(state, partialState);
    notify();
}

export function setActiveChapter(chapterId) {
    const chapter = getChapterById(chapterId);
    if (!chapter || state.activeChapter === chapterId) return;

    updateState({
        activeChapter: chapter.id,
        activeScene: chapter.scene,
        activeTheme: chapter.theme
    });
}

export function setActiveScene(sceneClass) {
    if (state.activeScene === sceneClass) return;
    updateState({ activeScene: sceneClass });
}

export function setActiveTheme(themeName) {
    if (state.activeTheme === themeName) return;
    updateState({ activeTheme: themeName });
}

export function setSelectedProfile(profileId) {
    if (state.selectedProfile === profileId) return;
    updateState({ selectedProfile: profileId });
}

export function setPrefersReducedMotion(value) {
    const prefersReducedMotion = Boolean(value);
    if (state.prefersReducedMotion === prefersReducedMotion) return;
    updateState({ prefersReducedMotion });
}

export function setIsNavigating(value) {
    state.isNavigating = Boolean(value);
}

export function getIsNavigating() {
    return state.isNavigating;
}

export function initState() {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (event) => setPrefersReducedMotion(event.matches);
    if (typeof motionQuery.addEventListener === 'function') {
        motionQuery.addEventListener('change', handleMotionChange);
        return () => motionQuery.removeEventListener('change', handleMotionChange);
    }

    motionQuery.addListener(handleMotionChange);
    return () => motionQuery.removeListener(handleMotionChange);
}
