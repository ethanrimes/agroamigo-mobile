// src/features/shared/searchableDropdown/components/DropdownList.tsx
import React from 'react';
import { ScrollView, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import DataTypeHeader from './DataTypeHeader';
import MajorCategoryHeader from './MajorCategoryHeader';
import SubcategoryHeader from './SubcategoryHeader';
import DropdownItem from './DropdownItem';
import { DataTypeOrder } from '../SearchableDropdown';

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={theme.colors.primary.default} />
        <Text style={[styles.loadingText, { color: theme.colors.text.secondary }]}>
          Cargando...
        </Text>
      </View>
    );
  }
  
  // Render no results message
  if (!data || Object.keys(data).length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
          No se encontraron resultados
        </Text>
      </View>
    );
  }
  
  // Ordered data types based on the dataTypeOrder prop
  const orderedDataTypes = getOrderedDataTypes();
  
  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
    >
      {orderedDataTypes.map(type => (
        <View key={type}>
          {/* Data Type Header (Producto, Mercado, etc.) */}
          <DataTypeHeader type={type} />
          
          {/* Major Categories with their Subcategories and Items */}
          {data[type]?.map((majorCategory: any, majorIndex: number) => (
            <View key={`${type}-major-${majorIndex}`}>
              {/* Major Category Header */}
              <MajorCategoryHeader 
                category={majorCategory} 
                type={type} 
              />
              
              {/* Subcategories with their Items */}
              {majorCategory.subcategories?.map((subcategory: any, subIndex: number) => (
                <View key={`${type}-major-${majorIndex}-sub-${subIndex}`}>
                  {/* Subcategory Header */}
                  <SubcategoryHeader 
                    subcategory={subcategory} 
                    type={type} 
                  />
                  
                  {/* Item List */}
                  {subcategory.items?.map((item: any, itemIndex: number) => (
                    <DropdownItem
                      key={`${type}-major-${majorIndex}-sub-${subIndex}-item-${itemIndex}`}
                      item={item}
                      type={type}
                      onSelect={onItemSelect}
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
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
  },
});

export default DropdownList;