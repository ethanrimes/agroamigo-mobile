import supabase from '../client';

export type Presentation = {
  PresentationId: number;
  Presentation: string;
};

export const getPresentations = async () => {
  const { data, error } = await supabase
    .from('Presentation')
    .select('*');
  
  if (error) throw error;
  return data as Presentation[];
};

export const getPresentationById = async (presentationId: number) => {
  const { data, error } = await supabase
    .from('Presentation')
    .select('*')
    .eq('PresentationId', presentationId)
    .single();
  
  if (error) throw error;
  return data as Presentation;
};