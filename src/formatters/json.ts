import { LogLevel, LogLevelNames } from '../core/levels';
import { LogFormatter } from './base';
import { formatTime } from '../utils/time';

/**
 * JSON formatter for structured logging
 */
export class JsonFormatter implements LogFormatter {
  usesColors = false;
  includesTimestamps = true;
  
  constructor(private includeTimestamps = true) {
    this.includesTimestamps = includeTimestamps;
  }
  
  setUseColors(_enable: boolean): this {
    // JSON formatter doesn't use colors
    return this;
  }
  
  setIncludeTimestamps(enable: boolean): this {
    this.includeTimestamps = enable;
    this.includesTimestamps = enable;
    return this;
  }
  
  format(level: LogLevel, methodName: string, loggerName: string | undefined, args: any[]): any[] {
    // Special case for silent level - return empty array
    if (level === LogLevel.SILENT) {
      return [];
    }
    
    // Extract message and additional data
    const message = args.length > 0 && typeof args[0] === 'string' ? args[0] : undefined;
    const data = message && args.length > 1 ? args.slice(1) : args;
    
    // Build log entry
    const logEntry: Record<string, any> = {
      level: LogLevelNames[level],
      logger: loggerName || 'root'
    };
    
    // Add timestamp if needed
    if (this.includesTimestamps) {
      logEntry.timestamp = new Date().toISOString();
    }
    
    // Add message and data
    if (message) {
      logEntry.message = message;
    }
    
    if (data.length === 1) {
      logEntry.data = data[0];
    } else if (data.length > 1) {
      logEntry.data = data;
    }
    
    // Return JSON string
    return [JSON.stringify(logEntry)];
  }
}
