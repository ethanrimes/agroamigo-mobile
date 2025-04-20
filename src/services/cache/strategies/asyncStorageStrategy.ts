import AsyncStorage from '@react-native-async-storage/async-storage';
import { CacheStrategy } from '../types';

interface CacheItem<T> {
  value: T;
  expiresAt: number | null; // Timestamp when item expires, null for no expiration
}

/**
 * AsyncStorage cache strategy for persistent device storage
 */
class AsyncStorageStrategy implements CacheStrategy {
  // Prefix for all cache keys
  private keyPrefix = 'app_cache:';

  private getFullKey(key: string): string {
    return `${this.keyPrefix}${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const fullKey = this.getFullKey(key);
      const jsonValue = await AsyncStorage.getItem(fullKey);
      
      if (jsonValue === null) {
        return null;
      }
      
      const item: CacheItem<T> = JSON.parse(jsonValue);
      
      // Check if item has expired
      if (item.expiresAt !== null && Date.now() > item.expiresAt) {
        await this.remove(key);
        return null;
      }
      
      return item.value;
    } catch (error) {
      console.error('AsyncStorage get error:', error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl = 0): Promise<void> {
    try {
      const fullKey = this.getFullKey(key);
      const expiresAt = ttl > 0 ? Date.now() + ttl * 1000 : null;
      const item: CacheItem<T> = { value, expiresAt };
      
      await AsyncStorage.setItem(fullKey, JSON.stringify(item));
    } catch (error) {
      console.error('AsyncStorage set error:', error);
    }
  }

  async has(key: string): Promise<boolean> {
    try {
      const value = await this.get(key);
      return value !== null;
    } catch (error) {
      console.error('AsyncStorage has error:', error);
      return false;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      const fullKey = this.getFullKey(key);
      await AsyncStorage.removeItem(fullKey);
    } catch (error) {
      console.error('AsyncStorage remove error:', error);
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(this.keyPrefix));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      console.error('AsyncStorage clear error:', error);
    }
  }
}

export default new AsyncStorageStrategy();