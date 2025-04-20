import supabase from '../client';
import cacheService from '../../cache';
import { getTTLForEntity } from '../../cache/utils/expiration';

export type Municipio = {
  CodMunicipio: number;
  Municipio: string;
  Departamento: string;
  CodDepartamento: number;
  Icon: string; // Added Icon field
};

/**
 * Get all municipios, with cache support
 */
export const getMunicipios = async (): Promise<Municipio[]> => {
  // Try to get from cache first
  const cachedData = await cacheService.getCollection<Municipio>('Municipio');
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Municipio')
    .select('*');
  
  if (error) throw error;
  
  // Store in cache before returning
  const municipios = data as Municipio[];
  await cacheService.setCollection('Municipio', municipios, getTTLForEntity('Municipio'));
  
  return municipios;
};

/**
 * Get municipio by ID, with cache support
 */
export const getMunicipioById = async (codMunicipio: number): Promise<Municipio> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'Municipio',
    method: 'getById',
    params: { codMunicipio }
  };
  
  const cachedData = await cacheService.get<Municipio>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<Municipio>('Municipio');
  
  if (cachedCollection) {
    const municipio = cachedCollection.find(m => m.CodMunicipio === codMunicipio);
    if (municipio) {
      // Cache the individual result as well
      await cacheService.set(cacheParams, municipio);
      return municipio;
    }
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Municipio')
    .select('*')
    .eq('CodMunicipio', codMunicipio)
    .single();
  
  if (error) throw error;
  
  // Store in cache before returning
  const municipio = data as Municipio;
  await cacheService.set(cacheParams, municipio);
  
  return municipio;
};

/**
 * Get municipios by departamento, with cache support
 */
export const getMunicipiosByDepartamento = async (codDepartamento: number): Promise<Municipio[]> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'Municipio',
    method: 'getByDepartamento',
    params: { codDepartamento }
  };
  
  const cachedData = await cacheService.get<Municipio[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<Municipio>('Municipio');
  
  if (cachedCollection) {
    const municipios = cachedCollection.filter(m => m.CodDepartamento === codDepartamento);
    // Cache the filtered results
    await cacheService.set(cacheParams, municipios);
    return municipios;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Municipio')
    .select('*')
    .eq('CodDepartamento', codDepartamento);
  
  if (error) throw error;
  
  // Store in cache before returning
  const municipios = data as Municipio[];
  await cacheService.set(cacheParams, municipios);
  
  return municipios;
};