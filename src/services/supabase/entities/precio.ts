// src/services/supabase/entities/prices.ts
import supabase from '../client';
import cacheService from '../../cache';
import { getTTLForEntity } from '../../cache/utils/expiration';

export type DailyPriceObservation = {
  id: number;
  date: string | null;
  artiId: number;
  fuenId: number;
  minPrice: number;
  maxPrice: number;
  UnitsPresentationId?: number;
  unitsId?: number;
  presentationId?: number;
};

/**
 * Get all daily price observations, with cache support
 */
export const getDailyPriceObservations = async (): Promise<DailyPriceObservation[]> => {
  // Try to get from cache first
  const cachedData = await cacheService.getCollection<DailyPriceObservation>('DailyProductPriceObservation');
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('DailyProductPriceObservation')
    .select('*');
  
  if (error) throw error;
  
  // Store in cache before returning
  const observations = data as DailyPriceObservation[];
  await cacheService.setCollection('DailyProductPriceObservation', observations, getTTLForEntity('DailyProductPriceObservation'));
  
  return observations;
};

/**
 * Get daily price observations by product, with cache support
 */
export const getDailyPriceObservationsByProduct = async (artiId: number): Promise<DailyPriceObservation[]> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'DailyProductPriceObservation',
    method: 'getByProduct',
    params: { artiId }
  };
  
  const cachedData = await cacheService.get<DailyPriceObservation[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('DailyProductPriceObservation')
    .select('*')
    .eq('artiId', artiId)
    .order('date', { ascending: false });
  
  if (error) throw error;
  
  // Store in cache before returning
  const observations = data as DailyPriceObservation[];
  await cacheService.set(cacheParams, observations);
  
  return observations;
};

/**
 * Get daily price observations by market, with cache support
 */
export const getDailyPriceObservationsByMarket = async (fuenId: number): Promise<DailyPriceObservation[]> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'DailyProductPriceObservation',
    method: 'getByMarket',
    params: { fuenId }
  };
  
  const cachedData = await cacheService.get<DailyPriceObservation[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('DailyProductPriceObservation')
    .select('*')
    .eq('fuenId', fuenId)
    .order('date', { ascending: false });
  
  if (error) throw error;
  
  // Store in cache before returning
  const observations = data as DailyPriceObservation[];
  await cacheService.set(cacheParams, observations);
  
  return observations;
};

/**
 * Get daily price observations by product and market, with cache support
 * and optional date range filtering
 */
export const getDailyPriceObservationsByProductAndMarket = async (
  artiId: number,
  fuenId: number,
  startDate?: Date,
  endDate?: Date
): Promise<DailyPriceObservation[]> => {
  // Prepare cache parameters
  const cacheParams = {
    entity: 'DailyProductPriceObservation',
    method: 'getByProductAndMarket',
    params: { 
      artiId,
      fuenId,
      startDate: startDate ? startDate.toISOString() : undefined,
      endDate: endDate ? endDate.toISOString() : undefined
    }
  };
  
  // Try to get from cache first
  const cachedData = await cacheService.get<DailyPriceObservation[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Start query
  let query = supabase
    .from('DailyProductPriceObservation')
    .select('*')
    .eq('artiId', artiId)
    .eq('fuenId', fuenId);
  
  // Add date filters if provided
  if (startDate) {
    query = query.gte('date', startDate.toISOString().split('T')[0]);
  }
  
  if (endDate) {
    query = query.lte('date', endDate.toISOString().split('T')[0]);
  }
  
  // Order by date
  query = query.order('date', { ascending: true });
  
  // Execute query
  const { data, error } = await query;
  
  if (error) throw error;
  
  // Store in cache before returning
  const observations = data as DailyPriceObservation[];
  await cacheService.set(cacheParams, observations);
  
  return observations;
};

/**
 * Get the latest daily price observation for a product and market, with cache support
 */
export const getLatestPriceObservation = async (
  artiId: number,
  fuenId: number
): Promise<DailyPriceObservation | null> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'DailyProductPriceObservation',
    method: 'getLatestByProductAndMarket',
    params: { artiId, fuenId }
  };
  
  const cachedData = await cacheService.get<DailyPriceObservation>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('DailyProductPriceObservation')
    .select('*')
    .eq('artiId', artiId)
    .eq('fuenId', fuenId)
    .order('date', { ascending: false })
    .limit(1);
  
  if (error) throw error;
  
  // If no results, return null
  if (!data || data.length === 0) {
    return null;
  }
  
  // Store in cache before returning
  const observation = data[0] as DailyPriceObservation;
  await cacheService.set(cacheParams, observation);
  
  return observation;
};

/**
 * Get the most recent price date for a product and units presentation
 */
export const getMostRecentPriceDateByProductAndUnitsPresentation = async (
  artiId: number,
  unitsPresentationId: number
): Promise<string | null> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'DailyProductPriceObservation',
    method: 'getMostRecentDateByProductAndUnitsPresentation',
    params: { artiId, unitsPresentationId }
  };
  
  const cachedData = await cacheService.get<string>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('DailyProductPriceObservation')
    .select('date')
    .eq('artiId', artiId)
    .eq('UnitsPresentationId', unitsPresentationId)
    .order('date', { ascending: false })
    .limit(1);
  
  if (error) throw error;
  
  // If no results, return null
  if (!data || data.length === 0 || !data[0].date) {
    return null;
  }
  
  // Store in cache before returning
  const mostRecentDate = data[0].date as string;
  await cacheService.set(cacheParams, mostRecentDate);
  
  return mostRecentDate;
};