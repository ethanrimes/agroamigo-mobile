// src/features/home/hooks/useHomeData.ts
import { useState, useEffect } from 'react';
import { useQuery } from '../../../hooks';

// Types
interface PriceItem {
  id: string;
  title: string;
  price: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
}

interface NewsItem {
  id: string;
  text: string;
}

interface HomeData {
  prices: PriceItem[];
  news: NewsItem[];
  location: string;
  isLoading: boolean;
  error: Error | null;
}

// Mock data (replace with actual API calls)
const MOCK_PRICES: PriceItem[] = [
  {
    id: '1',
    title: 'Café',
    price: '$4.25',
    trend: 'down',
    trendValue: 'XX',
  },
  {
    id: '2',
    title: 'Manzana',
    price: '$2.10',
    trend: 'up',
    trendValue: 'XX',
  },
  {
    id: '3',
    title: 'Banano',
    price: '$1.50',
    trend: 'down',
    trendValue: 'XX',
  },
  {
    id: '4',
    title: 'Tomate',
    price: '$2.80',
    trend: 'up',
    trendValue: 'XX',
  },
  {
    id: '5',
    title: 'Naranja',
    price: '$1.75',
    trend: 'neutral',
    trendValue: 'XX',
  },
];

// Expanded news items to 9 entries
const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    text: 'Evento 1: Feria agrícola en el parque central',
  },
  {
    id: '2',
    text: 'Evento 2: Nuevos subsidios para agricultores',
  },
  {
    id: '3',
    text: 'Evento 3: Exportaciones de café aumentan un 15%',
  },
  {
    id: '4',
    text: 'Evento 4: Capacitación gratuita en técnicas de cultivo',
  },
  {
    id: '5',
    text: 'Evento 5: Mercado campesino este fin de semana',
  },
  {
    id: '6',
    text: 'Evento 6: Pronóstico de lluvias favorece cosechas',
  },
  {
    id: '7',
    text: 'Evento 7: Nueva tecnología para el monitoreo de cultivos',
  },
  {
    id: '8',
    text: 'Evento 8: Precios del maíz se estabilizan',
  },
  {
    id: '9',
    text: 'Evento 9: Inauguración del centro de distribución agrícola',
  },
];

export const useHomeData = (): HomeData => {
  const [location, setLocation] = useState('Medellín, Antioquia');
  
  // Fetch saved prices from API
  const { 
    data: pricesData,
    isLoading: isPricesLoading,
    error: pricesError
  } = useQuery('savedPrices', async () => {
    // Simulate API call
    return new Promise<PriceItem[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PRICES);
      }, 500);
    });
  });
  
  // Fetch news from API
  const {
    data: newsData,
    isLoading: isNewsLoading,
    error: newsError
  } = useQuery('news', async () => {
    // Simulate API call
    return new Promise<NewsItem[]>((resolve) => {
      setTimeout(() => {
        resolve(MOCK_NEWS);
      }, 700);
    });
  });
  
  // Fetch user location
  useEffect(() => {
    // Simulate getting location from device or user preferences
    const fetchLocation = async () => {
      // In a real app, this would use geolocation or user settings
      setLocation('Medellín, Antioquia');
    };
    
    fetchLocation();
  }, []);
  
  return {
    prices: pricesData || [],
    news: newsData || [],
    location,
    isLoading: isPricesLoading || isNewsLoading,
    error: pricesError || newsError,
  };
};

export default useHomeData;