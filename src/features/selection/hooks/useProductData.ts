// src/features/selection/hooks/useProductData.ts
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

export const useProductData = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        console.log('[useProductData] Fetching products data');
        const productCategories = await fetchProductsData();
        setData(productCategories);
        setLoading(false);
      } catch (err) {
        console.error('[useProductData] Error fetching data:', err);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to fetch and structure product data
  const fetchProductsData = async (): Promise<Category[]> => {
    try {
      console.log('[useProductData] Fetching products, major categories, and subcategories');
      
      // Fetch all the necessary data in parallel for better performance
      const [products, majorCategories, subcategories] = await Promise.all([
        getProducts(),
        getMajorCategories(),
        getSubcategories()
      ]);
      
      console.log(`[useProductData] Fetched ${products.length} products, ${majorCategories.length} major categories, ${subcategories.length} subcategories`);
      
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
            id: `sub-${subcategory.SubcategoryId}`,
            title: subcategory.Subcategory,
            items: []
          };
          
          subCategoriesMap.set(subcategory.SubcategoryId, subCategory);
          category.subCategories.push(subCategory);
        } else {
          console.log(`WARNING: No major category found for subcategory ${subcategory.Subcategory} (ID: ${subcategory.SubcategoryId}, Major Category ID: ${subcategory.MajorCategoryId})`);
        }
      });
      
      // Finally, add products to their respective subcategories
      let matchedProducts = 0;
      products.forEach(product => {
        const subCategory = subCategoriesMap.get(product.SubcategoryId);
        
        if (subCategory) {
          matchedProducts++;
          const selectionItem: SelectionItem = {
            id: product.artiId.toString(),
            title: product.artiNombre,
            price: '$xx.xx', // You might want to fetch actual prices from another service
            trend: determineTrend(), // You might want to determine trend based on historical data
          };
          
          subCategory.items.push(selectionItem);
        }
      });
      
      console.log(`[useProductData] Product mapping results: Matched ${matchedProducts} out of ${products.length} products`);
      
      // Filter out categories with no subcategories or empty subcategories
      const result = Array.from(categoriesMap.values())
        .filter(category => 
          category.subCategories.length > 0 && 
          category.subCategories.some(subCategory => subCategory.items.length > 0)
        );
      
      console.log(`[useProductData] Constructed ${result.length} categories with data`);
      
      return result;
    } catch (error) {
      console.error('[useProductData] Error in fetchProductsData:', error);
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

export default useProductData;