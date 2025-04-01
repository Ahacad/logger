# Logger

![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)

A lightweight, colorful, and feature-rich JavaScript logger with a beautiful interface and powerful functionality.

## Features

- ✨ **Multiple Log Levels**: TRACE, DEBUG, INFO, WARN, ERROR, SILENT
- 🎨 **Colored Output**: Enhanced color support for both browsers and terminals
- 🔀 **Level Filtering**: Disable logs below a certain level
- 📝 **Named Loggers**: Support for module-specific loggers
- 💾 **Level Persistence**: Save settings between sessions
- ⏲ **Timestamps**: Configurable timestamp output
- 🔌 **Formatters**: Multiple output formats available
- 🚀 **Lightweight & Fast**: Under 5KB minified and gzipped
- 📱 **Universal Support**: First-class support for ESM and CommonJS
- 💻 **TypeScript Ready**: Comprehensive TypeScript definitions

## Installation

```bash
npm install logger
```

## Quick Start

### ESM (ECMAScript Modules)

```javascript
// Modern ES module import
import logger from 'logger';

// Basic usage
logger.info('Application started');
logger.warn('Configuration missing, using defaults');
logger.error('Failed to connect to database', { host: 'localhost', port: 5432 });
```

### CommonJS

```javascript
// CommonJS require
const logger = require('logger');

// Basic usage
logger.info('Application started');
logger.warn('Configuration missing, using defaults');
logger.error('Failed to connect to database', { host: 'localhost', port: 5432 });
```

### Named Loggers

```javascript
// Module specific logger
const apiLogger = logger.getLogger('api');
apiLogger.setLevel('debug');
apiLogger.debug('Request received', { method: 'GET', path: '/users' });

// Customize output
logger
  .setLevel('info')     // Only show info and above
  .useColors(true)      // Enable colors
  .useTimestamps(true)  // Show timestamps
  .persist();           // Save settings to localStorage/cookies
```

## Log Levels

The following log levels are available, in order of verbosity:

- `TRACE` (0): Most verbose, for detailed debugging
- `DEBUG` (1): Debug information
- `INFO` (2): General information
- `WARN` (3): Warnings (default level)
- `ERROR` (4): Errors
- `SILENT` (5): No logging

## Colored Output

Logger supports colorized output across environments:

| Level | Browser | Terminal | Description |
|-------|---------|----------|-------------|
| TRACE | Cyan | Cyan | Detailed tracing information |
| DEBUG | Green | Green | Debug-level messages |
| INFO | Blue | Bright Blue | Informational messages |
| WARN | Orange | Yellow | Warning messages |
| ERROR | Red | Bright Red | Error messages |

Colors are automatically enabled based on environment detection and can be toggled with:

```javascript
// Enable colors
logger.useColors(true);

// Disable colors
logger.useColors(false);
```

## API Reference

### Logger Methods

- `logger.trace(...args)`: Log at TRACE level
- `logger.debug(...args)`: Log at DEBUG level
- `logger.info(...args)`: Log at INFO level
- `logger.warn(...args)`: Log at WARN level
- `logger.error(...args)`: Log at ERROR level
- `logger.log(...args)`: Alias for debug

### Configuration

- `logger.setLevel(level, persist?)`: Set the current log level
- `logger.getLevel()`: Get the current log level as enum
- `logger.getLevelName()`: Get the current log level name
- `logger.setDefaultLevel(level)`: Set the default log level
- `logger.resetLevel()`: Reset to the default log level
- `logger.enableAll(persist?)`: Enable all logging (TRACE)
- `logger.disableAll(persist?)`: Disable all logging (SILENT)
- `logger.useColors(enable)`: Enable or disable colors
- `logger.useTimestamps(enable)`: Enable or disable timestamps
- `logger.persist(storage?)`: Enable log level persistence

### Named Loggers

- `logger.getLogger(name)`: Get a named logger
- `logger.getLoggers()`: Get all named loggers

### Formatters

- `logger.setFormatter(formatter)`: Set custom formatter
- `logger.getFormatter()`: Get current formatter

## Custom Formatters

The library includes several built-in formatters:

- `DefaultFormatter`: Includes timestamps, log level, and logger name
- `MinimalFormatter`: Simple prefix with just the logger name
- `JsonFormatter`: Structured JSON output

Example:

```javascript
// ESM
import logger, { JsonFormatter } from 'logger';

// CommonJS
const { default: logger, JsonFormatter } = require('logger');

// Create a JSON formatter
const jsonFormatter = new JsonFormatter();

// Use it with the logger
logger.setFormatter(jsonFormatter);

// Or with a named logger
const apiLogger = logger.getLogger('api');
apiLogger.setFormatter(jsonFormatter);
```

You can create your own formatter by implementing the `LogFormatter` interface.

## Module Compatibility

This logger provides first-class support for both ESM and CommonJS module systems:

### ESM (ECMAScript Modules)

```javascript
// Default import
import logger from 'logger';

// Named imports
import logger, { LogLevel, JsonFormatter } from 'logger';
```

### CommonJS

```javascript
// Direct require (default export)
const logger = require('logger');

// Destructured require
const { default: logger, JsonFormatter } = require('logger');
```

## Browser Usage

Logger works great in browsers and includes automatic persistence using localStorage or cookies.

```html
<script type="module">
  import logger from 'logger';
  logger.info('Logger loaded in browser');
  
  // Get a module-specific logger
  const uiLogger = logger.getLogger('ui');
  uiLogger.debug('UI component initialized');
</script>
```

## Node.js Usage

Use the logger in Node.js applications:

```javascript
// ESM
import logger from 'logger';
logger.info('Node.js application started');

// CommonJS
const logger = require('logger');
logger.info('Node.js application started');

// Named loggers work the same
const dbLogger = logger.getLogger('database');
dbLogger.info('Connected to database');
```

## Examples

Check out the included examples:

- `example.cjs` - CommonJS example
- `example.mjs` - ES Modules example

Run them with:

```bash
# Build the library first
npm run build

# Run examples
npm run example:cjs
npm run example:esm
```
## License

MIT
