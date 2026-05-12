// DOM helpers - Reusable DOM selection and manipulation helpers

/**
 * Select a single element
 * @param {string} selector - CSS selector
 * @param {Element|Document} parent - Parent element to search within
 * @returns {Element|null}
 */
export function $(selector, parent = document) {
    return parent.querySelector(selector);
}

/**
 * Select multiple elements
 * @param {string} selector - CSS selector
 * @param {Element|Document} parent - Parent element to search within
 * @returns {NodeList}
 */
export function $$(selector, parent = document) {
    return parent.querySelectorAll(selector);
}

/**
 * Add event listener with automatic cleanup
 * @param {Element} element - Target element
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @param {Object} options - Event options
 */
export function on(element, event, handler, options = {}) {
    element.addEventListener(event, handler, options);
    return () => element.removeEventListener(event, handler, options);
}

/**
 * Check if element is in viewport
 * @param {Element} element - Target element
 * @returns {boolean}
 */
export function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Smooth scroll to element
 * @param {Element|string} target - Element or selector
 * @param {Object} options - Scroll options
 */
export function scrollTo(target, options = {}) {
    const element = typeof target === 'string' ? $(target) : target;
    if (!element) return;

    element.scrollIntoView({
        behavior: options.behavior || 'smooth',
        block: options.block || 'start',
        inline: options.inline || 'nearest'
    });
}