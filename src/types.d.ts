import { RootLogger } from './core/root-logger';

// Extend the Window interface to include our log property
declare global {
  interface Window {
    log: RootLogger;
  }
}
