// src/features/settings/hooks/useLocationSetting.ts
import { useCallback } from 'react';
import useLocationStore from '@/src/store/locationStore';
import { getMarketById } from '@/src/services/supabase/entities/mercado';
import { getDepartamentoById } from '@/src/services/supabase/entities/departamento';
import { getMunicipioById } from '@/src/services/supabase/entities/municipio';

interface UseLocationSettingResult {
  currentLocationId: number;
  setNewLocation: (item: any, type: string) => Promise<void>;
}

export const useLocationSetting = (): UseLocationSettingResult => {
  const { currentLocationId, setLocation, setLocationDetails } = useLocationStore();
  
  const setNewLocation = useCallback(async (item: any, type: string) => {
    try {
      // We only handle market selections
      if (type !== 'mercado') {
        console.warn('useLocationSetting - Only mercado type is supported for location setting');
        return;
      }
      
      // Get the market ID
      const marketId = item.fuenId;
      
      // Update the location ID in the store
      setLocation(marketId);
      
      // Fetch additional details for a complete update
      const [municipio, departamento] = await Promise.all([
        getMunicipioById(item.CodMunicipio),
        getDepartamentoById(item.CodDepartamento)
      ]);
      
      // Update the location details in the store
      setLocationDetails({
        name: item.Mercado,
        departmentId: item.CodDepartamento,
        departmentName: departamento.Departamento,
        municipalityId: item.CodMunicipio,
        municipalityName: municipio.Municipio
      });
      
      console.log(`Location updated to: ${municipio.Municipio}, ${departamento.Departamento} - ${item.Mercado}`);
    } catch (error) {
      console.error('Error updating location:', error);
      // Could add error handling/user notification here
    }
  }, [setLocation, setLocationDetails]);
  
  return {
    currentLocationId,
    setNewLocation
  };
};

export default useLocationSetting;