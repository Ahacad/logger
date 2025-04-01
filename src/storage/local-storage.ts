import { LogLevel, LogLevelNames, normalizeLevel } from '../core/levels';
import { LogStorage } from './base';
import { hasLocalStorage } from '../utils/env';

/**
 * LocalStorage-based log level persistence
 */
export class LocalStorageProvider implements LogStorage {
  private readonly prefix: string;
  
  constructor(prefix = 'logger') {
    this.prefix = prefix;
  }
  
  /**
   * Get the storage key for a logger
   */
  private getKey(loggerName?: string): string {
    return loggerName 
      ? `${this.prefix}:${loggerName}`
      : this.prefix;
  }
  
  /**
   * Save a log level to localStorage
   */
  saveLevel(level: LogLevel, loggerName?: string): boolean {
    if (!hasLocalStorage()) {
      return false;
    }
    
    try {
      const key = this.getKey(loggerName);
      const levelName = LogLevelNames[level];
      localStorage.setItem(key, levelName);
      return true;
    } catch (err) {
      console.error('Failed to save log level to localStorage:', err);
      return false;
    }
  }
  
  /**
   * Load a log level from localStorage
   */
  loadLevel(loggerName?: string): LogLevel | null {
    if (!hasLocalStorage()) {
      return null;
    }
    
    try {
      const key = this.getKey(loggerName);
      const levelName = localStorage.getItem(key);
      
      if (!levelName) {
        return null;
      }
      
      try {
        return normalizeLevel(levelName);
      } catch (e) {
        console.warn(`Invalid saved log level: ${levelName}`);
        return null;
      }
    } catch (err) {
      console.error('Failed to load log level from localStorage:', err);
      return null;
    }
  }
  
  /**
   * Clear a saved log level from localStorage
   */
  clearLevel(loggerName?: string): boolean {
    if (!hasLocalStorage()) {
      return false;
    }
    
    try {
      const key = this.getKey(loggerName);
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.error('Failed to clear log level from localStorage:', err);
      return false;
    }
  }
}
