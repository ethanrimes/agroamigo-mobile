// src/features/detail/hooks/useMarketData.ts
import { useState, useEffect } from 'react';

export interface MarketData {
  id: string;
  name: string;
  location: {
    city: string;
    address: string;
  };
  priceComparison: {
    percentage: number;
    isExpensive: boolean;
    referenceMarket: string;
  };
  observationDate: string;
  productComparisons: Array<{
    productId: string;
    productName: string;
    localPrice: number;
    referencePrice: number;
    difference: number;
    unit: string;
  }>;
}

export const useMarketData = (id: string): MarketData => {
  const [data, setData] = useState<MarketData>({
    id,
    name: 'CMA Medellín',
    location: {
      city: 'Medellín, Antioquia',
      address: 'Calle 123 #45-67'
    },
    priceComparison: {
      percentage: 15,
      isExpensive: true,
      referenceMarket: 'Promedio nacional'
    },
    observationDate: '5 abril, 2025',
    productComparisons: [
      {
        productId: 'p-001',
        productName: 'Manzana',
        localPrice: 80000,
        referencePrice: 70000,
        difference: 14.3,
        unit: 'bulto 10 kilos'
      },
      {
        productId: 'p-002',
        productName: 'Naranja',
        localPrice: 45000,
        referencePrice: 50000,
        difference: -10,
        unit: 'bulto 10 kilos'
      },
      {
        productId: 'p-003',
        productName: 'Tomate',
        localPrice: 60000,
        referencePrice: 55000,
        difference: 9.1,
        unit: 'bulto 10 kilos'
      }
    ]
  });
  
  // In a real app, you would fetch the data from an API here
  useEffect(() => {
    // Simulate API call
    console.log(`Fetching details for market with ID: ${id}`);
    
    // In a real app, this would be an API call
    // fetchMarketData(id).then(response => setData(response));
  }, [id]);
  
  return data;
};
