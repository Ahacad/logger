/**
 * Environment detection utilities
 */

/**
 * Detect whether we're running in a browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined';
}

/**
 * Detect whether we're running in Node.js
 */
export function isNode(): boolean {
  return typeof process !== 'undefined' && 
         typeof process.versions !== 'undefined' && 
         typeof process.versions.node !== 'undefined';
}

/**
 * Detect whether console is available
 */
export function hasConsole(): boolean {
  return typeof console !== 'undefined';
}

/**
 * Get the global object (window in browser, global in Node.js)
 */
export function getGlobalObject(): any {
  if (isBrowser()) {
    return window;
  }
  
  if (isNode()) {
    return global;
  }
  
  // Fallback to Function constructor for other environments
  // This approach works in most JavaScript environments
  return Function('return this')();
}

/**
 * Detect if the console supports colors
 */
export function supportsColor(): boolean {
  if (!hasConsole()) return false;
  
  if (isBrowser()) {
    return true; // Modern browsers support CSS styling in console
  }
  
  if (isNode()) {
    // Check for NO_COLOR environment variable
    if (process.env.NO_COLOR) return false;
    
    // Check for color support in terminal
    if (process.stdout && typeof process.stdout.hasColors === 'function' && process.stdout.hasColors()) {
      return true;
    }
    
    // Simple fallback check for common terminals
    const term = process.env.TERM || '';
    if (['xterm', 'xterm-256color', 'screen', 'screen-256color'].includes(term)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Detect if localStorage is available for persistence
 */
export function hasLocalStorage(): boolean {
  if (!isBrowser()) return false;
  
  try {
    const testKey = '__logger_test__';
    localStorage.setItem(testKey, testKey);
    const result = localStorage.getItem(testKey) === testKey;
    localStorage.removeItem(testKey);
    return result;
  } catch (e) {
    return false;
  }
}

/**
 * Detect if cookies are available for persistence
 */
export function hasCookies(): boolean {
  if (!isBrowser()) return false;
  
  try {
    const testKey = '__logger_test__';
    document.cookie = `${testKey}=${testKey}; path=/`;
    const result = document.cookie.indexOf(testKey) !== -1;
    document.cookie = `${testKey}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    return result;
  } catch (e) {
    return false;
  }
}
