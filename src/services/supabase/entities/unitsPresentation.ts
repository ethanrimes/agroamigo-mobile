import supabase from '../client';
import cacheService from '../../cache';
import { getTTLForEntity } from '../../cache/utils/expiration';
import { getDailyPriceObservationsByProduct } from './precio';

export type UnitsPresentation = {
  UnitsPresentationId: number;
  UnitsId: number;
  PresentationId: number;
  Name: string;
  created_at?: string;
};

/**
 * Get all units presentations, with cache support
 */
export const getUnitsPresentations = async (): Promise<UnitsPresentation[]> => {
  // Try to get from cache first
  const cachedData = await cacheService.getCollection<UnitsPresentation>('UnitsPresentation');
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('UnitsPresentation')
    .select('*');
  
  if (error) throw error;
  
  // Store in cache before returning
  const unitsPresentations = data as UnitsPresentation[];
  await cacheService.setCollection('UnitsPresentation', unitsPresentations, getTTLForEntity('UnitsPresentation'));
  
  return unitsPresentations;
};

/**
 * Get units presentation by ID, with cache support
 */
export const getUnitsPresentationById = async (UnitsPresentationId: number): Promise<UnitsPresentation> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'UnitsPresentation',
    method: 'getById',
    params: { UnitsPresentationId }
  };
  
  const cachedData = await cacheService.get<UnitsPresentation>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<UnitsPresentation>('UnitsPresentation');
  
  if (cachedCollection) {
    const unitsPresentation = cachedCollection.find(up => up.UnitsPresentationId === UnitsPresentationId);
    if (unitsPresentation) {
      // Cache the individual result as well
      await cacheService.set(cacheParams, unitsPresentation);
      return unitsPresentation;
    }
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('UnitsPresentation')
    .select('*')
    .eq('UnitsPresentationId', UnitsPresentationId)
    .single();
  
  if (error) throw error;
  
  // Store in cache before returning
  const unitsPresentation = data as UnitsPresentation;
  await cacheService.set(cacheParams, unitsPresentation);
  
  return unitsPresentation;
};

/**
 * Get units presentations by units ID, with cache support
 */
export const getUnitsPresentationsByUnitsId = async (UnitsId: number): Promise<UnitsPresentation[]> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'UnitsPresentation',
    method: 'getByUnitsId',
    params: { UnitsId }
  };
  
  const cachedData = await cacheService.get<UnitsPresentation[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<UnitsPresentation>('UnitsPresentation');
  
  if (cachedCollection) {
    const unitsPresentations = cachedCollection.filter(up => up.UnitsId === UnitsId);
    // Cache the filtered results
    await cacheService.set(cacheParams, unitsPresentations);
    return unitsPresentations;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('UnitsPresentation')
    .select('*')
    .eq('UnitsId', UnitsId);
  
  if (error) throw error;
  
  // Store in cache before returning
  const unitsPresentations = data as UnitsPresentation[];
  await cacheService.set(cacheParams, unitsPresentations);
  
  return unitsPresentations;
};

/**
 * Get units presentations by presentation ID, with cache support
 */
export const getUnitsPresentationsByPresentationId = async (PresentationId: number): Promise<UnitsPresentation[]> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'UnitsPresentation',
    method: 'getByPresentationId',
    params: { PresentationId }
  };
  
  const cachedData = await cacheService.get<UnitsPresentation[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<UnitsPresentation>('UnitsPresentation');
  
  if (cachedCollection) {
    const unitsPresentations = cachedCollection.filter(up => up.PresentationId === PresentationId);
    // Cache the filtered results
    await cacheService.set(cacheParams, unitsPresentations);
    return unitsPresentations;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('UnitsPresentation')
    .select('*')
    .eq('PresentationId', PresentationId);
  
  if (error) throw error;
  
  // Store in cache before returning
  const unitsPresentations = data as UnitsPresentation[];
  await cacheService.set(cacheParams, unitsPresentations);
  
  return unitsPresentations;
};

/**
 * Get units presentation by units ID and presentation ID, with cache support
 */
export const getUnitsPresentationByUnitsAndPresentation = async (
  UnitsId: number, 
  PresentationId: number
): Promise<UnitsPresentation | null> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'UnitsPresentation',
    method: 'getByUnitsAndPresentation',
    params: { UnitsId, PresentationId }
  };
  
  const cachedData = await cacheService.get<UnitsPresentation>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<UnitsPresentation>('UnitsPresentation');
  
  if (cachedCollection) {
    const unitsPresentation = cachedCollection.find(
      up => up.UnitsId === UnitsId && up.PresentationId === PresentationId
    );
    
    if (unitsPresentation) {
      // Cache the individual result as well
      await cacheService.set(cacheParams, unitsPresentation);
      return unitsPresentation;
    }
    
    // If not found in the collection, return null
    return null;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('UnitsPresentation')
    .select('*')
    .eq('UnitsId', UnitsId)
    .eq('PresentationId', PresentationId);
  
  if (error) throw error;
  
  // If no results, return null
  if (!data || data.length === 0) {
    return null;
  }
  
  // Store in cache before returning
  const unitsPresentation = data[0] as UnitsPresentation;
  await cacheService.set(cacheParams, unitsPresentation);
  
  return unitsPresentation;
};

/**
 * Get the most common units presentation ID associated with a product
 * by analyzing historical price observations
 * Returns both the UnitsPresentationId and the individual UnitsId and PresentationId
 */
export const getMostCommonUnitsPresentationByProductId = async (artiId: number): Promise<{
  unitsPresentationId: number | null;
  UnitsId: number | null;
  PresentationId: number | null;
}> => {
  console.log(`[getMostCommonUnitsPresentationByProductId] Starting for product ID: ${artiId}`);
  
  // Try to get from cache first
  const cacheParams = {
    entity: 'UnitsPresentation',
    method: 'getMostCommonByProductId',
    params: { artiId }
  };
  
  try {
    console.log(`[getMostCommonUnitsPresentationByProductId] Checking cache...`);
    const cachedData = await cacheService.get<{
      unitsPresentationId: number | null;
      UnitsId: number | null;
      PresentationId: number | null;
    }>(cacheParams);
    
    if (cachedData) {
      console.log(`[getMostCommonUnitsPresentationByProductId] Cache hit:`, cachedData);
      return cachedData;
    }
    
    console.log(`[getMostCommonUnitsPresentationByProductId] Cache miss, fetching price observations...`);
    
    // Get all price observations for this product
    const priceObservations = await getDailyPriceObservationsByProduct(artiId);
    console.log(`[getMostCommonUnitsPresentationByProductId] Found ${priceObservations?.length || 0} price observations`);
    
    // If no observations found, return null values
    if (!priceObservations || priceObservations.length === 0) {
      console.log(`[getMostCommonUnitsPresentationByProductId] No observations found, returning nulls`);
      return { unitsPresentationId: null, UnitsId: null, PresentationId: null };
    }
    
    // Log sample observation
    console.log(`[getMostCommonUnitsPresentationByProductId] Sample observation:`, JSON.stringify(priceObservations[0]));
    
    // Create a map to count combinations of UnitsId and PresentationId
    const combinationCounts = new Map<string, {
      count: number;
      unitsPresentationId: number | null;
      UnitsId: number | null;
      PresentationId: number | null;
    }>();
    
    // Count occurrences of each combination
    for (const observation of priceObservations) {
      // Skip observations without necessary data
      if (!observation.UnitsId && !observation.PresentationId && !observation.UnitsPresentationId) {
        continue;
      }
      
      // Create a key for the combination
      const key = `${observation.UnitsId || 'null'}-${observation.PresentationId || 'null'}`;
      
      const current = combinationCounts.get(key) || {
        count: 0,
        unitsPresentationId: observation.UnitsPresentationId || null,
        UnitsId: observation.UnitsId || null,
        PresentationId: observation.PresentationId || null
      };
      
      current.count++;
      combinationCounts.set(key, current);
    }
    
    console.log(`[getMostCommonUnitsPresentationByProductId] Found ${combinationCounts.size} unique combinations`);
    
    // If no valid combinations found, return null values
    if (combinationCounts.size === 0) {
      console.log(`[getMostCommonUnitsPresentationByProductId] No valid combinations found, returning nulls`);
      return { unitsPresentationId: null, UnitsId: null, PresentationId: null };
    }
    
    // Find the most frequent combination
    let maxCount = 0;
    let mostCommon: {
      unitsPresentationId: number | null;
      UnitsId: number | null;
      PresentationId: number | null;
    } = {
      unitsPresentationId: null,
      UnitsId: null,
      PresentationId: null
    };
    
    for (const [key, data] of combinationCounts.entries()) {
      console.log(`[getMostCommonUnitsPresentationByProductId] Combination ${key} count: ${data.count}`);
      if (data.count > maxCount) {
        maxCount = data.count;
        mostCommon = {
          unitsPresentationId: data.unitsPresentationId,
          UnitsId: data.UnitsId,
          PresentationId: data.PresentationId
        };
      }
    }
    
    console.log(`[getMostCommonUnitsPresentationByProductId] Most common combination:`, mostCommon);
    
    // If we found a combination but it doesn't have a UnitsPresentationId,
    // try to find the corresponding UnitsPresentation record
    if (mostCommon.UnitsId && mostCommon.PresentationId && !mostCommon.unitsPresentationId) {
      console.log(`[getMostCommonUnitsPresentationByProductId] Looking up UnitsPresentationId...`);
      try {
        const unitsPresentation = await getUnitsPresentationByUnitsAndPresentation(
          mostCommon.UnitsId,
          mostCommon.PresentationId
        );
        
        if (unitsPresentation) {
          mostCommon.unitsPresentationId = unitsPresentation.UnitsPresentationId;
          console.log(`[getMostCommonUnitsPresentationByProductId] Found UnitsPresentationId: ${unitsPresentation.UnitsPresentationId}`);
        } else {
          console.log(`[getMostCommonUnitsPresentationByProductId] No UnitsPresentation record found`);
        }
      } catch (error) {
        console.error('[getMostCommonUnitsPresentationByProductId] Error finding UnitsPresentation record:', error);
      }
    }
    
    // Cache the result before returning
    console.log(`[getMostCommonUnitsPresentationByProductId] Caching result and returning:`, mostCommon);
    await cacheService.set(cacheParams, mostCommon);
    
    return mostCommon;
  } catch (error) {
    console.error(`[getMostCommonUnitsPresentationByProductId] Error:`, error);
    // Still return something even if there's an error
    return { unitsPresentationId: null, UnitsId: null, PresentationId: null };
  }
};