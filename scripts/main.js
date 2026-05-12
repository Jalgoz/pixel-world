// Main application entry point.
// Phase 8 initializes the shared state foundation only.

import { initState } from './state/story-state.js';

function initApp() {
    initState();
}

document.addEventListener('DOMContentLoaded', initApp);
