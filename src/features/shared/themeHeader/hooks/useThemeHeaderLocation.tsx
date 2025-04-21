// src/features/shared/themeHeader/hooks/useThemeHeaderLocation.tsx
import { useState, useEffect } from 'react';
import useLocationStore from '@/src/store/locationStore';
import { getMarketById } from '@/src/services/supabase/entities/mercado';
import { getDepartamentoById } from '@/src/services/supabase/entities/departamento';
import { getMunicipioById } from '@/src/services/supabase/entities/municipio';

interface UseThemeHeaderLocationResult {
  locationDisplayString: string;
  isLoading: boolean;
  error: Error | null;
}

export const useThemeHeaderLocation = (): UseThemeHeaderLocationResult => {
  const { currentLocationId, departmentId, municipalityId, locationName, departmentName, municipalityName } = useLocationStore();
  const [locationDisplayString, setLocationDisplayString] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        setIsLoading(true);
        
        // Check if we already have the complete info in the store
        if (locationName && departmentName && municipalityName) {
          // Format the display string: "Municipio, Departamento - Mercado"
          setLocationDisplayString(
            `${municipalityName}, ${departmentName} - ${locationName}`
          );
        } else if (currentLocationId) {
          // If we don't have complete info, fetch the market and related data
          const market = await getMarketById(currentLocationId);
          
          // Fetch municipio and departamento
          const [municipio, departamento] = await Promise.all([
            getMunicipioById(market.CodMunicipio),
            getDepartamentoById(market.CodDepartamento)
          ]);
          
          // Format the display string
          setLocationDisplayString(
            `${municipio.Municipio}, ${departamento.Departamento} - ${market.Mercado}`
          );
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching location details:', err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setLocationDisplayString('Ubicación no disponible');
        setIsLoading(false);
      }
    };
    
    fetchLocationDetails();
  }, [currentLocationId, departmentId, municipalityId, locationName, departmentName, municipalityName]);
  
  return {
    locationDisplayString,
    isLoading,
    error
  };
};

export default useThemeHeaderLocation;