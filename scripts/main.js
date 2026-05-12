// Main application entry point
// Imports all controllers and initializes the application

import { initChapterObserver } from './controllers/chapter-observer.controller.js';
import { initTheme } from './controllers/theme.controller.js';
import { initScene } from './controllers/scene.controller.js';
import { initProgress } from './controllers/progress.controller.js';
import { initNavigation } from './controllers/navigation.controller.js';
import { initPlayerProfile } from './controllers/player-profile.controller.js';

function initApp() {
    initChapterObserver();
    initTheme();
    initScene();
    initProgress();
    initNavigation();
    initPlayerProfile();
}

document.addEventListener('DOMContentLoaded', initApp);