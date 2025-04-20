import supabase from '../client';
import cacheService from '../../cache';
import { getTTLForEntity } from '../../cache/utils/expiration';

export type Subcategory = {
  SubcategoryId: number;
  Subcategory: string;
  MajorCategoryId: number;
  Icon: string; // Added Icon field
};

/**
 * Get all subcategories, with cache support
 */
export const getSubcategories = async (): Promise<Subcategory[]> => {
  // Try to get from cache first
  const cachedData = await cacheService.getCollection<Subcategory>('Subcategory');
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Subcategory')
    .select('*');
  
  if (error) throw error;
  
  // Store in cache before returning
  const subcategories = data as Subcategory[];
  await cacheService.setCollection('Subcategory', subcategories, getTTLForEntity('Subcategory'));
  
  return subcategories;
};

/**
 * Get subcategory by ID, with cache support
 */
export const getSubcategoryById = async (subcategoryId: number): Promise<Subcategory> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'Subcategory',
    method: 'getById',
    params: { subcategoryId }
  };
  
  const cachedData = await cacheService.get<Subcategory>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<Subcategory>('Subcategory');
  
  if (cachedCollection) {
    const subcategory = cachedCollection.find(s => s.SubcategoryId === subcategoryId);
    if (subcategory) {
      // Cache the individual result as well
      await cacheService.set(cacheParams, subcategory);
      return subcategory;
    }
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Subcategory')
    .select('*')
    .eq('SubcategoryId', subcategoryId)
    .single();
  
  if (error) throw error;
  
  // Store in cache before returning
  const subcategory = data as Subcategory;
  await cacheService.set(cacheParams, subcategory);
  
  return subcategory;
};

/**
 * Get subcategories by major category, with cache support
 */
export const getSubcategoriesByMajorCategory = async (majorCategoryId: number): Promise<Subcategory[]> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'Subcategory',
    method: 'getByMajorCategory',
    params: { majorCategoryId }
  };
  
  const cachedData = await cacheService.get<Subcategory[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<Subcategory>('Subcategory');
  
  if (cachedCollection) {
    const subcategories = cachedCollection.filter(s => s.MajorCategoryId === majorCategoryId);
    // Cache the filtered results
    await cacheService.set(cacheParams, subcategories);
    return subcategories;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Subcategory')
    .select('*')
    .eq('MajorCategoryId', majorCategoryId);
  
  if (error) throw error;
  
  // Store in cache before returning
  const subcategories = data as Subcategory[];
  await cacheService.set(cacheParams, subcategories);
  
  return subcategories;
};