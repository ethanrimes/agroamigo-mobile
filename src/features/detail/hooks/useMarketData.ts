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
    name: 'Medellín - CMA',
    location: {
      city: 'Medellín, Antioquia',
      address: 'Calle 123 #45-67'
    },
    priceComparison: {
      percentage: 15,
      isExpensive: true,
      referenceMarket: 'Promedio Nacional'
    },
    observationDate: '5 abril, 2025',
    productComparisons: [
      // Fruits - Citrus
      {
        productId: 'p-001',
        productName: 'Naranja valencia',
        localPrice: 45000,
        referencePrice: 40000,
        difference: 12.5,
        unit: 'bulto 10 kilos'
      },
      {
        productId: 'p-002',
        productName: 'Limón tahití',
        localPrice: 35000,
        referencePrice: 30000,
        difference: 16.7,
        unit: 'bulto 5 kilos'
      },
      
      // Fruits - Others
      {
        productId: 'p-003',
        productName: 'Manzana',
        localPrice: 80000,
        referencePrice: 70000,
        difference: 14.3,
        unit: 'bulto 10 kilos'
      },
      {
        productId: 'p-004',
        productName: 'Papaya',
        localPrice: 42000,
        referencePrice: 45000,
        difference: -6.7,
        unit: 'unidad'
      },
      {
        productId: 'p-005',
        productName: 'Piña',
        localPrice: 38000,
        referencePrice: 40000,
        difference: -5.0,
        unit: 'unidad'
      },
      
      // Vegetables
      {
        productId: 'p-006',
        productName: 'Tomate',
        localPrice: 60000,
        referencePrice: 55000,
        difference: 9.1,
        unit: 'bulto 10 kilos'
      },
      {
        productId: 'p-007',
        productName: 'Cebolla',
        localPrice: 48000,
        referencePrice: 50000,
        difference: -4.0,
        unit: 'bulto 8 kilos'
      },
      {
        productId: 'p-008',
        productName: 'Zanahoria',
        localPrice: 32000,
        referencePrice: 30000,
        difference: 6.7,
        unit: 'bulto 5 kilos'
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