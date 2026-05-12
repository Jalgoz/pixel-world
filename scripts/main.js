// Main application entry point.
// Phase 9: Scroll behavior and chapter activation.

import { initState, subscribe } from './state/story-state.js';
import { initChapterObserver } from './controllers/chapter-observer.controller.js';
import { initTheme } from './controllers/theme.controller.js';
import { initScene } from './controllers/scene.controller.js';
import { initNavigation } from './controllers/navigation.controller.js';
import { initProgress } from './controllers/progress.controller.js';
import { initPlayerProfile } from './controllers/player-profile.controller.js';

function initApp() {
    initState();
    initTheme();
    initScene();
    initChapterObserver();
    initNavigation();
    initProgress();
    initPlayerProfile();

    subscribe((state) => {
        console.log('State changed:', state.activeChapter, state.activeTheme);
    });
}

document.addEventListener('DOMContentLoaded', initApp);
