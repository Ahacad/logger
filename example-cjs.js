// This is a CommonJS example
// You need to build the library first with `npm run build`

// Import the logger
const logger = require('./dist/index.js');

// Basic usage
console.log('=== Basic logging ===');
logger.info('This is an info message');
logger.warn('This is a warning message');
logger.error('This is an error message');

// Named loggers
console.log('\n=== Named loggers ===');
const apiLogger = logger.getLogger('api');
apiLogger.info('API initialized');

console.log('\nLogger level:', logger.getLevelName());
