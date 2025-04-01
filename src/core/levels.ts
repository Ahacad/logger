/**
 * Available log levels
 */
export enum LogLevel {
  TRACE = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
  SILENT = 5
}

/**
 * Level names corresponding to LogLevel enum
 */
export const LogLevelNames: Record<LogLevel, string> = {
  [LogLevel.TRACE]: 'trace',
  [LogLevel.DEBUG]: 'debug',
  [LogLevel.INFO]: 'info',
  [LogLevel.WARN]: 'warn',
  [LogLevel.ERROR]: 'error',
  [LogLevel.SILENT]: 'silent'
};

/**
 * Color codes for each log level
 */
export const LogLevelColors: Record<LogLevel, string> = {
  [LogLevel.TRACE]: '#4dabf7', // Cyan
  [LogLevel.DEBUG]: '#40c057', // Green
  [LogLevel.INFO]: '#228be6',  // Blue
  [LogLevel.WARN]: '#fd7e14',  // Orange
  [LogLevel.ERROR]: '#fa5252', // Red
  [LogLevel.SILENT]: '#adb5bd' // Gray
};

/**
 * Console icons for each log level
 */
export const LogLevelIcons: Record<LogLevel, string> = {
  [LogLevel.TRACE]: '🔍',
  [LogLevel.DEBUG]: '🐛',
  [LogLevel.INFO]: 'ℹ️',
  [LogLevel.WARN]: '⚠️',
  [LogLevel.ERROR]: '❌',
  [LogLevel.SILENT]: '🔇'
};

/**
 * Type for log level descriptors, which can be:
 * - A LogLevel enum value
 * - A string log level name (case-insensitive)
 * - A number from 0-5
 */
export type LogLevelDesc = LogLevel | keyof typeof LogLevel | string | number;

/**
 * Normalize a log level descriptor to a LogLevel enum value
 */
export function normalizeLevel(levelDesc: LogLevelDesc): LogLevel {
  if (typeof levelDesc === 'number') {
    if (levelDesc >= 0 && levelDesc <= 5) {
      return levelDesc as LogLevel;
    }
    throw new Error(`Invalid numeric log level: ${levelDesc}. Must be between 0 and 5.`);
  }
  
  if (typeof levelDesc === 'string') {
    const upperLevel = levelDesc.toUpperCase();
    if (upperLevel in LogLevel) {
      return LogLevel[upperLevel as keyof typeof LogLevel];
    }
    
    // Try to match case-insensitively with level names
    const idx = Object.values(LogLevelNames).findIndex(
      name => name.toLowerCase() === levelDesc.toLowerCase()
    );
    if (idx !== -1) {
      return idx as LogLevel;
    }
  }
  
  throw new Error(`Invalid log level: ${levelDesc}`);
}
