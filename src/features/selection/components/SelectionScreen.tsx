// src/features/selection/components/SelectionScreen.tsx
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { SelectionHeader } from './header';
import { SelectionPageContentSpace, SelectionItem, Category } from './body';
import SlidingSideDrawer from './SlidingSideDrawer';
import { useSelectionFilters } from '../hooks/useSelectionFilters';
import { useSelectionLocation } from '../hooks/useSelectionLocation';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { useRouterNavigation } from '@/src/hooks/useRouterNavigation';
import { DataType } from '@/src/features/shared/searchableDropdown/hooks/useDropdownData';

export type SelectionScreenType = 'products' | 'markets' | 'insumos';

interface SelectionScreenProps {
  type: SelectionScreenType;
  title: string;
  // Data state passed from parent component
  data: Category[];
  loading: boolean;
  error: string | null;
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({
  type,
  title,
  data,
  loading,
  error,
}) => {
  const { navigate } = useRouterNavigation();
  const { colors } = useTheme();
  const { isFilterPaneVisible, openFilters, closeFilters } = useSelectionFilters();
  // Get location from the custom hook
  const { formattedLocation } = useSelectionLocation();

  // Determine which data types to show based on screen type
  const getDataTypes = (): DataType[] => {
    switch(type) {
      case 'products':
        return ['producto'];
      case 'markets':
        return ['mercado'];
      case 'insumos':
        return ['insumo'];
      default:
        return ['producto', 'mercado'];
    }
  };

  // Determine data type order based on screen type
  const getDataTypeOrder = () => {
    return type === 'markets' ? 'mercado-producto' : 'producto-mercado';
  };

  const handleItemPress = (item: SelectionItem) => {
    // Navigate to detail screen based on item type
    switch(type) {
      case 'products':
        navigate(`/productos/detail/${item.id}`);
        break;
      case 'markets':
        navigate(`/mercados/detail/${item.id}`);
        break;
      case 'insumos':
        navigate(`/insumos/detail/${item.id}`);
        break;
    }
  };

  const handleSearchItemSelect = (item: any, itemType: string) => {
    // Convert item type to route
    const routeType = 
      itemType === 'producto' ? 'productos' : 
      itemType === 'mercado' ? 'mercados' : 
      itemType === 'insumo' ? 'insumos' : '';
    
    if (routeType) {
      // Get the ID from the item based on its type
      const id = 
        itemType === 'producto' ? item.artiId : 
        itemType === 'mercado' ? item.fuenId : 
        itemType === 'insumo' ? item.insumoId : null;
      
      if (id) {
        navigate(`/${routeType}/detail/${id}`);
      }
    }
  };

  return (
    <View className="flex-1 bg-white">
      <SelectionHeader
        title={title}
        location={formattedLocation}
        onFilterPress={openFilters}
        onItemSelect={handleSearchItemSelect}
        dataTypes={getDataTypes()}
        dataTypeOrder={getDataTypeOrder()}
      />
      
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={colors.primary.default} />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-base text-error-default">{error}</Text>
          <Text className="text-base mt-2">
            Por favor, intente nuevamente más tarde.
          </Text>
        </View>
      ) : (
        <SelectionPageContentSpace
          categories={data}
          onItemPress={handleItemPress}
        />
      )}
      
      {/* Side Drawer for Filters */}
      <SlidingSideDrawer
        isVisible={isFilterPaneVisible}
        onClose={closeFilters}
        screenType={type}
      />
    </View>
  );
};

export default SelectionScreen;