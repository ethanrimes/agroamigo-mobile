// src/features/home/hooks/useFormattedLocation.ts
import React from 'react';
import { useLocationStore } from '@/src/store/locationStore';

export const useFormattedLocation = () => {
  const { 
    locationName, 
    municipalityName, 
    departmentName
  } = useLocationStore();
  
  // Format the location as "Ciudad, Departamento - Mercado"
  const formattedLocation = React.useMemo(() => {
    const ciudad = municipalityName || '';
    const departamento = departmentName || '';
    const mercado = locationName || '';
    
    // Build the string with conditional commas and dashes
    let result = '';
    
    if (ciudad) {
      result += ciudad;
    }
    
    if (departamento) {
      // Add comma if there's already a city
      if (result) {
        result += ', ';
      }
      result += departamento;
    }
    
    if (mercado) {
      // Add dash if there's already content
      if (result) {
        result += ' - ';
      }
      result += mercado;
    }
    
    return result || 'Ubicación no disponible';
  }, [locationName, municipalityName, departmentName]);
  
  return formattedLocation;
};

export default useFormattedLocation;