// features/detail/hooks/useDetailProductoInsumoData.ts
import { useState, useEffect } from 'react';
import { LineGraphDataPoint } from '../../../hooks/useD3';

interface DetailProductoInsumoDataParams {
  productId?: string;
  insumoId?: string;
  locationId?: string;
  period?: 'week' | 'month' | 'year' | 'all';
  distributionPeriod?: 'current' | 'week' | 'month';
}

interface DetailProductoInsumoDataResult {
  // Historical prices for line graph
  historicalPrices: LineGraphDataPoint[];
  // Price distribution across markets for histogram
  priceDistribution: number[];
  // Loading state
  loading: boolean;
  // Error state
  error: Error | null;
  // Current price
  currentPrice?: number;
  // Product or insumo name
  itemName?: string;
  // Product or insumo category
  category?: string;
  // Location name
  locationName?: string;
  // Refresh data
  refresh: () => void;
}

/**
 * Hook to fetch and manage data for producto/insumo detail view
 */
export const useDetailProductoInsumoData = ({
  productId,
  insumoId,
  locationId,
  period = 'month',
  distributionPeriod = 'current',
}: DetailProductoInsumoDataParams): DetailProductoInsumoDataResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [historicalPrices, setHistoricalPrices] = useState<LineGraphDataPoint[]>([]);
  const [priceDistribution, setPriceDistribution] = useState<number[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number | undefined>(undefined);
  const [itemName, setItemName] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [locationName, setLocationName] = useState<string | undefined>(undefined);

  // Helper to generate a random price around a base value
  const generateRandomPrice = (basePrice: number, variance = 0.2) => {
    const varianceAmount = basePrice * variance;
    return basePrice + (Math.random() * varianceAmount * 2 - varianceAmount);
  };

  // Helper to create date X days ago
  const daysAgo = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  };

  // Generate dummy historical price data based on period
  const generateHistoricalPrices = (period: 'week' | 'month' | 'year' | 'all') => {
    let days: number;
    let interval: number;
    let basePrice: number;
    
    if (productId) {
      // Prices for agricultural products
      basePrice = productId === '1' ? 2.5 : productId === '2' ? 4.8 : 3.2;
    } else {
      // Prices for agricultural inputs (higher)
      basePrice = insumoId === '1' ? 45.0 : insumoId === '2' ? 120.0 : 85.5;
    }
    
    switch (period) {
      case 'week':
        days = 7;
        interval = 1;
        break;
      case 'month':
        days = 30;
        interval = 2;
        break;
      case 'year':
        days = 365;
        interval = 15;
        break;
      case 'all':
      default:
        days = 730; // 2 years
        interval = 30;
        break;
    }
    
    // Create array of dates and price values
    const data: LineGraphDataPoint[] = [];
    
    // Seasonal pattern: higher prices in middle of period
    const seasonalFactor = (dayNum: number, totalDays: number) => {
      // Create a slight seasonal curve
      const normalizedPosition = dayNum / totalDays;
      // Peak in the middle with higher prices
      return Math.sin(normalizedPosition * Math.PI) * 0.2 + 0.9;
    };
    
    // General trend: slight increase over time (inflation)
    const trendFactor = (dayNum: number, totalDays: number) => {
      // Price gradually increases over time
      return 1 + (dayNum / totalDays) * 0.1;
    };
    
    // Generate prices with seasonality and trend
    for (let i = days; i >= 0; i -= interval) {
      const dayPosition = days - i;
      const season = seasonalFactor(dayPosition, days);
      const trend = trendFactor(dayPosition, days);
      
      // Calculate price with seasonality, trend and some randomness
      const price = basePrice * season * trend * (0.95 + Math.random() * 0.1);
      
      data.push({
        date: daysAgo(i),
        value: parseFloat(price.toFixed(2)),
      });
    }
    
    // Set the current price from the latest data point
    if (data.length > 0) {
      setCurrentPrice(data[data.length - 1].value);
    }
    
    return data;
  };

  // Generate dummy price distribution data
  const generatePriceDistribution = (period: 'current' | 'week' | 'month') => {
    let basePrice: number;
    let variance: number;
    let count: number;
    
    if (productId) {
      // Distribution for agricultural products
      basePrice = productId === '1' ? 2.5 : productId === '2' ? 4.8 : 3.2;
      variance = 0.3; // 30% variance between markets
    } else {
      // Distribution for agricultural inputs
      basePrice = insumoId === '1' ? 45.0 : insumoId === '2' ? 120.0 : 85.5;
      variance = 0.15; // 15% variance between markets for inputs (more standardized)
    }
    
    // Number of data points based on period
    switch (period) {
      case 'current':
        count = 12; // Current market prices
        break;
      case 'week':
        count = 20; // Weekly aggregated prices
        break;
      case 'month':
      default:
        count = 30; // Monthly aggregated prices
        break;
    }
    
    // Generate random price array
    const prices: number[] = [];
    
    // Create normal distribution around base price
    for (let i = 0; i < count; i++) {
      // Use a skewed normal distribution for more realistic price distribution
      const skew = 0.3; // Positive skew (higher prices less common)
      
      // Box-Muller transform for normal distribution
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      
      // Apply skew and scale to base price
      const randomVariance = z * variance * basePrice;
      const skewedVariance = randomVariance + Math.abs(randomVariance) * skew;
      const price = basePrice + skewedVariance;
      
      prices.push(parseFloat(Math.max(price, basePrice * 0.7).toFixed(2)));
    }
    
    return prices;
  };

  // Mock data fetch function
  const fetchData = () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      setTimeout(() => {
        // Generate historical price data
        const histPrices = generateHistoricalPrices(period);
        setHistoricalPrices(histPrices);
        
        // Generate price distribution data
        const priceDist = generatePriceDistribution(distributionPeriod);
        setPriceDistribution(priceDist);
        
        // Set additional metadata
        setItemName(productId 
          ? ['Papas', 'Tomates', 'Cebollas'][parseInt(productId || '0') % 3] 
          : ['Fertilizante', 'Pesticida', 'Semillas'][parseInt(insumoId || '0') % 3]
        );
        
        setCategory(productId 
          ? ['Tubérculos', 'Vegetales', 'Hortalizas'][parseInt(productId || '0') % 3] 
          : ['Nutrientes', 'Protección', 'Siembra'][parseInt(insumoId || '0') % 3]
        );
        
        setLocationName(locationId 
          ? ['Lima', 'Arequipa', 'Cusco'][parseInt(locationId || '0') % 3]
          : 'Nacional'
        );
        
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setLoading(false);
    }
  };

  // Fetch data on initial load and when dependencies change
  useEffect(() => {
    fetchData();
  }, [productId, insumoId, locationId, period, distributionPeriod]);

  // Function to manually refresh data
  const refresh = () => {
    fetchData();
  };

  return {
    historicalPrices,
    priceDistribution,
    loading,
    error,
    currentPrice,
    itemName,
    category,
    locationName,
    refresh,
  };
};