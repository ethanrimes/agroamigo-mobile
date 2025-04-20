// Cache strategy interface
export interface CacheStrategy {
  // Get an item from cache by key
  get<T>(key: string): Promise<T | null>;
  
  // Set an item in cache with optional TTL (time to live) in seconds
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  
  // Check if an item exists in cache
  has(key: string): Promise<boolean>;
  
  // Remove an item from cache
  remove(key: string): Promise<void>;
  
  // Clear all items from cache
  clear(): Promise<void>;
}

// Cache service options
export interface CacheOptions {
  // Default TTL in seconds (0 means no expiration)
  defaultTTL?: number;
  
  // Selected strategy: 'memory' (session storage), 'async' (persistent storage), or 'secure' (encrypted persistent storage)
  strategy?: 'memory' | 'async' | 'secure';
}

// Cache key params for generating consistent keys
export interface CacheKeyParams {
  entity: string;
  method: string;
  params?: Record<string, any>;
}