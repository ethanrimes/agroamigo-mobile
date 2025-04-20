// src/features/shared/searchableDropdown/components/DropdownList.tsx
import React from 'react';
import { ScrollView, Text, StyleSheet, ActivityIndicator, View, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import DataTypeHeader from './DataTypeHeader';
import MajorCategoryHeader from './MajorCategoryHeader';
import SubcategoryHeader from './SubcategoryHeader';
import DropdownItem from './DropdownItem';
import { DataTypeOrder } from '../SearchableDropdown';
import { useEffect } from 'react';

interface DropdownListProps {
  data: any;
  isLoading: boolean;
  onItemSelect: (item: any, type: string) => void;
  dataTypeOrder: DataTypeOrder;
}

const DropdownList: React.FC<DropdownListProps> = ({
  data,
  isLoading,
  onItemSelect,
  dataTypeOrder
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    console.log('[DropdownList] Component mounted');
    console.log('[DropdownList] onItemSelect function exists:', !!onItemSelect);
    console.log('[DropdownList] onItemSelect type:', typeof onItemSelect);
    
    // Validate the onItemSelect function
    if (typeof onItemSelect !== 'function') {
      console.error('[DropdownList] onItemSelect is not a valid function:', onItemSelect);
    }
    
    console.log('[DropdownList] dataTypeOrder:', dataTypeOrder);
    
    // Check if we have data
    if (data) {
      console.log('[DropdownList] Data received:', Object.keys(data));
      
      // Count total items for debugging
      let totalItems = 0;
      Object.keys(data).forEach(type => {
        if (data[type] && Array.isArray(data[type])) {
          data[type].forEach((majorCategory: any) => {
            if (majorCategory.subcategories && Array.isArray(majorCategory.subcategories)) {
              majorCategory.subcategories.forEach((subcategory: any) => {
                if (subcategory.items && Array.isArray(subcategory.items)) {
                  totalItems += subcategory.items.length;
                }
              });
            }
          });
        }
      });
      
      console.log('[DropdownList] Total items count:', totalItems);
    } else {
      console.log('[DropdownList] No data received');
    }
  }, []);
  
  // Debug function to test touch events
  const testTouchArea = () => {
    console.log('[DropdownList] Background touch detected - touch areas working');
  };
  
  // Function to verify and call onItemSelect
  const safeItemSelect = (item: any, type: string) => {
    console.log('[DropdownList] safeItemSelect called for:', { type, item: JSON.stringify(item).substring(0, 100) + '...' });
    
    if (typeof onItemSelect === 'function') {
      console.log('[DropdownList] Calling parent onItemSelect function');
      onItemSelect(item, type);
    } else {
      console.error('[DropdownList] Cannot call onItemSelect - not a function:', onItemSelect);
    }
  };
  
  // Get ordered data types based on the dataTypeOrder prop
  const getOrderedDataTypes = () => {
    // Extract all data types from the data object
    const dataTypes = Object.keys(data || {});
    
    if (dataTypeOrder === 'producto-mercado') {
      // Prioritize producto, then mercado, then others
      return [
        ...dataTypes.filter(type => type === 'producto'),
        ...dataTypes.filter(type => type === 'mercado'),
        ...dataTypes.filter(type => type !== 'producto' && type !== 'mercado')
      ];
    } else {
      // Prioritize mercado, then producto, then others
      return [
        ...dataTypes.filter(type => type === 'mercado'),
        ...dataTypes.filter(type => type === 'producto'),
        ...dataTypes.filter(type => type !== 'mercado' && type !== 'producto')
      ];
    }
  };
  
  // Render loading indicator
  if (isLoading) {
    return (
      <TouchableWithoutFeedback onPress={testTouchArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={theme.colors.primary.default} />
          <Text style={[styles.loadingText, { color: theme.colors.text.secondary }]}>
            Cargando...
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  
  // Render no results message
  if (!data || Object.keys(data).length === 0) {
    return (
      <TouchableWithoutFeedback onPress={testTouchArea}>
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
            No se encontraron resultados
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  
  // Ordered data types based on the dataTypeOrder prop
  const orderedDataTypes = getOrderedDataTypes();
  
  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
      onScrollBeginDrag={() => console.log('[DropdownList] Scroll detected - touch is working')}
    >
      {orderedDataTypes.map(type => (
        <View key={type}>
          {/* Data Type Header (Producto, Mercado, etc.) */}
          <TouchableWithoutFeedback onPress={testTouchArea}>
            <View>
              <DataTypeHeader type={type} />
            </View>
          </TouchableWithoutFeedback>
          
          {/* Major Categories with their Subcategories and Items */}
          {data[type]?.map((majorCategory: any, majorIndex: number) => (
            <View key={`${type}-major-${majorIndex}`}>
              {/* Major Category Header */}
              <TouchableWithoutFeedback onPress={testTouchArea}>
                <View>
                  <MajorCategoryHeader 
                    category={majorCategory} 
                    type={type} 
                  />
                </View>
              </TouchableWithoutFeedback>
              
              {/* Subcategories with their Items */}
              {majorCategory.subcategories?.map((subcategory: any, subIndex: number) => (
                <View key={`${type}-major-${majorIndex}-sub-${subIndex}`}>
                  {/* Subcategory Header */}
                  <TouchableWithoutFeedback onPress={testTouchArea}>
                    <View>
                      <SubcategoryHeader 
                        subcategory={subcategory} 
                        type={type} 
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  
                  {/* Item List */}
                  {subcategory.items?.map((item: any, itemIndex: number) => (
                    <DropdownItem
                      key={`${type}-major-${majorIndex}-sub-${subIndex}-item-${itemIndex}`}
                      item={item}
                      type={type}
                      onSelect={safeItemSelect}
                    />
                  ))}
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 100,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  emptyText: {
    fontSize: 14,
  },
});

export default DropdownList;