import { LogLevel, LogLevelNames, normalizeLevel } from '../core/levels';
import { LogStorage } from './base';
import { hasCookies } from '../utils/env';

/**
 * Cookie-based log level persistence
 */
export class CookieStorage implements LogStorage {
  private readonly prefix: string;
  private readonly expiryDays: number;
  
  constructor(prefix = 'logger', expiryDays = 90) {
    this.prefix = prefix;
    this.expiryDays = expiryDays;
  }
  
  /**
   * Get the cookie name for a logger
   */
  private getKey(loggerName?: string): string {
    return loggerName 
      ? `${this.prefix}:${loggerName}`
      : this.prefix;
  }
  
  /**
   * Save a log level to a cookie
   */
  saveLevel(level: LogLevel, loggerName?: string): boolean {
    if (!hasCookies()) {
      return false;
    }
    
    try {
      const key = this.getKey(loggerName);
      const levelName = LogLevelNames[level];
      
      // Set cookie expiry
      const date = new Date();
      date.setTime(date.getTime() + (this.expiryDays * 24 * 60 * 60 * 1000));
      
      // Set cookie
      document.cookie = `${encodeURIComponent(key)}=${levelName}; expires=${date.toUTCString()}; path=/`;
      return true;
    } catch (err) {
      console.error('Failed to save log level to cookie:', err);
      return false;
    }
  }
  
  /**
   * Load a log level from a cookie
   */
  loadLevel(loggerName?: string): LogLevel | null {
    if (!hasCookies()) {
      return null;
    }
    
    try {
      const key = encodeURIComponent(this.getKey(loggerName));
      const cookies = document.cookie.split(';');
      
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === key && value) {
          try {
            return normalizeLevel(value);
          } catch (e) {
            console.warn(`Invalid saved log level in cookie: ${value}`);
            return null;
          }
        }
      }
      
      return null;
    } catch (err) {
      console.error('Failed to load log level from cookie:', err);
      return null;
    }
  }
  
  /**
   * Clear a saved log level cookie
   */
  clearLevel(loggerName?: string): boolean {
    if (!hasCookies()) {
      return false;
    }
    
    try {
      const key = encodeURIComponent(this.getKey(loggerName));
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      return true;
    } catch (err) {
      console.error('Failed to clear log level from cookie:', err);
      return false;
    }
  }
}
