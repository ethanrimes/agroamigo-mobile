// src/features/selection/hooks/useSelectionData.ts
import { useState, useEffect } from 'react';
import { Category, SelectionItem, SubCategory } from '../components/body/SelectionPageContentSpace';

// Import Supabase entity services
import { getProducts, Product } from '@/src/services/supabase/entities/products';
import { getMajorCategories, MajorCategory } from '@/src/services/supabase/entities/majorCategories';
import { getSubcategories, Subcategory } from '@/src/services/supabase/entities/subcategories';

// Add a mapping of icon names to match major categories
const CATEGORY_ICON_MAP: Record<string, string> = {
  'Frutas': 'apple',
  'Verduras y Hortalizas': 'leaf',
  'Cereales': 'package',
  'Legumbres': 'coffee',
  'Carnes': 'target',
  'Lácteos': 'droplet',
  // Add more mappings as needed
  // Default fallback
  'default': 'circle'
};

export type SelectionType = 'products' | 'markets' | 'insumos';

export const useSelectionData = (type: SelectionType) => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      
      try {
        console.log(`[useSelectionData] Fetching data for type: ${type}`);
        
        switch (type) {
          case 'products':
            const productCategories = await fetchProductsData();
            setData(productCategories);
            break;
          case 'markets':
            // Keep the existing mock markets data for now
            // In the future, this would be replaced with actual Supabase fetching
            setData(mockMarketsData);
            break;
          case 'insumos':
            // Keep the existing mock insumos data for now
            // In the future, this would be replaced with actual Supabase fetching
            setData(mockInsumosData);
            break;
          default:
            setData([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('[useSelectionData] Error fetching data:', err);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  // Function to fetch and structure product data
  const fetchProductsData = async (): Promise<Category[]> => {
    try {
      console.log('[useSelectionData] Fetching products, major categories, and subcategories');
      
      // Fetch all the necessary data in parallel for better performance
      const [products, majorCategories, subcategories] = await Promise.all([
        getProducts(),
        getMajorCategories(),
        getSubcategories()
      ]);
      
      console.log(`[useSelectionData] Fetched ${products.length} products, ${majorCategories.length} major categories, ${subcategories.length} subcategories`);
      
      // Transform the data into the required structure
      const categoriesMap = new Map<number, Category>();
      
      // First, create categories from major categories
      majorCategories.forEach(majorCategory => {
        const iconName = CATEGORY_ICON_MAP[majorCategory.MajorCategory] || CATEGORY_ICON_MAP.default;
        
        categoriesMap.set(majorCategory.MajorCategoryId, {
          id: `major-${majorCategory.MajorCategoryId}`,
          title: majorCategory.MajorCategory,
          icon: iconName,
          subCategories: []
        });
      });
      
      // Then, add subcategories to their respective major categories
      const subCategoriesMap = new Map<number, SubCategory>();
      
      subcategories.forEach(subcategory => {
        const category = categoriesMap.get(subcategory.MajorCategoryId);
        
        if (category) {
          const subCategory: SubCategory = {
            id: `sub-${subcategory.Subcategory_Id}`,
            title: subcategory.Subcategory,
            items: []
          };
          
          subCategoriesMap.set(subcategory.Subcategory_Id, subCategory);
          category.subCategories.push(subCategory);
        }
      });
      
      // Finally, add products to their respective subcategories
      products.forEach(product => {
        const subCategory = subCategoriesMap.get(product.SubcategoryId);
        
        if (subCategory) {
          const selectionItem: SelectionItem = {
            id: product.artiId.toString(),
            title: product.artiNombre,
            price: '$xx.xx', // You might want to fetch actual prices from another service
            trend: determineTrend(), // You might want to determine trend based on historical data
          };
          
          subCategory.items.push(selectionItem);
        }
      });
      
      // Filter out categories with no subcategories or empty subcategories
      const result = Array.from(categoriesMap.values())
        .filter(category => 
          category.subCategories.length > 0 && 
          category.subCategories.some(subCategory => subCategory.items.length > 0)
        );
      
      console.log(`[useSelectionData] Constructed ${result.length} categories with data`);
      
      return result;
    } catch (error) {
      console.error('[useSelectionData] Error in fetchProductsData:', error);
      throw error;
    }
  };

  // Helper to randomly determine a trend (replace with actual logic later)
  const determineTrend = (): 'up' | 'down' | 'stable' => {
    const random = Math.random();
    if (random < 0.33) return 'up';
    if (random < 0.66) return 'down';
    return 'stable';
  };

  return { data, loading, error };
};

// Mock data for markets (keeping for now)
const mockMarketsData: Category[] = [
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

// Mock data for insumos (keeping for now)
const mockInsumosData: Category[] = [
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

export default useSelectionData;