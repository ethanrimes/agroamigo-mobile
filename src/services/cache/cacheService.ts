import { CacheStrategy, CacheOptions, CacheKeyParams } from './types';
import { memoryStrategy, secureStorageStrategy } from './strategies';
import { generateCacheKey, generateCollectionKey } from './utils/keyGenerator';
import { DEFAULT_TTL, getTTLForEntity } from './utils/expiration';

/**
 * Cache service that handles different caching strategies
 */
class CacheService {
  private strategy: CacheStrategy;
  private defaultTTL: number;

  constructor(options: CacheOptions = {}) {
    const { strategy = 'memory', defaultTTL = DEFAULT_TTL.DYNAMIC } = options;
    
    // Select strategy based on options
    this.strategy = this.getStrategyInstance(strategy);
    this.defaultTTL = defaultTTL;
  }

  private getStrategyInstance(strategy: string): CacheStrategy {
    switch (strategy) {
      case 'secure':
        return secureStorageStrategy;
      case 'memory':
      default:
        return memoryStrategy;
    }
  }

  /**
   * Get an item from cache by key params
   */
  async get<T>(params: CacheKeyParams): Promise<T | null> {
    const key = generateCacheKey(params);
    return this.strategy.get<T>(key);
  }

  /**
   * Set an item in cache with key params
   */
  async set<T>(params: CacheKeyParams, value: T, ttl?: number): Promise<void> {
    const key = generateCacheKey(params);
    
    // If TTL is not specified, use the entity default TTL
    if (ttl === undefined) {
      ttl = getTTLForEntity(params.entity);
    }
    
    await this.strategy.set<T>(key, value, ttl);
  }

  /**
   * Check if an item exists in cache
   */
  async has(params: CacheKeyParams): Promise<boolean> {
    const key = generateCacheKey(params);
    return this.strategy.has(key);
  }

  /**
   * Remove an item from cache
   */
  async remove(params: CacheKeyParams): Promise<void> {
    const key = generateCacheKey(params);
    await this.strategy.remove(key);
  }

  /**
   * Clear all items from cache
   */
  async clear(): Promise<void> {
    await this.strategy.clear();
  }

  /**
   * Cache an entire collection of entity items
   */
  async setCollection<T>(entity: string, items: T[], ttl?: number): Promise<void> {
    const key = generateCollectionKey(entity);
    
    // If TTL is not specified, use the entity default TTL
    if (ttl === undefined) {
      ttl = getTTLForEntity(entity);
    }
    
    await this.strategy.set<T[]>(key, items, ttl);
  }

  /**
   * Get an entire collection of entity items
   */
  async getCollection<T>(entity: string): Promise<T[] | null> {
    const key = generateCollectionKey(entity);
    return this.strategy.get<T[]>(key);
  }

  /**
   * Check if a collection exists in cache
   */
  async hasCollection(entity: string): Promise<boolean> {
    const key = generateCollectionKey(entity);
    return this.strategy.has(key);
  }

  /**
   * Remove a collection from cache
   */
  async removeCollection(entity: string): Promise<void> {
    const key = generateCollectionKey(entity);
    await this.strategy.remove(key);
  }

  /**
   * Get the current strategy instance
   */
  getStrategy(): CacheStrategy {
    return this.strategy;
  }

  /**
   * Switch to a different strategy
   */
  setStrategy(strategy: 'memory' | 'secure'): void {
    this.strategy = this.getStrategyInstance(strategy);
  }
}

export default CacheService;