import { LogLevel } from '../core/levels';

/**
 * Base interface for log formatters
 */
export interface LogFormatter {
  /**
   * Format log message arguments
   * 
   * @param level The log level
   * @param methodName The logging method name (trace, debug, info, etc.)
   * @param loggerName The name of the logger
   * @param args The arguments passed to the logging method
   * @returns Formatted arguments to pass to console method
   */
  format(level: LogLevel, methodName: string, loggerName: string | undefined, args: any[]): any[];
  
  /**
   * Whether this formatter uses colors
   */
  usesColors: boolean;
  
  /**
   * Enable or disable colors in this formatter
   */
  setUseColors(enable: boolean): this;
  
  /**
   * Whether this formatter includes timestamps
   */
  includesTimestamps: boolean;
  
  /**
   * Enable or disable timestamps in this formatter
   */
  setIncludeTimestamps(enable: boolean): this;
}
