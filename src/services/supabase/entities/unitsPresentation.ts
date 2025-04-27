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
export const getUnitsPresentationsByUnitsId = async (unitsId: number): Promise<UnitsPresentation[]> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'UnitsPresentation',
    method: 'getByUnitsId',
    params: { unitsId }
  };
  
  const cachedData = await cacheService.get<UnitsPresentation[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<UnitsPresentation>('UnitsPresentation');
  
  if (cachedCollection) {
    const unitsPresentations = cachedCollection.filter(up => up.UnitsId === unitsId);
    // Cache the filtered results
    await cacheService.set(cacheParams, unitsPresentations);
    return unitsPresentations;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('UnitsPresentation')
    .select('*')
    .eq('UnitsId', unitsId);
  
  if (error) throw error;
  
  // Store in cache before returning
  const unitsPresentations = data as UnitsPresentation[];
  await cacheService.set(cacheParams, unitsPresentations);
  
  return unitsPresentations;
};

/**
 * Get units presentations by presentation ID, with cache support
 */
export const getUnitsPresentationsByPresentationId = async (presentationId: number): Promise<UnitsPresentation[]> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'UnitsPresentation',
    method: 'getByPresentationId',
    params: { presentationId }
  };
  
  const cachedData = await cacheService.get<UnitsPresentation[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<UnitsPresentation>('UnitsPresentation');
  
  if (cachedCollection) {
    const unitsPresentations = cachedCollection.filter(up => up.PresentationId === presentationId);
    // Cache the filtered results
    await cacheService.set(cacheParams, unitsPresentations);
    return unitsPresentations;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('UnitsPresentation')
    .select('*')
    .eq('PresentationId', presentationId);
  
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
  unitsId: number, 
  presentationId: number
): Promise<UnitsPresentation | null> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'UnitsPresentation',
    method: 'getByUnitsAndPresentation',
    params: { unitsId, presentationId }
  };
  
  const cachedData = await cacheService.get<UnitsPresentation>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<UnitsPresentation>('UnitsPresentation');
  
  if (cachedCollection) {
    const unitsPresentation = cachedCollection.find(
      up => up.UnitsId === unitsId && up.PresentationId === presentationId
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
    .eq('UnitsId', unitsId)
    .eq('PresentationId', presentationId);
  
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
 */
export const getMostCommonUnitsPresentationByProductId = async (artiId: number): Promise<number | null> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'UnitsPresentation',
    method: 'getMostCommonByProductId',
    params: { artiId }
  };
  
  const cachedData = await cacheService.get<number>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Get all price observations for this product
  const priceObservations = await getDailyPriceObservationsByProduct(artiId);
  
  // If no observations found, return null
  if (!priceObservations || priceObservations.length === 0) {
    return null;
  }
  
  // Count occurrences of each UnitsPresentationId
  const counts = new Map<number, number>();
  
  for (const observation of priceObservations) {
    if (observation.UnitsPresentationId) {
      const currentCount = counts.get(observation.UnitsPresentationId) || 0;
      counts.set(observation.UnitsPresentationId, currentCount + 1);
    }
  }
  
  // If no UnitsPresentationId found in observations, return null
  if (counts.size === 0) {
    return null;
  }
  
  // Find the most frequent UnitsPresentationId
  let mostCommonId: number | null = null;
  let maxCount = 0;
  
  for (const [id, count] of counts.entries()) {
    if (count > maxCount) {
      mostCommonId = id;
      maxCount = count;
    }
  }
  
  // Cache the result before returning
  if (mostCommonId !== null) {
    await cacheService.set(cacheParams, mostCommonId);
  }
  
  return mostCommonId;
};