import supabase from '../client';

export type Product = {
  artiId: number;
  artiNombre: string;
  keystring: string;
  MajorCategoryId: number;
  SubcategoryId: number;
  icon: string;
};

export const getProducts = async () => {
  const { data, error } = await supabase
    .from('Producto')
    .select('*');
  
  if (error) throw error;
  return data as Product[];
};

export const getProductById = async (artiId: number) => {
  const { data, error } = await supabase
    .from('Producto')
    .select('*')
    .eq('artiId', artiId)
    .single();
  
  if (error) throw error;
  return data as Product;
};

export const getProductsBySubcategory = async (subcategoryId: number) => {
  const { data, error } = await supabase
    .from('Producto')
    .select('*')
    .eq('SubcategoryId', subcategoryId);
  
  if (error) throw error;
  return data as Product[];
};

export const getProductsByMajorCategory = async (majorCategoryId: number) => {
  const { data, error } = await supabase
    .from('Producto')
    .select('*')
    .eq('MajorCategoryId', majorCategoryId);
  
  if (error) throw error;
  return data as Product[];
};