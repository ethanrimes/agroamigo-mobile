// src/features/selection/hooks/useMarketData.ts
import { useState, useEffect } from 'react';
import { Category, SelectionItem, SubCategory } from '../components/body/SelectionPageContentSpace';

// Import Supabase entity services
import { getMarkets, Market } from '@/src/services/supabase/entities/mercado';
import { getDepartamentos, Departamento } from '@/src/services/supabase/entities/departamento';
import { getMunicipios, Municipio } from '@/src/services/supabase/entities/municipio';

// Removed the DEPARTAMENTO_ICON_MAP since we now have Icon field in the database

export const useMarketData = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        console.log('[useMarketData] Fetching markets, departamentos, and municipios');
        
        // Fetch all the necessary data in parallel for better performance
        const [markets, departamentos, municipios] = await Promise.all([
          getMarkets(),
          getDepartamentos(),
          getMunicipios()
        ]);
        
        console.log(`[useMarketData] Fetched ${markets.length} markets, ${departamentos.length} departamentos, ${municipios.length} municipios`);
        
        // Transform the data into the required hierarchical structure
        const categoriesMap = new Map<number, Category>();
        
        // First, create categories from departamentos
        departamentos.forEach(departamento => {
          // Use the Icon field from the database instead of the map
          categoriesMap.set(departamento.CodDepartamento, {
            id: `dep-${departamento.CodDepartamento}`,
            title: departamento.Departamento,
            icon: departamento.Icon,
            subCategories: []
          });
        });
        
        // Then, create subcategories from municipios and add them to their respective departamentos
        const subCategoriesMap = new Map<number, SubCategory>();
        
        municipios.forEach(municipio => {
          const category = categoriesMap.get(municipio.CodDepartamento);
          
          if (category) {
            const subCategory: SubCategory = {
              id: `mun-${municipio.CodMunicipio}`,
              title: municipio.Municipio,
              items: []
            };
            
            subCategoriesMap.set(municipio.CodMunicipio, subCategory);
            category.subCategories.push(subCategory);
          } else {
            console.log(`WARNING: No departamento found for municipio ${municipio.Municipio} (ID: ${municipio.CodMunicipio}, Departamento ID: ${municipio.CodDepartamento})`);
          }
        });
        
        // Finally, add markets to their respective municipios
        let matchedMarkets = 0;
        markets.forEach(market => {
          const subCategory = subCategoriesMap.get(market.CodMunicipio);
          
          if (subCategory) {
            matchedMarkets++;
            const selectionItem: SelectionItem = {
              id: market.fuenId.toString(),
              title: market.Mercado,
              subtitle: market.Municipio,
              price: `${getRandomVendorCount()} vendedores`,
              trend: determineTrend(),
              // Could add Icon if needed for market items
            };
            
            subCategory.items.push(selectionItem);
          }
        });
        
        console.log(`[useMarketData] Market mapping results: Matched ${matchedMarkets} out of ${markets.length} markets`);
        
        // Filter out categories with no subcategories or empty subcategories
        const result = Array.from(categoriesMap.values())
          .filter(category => 
            category.subCategories.length > 0 && 
            category.subCategories.some(subCategory => subCategory.items.length > 0)
          );
        
        console.log(`[useMarketData] Constructed ${result.length} categories with data`);
        
        // If we have no results, add demo data
        if (result.length === 0) {
          console.log('WARNING: No market data found. Adding demo data for UI testing.');
          result.push(createDemoCategory());
        }
        
        setData(result);
        setLoading(false);
      } catch (err) {
        console.error('[useMarketData] Error fetching data:', err);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper to randomly determine a trend (for demo purposes)
  const determineTrend = (): 'up' | 'down' | 'stable' => {
    const random = Math.random();
    if (random < 0.33) return 'up';
    if (random < 0.66) return 'down';
    return 'stable';
  };
  
  // Helper to generate random vendor counts (for demo purposes)
  const getRandomVendorCount = (): number => {
    return Math.floor(Math.random() * 30) + 5; // Random number between 5 and 35
  };
  
  // Create demo category for testing if no real data exists
  const createDemoCategory = (): Category => {
    return {
      id: 'demo-category',
      title: 'Departamentos',
      icon: 'map', // Example icon
      subCategories: [
        {
          id: 'demo-subcategory-1',
          title: 'Antioquia',
          items: [
            {
              id: 'demo-market-1',
              title: 'Mercado Central de Medellín',
              subtitle: 'Medellín',
              price: '24 vendedores',
              trend: 'up',
            },
            {
              id: 'demo-market-2',
              title: 'Plaza Minorista',
              subtitle: 'Medellín',
              price: '32 vendedores',
              trend: 'stable',
            },
            {
              id: 'demo-market-3',
              title: 'Mercado de Envigado',
              subtitle: 'Envigado',
              price: '17 vendedores',
              trend: 'down',
            }
          ]
        },
        {
          id: 'demo-subcategory-2',
          title: 'Cundinamarca',
          items: [
            {
              id: 'demo-market-4',
              title: 'Corabastos',
              subtitle: 'Bogotá',
              price: '45 vendedores',
              trend: 'stable',
            },
            {
              id: 'demo-market-5',
              title: 'Plaza de Mercado de Paloquemao',
              subtitle: 'Bogotá',
              price: '28 vendedores',
              trend: 'up',
            }
          ]
        }
      ]
    };
  };

  return { data, loading, error };
};

export default useMarketData;