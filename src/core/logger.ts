import { LogLevel, LogLevelNames, normalizeLevel, LogLevelDesc } from './levels';
import { LogFormatter } from '../formatters/base';
import { DefaultFormatter } from '../formatters/default';
import { LogStorage } from '../storage/base';
import { createStorage } from '../storage/factory';
import { hasConsole, getGlobalObject, isNode } from '../utils/env';

/**
 * The core Logger class
 */
export class Logger {
  /**
   * The current log level
   */
  private currentLevel: LogLevel = LogLevel.WARN;
  
  /**
   * The default log level used if no persisted level
   */
  private defaultLevel: LogLevel = LogLevel.WARN;
  
  /**
   * The formatter used to format log messages
   */
  private formatter: LogFormatter = new DefaultFormatter();
  
  /**
   * The storage provider for persisting log levels
   */
  protected storage: LogStorage | null = null;
  
  /**
   * Create a new logger
   * 
   * @param name Optional logger name
   */
  constructor(
    public readonly name?: string
  ) {
    // Initialize logging methods
    this.trace = this.createLoggingMethod('trace', LogLevel.TRACE);
    this.debug = this.createLoggingMethod('debug', LogLevel.DEBUG);
    this.info = this.createLoggingMethod('info', LogLevel.INFO);
    this.warn = this.createLoggingMethod('warn', LogLevel.WARN);
    this.error = this.createLoggingMethod('error', LogLevel.ERROR);
    this.log = this.debug; // alias to debug
  }
  
  /** Log method for TRACE level */
  trace!: (...args: any[]) => this;
  
  /** Log method for DEBUG level */
  debug!: (...args: any[]) => this;
  
  /** Log method for INFO level */
  info!: (...args: any[]) => this;
  
  /** Log method for WARN level */
  warn!: (...args: any[]) => this;
  
  /** Log method for ERROR level */
  error!: (...args: any[]) => this;
  
  /** Alias for debug */
  log!: (...args: any[]) => this;
  
  /**
   * Set the current log level
   * 
   * @param level The new log level
   * @param persist Whether to persist the level
   */
  setLevel(level: LogLevelDesc, persist = false): this {
    try {
      this.currentLevel = normalizeLevel(level);
      
      // Persist level if requested
      if (persist && this.storage) {
        this.storage.saveLevel(this.currentLevel, this.name);
      }
      
      return this;
    } catch (err) {
      console.error(`Invalid log level: ${level}`, err);
      return this;
    }
  }
  
  /**
   * Get the current log level
   */
  getLevel(): LogLevel {
    return this.currentLevel;
  }
  
  /**
   * Get the current log level name
   */
  getLevelName(): string {
    return LogLevelNames[this.currentLevel];
  }
  
  /**
   * Set the default log level
   * 
   * @param level The new default level
   */
  setDefaultLevel(level: LogLevelDesc): this {
    try {
      this.defaultLevel = normalizeLevel(level);
      
      // If no level has been explicitly set or loaded, use the default
      if (this.currentLevel === LogLevel.WARN) {
        this.currentLevel = this.defaultLevel;
      }
      
      return this;
    } catch (err) {
      console.error(`Invalid default log level: ${level}`, err);
      return this;
    }
  }
  
  /**
   * Reset the current log level to the default
   */
  resetLevel(): this {
    // Clear any persisted level
    if (this.storage) {
      this.storage.clearLevel(this.name);
    }
    
    // Reset to default level
    this.currentLevel = this.defaultLevel;
    return this;
  }
  
  /**
   * Enable all logging (set level to TRACE)
   * 
   * @param persist Whether to persist the level
   */
  enableAll(persist = false): this {
    return this.setLevel(LogLevel.TRACE, persist);
  }
  
  /**
   * Disable all logging (set level to SILENT)
   * 
   * @param persist Whether to persist the level
   */
  disableAll(persist = false): this {
    return this.setLevel(LogLevel.SILENT, persist);
  }
  
  /**
   * Set the formatter for this logger
   * 
   * @param formatter The formatter to use
   */
  setFormatter(formatter: LogFormatter): this {
    this.formatter = formatter;
    return this;
  }
  
  /**
   * Get the current formatter
   */
  getFormatter(): LogFormatter {
    return this.formatter;
  }
  
  /**
   * Enable or disable colors in the output
   * 
   * @param enable Whether to enable colors
   */
  useColors(enable = true): this {
    this.formatter.setUseColors(enable);
    return this;
  }
  
  /**
   * Enable or disable timestamps in the output
   * 
   * @param enable Whether to enable timestamps
   */
  useTimestamps(enable = true): this {
    this.formatter.setIncludeTimestamps(enable);
    return this;
  }
  
  /**
   * Enable persistence of log levels
   * 
   * @param storage Optional custom storage provider
   */
  persist(storage?: LogStorage): this {
    this.storage = storage || createStorage();
    
    // Load persisted level if available
    const persistedLevel = this.storage.loadLevel(this.name);
    if (persistedLevel !== null) {
      this.currentLevel = persistedLevel;
    }
    
    return this;
  }
  
  /**
   * Create a logging method for a specific level
   * 
   * @param methodName The name of the method (trace, debug, etc.)
   * @param level The log level
   */
  private createLoggingMethod(methodName: string, level: LogLevel): (...args: any[]) => this {
    return (...args: any[]): this => {
      // Skip if logging is disabled for this level
      if (level < this.currentLevel) {
        return this;
      }
      
      if (!hasConsole()) {
        return this;
      }
      
      // Format the arguments
      const formattedArgs = this.formatter.format(level, methodName, this.name, args);
      
      // Call the appropriate console method
      const consoleMethod = this.getConsoleMethod(methodName);
      if (consoleMethod) {
        consoleMethod.apply(console, formattedArgs);
      }
      
      return this;
    };
  }
  
  /**
   * Get the appropriate console method for a log level
   * 
   * @param methodName The name of the logging method
   */
  private getConsoleMethod(methodName: string): (...args: any[]) => void {
    const globalConsole = getGlobalObject().console || console;
    
    // Special handling for trace in Node.js to avoid stack trace
    if (methodName === 'trace' && isNode()) {
      return console.log.bind(console);
    }
    
    // Check if the specific method exists
    if (globalConsole && typeof globalConsole[methodName] === 'function') {
      return globalConsole[methodName].bind(globalConsole);
    }
    
    // Fall back to console.log
    if (globalConsole && typeof globalConsole.log === 'function') {
      return globalConsole.log.bind(globalConsole);
    }
    
    // No console available
    return () => {};
  }
}
