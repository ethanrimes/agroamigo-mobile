// src/features/shared/searchableDropdown/hooks/useInputDataFilter.ts
import { useMemo } from 'react';
import { DataTypeOrder } from '../SearchableDropdown';

// Helper function to normalize text for search (remove accents, lowercase)
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

// Helper function to check if an item matches the search query
const itemMatchesSearch = (item: any, searchText: string, type: string): boolean => {
  const normalizedSearch = normalizeText(searchText);
  
  // Define which field to search based on the item type
  let searchField = '';
  switch (type) {
    case 'producto':
      searchField = 'artiNombre';
      break;
    case 'mercado':
      searchField = 'Mercado';
      break;
    case 'departamento':
      searchField = 'Departamento';
      break;
    case 'municipio':
      searchField = 'Municipio';
      break;
    case 'majorCategory':
      searchField = 'MajorCategory';
      break;
    case 'subcategory':
      searchField = 'Subcategory';
      break;
    default:
      return false;
  }
  
  // Check if the item has the search field
  if (!item[searchField]) {
    return false;
  }
  
  // Check if the search text is contained in the item's field
  return normalizeText(item[searchField]).includes(normalizedSearch);
};

export const useInputDataFilter = (
  data: any,
  searchText: string,
  dataTypeOrder: DataTypeOrder
) => {
  return useMemo(() => {
    // If no search text or no data, return original data
    if (!searchText || !data || Object.keys(data).length === 0) {
      return data;
    }
    
    const filteredData: any = {};
    
    // Process each data type (producto, mercado, etc.)
    Object.keys(data).forEach(type => {
      const filteredItems: any[] = [];
      
      // Go through each major category in this type
      data[type].forEach((majorCategory: any) => {
        const filteredSubcategories: any[] = [];
        
        // Go through each subcategory in this major category
        majorCategory.subcategories.forEach((subcategory: any) => {
          // Filter items in this subcategory
          const filteredSubcategoryItems = subcategory.items.filter((item: any) =>
            itemMatchesSearch(item, searchText, type)
          );
          
          // If there are filtered items, include this subcategory
          if (filteredSubcategoryItems.length > 0) {
            filteredSubcategories.push({
              ...subcategory,
              items: filteredSubcategoryItems
            });
          }
        });
        
        // If there are filtered subcategories, include this major category
        if (filteredSubcategories.length > 0) {
          filteredItems.push({
            ...majorCategory,
            subcategories: filteredSubcategories
          });
        }
      });
      
      // If there are filtered items in this type, include it in the result
      if (filteredItems.length > 0) {
        filteredData[type] = filteredItems;
      }
    });
    
    // If no results after filtering, return empty object
    if (Object.keys(filteredData).length === 0) {
      return {};
    }
    
    // Sort the data types according to the specified order
    const orderedData: any = {};
    
    if (dataTypeOrder === 'producto-mercado') {
      // First producto, then mercado, then others
      if (filteredData.producto) orderedData.producto = filteredData.producto;
      if (filteredData.mercado) orderedData.mercado = filteredData.mercado;
      
      // Add any other types
      Object.keys(filteredData).forEach(type => {
        if (type !== 'producto' && type !== 'mercado') {
          orderedData[type] = filteredData[type];
        }
      });
    } else {
      // First mercado, then producto, then others
      if (filteredData.mercado) orderedData.mercado = filteredData.mercado;
      if (filteredData.producto) orderedData.producto = filteredData.producto;
      
      // Add any other types
      Object.keys(filteredData).forEach(type => {
        if (type !== 'producto' && type !== 'mercado') {
          orderedData[type] = filteredData[type];
        }
      });
    }
    
    return orderedData;
  }, [data, searchText, dataTypeOrder]);
};

export default useInputDataFilter;