/**
 * Time formatting utilities
 */

/**
 * Format options for timestamps
 */
export type TimeFormatOptions = {
  /**
   * Include date in format YYYY-MM-DD
   */
  includeDate?: boolean;
  
  /**
   * Include milliseconds
   */
  includeMs?: boolean;
  
  /**
   * Use 24-hour time format (default: true)
   */
  use24Hour?: boolean;
};

/**
 * Default time format options
 */
const DEFAULT_OPTIONS: TimeFormatOptions = {
  includeDate: true,
  includeMs: false,
  use24Hour: true
};

/**
 * Format the current time as a string
 */
export function formatTime(options: TimeFormatOptions = {}): string {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const now = new Date();
  
  // Format time
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  let ampm = '';
  
  if (!opts.use24Hour) {
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
  }
  
  const timeStr = [
    hours.toString().padStart(2, '0'),
    minutes,
    seconds
  ].join(':');
  
  // Format date if needed
  let dateStr = '';
  if (opts.includeDate) {
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    dateStr = `${year}-${month}-${day} `;
  }
  
  // Add milliseconds if needed
  let msStr = '';
  if (opts.includeMs) {
    msStr = `.${now.getMilliseconds().toString().padStart(3, '0')}`;
  }
  
  return `${dateStr}${timeStr}${msStr}${ampm ? ' ' + ampm : ''}`;
}
