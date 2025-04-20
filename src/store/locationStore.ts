// src/store/locationStore.ts
import { create } from 'zustand';

interface LocationState {
  // Current market ID (fuenId)
  currentLocationId: number;
  
  // Location details
  locationName: string;
  departmentId: number | null;
  departmentName: string | null;
  municipalityId: number | null;
  municipalityName: string | null;
  
  // Actions
  setLocation: (locationId: number) => void;
  setLocationDetails: (details: {
    name: string;
    departmentId?: number;
    departmentName?: string;
    municipalityId?: number;
    municipalityName?: string;
  }) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  // Initial state - using fixed value 56 as specified
  currentLocationId: 56,
  locationName: "CMA Medellín",
  departmentId: 5,
  departmentName: "Antioquia",
  municipalityId: 5001,
  municipalityName: "Medellín",
  
  // Actions
  setLocation: (locationId) => {
    set({
      currentLocationId: locationId,
    });
    console.log('locationStore - Location updated to:', locationId);
  },
  
  setLocationDetails: (details) => {
    set({
      locationName: details.name,
      departmentId: details.departmentId || null,
      departmentName: details.departmentName || null,
      municipalityId: details.municipalityId || null,
      municipalityName: details.municipalityName || null,
    });
    console.log('locationStore - Location details updated');
  },
}));

export default useLocationStore;