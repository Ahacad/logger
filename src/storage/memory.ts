import { LogLevel } from '../core/levels';
import { LogStorage } from './base';

/**
 * In-memory log level storage
 */
export class MemoryStorage implements LogStorage {
  private levels: Map<string, LogLevel> = new Map();
  
  /**
   * Get the storage key for a logger
   */
  private getKey(loggerName?: string): string {
    return loggerName || 'root';
  }
  
  /**
   * Save a log level to memory
   */
  saveLevel(level: LogLevel, loggerName?: string): boolean {
    const key = this.getKey(loggerName);
    this.levels.set(key, level);
    return true;
  }
  
  /**
   * Load a log level from memory
   */
  loadLevel(loggerName?: string): LogLevel | null {
    const key = this.getKey(loggerName);
    const level = this.levels.get(key);
    return level !== undefined ? level : null;
  }
  
  /**
   * Clear a saved log level from memory
   */
  clearLevel(loggerName?: string): boolean {
    const key = this.getKey(loggerName);
    return this.levels.delete(key);
  }
}
