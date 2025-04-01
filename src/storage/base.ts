import { LogLevel } from '../core/levels';

/**
 * Base interface for log level storage
 */
export interface LogStorage {
  /**
   * Save a log level
   * 
   * @param level The log level to save
   * @param loggerName Optional logger name
   * @returns Whether the save was successful
   */
  saveLevel(level: LogLevel, loggerName?: string): boolean;
  
  /**
   * Load a previously saved log level
   * 
   * @param loggerName Optional logger name
   * @returns The saved log level, or null if none was saved
   */
  loadLevel(loggerName?: string): LogLevel | null;
  
  /**
   * Clear a saved log level
   * 
   * @param loggerName Optional logger name
   * @returns Whether the clear was successful
   */
  clearLevel(loggerName?: string): boolean;
}
