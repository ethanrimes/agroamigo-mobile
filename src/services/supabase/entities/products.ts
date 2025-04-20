import supabase from '../client';
import cacheService from '../../cache';
import { getTTLForEntity } from '../../cache/utils/expiration';

export type Product = {
  artiId: number;
  artiNombre: string;
  keystring: string;
  MajorCategoryId: number;
  SubcategoryId: number;
  Icon: string; // Renamed from "icon" to "Icon"
};

/**
 * Get all products, with cache support
 */
export const getProducts = async (): Promise<Product[]> => {
  // Try to get from cache first
  const cachedData = await cacheService.getCollection<Product>('Producto');
  
  if (cachedData) {
    return cachedData;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Producto')
    .select('*');
  
  if (error) throw error;
  
  // Store in cache before returning
  const products = data as Product[];
  await cacheService.setCollection('Producto', products, getTTLForEntity('Producto'));
  
  return products;
};

/**
 * Get product by ID, with cache support
 */
export const getProductById = async (artiId: number): Promise<Product> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'Producto',
    method: 'getById',
    params: { artiId }
  };
  
  const cachedData = await cacheService.get<Product>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<Product>('Producto');
  
  if (cachedCollection) {
    const product = cachedCollection.find(p => p.artiId === artiId);
    if (product) {
      // Cache the individual result as well
      await cacheService.set(cacheParams, product);
      return product;
    }
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Producto')
    .select('*')
    .eq('artiId', artiId)
    .single();
  
  if (error) throw error;
  
  // Store in cache before returning
  const product = data as Product;
  await cacheService.set(cacheParams, product);
  
  return product;
};

/**
 * Get products by subcategory, with cache support
 */
export const getProductsBySubcategory = async (subcategoryId: number): Promise<Product[]> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'Producto',
    method: 'getBySubcategory',
    params: { subcategoryId }
  };
  
  const cachedData = await cacheService.get<Product[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<Product>('Producto');
  
  if (cachedCollection) {
    const products = cachedCollection.filter(p => p.SubcategoryId === subcategoryId);
    // Cache the filtered results
    await cacheService.set(cacheParams, products);
    return products;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Producto')
    .select('*')
    .eq('SubcategoryId', subcategoryId);
  
  if (error) throw error;
  
  // Store in cache before returning
  const products = data as Product[];
  await cacheService.set(cacheParams, products);
  
  return products;
};

/**
 * Get products by major category, with cache support
 */
export const getProductsByMajorCategory = async (majorCategoryId: number): Promise<Product[]> => {
  // Try to get from cache first
  const cacheParams = {
    entity: 'Producto',
    method: 'getByMajorCategory',
    params: { majorCategoryId }
  };
  
  const cachedData = await cacheService.get<Product[]>(cacheParams);
  
  if (cachedData) {
    return cachedData;
  }
  
  // Check if we have the full collection cached
  const cachedCollection = await cacheService.getCollection<Product>('Producto');
  
  if (cachedCollection) {
    const products = cachedCollection.filter(p => p.MajorCategoryId === majorCategoryId);
    // Cache the filtered results
    await cacheService.set(cacheParams, products);
    return products;
  }
  
  // If not in cache, fetch from API
  const { data, error } = await supabase
    .from('Producto')
    .select('*')
    .eq('MajorCategoryId', majorCategoryId);
  
  if (error) throw error;
  
  // Store in cache before returning
  const products = data as Product[];
  await cacheService.set(cacheParams, products);
  
  return products;
};