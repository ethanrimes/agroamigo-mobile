// src/features/shared/snapshot/hooks/useSnapshotLocation.ts
import { useState, useCallback, useEffect } from 'react';
import { useLocationStore } from '@/src/store/locationStore';
import { getMarketById } from '@/src/services/supabase/entities/mercado';
import { getDepartamentoById } from '@/src/services/supabase/entities/departamento';
import { getMunicipioById } from '@/src/services/supabase/entities/municipio';

interface LocationDetails {
  id: number;
  name: string;
  departmentId: number | null;
  departmentName: string | null;
  municipalityId: number | null;
  municipalityName: string | null;
}

export const useSnapshotLocation = () => {
  // Get initial location from the global store
  const globalLocation = useLocationStore();
  
  // Local state for this component
  const [location, setLocation] = useState<LocationDetails>({
    id: globalLocation.currentLocationId,
    name: globalLocation.locationName,
    departmentId: globalLocation.departmentId,
    departmentName: globalLocation.departmentName,
    municipalityId: globalLocation.municipalityId,
    municipalityName: globalLocation.municipalityName
  });
  
  // Initialize from the global store when the component mounts
  useEffect(() => {
    setLocation({
      id: globalLocation.currentLocationId,
      name: globalLocation.locationName,
      departmentId: globalLocation.departmentId,
      departmentName: globalLocation.departmentName,
      municipalityId: globalLocation.municipalityId,
      municipalityName: globalLocation.municipalityName
    });
  }, []);
  
  // Format location display
  const getLocationDisplay = useCallback(() => {
    if (location.municipalityName && location.departmentName) {
      return `${location.municipalityName}, ${location.departmentName} - CMA`;
    }
    return location.name || 'Ubicación';
  }, [location]);
  
  // Get initial market object for the dropdown
  const [initialMarket, setInitialMarket] = useState<any>(null);
  const [isLoadingMarket, setIsLoadingMarket] = useState(true);
  
  useEffect(() => {
    const fetchInitialMarket = async () => {
      try {
        setIsLoadingMarket(true);
        const market = await getMarketById(location.id);
        setInitialMarket(market);
      } catch (error) {
        console.error('Error fetching initial market:', error);
      } finally {
        setIsLoadingMarket(false);
      }
    };
    
    fetchInitialMarket();
  }, []);
  
  // Handle location change
  const setNewLocation = useCallback(async (item: any, type: string) => {
    try {
      // We only handle market selections
      if (type !== 'mercado') {
        console.warn('useSnapshotLocation - Only mercado type is supported for location setting');
        return;
      }
      
      // Get the market ID
      const marketId = item.fuenId;
      
      // Fetch additional details for a complete update
      const [municipio, departamento] = await Promise.all([
        getMunicipioById(item.CodMunicipio),
        getDepartamentoById(item.CodDepartamento)
      ]);
      
      // Update the local location state
      setLocation({
        id: marketId,
        name: item.Mercado,
        departmentId: item.CodDepartamento,
        departmentName: departamento.Departamento,
        municipalityId: item.CodMunicipio,
        municipalityName: municipio.Municipio
      });
      
      console.log(`Snapshot location updated to: ${municipio.Municipio}, ${departamento.Departamento} - ${item.Mercado}`);
    } catch (error) {
      console.error('Error updating snapshot location:', error);
    }
  }, []);
  
  return {
    location,
    locationDisplayString: getLocationDisplay(),
    initialMarket,
    isLoadingMarket,
    setNewLocation
  };
};

export default useSnapshotLocation;