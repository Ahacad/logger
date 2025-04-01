import { LogLevel, LogLevelIcons, LogLevelNames } from '../core/levels';
import { LogFormatter } from './base';
import { formatBrowserColors } from '../utils/colors';
import { colorize } from '../utils/node-colors';
import { formatTime } from '../utils/time';
import { isBrowser, isNode } from '../utils/env';

/**
 * Default formatter with timestamps, levels, and colors
 */
export class DefaultFormatter implements LogFormatter {
  usesColors = true;
  includesTimestamps = true;
  
  constructor(
    private useColors = true,
    private includeTimestamps = true
  ) {
    this.usesColors = useColors;
    this.includesTimestamps = includeTimestamps;
  }
  
  setUseColors(enable: boolean): this {
    this.useColors = enable;
    this.usesColors = enable;
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
    
    // Build the prefix
    let prefix = '';
    
    // Add timestamp if needed
    if (this.includeTimestamps) {
      prefix += `[${formatTime()}] `;
    }
    
    // Add level name (and icon in browser)
    const levelName = LogLevelNames[level].toUpperCase();
    const icon = isBrowser() && this.useColors ? LogLevelIcons[level] + ' ' : '';
    prefix += `[${icon}${levelName}]`;
    
    // Add logger name if provided
    if (loggerName) {
      prefix += ` [${loggerName}]:`;
    }
    
    // Apply colors in browser if needed
    if (isBrowser() && this.useColors) {
      return formatBrowserColors(level, prefix, args);
    }
    
    // Apply colors in terminal if needed
    if (isNode() && this.useColors) {
      return [colorize(prefix, level), ...args];
    }
    
    // Regular output without colors
    return [prefix, ...args];
  }
}
