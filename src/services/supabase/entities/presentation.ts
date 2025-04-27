import supabase from '../client';
import cacheService from '../../cache';
import { getTTLForEntity } from '../../cache/utils/expiration';

export type Presentation = {
  PresentationId: number;
  Presentation: string;
};

/**
 * Get all presentations, with cache support
 */
export const getPresentations = async (): Promise<Presentation[]> => {
  // Try to get from cache first
  const cachedData = await cacheService.getCollection<Presentation>('Presentation');
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Presentation')
    .select('*');
  
  if (error) throw error;
  
  // Store in cache before returning
  const presentations = data as Presentation[];
  await cacheService.setCollection('Presentation', presentations, getTTLForEntity('Presentation'));
  
  return presentations;
};

/**
 * Get presentation by ID, with cache support
 */
export const getPresentationById = async (PresentationId: number): Promise<Presentation> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'Presentation',
    method: 'getById',
    params: { PresentationId }
  };
  
  const cachedData = await cacheService.get<Presentation>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<Presentation>('Presentation');
  
  if (cachedCollection) {
    const presentation = cachedCollection.find(p => p.PresentationId === PresentationId);
    if (presentation) {
      // Cache the individual result as well
      await cacheService.set(cacheParams, presentation);
      return presentation;
    }
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Presentation')
    .select('*')
    .eq('PresentationId', PresentationId)
    .single();
  
  if (error) throw error;
  
  // Store in cache before returning
  const presentation = data as Presentation;
  await cacheService.set(cacheParams, presentation);
  
  return presentation;
};