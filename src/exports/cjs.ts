// CommonJS entry point

import { RootLogger } from '../core/root-logger';
import { LogLevel } from '../core/levels';
import { DefaultFormatter } from '../formatters/default';
import { MinimalFormatter } from '../formatters/minimal';
import { JsonFormatter } from '../formatters/json';

// Create the singleton instance
const logger = new RootLogger();

// Export the logger and all its methods
module.exports = logger;

// Add class exports
module.exports.LogLevel = LogLevel;
module.exports.DefaultFormatter = DefaultFormatter;
module.exports.MinimalFormatter = MinimalFormatter;
module.exports.JsonFormatter = JsonFormatter;

// Add default export for ESM interop
module.exports.default = logger;

// Set up for global usage
if (typeof window !== 'undefined') {
  window.log = logger;
}
