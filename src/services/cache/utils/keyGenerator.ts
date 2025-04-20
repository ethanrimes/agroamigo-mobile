import { CacheKeyParams } from '../types';

/**
 * Generate a consistent cache key based on entity, method and params
 * 
 * @param params Parameters to generate the key from
 * @returns A consistent cache key string
 */
export function generateCacheKey(params: CacheKeyParams): string {
  const { entity, method, params: methodParams } = params;
  
  // Base key without params
  let key = `${entity}:${method}`;
  
  // If there are params, add them to the key
  if (methodParams && Object.keys(methodParams).length > 0) {
    // Sort keys to ensure consistent key generation
    const sortedParams = Object.keys(methodParams).sort().reduce(
      (obj, key) => {
        obj[key] = methodParams[key];
        return obj;
      }, 
      {} as Record<string, any>
    );
    
    // Join params as key=value
    const paramsString = Object.entries(sortedParams)
      .map(([k, v]) => {
        // Handle different types of values
        const value = v === null ? 'null' 
          : v === undefined ? 'undefined'
          : Array.isArray(v) ? `[${v.join(',')}]`
          : typeof v === 'object' ? JSON.stringify(v)
          : String(v);
        
        return `${k}=${value}`;
      })
      .join('&');
    
    key += `:${paramsString}`;
  }
  
  return key;
}

/**
 * Generate a collection cache key for a specific entity
 * 
 * @param entity Entity name
 * @returns Cache key for the entire collection
 */
export function generateCollectionKey(entity: string): string {
  return `${entity}:collection`;
}