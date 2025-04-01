import { RootLogger } from './core/root-logger';
export * from './core';
export * from './formatters';
export * from './storage';
export * from './utils/env';
export * from './utils/colors';
export * from './utils/node-colors';
export * from './utils/time';

// Create the default logger instance
const logger = new RootLogger();

// Export the logger singleton as default
export default logger;

// Set up for global usage in browser
if (typeof window !== 'undefined') {
  window.log = logger;
}

// Handle CommonJS exports - works with tsup's CommonJS output
if (typeof exports === 'object' && typeof module !== 'undefined') {
  try {
    // @ts-ignore - Direct assignment for CommonJS module
    module.exports = logger;
  } catch (err) {
    // Fallback in case of error
    console.warn('Failed to set up CommonJS exports:', err);
  }
}
