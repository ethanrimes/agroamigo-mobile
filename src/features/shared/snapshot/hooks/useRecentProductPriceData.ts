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
  UnitsPresentationId: number;
  count: number;
}

export const useRecentProductPriceData = (productId: number | null, locationId?: number): PriceDataResult => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [priceObservations, setPriceObservations] = useState<DailyPriceObservation[]>([]);
  const [filteredObservations, setFilteredObservations] = useState<DailyPriceObservation[]>([]);
  const [unitsPresentationName, setUnitsPresentationName] = useState<string>('');
  const [graphData, setGraphData] = useState<LineGraphDataPoint[]>([]);
  
  // Get the current location (market ID) from the location store if not provided
  const { currentLocationId } = useLocationStore();
  const marketId = locationId || currentLocationId;

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
        startDate.setMonth(startDate.getMonth() - 6); // 6 months of data instead of 31 days

        console.log(`[useRecentProductPriceData] Fetching price data for product ${productId} in market ${marketId}`);
        console.log(`[useRecentProductPriceData] Date range: ${startDate.toISOString()} to ${endDate.toISOString()}`);

        // Fetch price observations for the product and market
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
          throw fetchError;
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
        const unitsPresentationCounts: Record<number, UnitsPresentationCount> = {};

        observations.forEach(obs => {
          if (obs.UnitsPresentationId && obs.UnitsPresentationId > 0) {
            if (!unitsPresentationCounts[obs.UnitsPresentationId]) {
              unitsPresentationCounts[obs.UnitsPresentationId] = {
                UnitsPresentationId: obs.UnitsPresentationId,
                count: 0
              };
            }
            
            unitsPresentationCounts[obs.UnitsPresentationId].count++;
          }
        });

        // Find most common UnitsPresentation
        let mostCommonUnitsPresentationId = 0;
        let maxCount = 0;

        Object.values(unitsPresentationCounts).forEach(item => {
          if (item.count > maxCount && item.UnitsPresentationId > 0) {
            maxCount = item.count;
            mostCommonUnitsPresentationId = item.UnitsPresentationId;
          }
        });

        console.log(`[useRecentProductPriceData] Most common units presentation ID: ${mostCommonUnitsPresentationId}`);

        // Filter observations to only include the most common UnitsPresentation
        let filtered = observations;
        if (mostCommonUnitsPresentationId > 0) {
          filtered = observations.filter(
            obs => obs.UnitsPresentationId === mostCommonUnitsPresentationId
          );
          console.log(`[useRecentProductPriceData] Filtered to ${filtered.length} observations with the same units presentation`);
        } else if (observations.length > 0) {
          // If no common units presentation found, but we have observations,
          // use the first one's units presentation if available
          const firstObsWithUnitsPresentation = observations.find(
            obs => obs.UnitsPresentationId && obs.UnitsPresentationId > 0
          );
          
          if (firstObsWithUnitsPresentation && firstObsWithUnitsPresentation.UnitsPresentationId) {
            mostCommonUnitsPresentationId = firstObsWithUnitsPresentation.UnitsPresentationId;
            filtered = observations.filter(
              obs => obs.UnitsPresentationId === mostCommonUnitsPresentationId
            );
            console.log(`[useRecentProductPriceData] Using first available units presentation ID: ${mostCommonUnitsPresentationId}`);
          } else {
            console.log('[useRecentProductPriceData] No units presentation found, using all observations');
          }
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

        // Convert to graph data format - ensure we have valid dates
        const graphPoints: LineGraphDataPoint[] = sortedObservations
          .filter(obs => obs.date) // Ensure we have a date
          .map(obs => ({
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