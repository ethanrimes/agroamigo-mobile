import supabase from '../client';

export type Market = {
  fuenId: number;
  Mercado: string;
  Departamento: string;
  CodDepartamento: number;
  Municipio: string;
  CodMunicipio: number;
};

export const getMarkets = async () => {
  const { data, error } = await supabase
    .from('Mercado')
    .select('*');
  
  if (error) throw error;
  return data as Market[];
};

export const getMarketById = async (fuenId: number) => {
  const { data, error } = await supabase
    .from('Mercado')
    .select('*')
    .eq('fuenId', fuenId)
    .single();
  
  if (error) throw error;
  return data as Market;
};

export const getMarketsByMunicipio = async (codMunicipio: number) => {
  const { data, error } = await supabase
    .from('Mercado')
    .select('*')
    .eq('CodMunicipio', codMunicipio);
  
  if (error) throw error;
  return data as Market[];
};

export const getMarketsByDepartamento = async (codDepartamento: number) => {
  const { data, error } = await supabase
    .from('Mercado')
    .select('*')
    .eq('CodDepartamento', codDepartamento);
  
  if (error) throw error;
  return data as Market[];
};