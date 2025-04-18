// src/features/detail/hooks/useDetailProductoInsumoData.ts
import { useState, useEffect } from 'react';

export interface DetailProductoInsumoData {
  id: string;
  name: string;
  type: 'producto' | 'insumo';
  currentPrice: number;
  unit: string;
  icon?: any;
  observationDate: string;
  location: {
    city: string;
    marketId: string;
  };
  priceDistribution: number[];
  historicalPrices: {
    date: Date;
    value: number;
  }[];
  aiInsights: string[];
}

export const useDetailProductoInsumoData = (
  id: string,
  type: 'producto' | 'insumo'
): DetailProductoInsumoData => {
  const [data, setData] = useState<DetailProductoInsumoData>({
    id,
    name: type === 'producto' ? 'Manzana' : 'Fertilizante NPK',
    type,
    currentPrice: 80000,
    unit: type === 'producto' ? 'bulto 10 kilos' : 'saco 50kg',
    observationDate: '5 abril, 2025',
    location: {
      city: 'Medellín, Antioquia - CMA',
      marketId: 'cma-001',
    },
    priceDistribution: [
      40000, 50000, 60000, 70000, 80000, 90000, 
      100000, 110000, 120000, 80000, 90000, 85000
    ],
    historicalPrices: generateHistoricalPrices(),
    aiInsights: [
      'En los últimos 6 meses, el variante xx ha superado el xx, volviéndose el mas caro en Colombia',
      'La tendencia de auge del precio se mantiene fuerte desde hace el año antepasado',
      'Los precios en la región central han aumentado un 15% más que el promedio nacional',
      'La temporada de lluvias ha afectado la producción, elevando los precios',
      'Se espera que los precios se estabilicen en el próximo trimestre',
      'Hay una correlación fuerte entre el precio de este producto y el precio del petróleo',
      'Las importaciones de este producto han disminuido un 25% en el último año',
      'La variedad premium ha mantenido precios más estables que la variedad estándar',
      'Los mercados locales ofrecen precios hasta 30% menores que las grandes cadenas'
    ],
  });
  
  // Generate dummy historical price data
  function generateHistoricalPrices() {
    const today = new Date();
    const daysToGenerate = 180; // 6 months
    
    return Array.from({ length: daysToGenerate }).map((_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - (daysToGenerate - i - 1));
      
      // Generate some random price data with an upward trend
      const baseValue = 200; // Starting at 200
      const randomFactor = Math.random() * 100;
      const trendFactor = i * (900 / daysToGenerate);
      const value = baseValue + randomFactor + trendFactor;
      
      return { date, value };
    });
  }
  
  // In a real app, you would fetch the data from an API here
  useEffect(() => {
    // Simulate API call
    console.log(`Fetching details for ${type} with ID: ${id}`);
    
    // In a real app, this would be an API call
    // fetchData(id, type).then(response => setData(response));
  }, [id, type]);
  
  return data;
};
