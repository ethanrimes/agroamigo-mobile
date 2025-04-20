import { CacheStrategy } from '../types';

interface CacheItem<T> {
  value: T;
  expiresAt: number | null; // Timestamp when item expires, null for no expiration
}

/**
 * In-memory cache strategy for session-level caching
 */
class MemoryStrategy implements CacheStrategy {
  private cache: Map<string, CacheItem<any>> = new Map();

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }
    
    // Check if item has expired
    if (item.expiresAt !== null && Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value as T;
  }

  async set<T>(key: string, value: T, ttl = 0): Promise<void> {
    const expiresAt = ttl > 0 ? Date.now() + ttl * 1000 : null;
    this.cache.set(key, { value, expiresAt });
  }

  async has(key: string): Promise<boolean> {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }
    
    // Check if item has expired
    if (item.expiresAt !== null && Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  async remove(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}

export default new MemoryStrategy();