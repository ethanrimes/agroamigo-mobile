import supabase from '../client';
import cacheService from '../../cache';
import { getTTLForEntity } from '../../cache/utils/expiration';

export type Unit = {
  UnitsId: number;
  Units: string;
  Kilogramos: number; // Conversion factor to kilograms
};

/**
 * Get all units, with cache support
 */
export const getUnits = async (): Promise<Unit[]> => {
  // Try to get from cache first
  const cachedData = await cacheService.getCollection<Unit>('Units');
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Units')
    .select('*');
  
  if (error) throw error;
  
  // Store in cache before returning
  const units = data as Unit[];
  await cacheService.setCollection('Units', units, getTTLForEntity('Units'));
  
  return units;
};

/**
 * Get unit by ID, with cache support
 */
export const getUnitById = async (UnitsId: number): Promise<Unit> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'Units',
    method: 'getById',
    params: { UnitsId }
  };
  
  const cachedData = await cacheService.get<Unit>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<Unit>('Units');
  
  if (cachedCollection) {
    const unit = cachedCollection.find(u => u.UnitsId === UnitsId);
    if (unit) {
      // Cache the individual result as well
      await cacheService.set(cacheParams, unit);
      return unit;
    }
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Units')
    .select('*')
    .eq('UnitsId', UnitsId)
    .single();
  
  if (error) throw error;
  
  // Store in cache before returning
  const unit = data as Unit;
  await cacheService.set(cacheParams, unit);
  
  return unit;
};