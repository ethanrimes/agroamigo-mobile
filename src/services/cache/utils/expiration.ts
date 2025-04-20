/**
 * Default TTL values (in seconds) for different entity types
 */
export const DEFAULT_TTL = {
    // Static data with infrequent updates - 1 day
    STATIC: 86400,
    
    // Semi-static data - 6 hours
    SEMI_STATIC: 21600,
    
    // Dynamic data - 1 hour
    DYNAMIC: 3600,
    
    // Highly dynamic data - 15 minutes
    HIGHLY_DYNAMIC: 900,
    
    // No expiration
    PERMANENT: 0
  };
  
  /**
   * TTL values by entity type
   */
  export const ENTITY_TTL: Record<string, number> = {
    // Static reference data
    Departamento: DEFAULT_TTL.STATIC,
    Municipio: DEFAULT_TTL.STATIC,
    Mercado: DEFAULT_TTL.STATIC,
    MajorCategory: DEFAULT_TTL.STATIC,
    Subcategory: DEFAULT_TTL.STATIC,
    Presentation: DEFAULT_TTL.STATIC,
    Units: DEFAULT_TTL.STATIC,
    Producto: DEFAULT_TTL.STATIC,
    
    // Dynamic data
    DailyProductPriceObservation: DEFAULT_TTL.DYNAMIC
  };
  
  /**
   * Get the TTL for a specific entity
   * 
   * @param entityName Name of the entity
   * @returns TTL in seconds
   */
  export function getTTLForEntity(entityName: string): number {
    return ENTITY_TTL[entityName] || DEFAULT_TTL.DYNAMIC;
  }