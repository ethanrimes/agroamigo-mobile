import supabase from '../client';

export type MajorCategory = {
  MajorCategoryId: number;
  MajorCategory: string;
};

export const getMajorCategories = async () => {
  const { data, error } = await supabase
    .from('MajorCategory')
    .select('*');
  
  if (error) throw error;
  return data as MajorCategory[];
};

export const getMajorCategoryById = async (majorCategoryId: number) => {
  const { data, error } = await supabase
    .from('MajorCategory')
    .select('*')
    .eq('MajorCategoryId', majorCategoryId)
    .single();
  
  if (error) throw error;
  return data as MajorCategory;
};