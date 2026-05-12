// Player Profile Controller - Controls the final "what type of player are you?" interaction

import { playerProfiles } from '../config/chapters.js';
import { setSelectedProfile } from '../state/story-state.js';

let profileOptions = null;
let resultContainer = null;

function showProfileResult(profileId) {
    const profile = playerProfiles.find(p => p.id === profileId);
    if (!profile || !resultContainer) return;

    resultContainer.innerHTML = `
        <h3 class="profile-result__title">${profile.label}</h3>
        <p class="profile-result__description">${profile.description}</p>
    `;

    resultContainer.classList.add('is-visible');
    setSelectedProfile(profileId);
}

export function initPlayerProfile() {
    profileOptions = document.querySelectorAll('.profile-option');
    resultContainer = document.querySelector('.profile-result');

    if (!profileOptions.length) return;

    profileOptions.forEach(option => {
        option.addEventListener('click', () => {
            const profileId = option.dataset.profile;

            // Remove selected state from all
            profileOptions.forEach(opt => {
                opt.classList.remove('profile-option--selected');
            });

            // Add selected state to clicked
            option.classList.add('profile-option--selected');

            // Show result
            showProfileResult(profileId);
        });
    });

    // Keyboard support
    profileOptions.forEach(option => {
        option.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                option.click();
            }
        });

        option.setAttribute('tabindex', '0');
        option.setAttribute('role', 'button');
    });
}