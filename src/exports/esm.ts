// ESM entry point

import { RootLogger } from '../core/root-logger';

// Declare window.log for TypeScript
declare global {
  interface Window {
    log: RootLogger;
  }
}

// Re-export everything
export * from '../core';
export * from '../formatters';
export * from '../storage';
export * from '../utils/env';
export * from '../utils/colors';
export * from '../utils/time';

// Create the singleton instance
const logger = new RootLogger();

// Set up for global usage
if (typeof window !== 'undefined') {
  window.log = logger;
}

// Export the logger as default
export default logger;
