// Main application entry point.
// Phase 10: Progress tracking and final profile interaction.

import { initState } from './state/story-state.js';
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
}

document.addEventListener('DOMContentLoaded', initApp);
