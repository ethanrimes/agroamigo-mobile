// src/features/shared/snapshot/hooks/useRecentProductPriceData.ts
import { useState, useEffect } from 'react';
import { getDailyPriceObservationsByProductAndMarket, DailyPriceObservation } from '@/src/services/supabase/entities/precio';
import { getUnitsPresentationById, UnitsPresentation } from '@/src/services/supabase/entities/unitsPresentation';
import { LineGraphDataPoint } from '@/src/hooks/useD3';
import { useLocationStore } from '@/src/store/locationStore';

interface PriceDataResult {
    priceObservations: DailyPriceObservation[];
    filteredObservations: DailyPriceObservation[];
    unitsPresentationName: string;
    loading: boolean;
    error: Error | null;
    graphData: LineGraphDataPoint[];
  }
  
  interface UnitsPresentationCount {
    unitsPresentationId: number;
    count: number;
  }
  
  export const useRecentProductPriceData = (productId: number | null): PriceDataResult => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [priceObservations, setPriceObservations] = useState<DailyPriceObservation[]>([]);
    const [filteredObservations, setFilteredObservations] = useState<DailyPriceObservation[]>([]);
    const [unitsPresentationName, setUnitsPresentationName] = useState<string>('');
    const [graphData, setGraphData] = useState<LineGraphDataPoint[]>([]);
    
    // Get the current location (market ID) from the location store
    // For now, we're using a fixed value of 56 as specified in the requirements
    const marketId = 56; // This would normally come from useLocationStore().currentLocation
  
    useEffect(() => {
      const fetchData = async () => {
        if (!productId) {
          setLoading(false);
          return;
        }
  
        try {
          setLoading(true);
  
          // Calculate date range (last 31 days)
          const endDate = new Date();
          const startDate = new Date();
          startDate.setDate(startDate.getDate() - 31);
  
          console.log(`[useRecentProductPriceData] Fetching price data for product ${productId} in market ${marketId}`);
          console.log(`[useRecentProductPriceData] Date range: ${startDate.toISOString()} to ${endDate.toISOString()}`);
  
          // Fetch price observations for the last month for the product and market
          let observations: DailyPriceObservation[] = [];
          try {
            observations = await getDailyPriceObservationsByProductAndMarket(
              productId,
              marketId,
              startDate,
              endDate
            );
            console.log(`[useRecentProductPriceData] Found ${observations.length} price observations`);
          } catch (fetchError) {
            console.error('[useRecentProductPriceData] Error fetching price observations:', fetchError);
            
            // Create a dummy observation for testing if needed
            if (process.env.NODE_ENV === 'development') {
              console.log('[useRecentProductPriceData] Using dummy data for development');
              observations = generateDummyObservations(productId, marketId);
            } else {
              throw fetchError;
            }
          }
  
          // Store all observations
          setPriceObservations(observations);
  
          // If no observations found, set default values and return
          if (observations.length === 0) {
            console.log('[useRecentProductPriceData] No observations found, using defaults');
            setFilteredObservations([]);
            setUnitsPresentationName('unidad');
            setGraphData([]);
            setError(null);
            setLoading(false);
            return;
          }
  
          // Group by UnitsPresentation (presentationId + unitsId combination)
          const unitsPresentationCounts: Record<string, UnitsPresentationCount> = {};
  
          observations.forEach(obs => {
            if (obs.presentationId && obs.unitsId) {
              const key = `${obs.presentationId}-${obs.unitsId}`;
              
              if (!unitsPresentationCounts[key]) {
                unitsPresentationCounts[key] = {
                  unitsPresentationId: obs.unitsPresentationId || 0,
                  count: 0
                };
              }
              
              unitsPresentationCounts[key].count++;
            }
          });
  
          // Find most common UnitsPresentation
          let mostCommonUnitsPresentationId = 0;
          let maxCount = 0;
  
          Object.values(unitsPresentationCounts).forEach(item => {
            if (item.count > maxCount && item.unitsPresentationId > 0) {
              maxCount = item.count;
              mostCommonUnitsPresentationId = item.unitsPresentationId;
            }
          });
  
          console.log(`[useRecentProductPriceData] Most common units presentation ID: ${mostCommonUnitsPresentationId}`);
  
          // Filter observations to only include the most common UnitsPresentation
          let filtered = observations;
          if (mostCommonUnitsPresentationId > 0) {
            filtered = observations.filter(
              obs => obs.unitsPresentationId === mostCommonUnitsPresentationId
            );
            console.log(`[useRecentProductPriceData] Filtered to ${filtered.length} observations with the same units presentation`);
          } else {
            console.log('[useRecentProductPriceData] No common units presentation found, using all observations');
          }
  
          // Sort filtered observations by date
          const sortedObservations = [...filtered].sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateA - dateB;
          });
  
          setFilteredObservations(sortedObservations);
  
          // Get the UnitsPresentation name
          if (mostCommonUnitsPresentationId > 0) {
            try {
              const unitsPresentation = await getUnitsPresentationById(mostCommonUnitsPresentationId);
              setUnitsPresentationName(unitsPresentation.Name);
              console.log(`[useRecentProductPriceData] Units presentation name: ${unitsPresentation.Name}`);
            } catch (unitsError) {
              console.error('[useRecentProductPriceData] Error fetching units presentation:', unitsError);
              setUnitsPresentationName('unidad');
            }
          } else {
            setUnitsPresentationName('unidad');
          }
  
          // Convert to graph data format
          const graphPoints: LineGraphDataPoint[] = sortedObservations.map(obs => ({
            date: obs.date ? new Date(obs.date) : new Date(),
            value: (obs.minPrice + obs.maxPrice) / 2 // Using average of min and max for graph
          }));
  
          console.log(`[useRecentProductPriceData] Created ${graphPoints.length} graph data points`);
          setGraphData(graphPoints);
          setError(null);
        } catch (err) {
          console.error('[useRecentProductPriceData] Error fetching data:', err);
          setError(err instanceof Error ? err : new Error(String(err)));
          
          // Set fallback values
          setFilteredObservations([]);
          setUnitsPresentationName('unidad');
          setGraphData([]);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [productId, marketId]);
    
    // Helper function to generate dummy observations for development
    const generateDummyObservations = (productId: number, marketId: number): DailyPriceObservation[] => {
      const observations: DailyPriceObservation[] = [];
      const today = new Date();
      
      // Generate observations for the last 10 days
      for (let i = 10; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Base price with some minor fluctuation
        const basePrice = 5000 + (productId % 10) * 100;
        const minPrice = basePrice - (Math.random() * 500);
        const maxPrice = basePrice + (Math.random() * 500);
        
        observations.push({
          id: i,
          date: date.toISOString().split('T')[0],
          artiId: productId,
          fuenId: marketId,
          minPrice,
          maxPrice,
          unitsPresentationId: 1,
          unitsId: 1,
          presentationId: 1
        });
      }
      
      return observations;
    };
  
    return {
      priceObservations,
      filteredObservations,
      unitsPresentationName,
      loading,
      error,
      graphData
    };
  };
  
  export default useRecentProductPriceData;