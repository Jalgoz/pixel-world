// Player Profile Controller - Controls the final "what type of player are you?" interaction

import { playerProfiles } from '../config/chapters.js';
import { setSelectedProfile } from '../state/story-state.js';

let profileOptions = null;
let profileComposer = null;
let showcaseElement = null;
let showcaseImage = null;
let overlayTitle = null;
let overlayDesc = null;

const profileMediaMap = {
    explorador: {
        src: 'assets/images/profile-explorador.jpg',
        alt: 'Paisaje de mundo abierto al atardecer'
    },
    competitivo: {
        src: 'assets/images/profile-competitivo.jpg',
        alt: 'Arena de combate con luces de neon'
    },
    creativo: {
        src: 'assets/images/profile-creativo.jpg',
        alt: 'Entorno de construccion con bloques flotantes'
    },
    narrativo: {
        src: 'assets/images/profile-narrativo.jpg',
        alt: 'Escena cinematografica nocturna con personajes'
    }
};

function updateSelectedOption(selectedProfileId) {
    profileOptions.forEach(option => {
        const isSelected = option.dataset.profile === selectedProfileId;
        option.classList.toggle('profile-option--selected', isSelected);
        option.setAttribute('aria-pressed', String(isSelected));
    });
}

function updateShowcase(profileId) {
    const media = profileMediaMap[profileId];
    if (!media || !showcaseImage || !showcaseElement) return;

    showcaseElement.dataset.profileActive = profileId;
    showcaseElement.hidden = false;
    showcaseElement.classList.remove('is-visible');
    profileComposer?.classList.remove('profile-composer--settled');
    profileComposer?.classList.add('profile-composer--revealed');
    showcaseImage.hidden = false;
    showcaseImage.src = media.src;
    showcaseImage.alt = media.alt;

    window.requestAnimationFrame(() => {
        showcaseElement.classList.add('is-visible');
        window.requestAnimationFrame(() => {
            profileComposer?.classList.add('profile-composer--settled');
        });
        showcaseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

function updateOverlayText(profileId) {
    const profile = playerProfiles.find(p => p.id === profileId);
    if (!profile) return;

    setSelectedProfile(profileId);

    if (overlayTitle) overlayTitle.textContent = profile.label;
    if (overlayDesc) overlayDesc.textContent = profile.description;
}

function selectProfile(option) {
    const profileId = option.dataset.profile;
    if (!profileId) return;

    updateSelectedOption(profileId);
    updateShowcase(profileId);
    updateOverlayText(profileId);
    option.focus({ preventScroll: true });
}

function focusOptionByOffset(currentOption, offset) {
    const currentIndex = profileOptions.indexOf(currentOption);
    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + offset + profileOptions.length) % profileOptions.length;
    profileOptions[nextIndex].focus();
}

export function initPlayerProfile() {
    profileOptions = [...document.querySelectorAll('.profile-option')];
    profileComposer = document.querySelector('.profile-composer');
    showcaseElement = document.querySelector('.profile-showcase');
    showcaseImage = document.querySelector('[data-profile-media]');
    overlayTitle = document.querySelector('[data-overlay-title]');
    overlayDesc = document.querySelector('[data-overlay-desc]');

    showcaseImage?.addEventListener('error', () => {
        showcaseImage.hidden = true;
    });

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
