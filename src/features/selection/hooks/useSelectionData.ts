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
      
      // Debug: Log samples of each data type
      console.log('DEBUG - Sample Products (5):');
      products.slice(0, 5).forEach((p, i) => console.log(`  Product ${i+1}:`, p));
      
      console.log('DEBUG - Sample Major Categories (5 or all):');
      majorCategories.slice(0, 5).forEach((c, i) => console.log(`  Category ${i+1}:`, c));
      
      console.log('DEBUG - Sample Subcategories (5):');
      subcategories.slice(0, 5).forEach((s, i) => console.log(`  Subcategory ${i+1}:`, s));
      
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
      
      console.log('DEBUG - Categories created from major categories:');
      console.log(`  Total categories: ${categoriesMap.size}`);
      console.log('  Category IDs in map:', Array.from(categoriesMap.keys()));
      
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
      
      console.log('DEBUG - Subcategories Map:');
      console.log(`  Total subcategories: ${subCategoriesMap.size}`);
      console.log('  Subcategory IDs in map:', Array.from(subCategoriesMap.keys()));
      
      // Check data types of keys
      console.log('DEBUG - Data type check:');
      if (products.length > 0) {
        console.log(`  First 5 product SubcategoryId types:`);
        products.slice(0, 5).forEach((p, i) => 
          console.log(`    Product ${i+1} SubcategoryId: ${p.SubcategoryId}, Type: ${typeof p.SubcategoryId}`)
        );
      }
      
      if (subCategoriesMap.size > 0) {
        console.log(`  First 5 subcategory key types:`);
        Array.from(subCategoriesMap.keys()).slice(0, 5).forEach((key, i) => 
          console.log(`    Subcategory key ${i+1}: ${key}, Type: ${typeof key}`)
        );
      }
      
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
      
      console.log(`DEBUG - Product mapping results: Matched ${matchedProducts} out of ${products.length} products`);
      
      // Debug: Show the first 5 categories and their subcategories with item counts
      console.log('DEBUG - Category structure after mapping:');
      Array.from(categoriesMap.values()).slice(0, 5).forEach((category, i) => {
        console.log(`  Category ${i+1}: ${category.title}`);
        console.log(`    Subcategories: ${category.subCategories.length}`);
        category.subCategories.forEach((sub, j) => {
          console.log(`      Subcategory ${j+1}: ${sub.title}, Items: ${sub.items.length}`);
        });
      });
      
      // Try a direct lookup for the first 5 products
      console.log('DEBUG - Direct lookup test for 5 products:');
      products.slice(0, 5).forEach((product, i) => {
        const subCategory = subCategoriesMap.get(product.SubcategoryId);
        console.log(`  Product ${i+1} (${product.artiNombre}, SubcategoryId: ${product.SubcategoryId}): ${subCategory ? 'MATCHED' : 'NOT MATCHED'}`);
      });
      
      // Filter out categories with no subcategories or empty subcategories
      const result = Array.from(categoriesMap.values())
        .filter(category => 
          category.subCategories.length > 0 && 
          category.subCategories.some(subCategory => subCategory.items.length > 0)
        );
      
      console.log(`[useSelectionData] Constructed ${result.length} categories with data`);
      
      // If no categories were constructed, check why
      if (result.length === 0) {
        console.log('DEBUG - Why no categories were constructed:');
        
        const allCategories = Array.from(categoriesMap.values());
        console.log(`  Total unfiltered categories: ${allCategories.length}`);
        
        const withSubcategories = allCategories.filter(cat => cat.subCategories.length > 0);
        console.log(`  Categories with subcategories: ${withSubcategories.length}`);
        
        const withItems = allCategories.filter(cat => 
          cat.subCategories.some(sub => sub.items.length > 0)
        );
        console.log(`  Categories with subcategories containing items: ${withItems.length}`);
        
        // If we're still getting no results, let's try creating a test category 
        // with some products to ensure the UI rendering works
        if (result.length === 0 && products.length > 0) {
          console.log('DEBUG - Creating a test category with sample products for UI testing');
          
          const testCategory: Category = {
            id: 'test-category',
            title: 'Test Category',
            icon: 'apple',
            subCategories: [
              {
                id: 'test-subcategory',
                title: 'Test Subcategory',
                items: products.slice(0, 10).map(product => ({
                  id: product.artiId.toString(),
                  title: product.artiNombre,
                  price: '$xx.xx',
                  trend: 'up' as const,
                }))
              }
            ]
          };
          
          // Uncomment this to add a test category for UI debugging
          // return [testCategory];
        }
      }
      
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