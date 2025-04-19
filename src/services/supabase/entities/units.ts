import supabase from '../client';

export type Unit = {
  UnitsId: number;
  Units: string;
  Kilogramos: number; // Conversion factor to kilograms
};

export const getUnits = async () => {
  const { data, error } = await supabase
    .from('Units')
    .select('*');
  
  if (error) throw error;
  return data as Unit[];
};

export const getUnitById = async (unitsId: number) => {
  const { data, error } = await supabase
    .from('Units')
    .select('*')
    .eq('UnitsId', unitsId)
    .single();
  
  if (error) throw error;
  return data as Unit;
};