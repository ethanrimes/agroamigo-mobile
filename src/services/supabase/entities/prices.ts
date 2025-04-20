import supabase from '../client';
import cacheService from '../../cache';
import { getTTLForEntity } from '../../cache/utils/expiration';

export type DailyPriceObservation = {
  dailyPriceObsId: number;
  minPrice: number;
  maxPrice: number;
  artiId: number;
  SubcategoryId: number;
  MajorCategoryId: number;
  fuenId: number;
  CodMunicipio: number;
  CodDepartamento: number;
  PresentationId: number;
  UnitsId: number;
  date?: string; // Assuming there might be a date field
};

/**
 * Get all daily price observations
 * Note: This does NOT load into cache on initialization due to potentially large volume
 */
export const getDailyPriceObservations = async (): Promise<DailyPriceObservation[]> => {
  // Try to get from cache first, but with very short TTL due to high volume
  const cacheParams = {
    entity: 'DailyProductPriceObservation',
    method: 'getAll',
    params: {}
  };
  
  const cachedData = await cacheService.get<DailyPriceObservation[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('DailyProductPriceObservation')
    .select('*');
  
  if (error) throw error;
  
  // Store in cache before returning, with shorter TTL
  const observations = data as DailyPriceObservation[];
  await cacheService.set(cacheParams, observations);
  
  return observations;
};

/**
 * Get daily price observation by ID, with cache support
 */
export const getDailyPriceObservationById = async (dailyPriceObsId: number): Promise<DailyPriceObservation> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'DailyProductPriceObservation',
    method: 'getById',
    params: { dailyPriceObsId }
  };
  
  const cachedData = await cacheService.get<DailyPriceObservation>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('DailyProductPriceObservation')
    .select('*')
    .eq('dailyPriceObsId', dailyPriceObsId)
    .single();
  
  if (error) throw error;
  
  // Store in cache before returning
  const observation = data as DailyPriceObservation;
  await cacheService.set(cacheParams, observation);
  
  return observation;
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
    .eq('artiId', artiId);
  
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
    .eq('fuenId', fuenId);
  
  if (error) throw error;
  
  // Store in cache before returning
  const observations = data as DailyPriceObservation[];
  await cacheService.set(cacheParams, observations);
  
  return observations;
};

/**
 * Get daily price observations by location, with cache support
 */
export const getDailyPriceObservationsByLocation = async (
  codDepartamento: number,
  codMunicipio?: number
): Promise<DailyPriceObservation[]> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'DailyProductPriceObservation',
    method: 'getByLocation',
    params: { codDepartamento, codMunicipio }
  };
  
  const cachedData = await cacheService.get<DailyPriceObservation[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  let query = supabase
    .from('DailyProductPriceObservation')
    .select('*')
    .eq('CodDepartamento', codDepartamento);
  
  if (codMunicipio) {
    query = query.eq('CodMunicipio', codMunicipio);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  // Store in cache before returning
  const observations = data as DailyPriceObservation[];
  await cacheService.set(cacheParams, observations);
  
  return observations;
};

/**
 * Get daily price observations for a product in a specific location, with cache support
 */
export const getDailyPriceObservationsForProductInLocation = async (
  artiId: number,
  codDepartamento: number,
  codMunicipio?: number
): Promise<DailyPriceObservation[]> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'DailyProductPriceObservation',
    method: 'getForProductInLocation',
    params: { artiId, codDepartamento, codMunicipio }
  };
  
  const cachedData = await cacheService.get<DailyPriceObservation[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  let query = supabase
    .from('DailyProductPriceObservation')
    .select('*')
    .eq('artiId', artiId)
    .eq('CodDepartamento', codDepartamento);
  
  if (codMunicipio) {
    query = query.eq('CodMunicipio', codMunicipio);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  // Store in cache before returning
  const observations = data as DailyPriceObservation[];
  await cacheService.set(cacheParams, observations);
  
  return observations;
};