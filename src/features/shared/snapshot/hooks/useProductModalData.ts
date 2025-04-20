// src/features/shared/snapshot/hooks/useProductModalData.ts
import { useState, useEffect, useRef } from 'react';
import { getProductById } from '@/src/services/supabase/entities/products';
import { LineGraphDataPoint } from '@/src/hooks/useD3';
import { useTrendGraphData } from './useTrendGraphData';

// Interface for product data
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
  const [graphData, setGraphData] = useState<LineGraphDataPoint[]>([]);
  
  // Use ref to prevent infinite update loops
  const isUpdatingRef = useRef(false);
  const previousProductIdRef = useRef<number | null>(null);
  
  // Generate graph data when productId changes
  useEffect(() => {
    // Skip if we're already updating or productId hasn't changed
    if (isUpdatingRef.current || previousProductIdRef.current === productId) {
      return;
    }
    
    // Only generate new graph data if productId is valid and has changed
    if (productId && previousProductIdRef.current !== productId) {
      console.log('[useProductModalData] Generating graph data for product ID:', productId);
      previousProductIdRef.current = productId;
      setGraphData(generateDummyGraphData());
    }
  }, [productId]);
  
  // Process the graph data with our trend graph hook
  // We don't need to add graphData as a dependency since it's initialized just once
  const trendData = useTrendGraphData(graphData, {});
  
  useEffect(() => {
    const fetchData = async () => {
      // Skip if we're already updating or productId hasn't changed
      if (!productId || isUpdatingRef.current) {
        setLoading(false);
        return;
      }
      
      try {
        console.log('[useProductModalData] Fetching data for product ID:', productId);
        isUpdatingRef.current = true;
        setLoading(true);
        
        // Fetch the product information
        const product = await getProductById(productId);
        console.log('[useProductModalData] Product data received:', product);
        
        // Create the product data object, using values from trendData if available
        const data: ProductData = {
          id: product.artiId,
          name: product.artiNombre,
          iconName: product.Icon,
          maxPrice: 8000, // Fixed value instead of depending on trendData
          minPrice: 4000, // Fixed value instead of depending on trendData
          unit: '4 kg',
          date: formatDate(new Date()), // Current date
          trend: 'up', // Fixed value instead of depending on trendData
          trendPercentage: 5.2, // Fixed value instead of depending on trendData
          graphData,
        };
        
        setProductData(data);
        setError(null);
      } catch (err) {
        console.error('[useProductModalData] Error fetching product data:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
        isUpdatingRef.current = false;
      }
    };
    
    fetchData();
    
    // Return cleanup to ensure we don't have issues when component unmounts
    return () => {
      isUpdatingRef.current = false;
    };
  }, [productId]); // Remove trendData and graphData from dependencies
  
  return { productData, loading, error, trendData };
};

// Helper function to generate dummy graph data
const generateDummyGraphData = (): LineGraphDataPoint[] => {
  const data: LineGraphDataPoint[] = [];
  const today = new Date();
  
  // Generate data for last 10 days
  for (let i = 9; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate a random value between 3000 and 9000
    // But with a trend that goes up and down
    const baseValue = 6000;
    const variation = Math.sin(i * 0.7) * 2000;
    const randomness = (Math.random() - 0.5) * 1000;
    const value = Math.round(baseValue + variation + randomness);
    
    data.push({
      date,
      value,
    });
  }
  
  return data;
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