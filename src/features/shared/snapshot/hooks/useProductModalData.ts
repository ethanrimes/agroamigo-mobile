// src/features/shared/snapshot/hooks/useProductModalData.ts
import { useState, useEffect, useRef, useMemo } from 'react';
import { getProductById, Product } from '@/src/services/supabase/entities/producto';
import { LineGraphDataPoint } from '@/src/hooks/useD3';
import { useRecentProductPriceData } from './useRecentProductPriceData';
import { useTrendGraphData } from './useTrendGraphData';

// Interface for the consolidated product data with price information
interface ProductData {
  id: number;
  name: string;
  iconName?: string;
  maxPrice: number;
  minPrice: number;
  unit: string;
  date: string;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  graphData: LineGraphDataPoint[];
}

export const useProductModalData = (productId: number | null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [productInfo, setProductInfo] = useState<Product | null>(null);
  
  // Use ref to prevent infinite update loops
  const isUpdatingRef = useRef(false);
  
  // Get price data from the hook
  const { 
    filteredObservations, 
    unitsPresentationName, 
    loading: priceLoading, 
    error: priceError,
    graphData 
  } = useRecentProductPriceData(productId);
  
  // Get trend data using the graph data
  const trendData = useTrendGraphData(graphData.length > 0 ? graphData : null);
  
  // Effect to fetch product data and combine with price data
  useEffect(() => {
    const fetchData = async () => {
      if (!productId || isUpdatingRef.current) {
        if (!productId) {
          setLoading(false);
        }
        return;
      }
      
      try {
        isUpdatingRef.current = true;
        setLoading(true);
        
        console.log(`[useProductModalData] Fetching product data for ID: ${productId}`);
        
        // 1. Fetch the product information
        const product: Product = await getProductById(productId);
        setProductInfo(product);
        
        console.log(`[useProductModalData] Product fetched: ${product.artiNombre}`);
        
        // 2. Wait until price data is loaded
        if (priceLoading) {
          console.log('[useProductModalData] Price data still loading, waiting...');
          return;
        }
        
        // 3. Find the most recent min and max prices
        let minPrice = 0;
        let maxPrice = 0;
        let mostRecentDate = new Date(0); // Initialize with oldest possible date
        let observationDate = '';
        
        if (filteredObservations && filteredObservations.length > 0) {
          // Sort by date descending to get most recent first
          const sortedByRecent = [...filteredObservations].sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA; // Descending order
          });
          
          // Get the most recent observation
          const recentObs = sortedByRecent[0];
          minPrice = recentObs.minPrice;
          maxPrice = recentObs.maxPrice;
          
          console.log(`[useProductModalData] Latest price observation: Min=${minPrice}, Max=${maxPrice}`);
          
          if (recentObs.date) {
            mostRecentDate = new Date(recentObs.date);
            observationDate = formatDate(mostRecentDate);
            console.log(`[useProductModalData] Observation date: ${observationDate}`);
          }
        } else if (graphData && graphData.length > 0) {
          // Fallback to graph data if no filtered observations
          const prices = graphData.map(point => point.value);
          minPrice = Math.min(...prices) * 0.9; // Approximate
          maxPrice = Math.max(...prices) * 1.1; // Approximate
          observationDate = formatDate(new Date());
          
          console.log(`[useProductModalData] Using graph data for prices: Min=${minPrice}, Max=${maxPrice}`);
        } else {
          // Default values if no data
          minPrice = 5000;
          maxPrice = 8000;
          observationDate = formatDate(new Date());
          
          console.log('[useProductModalData] No price data available, using defaults');
        }
        
        // 4. Get trend information from trend data
        const trendDirection = trendData?.trendDirection || 'stable';
        const trendPercentage = trendData?.trendPercentage || 0;
        
        console.log(`[useProductModalData] Trend: ${trendDirection} (${trendPercentage.toFixed(2)}%)`);
        
        // 5. Create complete product data object
        const data: ProductData = {
          id: product.artiId,
          name: product.artiNombre,
          iconName: product.Icon || undefined,
          maxPrice: maxPrice, 
          minPrice: minPrice,
          unit: unitsPresentationName || 'unidad', // Use the units presentation name from price data
          date: observationDate, // Use the most recent observation date
          trend: trendDirection,
          trendPercentage: trendPercentage,
          graphData: graphData,
        };
        
        // 6. Set the product data state
        setProductData(data);
        setError(null);
        
        console.log('[useProductModalData] Product data successfully assembled');
      } catch (err) {
        console.error('[useProductModalData] Error fetching product data:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
        isUpdatingRef.current = false;
      }
    };
    
    fetchData();
  }, [productId, priceLoading, filteredObservations, unitsPresentationName, graphData, trendData]);
  
  // Handle price loading/error
  useEffect(() => {
    if (priceError) {
      console.error('[useProductModalData] Price error detected:', priceError);
      setError(priceError);
    }
  }, [priceError]);
  
  // Use useMemo to ensure stable references for the returned data
  const result = useMemo(() => ({
    productData,
    productInfo,
    loading: loading || priceLoading,
    error,
    graphData,
    trendData
  }), [productData, productInfo, loading, priceLoading, error, graphData, trendData]);
  
  return result;
};

// Helper function to format date
const formatDate = (date: Date): string => {
  // Format as "5 abril, 2025"
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  
  return date.toLocaleDateString('es-CO', options);
};

export default useProductModalData;