import { LogLevel } from '../core/levels';
import { isNode } from './env';

/**
 * ANSI color codes for terminal output
 */
export const ANSI_COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  
  // Foreground colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  // Bright foreground colors
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  brightWhite: '\x1b[97m',
};

/**
 * Check if terminal colors are supported
 */
export function supportsTerminalColors(): boolean {
  if (!isNode()) return false;
  
  // Check for NO_COLOR environment variable
  if (process.env.NO_COLOR) return false;
  
  // Check if stdout is a TTY
  if (process.stdout && process.stdout.isTTY) {
    return true;
  }
  
  // Check for common terminal environment variables
  const term = process.env.TERM || '';
  if (['xterm', 'xterm-256color', 'screen', 'screen-256color'].includes(term)) {
    return true;
  }
  
  return false;
}

/**
 * Get ANSI color for a log level
 */
export function getLevelColor(level: LogLevel): string {
  switch (level) {
    case LogLevel.TRACE:
      return ANSI_COLORS.cyan;
    case LogLevel.DEBUG:
      return ANSI_COLORS.green;
    case LogLevel.INFO:
      return ANSI_COLORS.brightBlue;
    case LogLevel.WARN:
      return ANSI_COLORS.yellow;
    case LogLevel.ERROR:
      return ANSI_COLORS.brightRed;
    default:
      return '';
  }
}

/**
 * Colorize text for terminal output
 */
export function colorize(text: string, level: LogLevel): string {
  if (!supportsTerminalColors()) return text;

  const color = getLevelColor(level);
  return `${color}${text}${ANSI_COLORS.reset}`;
}
