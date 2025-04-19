import supabase from './client';

// Re-export the Supabase client
export { supabase };

// Import all entity operations from the entities folder
import * as Markets from './entities/markets';
import * as Municipios from './entities/municipios';
import * as Departamentos from './entities/departamentos';
import * as Products from './entities/products';
import * as MajorCategories from './entities/majorCategories';
import * as Subcategories from './entities/subcategories';
import * as Prices from './entities/prices';
import * as Presentations from './entities/presentations';
import * as Units from './entities/units';
import * as Insumos from './entities/insumos';

// Export all entity operations
export {
  Markets,
  Municipios,
  Departamentos,
  Products,
  MajorCategories,
  Subcategories,
  Prices,
  Presentations,
  Units,
  Insumos,
};

// Export entity types
export type { Market } from './entities/markets';
export type { Municipio } from './entities/municipios';
export type { Departamento } from './entities/departamentos';
export type { Product } from './entities/products';
export type { MajorCategory } from './entities/majorCategories';
export type { Subcategory } from './entities/subcategories';
export type { DailyPriceObservation } from './entities/prices';
export type { Presentation } from './entities/presentations';
export type { Unit } from './entities/units';
// export type { Insumo } from './entities/insumos';

// Convenience function to get all data for a specific product
export const getProductWithRelatedData = async (artiId: number) => {
  const product = await Products.getProductById(artiId);
  const subcategory = await Subcategories.getSubcategoryById(product.SubcategoryId);
  const majorCategory = await MajorCategories.getMajorCategoryById(product.MajorCategoryId);
  
  return {
    ...product,
    subcategory,
    majorCategory,
  };
};

// Convenience function to get price observations with related data
export const getPriceObservationsWithDetails = async (filters: {
  artiId?: number;
  fuenId?: number;
  codDepartamento?: number;
  codMunicipio?: number;
}) => {
  let query = supabase.from('DailyProductPriceObservation').select('*');

  if (filters.artiId) query = query.eq('artiId', filters.artiId);
  if (filters.fuenId) query = query.eq('fuenId', filters.fuenId);
  if (filters.codDepartamento) query = query.eq('CodDepartamento', filters.codDepartamento);
  if (filters.codMunicipio) query = query.eq('CodMunicipio', filters.codMunicipio);

  const { data, error } = await query;
  
  if (error) throw error;
  
  // Return price observations with relevant details
  const priceObservations = await Promise.all(
    (data as Prices.DailyPriceObservation[]).map(async (observation) => {
      const product = await Products.getProductById(observation.artiId);
      const presentation = await Presentations.getPresentationById(observation.PresentationId);
      const unit = await Units.getUnitById(observation.UnitsId);
      const market = await Markets.getMarketById(observation.fuenId);
      
      return {
        ...observation,
        product,
        presentation,
        unit,
        market,
      };
    })
  );
  
  return priceObservations;
};