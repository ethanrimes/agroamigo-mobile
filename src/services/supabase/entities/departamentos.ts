import supabase from '../client';

export type Departamento = {
  CodDepartamento: number;
  Departamento: string;
};

export const getDepartamentos = async () => {
  const { data, error } = await supabase
    .from('Departamento')
    .select('*');
  
  if (error) throw error;
  return data as Departamento[];
};

export const getDepartamentoById = async (codDepartamento: number) => {
  const { data, error } = await supabase
    .from('Departamento')
    .select('*')
    .eq('CodDepartamento', codDepartamento)
    .single();
  
  if (error) throw error;
  return data as Departamento;
};