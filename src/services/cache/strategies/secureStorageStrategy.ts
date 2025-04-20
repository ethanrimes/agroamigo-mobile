import * as SecureStore from 'expo-secure-store';
import { CacheStrategy } from '../types';

// Note: This strategy has replaced AsyncStorage completely

interface CacheItem<T> {
  value: T;
  expiresAt: number | null; // Timestamp when item expires, null for no expiration
}

/**
 * SecureStore cache strategy for encrypted persistent device storage
 */
class SecureStorageStrategy implements CacheStrategy {
  // Prefix for all cache keys
  private keyPrefix = 'app_secure_cache:';

  private getFullKey(key: string): string {
    return `${this.keyPrefix}${key}`;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const fullKey = this.getFullKey(key);
      // Add a try-catch specifically for the SecureStore.getItemAsync call
      try {
        const jsonValue = await SecureStore.getItemAsync(fullKey);
        
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
      } catch (secureStoreError) {
        console.warn('SecureStore access error:', secureStoreError);
        // Fall back to null when SecureStore is unavailable
        return null;
      }
    } catch (error) {
      console.error('SecureStore get error:', error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl = 0): Promise<void> {
    try {
      const fullKey = this.getFullKey(key);
      const expiresAt = ttl > 0 ? Date.now() + ttl * 1000 : null;
      const item: CacheItem<T> = { value, expiresAt };
      
      // SecureStore only accepts string values
      try {
        await SecureStore.setItemAsync(fullKey, JSON.stringify(item));
      } catch (secureStoreError) {
        console.warn('SecureStore write error:', secureStoreError);
        // Handle the case when SecureStore is not available
      }
    } catch (error) {
      console.error('SecureStore set error:', error);
    }
  }

  async has(key: string): Promise<boolean> {
    try {
      const value = await this.get(key);
      return value !== null;
    } catch (error) {
      console.error('SecureStore has error:', error);
      return false;
    }
  }

  async remove(key: string): Promise<void> {
    try {
      const fullKey = this.getFullKey(key);
      try {
        await SecureStore.deleteItemAsync(fullKey);
      } catch (secureStoreError) {
        console.warn('SecureStore delete error:', secureStoreError);
      }
    } catch (error) {
      console.error('SecureStore remove error:', error);
    }
  }

  async clear(): Promise<void> {
    try {
      // SecureStore doesn't have a built-in "clear all" method like AsyncStorage
      // We would need to maintain a separate list of all keys
      // As a fallback, we'll log that this operation isn't fully supported
      console.warn('SecureStore clear operation is not fully supported. Only known keys can be cleared.');
      
      // One option would be to store a master list of keys in SecureStore itself
      try {
        const masterKeyList = await SecureStore.getItemAsync(`${this.keyPrefix}master_key_list`);
        if (masterKeyList) {
          const keys: string[] = JSON.parse(masterKeyList);
          
          // Delete all keys in the master list
          for (const key of keys) {
            await SecureStore.deleteItemAsync(key);
          }
          
          // Reset the master list
          await SecureStore.setItemAsync(`${this.keyPrefix}master_key_list`, JSON.stringify([]));
        }
      } catch (secureStoreError) {
        console.warn('SecureStore master key access error:', secureStoreError);
      }
    } catch (error) {
      console.error('SecureStore clear error:', error);
    }
  }
}

// Export the class itself instead of an instance
export { SecureStorageStrategy };
// Also export a singleton instance for backward compatibility
export default new SecureStorageStrategy();