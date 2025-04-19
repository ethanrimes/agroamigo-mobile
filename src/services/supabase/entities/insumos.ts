import supabase from '../client';

// Using the same structure as Products since the schema wasn't provided for insumos
// Modify as needed when you have the actual structure
// export type Insumo = {
//   artiId: number;
//   artiNombre: string;
//   keystring: string;
//   MajorCategoryId: number;
//   SubcategoryId: number;
//   icon: string;
// };

// export const getInsumos = async () => {
//   const { data, error } = await supabase
//     .from('Insumo')
//     .select('*');
  
//   if (error) throw error;
//   return data as Insumo[];
// };

// export const getInsumoById = async (artiId: number) => {
//   const { data, error } = await supabase
//     .from('Insumo')
//     .select('*')
//     .eq('artiId', artiId)
//     .single();
  
//   if (error) throw error;
//   return data as Insumo;
// };

// export const getInsumosBySubcategory = async (subcategoryId: number) => {
//   const { data, error } = await supabase
//     .from('Insumo')
//     .select('*')
//     .eq('SubcategoryId', subcategoryId);
  
//   if (error) throw error;
//   return data as Insumo[];
// };

// export const getInsumosByMajorCategory = async (majorCategoryId: number) => {
//   const { data, error } = await supabase
//     .from('Insumo')
//     .select('*')
//     .eq('MajorCategoryId', majorCategoryId);
  
//   if (error) throw error;
//   return data as Insumo[];
// };