import { useState, useEffect, useMemo } from 'react';
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
  const [unitsPresentationId, setUnitsPresentationId] = useState<number | null>(null);
  const [unitsPresentationName, setUnitsPresentationName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMostCommonUnitsPresentation = async () => {
      try {
        setIsLoading(true);
        const mostCommonId = await getMostCommonUnitsPresentationByProductId(artiId);
        
        if (mostCommonId) {
          setUnitsPresentationId(mostCommonId);
          
          // Get the name for this units presentation
          const unitsPresentation = await getUnitsPresentationById(mostCommonId);
          setUnitsPresentationName(unitsPresentation.Name);
        }
        
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch units presentation'));
        setIsLoading(false);
      }
    };

    if (artiId) {
      fetchMostCommonUnitsPresentation();
    }
  }, [artiId]);

  return {
    unitsPresentationId,
    unitsPresentationName,
    setUnitsPresentationId,
    isLoading,
    error
  };
};

/**
 * Hook to manage date information for price data
 */
export const usePriceDateInfo = (artiId: number, unitsPresentationId: number | null) => {
  const [date, setDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMostRecentDate = async () => {
      try {
        setIsLoading(true);
        
        if (artiId && unitsPresentationId) {
          const mostRecentDate = await getMostRecentPriceDateByProductAndUnitsPresentation(
            artiId,
            unitsPresentationId
          );
          
          setDate(mostRecentDate);
        }
        
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch most recent date'));
        setIsLoading(false);
      }
    };

    if (artiId && unitsPresentationId) {
      fetchMostRecentDate();
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
  
  const [productName, setProductName] = useState<string>('');
  const [rawPriceData, setRawPriceData] = useState<DailyPriceObservation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Use the units presentation hook
  const { 
    unitsPresentationId, 
    unitsPresentationName,
    setUnitsPresentationId,
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
      try {
        if (productId <= 0) {
          setError(new Error('Invalid product ID'));
          setIsLoading(false);
          return;
        }
        
        const product = await getProductById(productId);
        setProductName(product.artiNombre);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch product info'));
      }
    };

    if (productId > 0) {
      fetchProductInfo();
    }
  }, [productId]);
  
  // Fetch price data when both units presentation and date are available
  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        setIsLoading(true);
        
        if (productId <= 0 || !unitsPresentationId || !date) {
          return;
        }
        
        // Get all price observations for this product
        const allPriceObservations = await getDailyPriceObservationsByProduct(productId);
        
        // Filter by unitsPresentationId and date
        const filteredObservations = allPriceObservations.filter(obs => 
          obs.UnitsPresentationId === unitsPresentationId && 
          obs.date === date
        );
        
        setRawPriceData(filteredObservations);
        setIsLoading(false);
      } catch (err) {
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
        
        setDataPoints(points);
      } catch (err) {
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