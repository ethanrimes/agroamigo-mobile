import supabase from '../client';
import cacheService from '../../cache';
import { getTTLForEntity } from '../../cache/utils/expiration';

export type MajorCategory = {
  MajorCategoryId: number;
  MajorCategory: string;
};

/**
 * Get all major categories, with cache support
 */
export const getMajorCategories = async (): Promise<MajorCategory[]> => {
  // Try to get from cache first
  const cachedData = await cacheService.getCollection<MajorCategory>('MajorCategory');
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('MajorCategory')
    .select('*');
  
  if (error) throw error;
  
  // Store in cache before returning
  const majorCategories = data as MajorCategory[];
  await cacheService.setCollection('MajorCategory', majorCategories, getTTLForEntity('MajorCategory'));
  
  return majorCategories;
};

/**
 * Get major category by ID, with cache support
 */
export const getMajorCategoryById = async (majorCategoryId: number): Promise<MajorCategory> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'MajorCategory',
    method: 'getById',
    params: { majorCategoryId }
  };
  
  const cachedData = await cacheService.get<MajorCategory>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<MajorCategory>('MajorCategory');
  
  if (cachedCollection) {
    const majorCategory = cachedCollection.find(mc => mc.MajorCategoryId === majorCategoryId);
    if (majorCategory) {
      // Cache the individual result as well
      await cacheService.set(cacheParams, majorCategory);
      return majorCategory;
    }
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('MajorCategory')
    .select('*')
    .eq('MajorCategoryId', majorCategoryId)
    .single();
  
  if (error) throw error;
  
  // Store in cache before returning
  const majorCategory = data as MajorCategory;
  await cacheService.set(cacheParams, majorCategory);
  
  return majorCategory;
};