import { LogStorage } from './base';
import { LocalStorageProvider } from './local-storage';
import { CookieStorage } from './cookie';
import { MemoryStorage } from './memory';
import { hasLocalStorage, hasCookies } from '../utils/env';

/**
 * Create the best available storage provider
 */
export function createStorage(prefix = 'logger'): LogStorage {
  // Try localStorage first
  if (hasLocalStorage()) {
    return new LocalStorageProvider(prefix);
  }
  
  // Fall back to cookies
  if (hasCookies()) {
    return new CookieStorage(prefix);
  }
  
  // Default to in-memory storage
  return new MemoryStorage();
}
