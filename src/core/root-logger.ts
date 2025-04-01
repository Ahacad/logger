import { Logger } from './logger';
import { LogLevel, LogLevelDesc } from './levels';
import { LogStorage } from '../storage/base';
import { createStorage } from '../storage/factory';
import { LogFormatter } from '../formatters/base';

/**
 * Root logger that manages child loggers
 */
export class RootLogger extends Logger {
  /**
   * Map of logger name to logger instance
   */
  private readonly loggers: Map<string | symbol, Logger> = new Map();
  
  /**
   * The original value of the global log variable
   */
  private readonly originalLog: any;
  
  /**
   * Create a new root logger
   */
  constructor() {
    super();
    
    // Save original log value for noConflict
    this.originalLog = typeof window !== 'undefined' ? window.log : undefined;
    
    // Initialize storage with global persistence
    this.persist(createStorage());
  }
  
  /**
   * Get a named logger
   * 
   * @param name The name of the logger
   */
  getLogger(name: string | symbol): Logger {
    if (!name) {
      throw new Error('Logger name cannot be empty');
    }
    
    // Return existing logger if available
    const existingLogger = this.loggers.get(name);
    if (existingLogger) {
      return existingLogger;
    }
    
    // Create a new logger
    const logger = new Logger(typeof name === 'string' ? name : undefined);
    
    // Apply current configuration
    logger.setLevel(this.getLevel());
    logger.setFormatter(this.getFormatter());
    
    // If it's a string name, check for persistence
    if (typeof name === 'string' && this.storage) {
      const persistedLevel = this.storage.loadLevel(name);
      if (persistedLevel !== null) {
        logger.setLevel(persistedLevel);
      }
    }
    
    // Store the logger
    this.loggers.set(name, logger);
    return logger;
  }
  
  /**
   * Get all registered loggers
   */
  getLoggers(): Record<string, Logger> {
    const result: Record<string, Logger> = {};
    
    for (const [key, logger] of this.loggers.entries()) {
      if (typeof key === 'string') {
        result[key] = logger;
      }
    }
    
    return result;
  }
  
  /**
   * Reset the global log variable to its original value
   */
  noConflict(): RootLogger {
    if (typeof window !== 'undefined' && window.log === this) {
      window.log = this.originalLog;
    }
    
    return this;
  }
  
  /**
   * Set level for all loggers
   */
  setLevel(level: LogLevelDesc, persist = false): this {
    super.setLevel(level, persist);
    
    // Update all loggers
    for (const logger of this.loggers.values()) {
      logger.setLevel(level);
    }
    
    return this;
  }
  
  /**
   * Set formatter for all loggers
   */
  setFormatter(formatter: LogFormatter): this {
    super.setFormatter(formatter);
    
    // Update all loggers
    for (const logger of this.loggers.values()) {
      logger.setFormatter(formatter);
    }
    
    return this;
  }
  
  /**
   * Enable colors for all loggers
   */
  useColors(enable = true): this {
    super.useColors(enable);
    
    // Update all loggers
    for (const logger of this.loggers.values()) {
      logger.useColors(enable);
    }
    
    return this;
  }
  
  /**
   * Enable timestamps for all loggers
   */
  useTimestamps(enable = true): this {
    super.useTimestamps(enable);
    
    // Update all loggers
    for (const logger of this.loggers.values()) {
      logger.useTimestamps(enable);
    }
    
    return this;
  }
  
  /**
   * Enable logging persistence for all loggers
   */
  persist(storage?: LogStorage): this {
    super.persist(storage);
    
    // Update all loggers
    for (const logger of this.loggers.values()) {
      logger.persist(storage);
    }
    
    return this;
  }
}
