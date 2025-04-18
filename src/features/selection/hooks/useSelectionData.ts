// src/features/selection/hooks/useSelectionData.ts
import { useState, useEffect } from 'react';
import { Category } from '../components/body';

type SelectionType = 'products' | 'markets' | 'insumos';

// Mock data for products
const productsData: Category[] = [
  {
    id: 'fruits',
    title: 'Frutas',
    icon: 'apple',
    subCategories: [
      {
        id: 'citrus',
        title: 'Cítricos',
        items: [
          {
            id: 'limon-tahiti',
            title: 'Limón - tahití',
            price: '$xx.xx',
            trend: 'up',
          },
          {
            id: 'limon-comun',
            title: 'Limón – común',
            price: '$xx.xx',
            trend: 'down',
          },
          {
            id: 'mandarina',
            title: 'Mandarina',
            price: '$xx.xx',
            trend: 'up',
          },
        ],
      },
      {
        id: 'other-fruits',
        title: 'Otras Frutas',
        items: [
          {
            id: 'uva-isabela',
            title: 'Uva - Isabela',
            price: '$xx.xx',
            trend: 'down',
          },
          {
            id: 'uva-importada',
            title: 'Uva - importada',
            price: '$xx.xx',
            trend: 'up',
          },
        ],
      },
    ],
  },
  {
    id: 'vegetables',
    title: 'Verduras y Hortalizas',
    icon: 'leaf',
    subCategories: [
      {
        id: 'leafy-greens',
        title: 'Vegetales de Hoja',
        items: [
          {
            id: 'lechuga',
            title: 'Lechuga',
            price: '$xx.xx',
            trend: 'stable',
          },
          {
            id: 'espinaca',
            title: 'Espinaca',
            price: '$xx.xx',
            trend: 'up',
          },
        ],
      },
    ],
  },
];

// Mock data for markets
const marketsData: Category[] = [
  {
    id: 'regional-markets',
    title: 'Mercados Regionales',
    icon: 'globe',
    subCategories: [
      {
        id: 'antioquia',
        title: 'Antioquia',
        items: [
          {
            id: 'medellin-market',
            title: 'Medellín Central',
            subtitle: 'Mercado Central',
            price: '24 vendedores',
            trend: 'up',
          },
          {
            id: 'envigado-market',
            title: 'Envigado',
            subtitle: 'Mercado Municipal',
            price: '12 vendedores',
            trend: 'stable',
          },
        ],
      },
    ],
  },
];

// Mock data for insumos (supplies)
const insumosData: Category[] = [
  {
    id: 'fertilizers',
    title: 'Fertilizantes',
    icon: 'shopping-bag',
    subCategories: [
      {
        id: 'organic',
        title: 'Orgánicos',
        items: [
          {
            id: 'compost',
            title: 'Compost',
            subtitle: 'Natural',
            price: '$xx.xx',
            trend: 'down',
          },
          {
            id: 'humus',
            title: 'Humus de Lombriz',
            price: '$xx.xx',
            trend: 'stable',
          },
        ],
      },
      {
        id: 'chemical',
        title: 'Químicos',
        items: [
          {
            id: 'npk',
            title: 'NPK 15-15-15',
            price: '$xx.xx',
            trend: 'up',
          },
        ],
      },
    ],
  },
];

export const useSelectionData = (type: SelectionType) => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Return appropriate data based on type
        switch (type) {
          case 'products':
            setData(productsData);
            break;
          case 'markets':
            setData(marketsData);
            break;
          case 'insumos':
            setData(insumosData);
            break;
          default:
            setData([]);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  return { data, loading, error };
};

export default useSelectionData;