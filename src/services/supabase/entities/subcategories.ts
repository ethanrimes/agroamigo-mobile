import supabase from '../client';

export type Subcategory = {
  Subcategory_Id: number;
  Subcategory: string;
  MajorCategoryId: number;
};

export const getSubcategories = async () => {
  const { data, error } = await supabase
    .from('Subcategory')
    .select('*');
  
  if (error) throw error;
  return data as Subcategory[];
};

export const getSubcategoryById = async (subcategoryId: number) => {
  const { data, error } = await supabase
    .from('Subcategory')
    .select('*')
    .eq('Subcategory_Id', subcategoryId)
    .single();
  
  if (error) throw error;
  return data as Subcategory;
};

export const getSubcategoriesByMajorCategory = async (majorCategoryId: number) => {
  const { data, error } = await supabase
    .from('Subcategory')
    .select('*')
    .eq('MajorCategoryId', majorCategoryId);
  
  if (error) throw error;
  return data as Subcategory[];
};