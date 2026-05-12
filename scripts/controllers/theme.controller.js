// Theme Controller - Updates the active visual theme

import { setActiveTheme } from '../state/story-state.js';

let currentTheme = null;

export function updateTheme(themeName) {
    if (themeName === currentTheme) return;

    const body = document.body;

    // Remove previous theme
    if (currentTheme) {
        body.removeAttribute('data-theme');
    }

    // Apply new theme
    if (themeName) {
        body.setAttribute('data-theme', themeName);
    }

    currentTheme = themeName;
    setActiveTheme(themeName);
}

export function initTheme() {
    // Initial theme setup if needed
}

export function getCurrentTheme() {
    return currentTheme;
}