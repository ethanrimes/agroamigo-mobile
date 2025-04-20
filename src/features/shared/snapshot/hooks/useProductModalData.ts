// src/features/shared/snapshot/hooks/useProductModalData.ts
import { useState, useEffect, useRef, useMemo } from 'react';
import { getProductById, Product } from '@/src/services/supabase/entities/products';
import { getDailyPriceObservationsByProduct, DailyPriceObservation } from '@/src/services/supabase/entities/prices';
import { LineGraphDataPoint } from '@/src/hooks/useD3';

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

// Define a TrendData interface similar to what would be returned by useTrendGraphData
interface TrendData {
  linePath: string;
  points: Array<{
    cx: number;
    cy: number;
    r: number;
    value: number;
    date: Date;
  }>;
  xAxisTicks: Array<{
    value: Date;
    xOffset: number;
    label: string;
  }>;
  yAxisTicks: Array<{
    value: number;
    yOffset: number;
    label: string;
  }>;
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  trendPercentage: number;
  trendDirection: 'up' | 'down' | 'stable';
}

export const useProductModalData = (productId: number | null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [graphData, setGraphData] = useState<LineGraphDataPoint[]>([]);
  const [trendData, setTrendData] = useState<TrendData | null>(null);
  
  // Use ref to prevent infinite update loops
  const isUpdatingRef = useRef(false);
  
  // Store the dummy data once to avoid regeneration
  const dummyDataRef = useRef<Record<number, LineGraphDataPoint[]>>({});
  
  // Generate deterministic dummy data based on productId
  const generateDummyGraphData = (prodId: number): LineGraphDataPoint[] => {
    // If we already generated dummy data for this product, return it
    if (dummyDataRef.current[prodId]) {
      return dummyDataRef.current[prodId];
    }
    
    const data: LineGraphDataPoint[] = [];
    const today = new Date();
    
    // Base values - completely deterministic, no randomness
    const baseValues = [
      5800, 6300, 5900, 6100, 6700, 7200, 6800, 6500, 6900, 7100
    ];
    
    // Make values consistent but different based on productId
    const modifier = (prodId % 4) * 500;
    
    // Generate data for last 10 days
    for (let i = 9; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Use base value + a modifier based on productId
      const value = baseValues[9 - i] + modifier;
      
      data.push({
        date,
        value,
      });
    }
    
    // Store the generated data for this productId
    dummyDataRef.current[prodId] = data;
    return data;
  };
  
  // Convert price observations to graph data points
  const convertObservationsToGraphData = (
    observations: DailyPriceObservation[]
  ): LineGraphDataPoint[] => {
    if (!observations || observations.length === 0) {
      return productId ? generateDummyGraphData(productId) : [];
    }
    
    // Sort observations by date
    const sortedObservations = [...observations].sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    // Convert to LineGraphDataPoint format
    return sortedObservations.map(obs => ({
      date: obs.date ? new Date(obs.date) : new Date(),
      value: obs.maxPrice // Using maxPrice as the value
    }));
  };
  
  // Helper function to calculate trend based on price observations
  const calculateTrend = (priceObservations: DailyPriceObservation[]) => {
    if (!priceObservations || priceObservations.length < 2) {
      return {
        trendDirection: 'stable' as const,
        trendPercentage: 0
      };
    }
    
    // Sort observations by date
    const sortedObservations = [...priceObservations].sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    // Get first and last price points (using maxPrice for consistency)
    const firstObs = sortedObservations[0];
    const lastObs = sortedObservations[sortedObservations.length - 1];
    
    const firstValue = firstObs.maxPrice;
    const lastValue = lastObs.maxPrice;
    const change = lastValue - firstValue;
    const trendPercentage = Math.abs(
      firstValue !== 0 ? (change / firstValue) * 100 : 0
    );
    
    let trendDirection: 'up' | 'down' | 'stable' = 'stable';
    if (change > 0) {
      trendDirection = 'up';
    } else if (change < 0) {
      trendDirection = 'down';
    }
    
    return {
      trendDirection,
      trendPercentage: Math.round(trendPercentage * 10) / 10 // Round to 1 decimal place
    };
  };
  
  // Generate a simplified version of trend data that would normally come from useTrendGraphData
  const generateSimplifiedTrendData = (graphData: LineGraphDataPoint[]): TrendData | null => {
    if (!graphData || graphData.length === 0) {
      return null;
    }
    
    // Calculate min, max, average prices from the graph data
    const prices = graphData.map(point => point.value);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const averagePrice = prices.reduce((sum, val) => sum + val, 0) / prices.length;
    
    // Calculate trend
    const sortedData = [...graphData].sort((a, b) => a.date.getTime() - b.date.getTime());
    const firstValue = sortedData[0].value;
    const lastValue = sortedData[sortedData.length - 1].value;
    const change = lastValue - firstValue;
    const trendPercentage = Math.abs(
      firstValue !== 0 ? (change / firstValue) * 100 : 0
    );
    
    let trendDirection: 'up' | 'down' | 'stable' = 'stable';
    if (change > 0) {
      trendDirection = 'up';
    } else if (change < 0) {
      trendDirection = 'down';
    }
    
    // Create simplified mock data for visualization elements
    // (This would normally be calculated by useTrendGraphData with d3)
    const width = 300;
    const height = 180;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Create simplified visualization elements based on the graph data
    // These would normally be generated by d3 in useTrendGraphData
    const points = graphData.map((d, i) => {
      const x = (i / (graphData.length - 1)) * innerWidth;
      const yRange = maxPrice - minPrice;
      const y = innerHeight - ((d.value - minPrice) / yRange) * innerHeight;
      
      return {
        cx: x,
        cy: y,
        r: 3,
        value: d.value,
        date: d.date
      };
    });
    
    // Generate a simplified path string
    let linePath = '';
    points.forEach((point, i) => {
      if (i === 0) {
        linePath += `M${point.cx},${point.cy}`;
      } else {
        linePath += ` L${point.cx},${point.cy}`;
      }
    });
    
    // Generate axis ticks
    const xAxisTicks = graphData.filter((_, i) => i % 2 === 0).map((d, i) => {
      return {
        value: d.date,
        xOffset: (i / (Math.ceil(graphData.length / 2) - 1)) * innerWidth,
        label: formatShortDate(d.date)
      };
    });
    
    const yAxisTicks = [minPrice, (minPrice + maxPrice) / 2, maxPrice].map((value, i) => {
      return {
        value,
        yOffset: innerHeight - (i / 2) * innerHeight,
        label: formatValue(value)
      };
    });
    
    return {
      linePath,
      points,
      xAxisTicks,
      yAxisTicks,
      minPrice,
      maxPrice,
      averagePrice,
      trendPercentage: Math.round(trendPercentage * 10) / 10,
      trendDirection
    };
  };
  
  // Effect to fetch product data when productId changes
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
        
        // 1. Fetch the product information
        const product: Product = await getProductById(productId);
        
        // 2. Fetch price observations for this product
        const priceObservations: DailyPriceObservation[] = 
          await getDailyPriceObservationsByProduct(productId);
        
        // 3. Convert observations to graph data
        let priceGraphData: LineGraphDataPoint[];
        
        if (priceObservations && priceObservations.length > 0) {
          priceGraphData = convertObservationsToGraphData(priceObservations);
        } else {
          // Use deterministic dummy data based on productId
          priceGraphData = generateDummyGraphData(productId);
        }
        
        // 4. Calculate trend based on observations
        const { trendDirection, trendPercentage } = calculateTrend(priceObservations);
        
        // 5. Find min and max prices
        let minPrice = 0;
        let maxPrice = 0;
        
        if (priceObservations && priceObservations.length > 0) {
          minPrice = Math.min(...priceObservations.map(obs => obs.minPrice));
          maxPrice = Math.max(...priceObservations.map(obs => obs.maxPrice));
        } else {
          // Default values based on dummy data
          const prices = priceGraphData.map(point => point.value);
          minPrice = Math.min(...prices);
          maxPrice = Math.max(...prices);
        }
        
        // 6. Create complete product data object
        const data: ProductData = {
          id: product.artiId,
          name: product.artiNombre,
          iconName: product.Icon,
          maxPrice: maxPrice, 
          minPrice: minPrice,
          unit: '4 kg', // This should ideally come from a units table lookup
          date: formatDate(new Date()), // Current date
          trend: trendDirection,
          trendPercentage: trendPercentage,
          graphData: priceGraphData,
        };
        
        // 7. Generate trend data that would normally come from useTrendGraphData
        const generatedTrendData = generateSimplifiedTrendData(priceGraphData);
        
        // 8. Set all state at once
        setGraphData(priceGraphData);
        setProductData(data);
        setTrendData(generatedTrendData);
        setError(null);
      } catch (err) {
        console.error('[useProductModalData] Error fetching product data:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
        isUpdatingRef.current = false;
      }
    };
    
    if (productId) {
      fetchData();
    }
    
    return () => {
      isUpdatingRef.current = false;
    };
  }, [productId]); // Only depend on productId
  
  // Use useMemo to ensure stable references for the returned data
  const result = useMemo(() => ({
    productData,
    loading,
    error,
    graphData,
    trendData
  }), [productData, loading, error, graphData, trendData]);
  
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

// Helper function for short date format (for axis labels)
const formatShortDate = (date: Date): string => {
  return date.toLocaleDateString('es-CO', {
    month: 'short',
    day: 'numeric',
  });
};

// Helper function to format currency value
const formatValue = (value: number): string => {
  return `$${value.toLocaleString('es-CO')}`;
};

export default useProductModalData;