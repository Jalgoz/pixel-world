// DOM helpers - small reusable DOM selection and event helpers.

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
    return [...parent.querySelectorAll(selector)];
}

/**
 * Select a required element and fail early in development.
 * @param {string} selector - CSS selector
 * @param {Element|Document} parent - Parent element to search within
 * @returns {Element}
 */
export function requiredElement(selector, parent = document) {
    const element = $(selector, parent);

    if (!element) {
        throw new Error(`Required element not found: ${selector}`);
    }

    return element;
}

/**
 * Add event listener with automatic cleanup
 * @param {Element} element - Target element
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @param {Object} options - Event options
 */
export function on(element, event, handler, options = {}) {
    if (!element) return () => {};

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

/**
 * Toggle a class based on a boolean condition.
 * @param {Element} element - Target element
 * @param {string} className - Class name to toggle
 * @param {boolean} force - Whether the class should be present
 */
export function toggleClass(element, className, force) {
    if (!element) return;
    element.classList.toggle(className, force);
}
