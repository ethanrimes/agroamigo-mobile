import { useState, useEffect, useMemo, useLayoutEffect, useCallback, useRef } from 'react';
import { DailyPriceObservation, getDailyPriceObservationsByProduct } from '../../../../services/supabase/entities/precio';
import { 
  getMostCommonUnitsPresentationByProductId, 
  getUnitsPresentationById 
} from '../../../../services/supabase/entities/unitsPresentation';
import { getMostRecentPriceDateByProductAndUnitsPresentation } from '../../../../services/supabase/entities/precio';
import { getProductById } from '../../../../services/supabase/entities/producto';
import { getMarketById } from '../../../../services/supabase/entities/mercado';
import { getMunicipioById } from '../../../../services/supabase/entities/municipio';
import useNavigationService from '../../../../services/navigation/NavigationService';
import { 
  getUnitById 
} from '../../../../services/supabase/entities/units';

import {
  getPresentationById
} from '../../../../services/supabase/entities/presentation';

export type PriceDataPoint = {
  price: number;
  marketId: number;
  marketName: string;
  municipioId: number;
  municipioName: string;
  date: string;
};

export type PriceDistributionData = {
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  dataPoints: PriceDataPoint[];
  productName: string;
  unitsPresentationName: string;
  date: string;
  isLoading: boolean;
  error: Error | null;
};

/**
 * Hook to manage the current units presentation for a product
 */
export const useUnitsPresentation = (artiId: number) => {
  const { currentPath } = useNavigationService();
  const [unitsPresentationId, setUnitsPresentationId] = useState<number | null>(null);
  const [UnitsId, setUnitsId] = useState<number | null>(null);
  const [PresentationId, setPresentationId] = useState<number | null>(null);
  const [unitsPresentationName, setUnitsPresentationName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [forceTrigger, setForceTrigger] = useState<number>(0);
  const [autoPollingEnabled, setAutoPollingEnabled] = useState<boolean>(true);
  const retryCountRef = useRef<number>(0);
  const maxRetries = 10; // Maximum number of retries before giving up

  console.log(`[useUnitsPresentation] Hook called with product ID: ${artiId}, currentPath: ${currentPath}`);

  // Create a function to manually fetch data
  const fetchData = useCallback(async () => {
    console.log(`[useUnitsPresentation] Manual fetch triggered for product ID: ${artiId} (retry #${retryCountRef.current})`);
    
    // Only reset state on the first attempt to avoid flickering
    if (retryCountRef.current === 0) {
      setUnitsPresentationId(null);
      setUnitsId(null);
      setPresentationId(null);
      setUnitsPresentationName('');
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (!artiId) {
        console.log('[useUnitsPresentation] No product ID provided for manual fetch');
        setIsLoading(false);
        return;
      }
      
      console.log(`[useUnitsPresentation] Fetching most common units presentation for product ID: ${artiId}`);
      
      const { unitsPresentationId: mostCommonId, UnitsId: mostCommonUnitsId, PresentationId: mostCommonPresentationId } = 
        await getMostCommonUnitsPresentationByProductId(artiId);
        
      console.log(`[useUnitsPresentation] Most common units presentation ID: ${mostCommonId}`);
      console.log(`[useUnitsPresentation] Most common units ID: ${mostCommonUnitsId}`);
      console.log(`[useUnitsPresentation] Most common presentation ID: ${mostCommonPresentationId}`);
      
      setUnitsPresentationId(mostCommonId);
      setUnitsId(mostCommonUnitsId);
      setPresentationId(mostCommonPresentationId);
      
      // Get the name for this units presentation if we have an ID
      if (mostCommonId) {
        const unitsPresentation = await getUnitsPresentationById(mostCommonId);
        setUnitsPresentationName(unitsPresentation.Name);
        console.log(`[useUnitsPresentation] Units presentation name: ${unitsPresentation.Name}`);
      } 
      // Otherwise, try to construct a name from units and presentation if we have those
      else if (mostCommonUnitsId && mostCommonPresentationId) {
        const units = await getUnitById(mostCommonUnitsId);
        const presentation = await getPresentationById(mostCommonPresentationId);
        const constructedName = `${units.Units} - ${presentation.Presentation}`;
        setUnitsPresentationName(constructedName);
        console.log(`[useUnitsPresentation] Constructed name: ${constructedName}`);
      }
      
      setIsLoading(false);
      retryCountRef.current = 0; // Reset retry counter on success
      
      if (mostCommonId || (mostCommonUnitsId && mostCommonPresentationId)) {
        setAutoPollingEnabled(false); // Stop polling when we have data
        console.log('[useUnitsPresentation] Data fetched successfully, stopping auto-polling');
      }
    } catch (err) {
      console.error('[useUnitsPresentation] Error in manual fetch:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch units presentation'));
      setIsLoading(false);
      retryCountRef.current++; // Increment retry counter on error
      
      if (retryCountRef.current >= maxRetries) {
        console.log(`[useUnitsPresentation] Max retries (${maxRetries}) reached, stopping auto-polling`);
        setAutoPollingEnabled(false);
      }
    }
  }, [artiId]);

  // Initial fetch using useLayoutEffect
  useLayoutEffect(() => {
    console.log(`[useUnitsPresentation] Layout effect triggered with product ID: ${artiId}, currentPath: ${currentPath}`);
    retryCountRef.current = 0; // Reset retry counter on dependency change
    setAutoPollingEnabled(true); // Re-enable auto-polling on dependency change
    fetchData();
  }, [artiId, currentPath, fetchData]);

  // Auto-polling every second if data is null
  useEffect(() => {
    if (!unitsPresentationId && autoPollingEnabled && artiId) {
      console.log(`[useUnitsPresentation] Starting auto-polling for product ID: ${artiId}`);
      
      const intervalId = setInterval(() => {
        if (retryCountRef.current < maxRetries) {
          console.log(`[useUnitsPresentation] Auto-polling triggered (${retryCountRef.current + 1}/${maxRetries})`);
          fetchData();
        } else {
          console.log(`[useUnitsPresentation] Max retries reached, clearing auto-polling interval`);
          clearInterval(intervalId);
          setAutoPollingEnabled(false);
        }
      }, 1000); // Poll every second
      
      return () => {
        console.log(`[useUnitsPresentation] Clearing auto-polling interval`);
        clearInterval(intervalId);
      };
    }
  }, [unitsPresentationId, autoPollingEnabled, artiId, fetchData]);

  // Manual control functions
  const startPolling = useCallback(() => {
    console.log(`[useUnitsPresentation] Manually starting polling`);
    retryCountRef.current = 0;
    setAutoPollingEnabled(true);
  }, []);
  
  const stopPolling = useCallback(() => {
    console.log(`[useUnitsPresentation] Manually stopping polling`);
    setAutoPollingEnabled(false);
  }, []);

  return {
    unitsPresentationId,
    UnitsId,
    PresentationId,
    unitsPresentationName,
    setUnitsPresentationId,
    isLoading,
    error,
    fetchData,                       // Manual fetch function
    refetch: () => {                 // Reset and fetch
      retryCountRef.current = 0;
      setForceTrigger(prev => prev + 1);
      fetchData();
    },
    startPolling,                    // Start auto-polling
    stopPolling,                     // Stop auto-polling
    isPolling: autoPollingEnabled,   // Polling status
    retryCount: retryCountRef.current // Current retry count
  };
};

/**
 * Hook to manage date information for price data
 */
export const usePriceDateInfo = (artiId: number, unitsPresentationId: number | null) => {
  const [date, setDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  console.log(`[usePriceDateInfo] Hook called with product ID: ${artiId}, unitsPresentationId: ${unitsPresentationId}`);

  useEffect(() => {
    const fetchMostRecentDate = async () => {
      console.log(`[usePriceDateInfo] Fetching most recent date for product ID: ${artiId} and units presentation ID: ${unitsPresentationId}`);
      try {
        setIsLoading(true);
        
        if (artiId && unitsPresentationId) {
          const mostRecentDate = await getMostRecentPriceDateByProductAndUnitsPresentation(
            artiId,
            unitsPresentationId
          );
          
          setDate(mostRecentDate);
          console.log(`[usePriceDateInfo] Most recent date: ${mostRecentDate}`);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('[usePriceDateInfo] Error:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch most recent date'));
        setIsLoading(false);
      }
    };

    if (artiId && unitsPresentationId) {
      fetchMostRecentDate();
    } else {
      console.log(`[usePriceDateInfo] Missing required data - product ID: ${artiId}, units presentation ID: ${unitsPresentationId}`);
    }
  }, [artiId, unitsPresentationId]);

  return {
    date,
    setDate,
    isLoading,
    error
  };
};

/**
 * Hook to extract the product ID from the current route
 */
export const useProductIdFromRoute = () => {
  const { currentPath } = useNavigationService();
  
  // Extract artiId from pathname
  // Expected format: /productos/detail/[producto]
  const getArtiIdFromPath = (): number | null => {
    if (!currentPath) return null;
    
    const segments = currentPath.split('/');
    const lastSegment = segments[segments.length - 1];
    
    // Check if the last segment is a number
    const parsedId = parseInt(lastSegment, 10);
    console.log(`[useProductIdFromRoute] Extracted product ID from path: ${parsedId}`);
    return isNaN(parsedId) ? null : parsedId;
  };
  
  return getArtiIdFromPath();
};

/**
 * Main hook to fetch price data for a product
 * If no artiId is provided, it will attempt to extract it from the current route
 */
export const useProductPriceData = (artiId?: number) => {
  const routeArtiId = useProductIdFromRoute();
  const productId = artiId || routeArtiId || 0;
  
  console.log(`[useProductPriceData] Initializing with product ID: ${productId} (provided: ${artiId}, from route: ${routeArtiId})`);
  
  const [productName, setProductName] = useState<string>('');
  const [rawPriceData, setRawPriceData] = useState<DailyPriceObservation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Use the units presentation hook
  const { 
    unitsPresentationId, 
    UnitsId,                 // Make sure to destructure this
    PresentationId,          // Make sure to destructure this
    unitsPresentationName,
    setUnitsPresentationId,
    isLoading: isLoadingUnitsPresentation,
    error: unitsPresentationError 
  } = useUnitsPresentation(productId);

  console.log({
    unitsPresentationId,
    UnitsId,
    PresentationId,
    unitsPresentationName,
    setUnitsPresentationId,
    isLoading: isLoadingUnitsPresentation,
    error: unitsPresentationError
  });
  
  // Use the date hook (depends on units presentation being loaded)
  const {
    date,
    setDate,
    isLoading: isLoadingDate,
    error: dateError
  } = usePriceDateInfo(productId, unitsPresentationId);

  // Fetch product info
  useEffect(() => {
    const fetchProductInfo = async () => {
      console.log(`[useProductPriceData] Fetching product info for ID: ${productId}`);
      try {
        if (productId <= 0) {
          console.error('[useProductPriceData] Invalid product ID');
          setError(new Error('Invalid product ID'));
          setIsLoading(false);
          return;
        }
        
        const product = await getProductById(productId);
        setProductName(product.artiNombre);
        console.log(`[useProductPriceData] Product name: ${product.artiNombre}`);
      } catch (err) {
        console.error('[useProductPriceData] Error fetching product info:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch product info'));
      }
    };

    if (productId > 0) {
      fetchProductInfo();
    }
  }, [productId]);
  
  // Fetch price data when both units presentation and date are available
  useEffect(() => {
    // In useProductPriceData, modify the fetchPriceData function:
    const fetchPriceData = async () => {
      console.log(`[useProductPriceData] Fetching price data for product ID: ${productId}`);
      try {
        setIsLoading(true);
        
        if (productId <= 0) {
          console.log('[useProductPriceData] Invalid product ID');
          return;
        }
        
        // Get all price observations for this product
        const allPriceObservations = await getDailyPriceObservationsByProduct(productId);
        console.log(`[useProductPriceData] Total price observations fetched: ${allPriceObservations.length}`);
        
        // Filter by unitsPresentationId if available
        let filteredObservations = allPriceObservations;
        
        if (unitsPresentationId) {
          filteredObservations = allPriceObservations.filter(obs => 
            obs.UnitsPresentationId === unitsPresentationId
          );
        } 
        // Otherwise, filter by individual UnitsId and PresentationId if available
        else if (UnitsId && PresentationId) {
          filteredObservations = allPriceObservations.filter(obs => 
            obs.UnitsId === UnitsId && obs.PresentationId === PresentationId
          );
        }
        
        // Filter by date if available
        if (date) {
          filteredObservations = filteredObservations.filter(obs => obs.date === date);
        } else if (filteredObservations.length > 0) {
          // If no date specified, use the most recent date from the observations
          const dates = filteredObservations.map(obs => obs.date).filter(Boolean) as string[];
          if (dates.length > 0) {
            dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
            const mostRecentDate = dates[0];
            filteredObservations = filteredObservations.filter(obs => obs.date === mostRecentDate);
            setDate(mostRecentDate);
          }
        }
        
        console.log(`[useProductPriceData] Filtered price observations: ${filteredObservations.length}`);
        setRawPriceData(filteredObservations);
        setIsLoading(false);
      } catch (err) {
        console.error('[useProductPriceData] Error fetching price data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch price data'));
        setIsLoading(false);
      }
    };

    if (productId > 0 && unitsPresentationId && date) {
      fetchPriceData();
    }
  }, [productId, unitsPresentationId, date]);

  // Format and process the raw price data
  const processedData = useMemo<PriceDistributionData>(() => {
    console.log(`[useProductPriceData] Processing raw price data (${rawPriceData.length} records)`);
    
    // Default return value when data is loading or has errors
    const defaultData: PriceDistributionData = {
      minPrice: 0,
      maxPrice: 0,
      avgPrice: 0,
      dataPoints: [],
      productName: productName,
      unitsPresentationName: unitsPresentationName,
      date: date || '',
      isLoading: isLoading || isLoadingUnitsPresentation || isLoadingDate,
      error: error || unitsPresentationError || dateError
    };

    if (
      isLoading || 
      isLoadingUnitsPresentation || 
      isLoadingDate || 
      !rawPriceData || 
      rawPriceData.length === 0
    ) {
      console.log('[useProductPriceData] Returning default data due to loading or empty results');
      return defaultData;
    }

    try {
      // Process raw price data into data points with market info
      const dataPointsPromise = Promise.all(
        rawPriceData.map(async (obs): Promise<PriceDataPoint> => {
          // Take average of min and max as the representative price
          const price = (obs.minPrice + obs.maxPrice) / 2;
          
          // Get market info
          const market = await getMarketById(obs.fuenId);
          
          // Get municipio info
          const municipio = await getMunicipioById(market.CodMunicipio);
          
          return {
            price,
            marketId: obs.fuenId,
            marketName: market.Mercado,
            municipioId: market.CodMunicipio,
            municipioName: municipio.Municipio,
            date: obs.date || '',
          };
        })
      );

      // Calculate min, max, and average prices
      let minPrice = Number.MAX_VALUE;
      let maxPrice = Number.MIN_VALUE;
      let totalPrice = 0;

      for (const obs of rawPriceData) {
        const avgPrice = (obs.minPrice + obs.maxPrice) / 2;
        minPrice = Math.min(minPrice, obs.minPrice);
        maxPrice = Math.max(maxPrice, obs.maxPrice);
        totalPrice += avgPrice;
      }

      const avgPrice = totalPrice / rawPriceData.length;
      
      console.log(`[useProductPriceData] Calculated price range: min=${minPrice}, max=${maxPrice}, avg=${avgPrice}`);

      return {
        minPrice,
        maxPrice,
        avgPrice,
        dataPoints: [], // This will be populated asynchronously
        productName,
        unitsPresentationName,
        date: date || '',
        isLoading: false,
        error: null
      };
    } catch (err) {
      console.error('[useProductPriceData] Error processing price data:', err);
      return {
        ...defaultData,
        error: err instanceof Error ? err : new Error('Failed to process price data'),
        isLoading: false
      };
    }
  }, [
    rawPriceData, 
    isLoading, 
    isLoadingUnitsPresentation, 
    isLoadingDate, 
    error, 
    unitsPresentationError, 
    dateError,
    productName,
    unitsPresentationName,
    date
  ]);

  // As a separate effect, load the market data for the data points
  const [dataPoints, setDataPoints] = useState<PriceDataPoint[]>([]);
  
  useEffect(() => {
    const loadDataPoints = async () => {
      if (rawPriceData.length === 0) return;
      
      console.log(`[useProductPriceData] Loading market data for ${rawPriceData.length} data points`);
      
      try {
        const points = await Promise.all(
          rawPriceData.map(async (obs): Promise<PriceDataPoint> => {
            // Take average of min and max as the representative price
            const price = (obs.minPrice + obs.maxPrice) / 2;
            
            // Get market info
            const market = await getMarketById(obs.fuenId);
            
            // Get municipio info
            const municipio = await getMunicipioById(market.CodMunicipio);
            
            return {
              price,
              marketId: obs.fuenId,
              marketName: market.Mercado,
              municipioId: market.CodMunicipio,
              municipioName: municipio.Municipio,
              date: obs.date || '',
            };
          })
        );
        
        console.log(`[useProductPriceData] Loaded ${points.length} data points with market information`);
        setDataPoints(points);
      } catch (err) {
        console.error('[useProductPriceData] Error loading market data:', err);
        setError(err instanceof Error ? err : new Error('Failed to load market data'));
      }
    };
    
    loadDataPoints();
  }, [rawPriceData]);

  // Return the full data object
  return {
    ...processedData,
    dataPoints,
    // Include the state setters from the hooks
    setUnitsPresentationId,
    setDate,
    // Include loading states
    isLoading: isLoading || isLoadingUnitsPresentation || isLoadingDate,
    // Include all errors
    error: error || unitsPresentationError || dateError
  };
};

/**
 * Hook to get price data formatted as a tuple [min, avg, max, dataPoints]
 */
export const useFormattedPriceData = (artiId?: number) => {
  const priceData = useProductPriceData(artiId);
  
  console.log(`[useFormattedPriceData] Formatting price data for product ID: ${artiId}`);
  console.log(`[useFormattedPriceData] Data points: ${priceData.dataPoints.length}, min: ${priceData.minPrice}, avg: ${priceData.avgPrice}, max: ${priceData.maxPrice}`);
  
  return useMemo(() => {
    return [
      priceData.minPrice,
      priceData.avgPrice,
      priceData.maxPrice,
      priceData.dataPoints
    ] as const;
  }, [
    priceData.minPrice,
    priceData.avgPrice,
    priceData.maxPrice,
    priceData.dataPoints
  ]);
};

// Export hooks
// export {
//   useProductIdFromRoute,
//   useUnitsPresentation,
//   usePriceDateInfo,
//   useProductPriceData
// };

// Default export
export default useProductPriceData;