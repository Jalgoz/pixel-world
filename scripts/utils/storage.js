// Storage helpers - Browser storage utilities

const STORAGE_PREFIX = 'del-pixel-';

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if not found
 * @returns {any}
 */
export function getItem(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(STORAGE_PREFIX + key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        console.warn('Storage get error:', e);
        return defaultValue;
    }
}

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 */
export function setItem(key, value) {
    try {
        localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
        console.warn('Storage set error:', e);
    }
}

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 */
export function removeItem(key) {
    try {
        localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (e) {
        console.warn('Storage remove error:', e);
    }
}

/**
 * Clear all project storage
 */
export function clear() {
    try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.startsWith(STORAGE_PREFIX)) {
                localStorage.removeItem(key);
            }
        });
    } catch (e) {
        console.warn('Storage clear error:', e);
    }
}