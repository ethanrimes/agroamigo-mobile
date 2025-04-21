// src/features/home/hooks/useHomeData.ts
import { useState, useEffect, useMemo } from 'react';
import { useHomeActions, SavedPriceItem, FeaturedPriceItem } from './useHomeActions';
import { getProductById } from '@/src/services/supabase/entities/producto';
import { 
  getDailyPriceObservationsByProduct,
  getDailyPriceObservationsByProductAndMarket 
} from '@/src/services/supabase/entities/precio';
import { getUnitsPresentationById } from '@/src/services/supabase/entities/unitsPresentation';
import { useLocationStore } from '@/src/store/locationStore';

// UI data model for saved prices and featured prices
export interface PriceDisplayItem {
  artiId: number;
  artiNombre: string;
  minPrice: number;
  maxPrice: number;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  origin?: string;
  unitsPresentationName?: string;
}

// Hook to get data for the saved prices
export const useSavedPricesData = () => {
  const { savedPrices, isLoading: isLoadingActions } = useHomeActions();
  const [priceItems, setPriceItems] = useState<PriceDisplayItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentLocationId } = useLocationStore();

  useEffect(() => {
    const fetchPriceData = async () => {
      if (isLoadingActions || savedPrices.length === 0) return;

      try {
        setIsLoading(true);
        
        const priceDisplayItems = await Promise.all(
          savedPrices.map(async (item): Promise<PriceDisplayItem> => {
            try {
              // Fetch product details
              const product = await getProductById(item.artiId);
              
              // Fetch the units presentation name
              const unitsPresentation = await getUnitsPresentationById(item.UnitsPresentationId);
              
              // Fetch the recent price observations filtered by product AND market
              const priceObservations = await getDailyPriceObservationsByProductAndMarket(
                item.artiId,
                currentLocationId
              );
              
              // If no observations for the current market, fallback to any available data
              let sortedObservations = priceObservations;
              
              if (!sortedObservations || sortedObservations.length === 0) {
                console.log(`No observations for product ${item.artiId} in market ${currentLocationId}, fetching any available data`);
                const allObservations = await getDailyPriceObservationsByProduct(item.artiId);
                sortedObservations = allObservations;
              }
              
              // Sort by date descending to get most recent first
              sortedObservations = sortedObservations.sort((a, b) => {
                if (!a.date || !b.date) return 0;
                return new Date(b.date).getTime() - new Date(a.date).getTime();
              });
              
              // Get the most recent observation
              const latestObservation = sortedObservations[0];
              
              // Get the previous observation for trend comparison
              const previousObservation = sortedObservations[1];
              
              // Calculate trend percentage
              let trendValue = '0%';
              let trend: 'up' | 'down' | 'neutral' = 'neutral';
              
              if (latestObservation && previousObservation) {
                // Calculate average prices
                const latestAvg = (latestObservation.minPrice + latestObservation.maxPrice) / 2;
                const prevAvg = (previousObservation.minPrice + previousObservation.maxPrice) / 2;
                
                // Calculate percentage change
                const percentChange = ((latestAvg - prevAvg) / prevAvg) * 100;
                
                // Determine trend direction
                if (percentChange > 0) {
                  trend = 'up';
                } else if (percentChange < 0) {
                  trend = 'down';
                }
                
                // Format trend value as percentage
                trendValue = `${Math.abs(percentChange).toFixed(1)}%`;
              }
              
              return {
                artiId: item.artiId,
                artiNombre: product.artiNombre,
                minPrice: latestObservation?.minPrice || 0,
                maxPrice: latestObservation?.maxPrice || 0,
                icon: item.icon,
                trend,
                trendValue,
                unitsPresentationName: unitsPresentation?.Name,
              };
            } catch (err) {
              console.error(`Error fetching price data for product ${item.artiId}:`, err);
              // Return a default object if there's an error
              return {
                artiId: item.artiId,
                artiNombre: 'Product unavailable',
                minPrice: 0,
                maxPrice: 0,
                icon: item.icon || 'package',
                trend: 'neutral',
                trendValue: '0%',
              };
            }
          })
        );
        
        setPriceItems(priceDisplayItems);
      } catch (err) {
        setError('Error fetching price data');
        console.error('Error fetching price data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPriceData();
  }, [savedPrices, isLoadingActions, currentLocationId]);  // Add currentLocationId dependency
  
  return {
    savedPrices: priceItems,
    isLoading: isLoading || isLoadingActions,
    error,
  };
};

// Hook to get data for the featured price
export const useFeaturedPriceData = () => {
  const { featuredPriceItem, isLoading: isLoadingActions } = useHomeActions();
  const [featuredPriceData, setFeaturedPriceData] = useState<PriceDisplayItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentLocationId } = useLocationStore();
  
  useEffect(() => {
    const fetchFeaturedPriceData = async () => {
      if (isLoadingActions || !featuredPriceItem) return;
      
      try {
        setIsLoading(true);
        
        // Fetch product details
        const product = await getProductById(featuredPriceItem.artiId);
        
        // Fetch the units presentation name
        const unitsPresentation = await getUnitsPresentationById(featuredPriceItem.UnitsPresentationId);
        
        // Fetch the recent price observations filtered by product AND market
        const priceObservations = await getDailyPriceObservationsByProductAndMarket(
          featuredPriceItem.artiId,
          currentLocationId
        );
        
        // If no observations for the current market, fallback to any available data
        let sortedObservations = priceObservations;
        
        if (!sortedObservations || sortedObservations.length === 0) {
          console.log(`No observations for featured product ${featuredPriceItem.artiId} in market ${currentLocationId}, fetching any available data`);
          const allObservations = await getDailyPriceObservationsByProduct(featuredPriceItem.artiId);
          sortedObservations = allObservations;
        }
        
        // Sort by date descending to get most recent first
        sortedObservations = sortedObservations.sort((a, b) => {
          if (!a.date || !b.date) return 0;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        
        // Get the most recent observation
        const latestObservation = sortedObservations[0];
        
        // Get the previous observation for trend comparison
        const previousObservation = sortedObservations[1];
        
        // Calculate trend percentage
        let trendValue = '0%';
        let trend: 'up' | 'down' | 'neutral' = 'neutral';
        
        if (latestObservation && previousObservation) {
          // Calculate average prices
          const latestAvg = (latestObservation.minPrice + latestObservation.maxPrice) / 2;
          const prevAvg = (previousObservation.minPrice + previousObservation.maxPrice) / 2;
          
          // Calculate percentage change
          const percentChange = ((latestAvg - prevAvg) / prevAvg) * 100;
          
          // Determine trend direction
          if (percentChange > 0) {
            trend = 'up';
          } else if (percentChange < 0) {
            trend = 'down';
          }
          
          // Format trend value as percentage
          trendValue = `${Math.abs(percentChange).toFixed(1)}%`;
        }
        
        setFeaturedPriceData({
          artiId: featuredPriceItem.artiId,
          artiNombre: product.artiNombre,
          minPrice: latestObservation?.minPrice || 0,
          maxPrice: latestObservation?.maxPrice || 0,
          icon: featuredPriceItem.icon,
          trend,
          trendValue,
          unitsPresentationName: unitsPresentation?.Name,
          // Determine if imported (this is just a placeholder, you may need to adjust this logic)
          origin: product.MajorCategoryId === 3 ? 'Importada' : undefined,
        });
      } catch (err) {
        setError('Error fetching featured price data');
        console.error('Error fetching featured price data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeaturedPriceData();
  }, [featuredPriceItem, isLoadingActions, currentLocationId]);  // Add currentLocationId dependency
  
  return {
    featuredPriceData,
    isLoading: isLoading || isLoadingActions,
    error,
  };
};

// Main hook that combines both data sources
export const useHomeData = () => {
  const { savedPrices, isLoading: isSavedPricesLoading, error: savedPricesError } = useSavedPricesData();
  const { featuredPriceData, isLoading: isFeaturedPriceLoading, error: featuredPriceError } = useFeaturedPriceData();
  const { getRandomFeaturedPriceItem } = useHomeActions();
  const { currentLocationId, locationName } = useLocationStore();
  
  // Create a derived random featured item if we have multiple featured items
  const featuredItem = useMemo(() => {
    if (Array.isArray(featuredPriceData)) {
      return getRandomFeaturedPriceItem(featuredPriceData);
    }
    return featuredPriceData;
  }, [featuredPriceData, getRandomFeaturedPriceItem]);
  
  return {
    savedPrices,
    featuredPriceData: featuredItem,
    isLoading: isSavedPricesLoading || isFeaturedPriceLoading,
    error: savedPricesError || featuredPriceError,
    currentLocationId,
    locationName,
  };
};

export default useHomeData;