import supabase from '../client';
import cacheService from '../../cache';
import { getTTLForEntity } from '../../cache/utils/expiration';

export type Departamento = {
  CodDepartamento: number;
  Departamento: string;
  Icon: string; // Added Icon field
};

/**
 * Get all departamentos, with cache support
 */
export const getDepartamentos = async (): Promise<Departamento[]> => {
  // Try to get from cache first
  const cachedData = await cacheService.getCollection<Departamento>('Departamento');
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Departamento')
    .select('*');
  
  if (error) throw error;
  
  // Store in cache before returning
  const departamentos = data as Departamento[];
  await cacheService.setCollection('Departamento', departamentos, getTTLForEntity('Departamento'));
  
  return departamentos;
};

/**
 * Get departamento by ID, with cache support
 */
export const getDepartamentoById = async (codDepartamento: number): Promise<Departamento> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'Departamento',
    method: 'getById',
    params: { codDepartamento }
  };
  
  const cachedData = await cacheService.get<Departamento>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<Departamento>('Departamento');
  
  if (cachedCollection) {
    const departamento = cachedCollection.find(d => d.CodDepartamento === codDepartamento);
    if (departamento) {
      // Cache the individual result as well
      await cacheService.set(cacheParams, departamento);
      return departamento;
    }
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Departamento')
    .select('*')
    .eq('CodDepartamento', codDepartamento)
    .single();
  
  if (error) throw error;
  
  // Store in cache before returning
  const departamento = data as Departamento;
  await cacheService.set(cacheParams, departamento);
  
  return departamento;
};