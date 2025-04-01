# Logger

![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)

A lightweight, colorful, and feature-rich JavaScript logger with a beautiful interface and powerful functionality.

## Features

- ✨ **Multiple Log Levels**: TRACE, DEBUG, INFO, WARN, ERROR, SILENT
- 🎨 **Colored Output**: Color-coded by log level for easy readability
- 🔀 **Level Filtering**: Disable logs below a certain level
- 📝 **Named Loggers**: Support for module-specific loggers
- 💾 **Level Persistence**: Save settings between sessions
- ⏲ **Timestamps**: Configurable timestamp output
- 🔌 **Formatters**: Multiple output formats available
- 🚀 **Lightweight & Fast**: Under 5KB minified and gzipped
- 📱 **Environment Support**: Works in browsers and Node.js
- 💻 **TypeScript Ready**: First-class TypeScript support

## Installation

```bash
npm install logger
```

## Quick Start

```javascript
import logger from 'logger';

// Basic usage
logger.info('Application started');
logger.warn('Configuration missing, using defaults');
logger.error('Failed to connect to database', { host: 'localhost', port: 5432 });

// Module specific logger
const apiLogger = logger.getLogger('api');
apiLogger.setLevel('debug');
apiLogger.debug('Request received', { method: 'GET', path: '/users' });

// Customize output
logger
  .setLevel('info')   // Only show info and above
  .useColors(true)    // Enable colors
  .useTimestamps(true)  // Show timestamps
  .persist();         // Save settings to localStorage/cookies
```

## Log Levels

The following log levels are available, in order of verbosity:

- `TRACE` (0): Most verbose, for detailed debugging
- `DEBUG` (1): Debug information
- `INFO` (2): General information
- `WARN` (3): Warnings (default level)
- `ERROR` (4): Errors
- `SILENT` (5): No logging

## Styled Logging

Logger creates beautiful, colored output:

| Level | Color | Example |
|-------|-------|---------|
| TRACE | Cyan | ![Trace](https://placehold.co/120x20/4dabf7/white?text=TRACE) |
| DEBUG | Green | ![Debug](https://placehold.co/120x20/40c057/white?text=DEBUG) |
| INFO | Blue | ![Info](https://placehold.co/120x20/228be6/white?text=INFO) |
| WARN | Orange | ![Warn](https://placehold.co/120x20/fd7e14/white?text=WARN) |
| ERROR | Red | ![Error](https://placehold.co/120x20/fa5252/white?text=ERROR) |

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
- `logger.getLevel()`: Get the current log level
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
import logger, { JsonFormatter } from 'logger';

// Create a JSON formatter
const jsonFormatter = new JsonFormatter();

// Use it with the logger
logger.setFormatter(jsonFormatter);

// Or with a named logger
const apiLogger = logger.getLogger('api');
apiLogger.setFormatter(jsonFormatter);
```

You can create your own formatter by implementing the `LogFormatter` interface.

## Browser Usage

Logger works great in browsers and includes automatic persistence using localStorage or cookies.

```html
<script src="path/to/logger.min.js"></script>
<script>
  // Logger is available as 'log' global
  log.info('Logger loaded in browser');
  
  // Get a module-specific logger
  const uiLogger = log.getLogger('ui');
  uiLogger.debug('UI component initialized');
</script>
```

## Node.js Usage

Use the logger in Node.js applications just as easily:

```javascript
const logger = require('logger');

// Use with CommonJS
logger.info('Node.js application started');

// Named loggers work the same
const dbLogger = logger.getLogger('database');
dbLogger.info('Connected to database');
```

## Examples

Check out the included examples:

- `example.js` - Node.js example
- `example.html` - Browser example

## Comparison with Other Loggers

| Feature | Logger | loglevel | js-logger |
|---------|--------|----------|-----------|
| Size (min+gzip) | <5KB | 1.4KB | 1.1KB |
| Colored output | ✅ | ❌ | ❌ |
| Named loggers | ✅ | ✅ | ✅ |
| Persistence | ✅ | ✅ | ❌ |
| Formatters | ✅ | ❌ | ❌ |
| TypeScript | ✅ | ✅ | ✅ |

## License

MIT
