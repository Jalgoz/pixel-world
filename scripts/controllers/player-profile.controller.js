// Player Profile Controller - Controls the final "what type of player are you?" interaction

import { playerProfiles } from '../config/chapters.js';
import { setSelectedProfile } from '../state/story-state.js';

let profileOptions = null;
let resultContainer = null;

function createResultContent(profile) {
    const title = document.createElement('h3');
    title.className = 'profile-result__title';
    title.textContent = profile.label;

    const description = document.createElement('p');
    description.className = 'profile-result__description';
    description.textContent = profile.description;

    return [title, description];
}

function updateSelectedOption(selectedProfileId) {
    profileOptions.forEach(option => {
        const isSelected = option.dataset.profile === selectedProfileId;
        option.classList.toggle('profile-option--selected', isSelected);
        option.setAttribute('aria-pressed', String(isSelected));
    });
}

function showProfileResult(profileId) {
    const profile = playerProfiles.find(p => p.id === profileId);
    if (!profile || !resultContainer) return;

    resultContainer.replaceChildren(...createResultContent(profile));

    resultContainer.classList.add('is-visible');
    setSelectedProfile(profileId);
}

function selectProfile(option) {
    const profileId = option.dataset.profile;
    if (!profileId) return;

    updateSelectedOption(profileId);
    showProfileResult(profileId);
    resultContainer?.focus({ preventScroll: true });
}

function focusOptionByOffset(currentOption, offset) {
    const currentIndex = profileOptions.indexOf(currentOption);
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + offset + profileOptions.length) % profileOptions.length;
    profileOptions[nextIndex].focus();
}

export function initPlayerProfile() {
    profileOptions = [...document.querySelectorAll('.profile-option')];
    resultContainer = document.querySelector('.profile-result');

    if (!profileOptions.length) return;

    profileOptions.forEach(option => {
        option.addEventListener('click', () => selectProfile(option));
        option.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                event.preventDefault();
                focusOptionByOffset(option, 1);
            }

            if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                event.preventDefault();
                focusOptionByOffset(option, -1);
            }
        });
    });
}
