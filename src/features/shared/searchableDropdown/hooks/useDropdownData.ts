// src/features/shared/searchableDropdown/hooks/useDropdownData.ts
import { useState, useEffect } from 'react';

// Import repository methods
import { getProducts } from '@/src/services/supabase/entities/producto';
import { getMarkets } from '@/src/services/supabase/entities/mercado';
import { getMajorCategories } from '@/src/services/supabase/entities/majorCategories';
import { getSubcategories } from '@/src/services/supabase/entities/subcategories';
import { getDepartamentos } from '@/src/services/supabase/entities/departamento';
import { getMunicipios } from '@/src/services/supabase/entities/municipio';

// Types
import { Product } from '@/src/services/supabase/entities/producto';
import { Market } from '@/src/services/supabase/entities/mercado';
import { MajorCategory } from '@/src/services/supabase/entities/majorCategories';
import { Subcategory } from '@/src/services/supabase/entities/subcategories';
import { Departamento } from '@/src/services/supabase/entities/departamento';
import { Municipio } from '@/src/services/supabase/entities/municipio';

interface HierarchicalData {
    [key: string]: {
      // Major category level
      MajorCategoryId?: number;
      MajorCategory?: string;
      CodDepartamento?: number;
      Departamento?: string;
      Icon?: string;
      subcategories: {
        // Subcategory level
        SubcategoryId?: number;
        Subcategory?: string;
        CodMunicipio?: number;
        Municipio?: string;
        Icon?: string;
        items: any[]; // Products or Markets
      }[];
    }[];
  }
  
  interface UseDropdownDataResult {
    data: HierarchicalData;
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
  }
  
  // Helper function for grouping array items by a key
  const groupBy = <T extends Record<string, any>>(array: T[], key: string): Record<string, T[]> => {
    return array.reduce((result, currentItem) => {
      const groupKey = String(currentItem[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(currentItem);
      return result;
    }, {} as Record<string, T[]>);
  };
  
  export const useDropdownData = (): UseDropdownDataResult => {
    const [data, setData] = useState<HierarchicalData>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    
    // Function to fetch all required data
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch all required data in parallel
        const [
          products,
          markets,
          majorCategories,
          subcategories,
          departamentos,
          municipios
        ] = await Promise.all([
          getProducts(),
          getMarkets(),
          getMajorCategories(),
          getSubcategories(),
          getDepartamentos(),
          getMunicipios()
        ]);
        
        // Process and organize the data
        const organizedData: HierarchicalData = {
          // Initialize empty arrays for each data type
          producto: [],
          mercado: []
        };
        
        // Organize products by major category and subcategory
        if (products && products.length > 0) {
          // Group products by major category
          const productsByMajorCategory = groupBy(products, 'MajorCategoryId');
          
          // For each major category, create a hierarchical structure
          Object.entries(productsByMajorCategory).forEach(([majorCategoryIdStr, productsInCategory]) => {
            const majorCategoryId = parseInt(majorCategoryIdStr, 10);
            const majorCategory = majorCategories.find(mc => mc.MajorCategoryId === majorCategoryId);
            
            if (majorCategory) {
              // Group products in this major category by subcategory
              const productsBySubcategory = groupBy(productsInCategory, 'SubcategoryId');
              
              // Create subcategories array
              const subcategoriesInMajorCategory = Object.entries(productsBySubcategory).map(
                ([subcategoryIdStr, productsInSubcategory]) => {
                  const subcategoryId = parseInt(subcategoryIdStr, 10);
                  const subcategory = subcategories.find(sc => sc.SubcategoryId === subcategoryId);
                  
                  return {
                    SubcategoryId: subcategoryId,
                    Subcategory: subcategory?.Subcategory || 'Unknown Subcategory',
                    Icon: subcategory?.Icon || '',
                    items: productsInSubcategory
                  };
                }
              );
              
              // Add to organized data
              organizedData.producto.push({
                MajorCategoryId: majorCategoryId,
                MajorCategory: majorCategory.MajorCategory,
                Icon: majorCategory.Icon || '',
                subcategories: subcategoriesInMajorCategory
              });
            }
          });
        }
        
        // Organize markets by departamento and municipio
        if (markets && markets.length > 0) {
          // Group markets by departamento
          const marketsByDepartamento = groupBy(markets, 'CodDepartamento');
          
          // For each departamento, create a hierarchical structure
          Object.entries(marketsByDepartamento).forEach(([codDepartamentoStr, marketsInDepartamento]) => {
            const codDepartamento = parseInt(codDepartamentoStr, 10);
            const departamento = departamentos.find(d => d.CodDepartamento === codDepartamento);
            
            if (departamento) {
              // Group markets in this departamento by municipio
              const marketsByMunicipio = groupBy(marketsInDepartamento, 'CodMunicipio');
              
              // Create municipios array
              const municipiosInDepartamento = Object.entries(marketsByMunicipio).map(
                ([codMunicipioStr, marketsInMunicipio]) => {
                  const codMunicipio = parseInt(codMunicipioStr, 10);
                  const municipio = municipios.find(m => m.CodMunicipio === codMunicipio);
                  
                  return {
                    CodMunicipio: codMunicipio,
                    Municipio: municipio?.Municipio || 'Unknown Municipality',
                    Icon: municipio?.Icon || '',
                    items: marketsInMunicipio
                  };
                }
              );
              
              // Add to organized data
              organizedData.mercado.push({
                CodDepartamento: codDepartamento,
                Departamento: departamento.Departamento,
                Icon: departamento.Icon || '',
                subcategories: municipiosInDepartamento
              });
            }
          });
        }
        
        // Update state with the organized data
        setData(organizedData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching dropdown data:', err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setIsLoading(false);
      }
    };
    
    // Fetch data on component mount
    useEffect(() => {
      fetchData();
    }, []);
    
    // Function to allow manual refetching
    const refetch = async () => {
      await fetchData();
    };
    
    return {
      data,
      isLoading,
      error,
      refetch
    };
  };
  
  export default useDropdownData;