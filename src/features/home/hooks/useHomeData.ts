// src/features/home/hooks/useHomeData.ts
import { useState, useEffect } from 'react';

// Define types for our data models
interface PriceObservation {
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
}

interface Product {
  artiId: number;
  artiNombre: string;
  keystring: string;
  MajorCategoryId: number;
  SubcategoryId: number;
  icon: string;
}

// Combined type for the UI
interface SavedPriceItem {
  artiId: number;
  artiNombre: string;
  minPrice: number;
  maxPrice: number;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  origin?: string;
}

export const useHomeData = () => {
  const [savedPrices, setSavedPrices] = useState<SavedPriceItem[]>([]);
  const [featuredPriceData, setFeaturedPriceData] = useState<SavedPriceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use dummy data
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data for saved prices
        const mockSavedPrices: SavedPriceItem[] = [
          {
            artiId: 1,
            artiNombre: 'Tomate',
            minPrice: 2500,
            maxPrice: 3500,
            icon: 'cherry',
            trend: 'down',
            trendValue: '10%',
          },
          {
            artiId: 2,
            artiNombre: 'Cebolla',
            minPrice: 1800,
            maxPrice: 2200,
            icon: 'potato',
            trend: 'up',
            trendValue: '5%',
          },
          {
            artiId: 3,
            artiNombre: 'Zanahoria',
            minPrice: 1200,
            maxPrice: 1500,
            icon: 'carrot',
            trend: 'down',
            trendValue: '3%',
          },
          {
            artiId: 4,
            artiNombre: 'Papa',
            minPrice: 1000,
            maxPrice: 1300,
            icon: 'potato',
            trend: 'up',
            trendValue: '8%',
          },
          {
            artiId: 5,
            artiNombre: 'Manzana',
            minPrice: 3000,
            maxPrice: 4500,
            icon: 'apple',
            trend: 'down',
            trendValue: '15%',
            origin: 'Importada',
          },
          {
            artiId: 6,
            artiNombre: 'Pescado',
            minPrice: 12000,
            maxPrice: 15000,
            icon: 'fish',
            trend: 'neutral',
            trendValue: '0%',
          },
        ];
        
        // Mock data for featured prices
        const mockFeaturedPrices: SavedPriceItem[] = [
          {
            artiId: 5,
            artiNombre: 'Manzana',
            minPrice: 3000,
            maxPrice: 4500,
            icon: 'apple',
            trend: 'down',
            trendValue: '15%',
            origin: 'Importada',
          },
          {
            artiId: 7,
            artiNombre: 'Banana',
            minPrice: 2000,
            maxPrice: 2800,
            icon: 'banana',
            trend: 'up',
            trendValue: '7%',
            origin: 'Importada',
          },
          {
            artiId: 8,
            artiNombre: 'Carne',
            minPrice: 18000,
            maxPrice: 25000,
            icon: 'beef',
            trend: 'down',
            trendValue: '3%',
          },
        ];
        
        setSavedPrices(mockSavedPrices);
        setFeaturedPriceData(mockFeaturedPrices);
        setIsLoading(false);
      } catch (err) {
        setError('Error fetching home data');
        setIsLoading(false);
        console.error('Error fetching home data:', err);
      }
    };
    
    fetchHomeData();
  }, []);
  
  return {
    savedPrices,
    featuredPriceData,
    isLoading,
    error,
  };
};

export default useHomeData;