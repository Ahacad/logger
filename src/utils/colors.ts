import { LogLevel, LogLevelColors } from '../core/levels';
import { isBrowser, isNode, supportsColor } from './env';

/**
 * ANSI color codes for terminal output
 */
const ANSI_COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  
  // Foreground colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  // Background colors
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m'
};

/**
 * Get ANSI color for a log level
 */
export function getLevelAnsiColor(level: LogLevel): string {
  switch (level) {
    case LogLevel.TRACE:
      return ANSI_COLORS.cyan;
    case LogLevel.DEBUG:
      return ANSI_COLORS.green;
    case LogLevel.INFO:
      return ANSI_COLORS.blue;
    case LogLevel.WARN:
      return ANSI_COLORS.yellow;
    case LogLevel.ERROR:
      return ANSI_COLORS.red;
    default:
      return ANSI_COLORS.white;
  }
}

/**
 * Format text with ANSI colors for terminal output
 */
export function colorizeTerminal(text: string, level: LogLevel): string {
  // Skip if colors not supported
  if (!supportsColor() || !isNode()) return text;
  
  const color = getLevelAnsiColor(level);
  return `${color}${text}${ANSI_COLORS.reset}`;
}

/**
 * Format messages with CSS styles for browser console
 */
export function formatBrowserColors(
  level: LogLevel, 
  prefix: string, 
  args: any[]
): [string, string, ...any[]] {
  if (!supportsColor() || !isBrowser()) {
    return [prefix, ...args] as [string, string, ...any[]];
  }
  
  const color = LogLevelColors[level];
  const styles = [
    `color: white; background-color: ${color}; padding: 2px 6px; border-radius: 2px; font-weight: bold;`,
    '' // Reset style
  ];
  
  return [`%c${prefix}%c`, ...styles, ...args] as [string, string, ...any[]];
}
