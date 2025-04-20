import CacheService from './cacheService';
import { CacheOptions, CacheStrategy, CacheKeyParams } from './types';
import { generateCacheKey, generateCollectionKey } from './utils/keyGenerator';
import { DEFAULT_TTL, ENTITY_TTL, getTTLForEntity } from './utils/expiration';

// Create the default instance with memory strategy
const defaultCacheService = new CacheService({ strategy: 'memory' });

// Singleton getter
export function getCacheService(options?: CacheOptions): CacheService {
  if (options) {
    defaultCacheService.setStrategy(options.strategy || 'memory');
  }
  return defaultCacheService;
}

export {
  CacheService,
  CacheOptions,
  CacheStrategy,
  CacheKeyParams,
  generateCacheKey,
  generateCollectionKey,
  DEFAULT_TTL,
  ENTITY_TTL,
  getTTLForEntity
};

export default defaultCacheService;