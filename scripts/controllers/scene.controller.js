// Scene Controller - Activates the visual scene associated with current chapter

import { setActiveScene } from '../state/story-state.js';

let currentScene = null;

export function updateScene(sceneClass) {
    if (sceneClass === currentScene) return;

    const previousScene = document.querySelector('.scene--active');
    if (previousScene) {
        previousScene.classList.remove('scene--active');
    }

    const newScene = document.querySelector(`.${sceneClass}`);
    if (newScene) {
        newScene.classList.add('scene--active');
    }

    currentScene = sceneClass;
    setActiveScene(sceneClass);
}

export function initScene() {
    // Set initial scene if needed
    const firstScene = document.querySelector('.scene');
    if (firstScene) {
        const sceneClasses = Array.from(firstScene.classList).find(c => c.startsWith('scene--chapter-'));
        if (sceneClasses) {
            currentScene = sceneClasses;
            firstScene.classList.add('scene--active');
            setActiveScene(sceneClasses);
        }
    }
}

export function getCurrentScene() {
    return currentScene;
}