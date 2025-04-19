import supabase from '../client';

export type Municipio = {
  CodMunicipio: number;
  Municipio: string;
  Departamento: string;
  CodDepartamento: number;
};

export const getMunicipios = async () => {
  const { data, error } = await supabase
    .from('Municipio')
    .select('*');
  
  if (error) throw error;
  return data as Municipio[];
};

export const getMunicipioById = async (codMunicipio: number) => {
  const { data, error } = await supabase
    .from('Municipio')
    .select('*')
    .eq('CodMunicipio', codMunicipio)
    .single();
  
  if (error) throw error;
  return data as Municipio;
};

export const getMunicipiosByDepartamento = async (codDepartamento: number) => {
  const { data, error } = await supabase
    .from('Municipio')
    .select('*')
    .eq('CodDepartamento', codDepartamento);
  
  if (error) throw error;
  return data as Municipio[];
};