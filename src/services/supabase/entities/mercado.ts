import supabase from '../client';
import cacheService from '../../cache';
import { getTTLForEntity } from '../../cache/utils/expiration';

export type Market = {
  fuenId: number;
  Mercado: string;
  Departamento: string;
  CodDepartamento: number;
  Municipio: string;
  CodMunicipio: number;
  Icon: string; // Added Icon field
};

/**
 * Get all markets, with cache support
 */
export const getMarkets = async (): Promise<Market[]> => {
  // Try to get from cache first
  const cachedData = await cacheService.getCollection<Market>('Mercado');
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Mercado')
    .select('*');
  
  if (error) throw error;
  
  // Store in cache before returning
  const markets = data as Market[];
  await cacheService.setCollection('Mercado', markets, getTTLForEntity('Mercado'));
  
  return markets;
};

/**
 * Get market by ID, with cache support
 */
export const getMarketById = async (fuenId: number): Promise<Market> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'Mercado',
    method: 'getById',
    params: { fuenId }
  };
  
  const cachedData = await cacheService.get<Market>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<Market>('Mercado');
  
  if (cachedCollection) {
    const market = cachedCollection.find(m => m.fuenId === fuenId);
    if (market) {
      // Cache the individual result as well
      await cacheService.set(cacheParams, market);
      return market;
    }
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Mercado')
    .select('*')
    .eq('fuenId', fuenId)
    .single();
  
  if (error) throw error;
  
  // Store in cache before returning
  const market = data as Market;
  await cacheService.set(cacheParams, market);
  
  return market;
};

/**
 * Get markets by municipio, with cache support
 */
export const getMarketsByMunicipio = async (codMunicipio: number): Promise<Market[]> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'Mercado',
    method: 'getByMunicipio',
    params: { codMunicipio }
  };
  
  const cachedData = await cacheService.get<Market[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<Market>('Mercado');
  
  if (cachedCollection) {
    const markets = cachedCollection.filter(m => m.CodMunicipio === codMunicipio);
    // Cache the filtered results
    await cacheService.set(cacheParams, markets);
    return markets;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Mercado')
    .select('*')
    .eq('CodMunicipio', codMunicipio);
  
  if (error) throw error;
  
  // Store in cache before returning
  const markets = data as Market[];
  await cacheService.set(cacheParams, markets);
  
  return markets;
};

/**
 * Get markets by departamento, with cache support
 */
export const getMarketsByDepartamento = async (codDepartamento: number): Promise<Market[]> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'Mercado',
    method: 'getByDepartamento',
    params: { codDepartamento }
  };
  
  const cachedData = await cacheService.get<Market[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<Market>('Mercado');
  
  if (cachedCollection) {
    const markets = cachedCollection.filter(m => m.CodDepartamento === codDepartamento);
    // Cache the filtered results
    await cacheService.set(cacheParams, markets);
    return markets;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Mercado')
    .select('*')
    .eq('CodDepartamento', codDepartamento);
  
  if (error) throw error;
  
  // Store in cache before returning
  const markets = data as Market[];
  await cacheService.set(cacheParams, markets);
  
  return markets;
};