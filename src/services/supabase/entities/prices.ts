import supabase from '../client';

export type DailyPriceObservation = {
  dailyPriceObsId: number;
  minPrice: number;
  maxPrice: number;
  artiId: number;
  SubcategoryId: number;
  MajorCategoryId: number;
  fuenId: number;
  CodMunicipio: number;
  CodDepartamento: number;
  PresentationId: number;
  UnitsId: number;
  date?: string; // Assuming there might be a date field
};

export const getDailyPriceObservations = async () => {
  const { data, error } = await supabase
    .from('DailyProductPriceObservation')
    .select('*');
  
  if (error) throw error;
  return data as DailyPriceObservation[];
};

export const getDailyPriceObservationById = async (dailyPriceObsId: number) => {
  const { data, error } = await supabase
    .from('DailyProductPriceObservation')
    .select('*')
    .eq('dailyPriceObsId', dailyPriceObsId)
    .single();
  
  if (error) throw error;
  return data as DailyPriceObservation;
};

export const getDailyPriceObservationsByProduct = async (artiId: number) => {
  const { data, error } = await supabase
    .from('DailyProductPriceObservation')
    .select('*')
    .eq('artiId', artiId);
  
  if (error) throw error;
  return data as DailyPriceObservation[];
};

export const getDailyPriceObservationsByMarket = async (fuenId: number) => {
  const { data, error } = await supabase
    .from('DailyProductPriceObservation')
    .select('*')
    .eq('fuenId', fuenId);
  
  if (error) throw error;
  return data as DailyPriceObservation[];
};

export const getDailyPriceObservationsByLocation = async (
  codDepartamento: number,
  codMunicipio?: number
) => {
  let query = supabase
    .from('DailyProductPriceObservation')
    .select('*')
    .eq('CodDepartamento', codDepartamento);
  
  if (codMunicipio) {
    query = query.eq('CodMunicipio', codMunicipio);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data as DailyPriceObservation[];
};

export const getDailyPriceObservationsForProductInLocation = async (
  artiId: number,
  codDepartamento: number,
  codMunicipio?: number
) => {
  let query = supabase
    .from('DailyProductPriceObservation')
    .select('*')
    .eq('artiId', artiId)
    .eq('CodDepartamento', codDepartamento);
  
  if (codMunicipio) {
    query = query.eq('CodMunicipio', codMunicipio);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data as DailyPriceObservation[];
};