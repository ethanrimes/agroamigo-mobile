import { useState, useEffect, useMemo, useLayoutEffect, useCallback, useRef } from 'react';
import { 
  DailyPriceObservation, 
  getDailyPriceObservationsByProduct,
  getFilteredProductMarketPriceDistribution // Import the new optimized function
} from '../../../../services/supabase/entities/precio';
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
  marketIcon: string;
  municipioId: number;
  municipioName: string;
  municipioIcon: string;
  departamentoId: number;
  departamentoName: string;
  departamentoIcon: string;
  date: string;
};

/**
 * Type definition for the complete price distribution data
 */
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
/**
 * Type definition for price data point with extended market information
 */


/**
 * Main hook to fetch price data for a product with market information
 * If no artiId is provided, it will attempt to extract it from the current route
 */
export const useProductPriceData = (artiId?: number): PriceDistributionData => {
  const routeArtiId = useProductIdFromRoute();
  const productId = artiId || routeArtiId || 0;
  
  console.log(`[useProductPriceData] Initializing with product ID: ${productId} (provided: ${artiId}, from route: ${routeArtiId})`);
  
  const [productName, setProductName] = useState<string>('');
  const [rawPriceData, setRawPriceData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Use the units presentation hook
  const { 
    unitsPresentationId, 
    UnitsId,
    PresentationId,
    unitsPresentationName,
    isLoading: isLoadingUnitsPresentation,
    error: unitsPresentationError 
  } = useUnitsPresentation(productId);
  
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
  
  // Fetch price data with market information when both units presentation and date are available
  useEffect(() => {
    const fetchPriceData = async () => {
      console.log(`[useProductPriceData] Fetching price data for product ID: ${productId}`);
      try {
        setIsLoading(true);
        
        if (productId <= 0) {
          console.log('[useProductPriceData] Invalid product ID');
          setIsLoading(false);
          return;
        }
        
        // Use the new function that provides joined market data
        const observations = await getFilteredProductMarketPriceDistribution(
          productId,
          {
            unitsPresentationId: unitsPresentationId,
            unitsId: UnitsId,
            presentationId: PresentationId,
            date: date
          }
        );
        
        console.log(`[useProductPriceData] Fetched ${observations.length} price observations with market data`);
        
        // If no date was specified but we got observations, use the most recent date
        if (!date && observations.length > 0) {
          const dates = observations.map(obs => obs.date).filter(Boolean) as string[];
          if (dates.length > 0) {
            dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
            const mostRecentDate = dates[0];
            setDate(mostRecentDate);
            console.log(`[useProductPriceData] Setting most recent date: ${mostRecentDate}`);
          }
        }
        
        setRawPriceData(observations);
        setIsLoading(false);
      } catch (err) {
        console.error('[useProductPriceData] Error fetching price data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch price data'));
        setIsLoading(false);
      }
    };

    // Only fetch when we have the necessary information
    if (productId > 0 && (unitsPresentationId || (UnitsId && PresentationId))) {
      fetchPriceData();
    } else {
      console.log(`[useProductPriceData] Missing required data for fetching prices - Product ID: ${productId}, UnitsPresentationId: ${unitsPresentationId}, UnitsId: ${UnitsId}, PresentationId: ${PresentationId}`);
    }
  }, [productId, unitsPresentationId, UnitsId, PresentationId, date]);

  // Process the raw data to compute statistics and format data points
  const processedData = useMemo(() => {
    console.log(`[useProductPriceData] Processing ${rawPriceData.length} price observations`);
    
    if (rawPriceData.length === 0) {
      return {
        minPrice: 0,
        avgPrice: 0,
        maxPrice: 0,
        dataPoints: []
      };
    }
    
    // Map raw data to PriceDataPoint format - now includes market-related fields directly
    const dataPoints: PriceDataPoint[] = rawPriceData.map(obs => {
      return {
        price: obs.precio || ((obs.minPrice + obs.maxPrice) / 2),
        marketId: obs.marketId || obs.fuenId,
        marketName: obs.marketName || 'Unknown Market',
        marketIcon: obs.marketIcon || '',
        municipioId: obs.municipioId || 0,
        municipioName: obs.municipioName || 'Unknown Municipio',
        municipioIcon: obs.municipioIcon || '',
        departamentoId: obs.departamentoId || 0,
        departamentoName: obs.departamentoName || 'Unknown Departamento',
        departamentoIcon: obs.departamentoIcon || '',
        date: obs.date || new Date().toISOString().split('T')[0]
      };
    });
    
    // Calculate price statistics
    const prices = dataPoints.map(point => point.price);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
    const avgPrice = prices.length > 0 ? 
      prices.reduce((sum, price) => sum + price, 0) / prices.length : 0;
    
    console.log(`[useProductPriceData] Processed stats - min: ${minPrice}, avg: ${avgPrice.toFixed(2)}, max: ${maxPrice}, points: ${dataPoints.length}`);
    
    return {
      minPrice,
      avgPrice,
      maxPrice,
      dataPoints
    };
  }, [rawPriceData]);
  
  // Return the complete price distribution data
  return {
    minPrice: processedData.minPrice,
    avgPrice: processedData.avgPrice,
    maxPrice: processedData.maxPrice,
    dataPoints: processedData.dataPoints,
    productName,
    unitsPresentationName,
    date: date || '',
    isLoading: isLoading || isLoadingUnitsPresentation || isLoadingDate,
    error: error || unitsPresentationError || dateError
  };
};

/**
 * Type definition for the formatted price data tuple
 */
export type FormattedPriceData = [
  minPrice: number,
  avgPrice: number,
  maxPrice: number,
  dataPoints: PriceDataPoint[]
];

/**
 * Hook to get price data formatted as a tuple [min, avg, max, dataPoints]
 * with proper TypeScript typing
 */
export const useFormattedPriceData = (artiId?: number): FormattedPriceData => {
  const priceData = useProductPriceData(artiId);
  
  console.log(`[useFormattedPriceData] Formatting price data for product ID: ${artiId}`);
  
  return useMemo((): FormattedPriceData => {
    // Safely access properties with default values if priceData is undefined
    const dataPoints = priceData?.dataPoints || [];
    const minPrice = priceData?.minPrice || 0;
    const avgPrice = priceData?.avgPrice || 0;
    const maxPrice = priceData?.maxPrice || 0;
    
    console.log(`[useFormattedPriceData] Data points: ${dataPoints.length}, min: ${minPrice}, avg: ${avgPrice}, max: ${maxPrice}`);
    
    return [
      minPrice,
      avgPrice,
      maxPrice,
      dataPoints
    ];
  }, [
    priceData?.minPrice,
    priceData?.avgPrice,
    priceData?.maxPrice,
    priceData?.dataPoints
  ]);
};

// Default export
export default useProductPriceData;