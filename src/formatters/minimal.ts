import { LogLevel } from '../core/levels';
import { LogFormatter } from './base';
import { formatBrowserColors } from '../utils/colors';
import { colorize } from '../utils/node-colors';
import { isBrowser, isNode } from '../utils/env';

/**
 * Minimal formatter that only adds log level prefix
 */
export class MinimalFormatter implements LogFormatter {
  usesColors = true;
  includesTimestamps = false;
  
  constructor(private useColors = true) {
    this.usesColors = useColors;
  }
  
  setUseColors(enable: boolean): this {
    this.useColors = enable;
    this.usesColors = enable;
    return this;
  }
  
  setIncludeTimestamps(_enable: boolean): this {
    // This formatter never includes timestamps
    return this;
  }
  
  format(level: LogLevel, methodName: string, loggerName: string | undefined, args: any[]): any[] {
    // Special case for silent level - return empty array
    if (level === LogLevel.SILENT) {
      return [];
    }
    
    // If no color or formatting needed, just return the args
    if (!(this.useColors || loggerName)) {
      return args;
    }
    
    // Minimal prefix with just the logger name
    let prefix = loggerName ? `[${loggerName}]` : '';
    
    // Apply colors in browser if needed
    if (isBrowser() && this.useColors && prefix) {
      return formatBrowserColors(level, prefix, args);
    }
    
    // Apply colors in terminal if needed
    if (isNode() && this.useColors && prefix) {
      return [colorize(prefix, level), ...args];
    }
    
    // Regular output without colors
    return prefix ? [prefix, ...args] : args;
  }
}
