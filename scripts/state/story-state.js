// Story state - Shared UI state for the storytelling interface

const state = {
    activeChapter: null,
    activeScene: null,
    activeTheme: null,
    selectedProfile: null,
    prefersReducedMotion: false
};

export function getState() {
    return state;
}

export function setActiveChapter(chapterId) {
    state.activeChapter = chapterId;
}

export function setActiveScene(sceneClass) {
    state.activeScene = sceneClass;
}

export function setActiveTheme(themeName) {
    state.activeTheme = themeName;
}

export function setSelectedProfile(profileId) {
    state.selectedProfile = profileId;
}

export function setPrefersReducedMotion(value) {
    state.prefersReducedMotion = value;
}

export function initState() {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    // Listen for changes
    motionQuery.addEventListener('change', (e) => {
        setPrefersReducedMotion(e.matches);
    });
}