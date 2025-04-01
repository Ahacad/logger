// ESM example for logger
// Run: npm run build && node example.mjs

import logger from './dist/index.js';

// Basic usage with default WARN level
console.log('=== Basic logging (ESM) ===');
logger.trace('Trace message - hidden at default level');
logger.debug('Debug message - hidden at default level');
logger.info('Info message - hidden at default level');
logger.warn('Warning message - visible');
logger.error('Error message - visible');

// Change log level to see more messages
console.log('\n=== Changed level to DEBUG ===');
logger.setLevel('debug');
logger.debug('Debug message - now visible');
logger.info('Info message - now visible');

// Named loggers for different components
console.log('\n=== Named loggers ===');
const apiLogger = logger.getLogger('api');
const dbLogger = logger.getLogger('database');
apiLogger.info('API initialized');
dbLogger.info('Database connected');

// Color demonstration
console.log('\n=== Color demonstration ===');
// Force enable colors for demonstration
logger.useColors(true);
// Show all log levels
logger.setLevel('trace');
logger.trace('TRACE message (cyan)');
logger.debug('DEBUG message (green)');
logger.info('INFO message (blue)');
logger.warn('WARNING message (yellow)');
logger.error('ERROR message (red)');

// Custom formatting
console.log('\n=== Minimal formatter ===');
const defaultFormatter = logger.getFormatter();
const minimalFormatter = Object.create(defaultFormatter);
minimalFormatter.setIncludeTimestamps(false);
apiLogger.setFormatter(minimalFormatter);
apiLogger.info('Using minimal formatter');
apiLogger.error('Error with minimal formatting');

// Reset to defaults
console.log('\n=== Reset to default ===');
logger.resetLevel();
logger.warn('Back to defaults');

