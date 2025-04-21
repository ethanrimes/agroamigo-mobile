import supabase from '../client';
import cacheService from '../../cache';
import { getTTLForEntity } from '../../cache/utils/expiration';

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