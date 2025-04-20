import cacheService from '../cache';
import { getTTLForEntity } from '../cache/utils/expiration';

// Import all entity services that need to be initialized
import { getDepartamentos } from '@/src/services/supabase/entities/departamento';
import { getMajorCategories } from '@/src/services/supabase/entities/majorCategories';
import { getMarkets } from '@/src/services/supabase/entities/mercado';
import { getMunicipios } from '@/src/services/supabase/entities/municipio';
import { getPresentations } from '@/src/services/supabase/entities/presentation';
import { getProducts } from '@/src/services/supabase/entities/producto';
import { getSubcategories } from '@/src/services/supabase/entities/subcategories';
import { getUnits } from '@/src/services/supabase/entities/units';

/**
 * Initialize the cache with all static data
 * This should be called on app startup
 */
export async function initializeCache(): Promise<void> {
  try {
    console.log('Initializing data cache...');
    
    // Execute all initialization tasks in parallel for better performance
    await Promise.all([
      initializeDepartamentos(),
      initializeMajorCategories(),
      initializeMarkets(),
      initializeMunicipios(),
      initializePresentations(),
      initializeProducts(),
      initializeSubcategories(),
      initializeUnits()
    ]);
    
    console.log('Data cache initialization completed');
  } catch (error) {
    console.error('Error initializing cache:', error);
    // Don't throw here to prevent app crash on startup
    // The app can still function by fetching data as needed
  }
}

// Individual initialization functions for each entity

async function initializeDepartamentos(): Promise<void> {
  try {
    const data = await getDepartamentos();
    await cacheService.setCollection('Departamento', data, getTTLForEntity('Departamento'));
  } catch (error) {
    console.error('Error initializing Departamentos cache:', error);
  }
}

async function initializeMajorCategories(): Promise<void> {
  try {
    const data = await getMajorCategories();
    await cacheService.setCollection('MajorCategory', data, getTTLForEntity('MajorCategory'));
  } catch (error) {
    console.error('Error initializing MajorCategories cache:', error);
  }
}

async function initializeMarkets(): Promise<void> {
  try {
    const data = await getMarkets();
    await cacheService.setCollection('Mercado', data, getTTLForEntity('Mercado'));
  } catch (error) {
    console.error('Error initializing Markets cache:', error);
  }
}

async function initializeMunicipios(): Promise<void> {
  try {
    const data = await getMunicipios();
    await cacheService.setCollection('Municipio', data, getTTLForEntity('Municipio'));
  } catch (error) {
    console.error('Error initializing Municipios cache:', error);
  }
}

async function initializePresentations(): Promise<void> {
  try {
    const data = await getPresentations();
    await cacheService.setCollection('Presentation', data, getTTLForEntity('Presentation'));
  } catch (error) {
    console.error('Error initializing Presentations cache:', error);
  }
}

async function initializeProducts(): Promise<void> {
  try {
    const data = await getProducts();
    await cacheService.setCollection('Producto', data, getTTLForEntity('Producto'));
  } catch (error) {
    console.error('Error initializing Products cache:', error);
  }
}

async function initializeSubcategories(): Promise<void> {
  try {
    const data = await getSubcategories();
    await cacheService.setCollection('Subcategory', data, getTTLForEntity('Subcategory'));
  } catch (error) {
    console.error('Error initializing Subcategories cache:', error);
  }
}

async function initializeUnits(): Promise<void> {
  try {
    const data = await getUnits();
    await cacheService.setCollection('Units', data, getTTLForEntity('Units'));
  } catch (error) {
    console.error('Error initializing Units cache:', error);
  }
}