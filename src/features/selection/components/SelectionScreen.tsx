// src/features/selection/components/SelectionScreen.tsx
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { SelectionHeader } from './header';
import { SelectionPageContentSpace, SelectionItem } from './body';
import SlidingSideDrawer from './SlidingSideDrawer';
import { useSelectionData } from '../hooks/useSelectionData';
import { useSelectionFilters } from '../hooks/useSelectionFilters';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { useRouterNavigation } from '@/src/hooks/useRouterNavigation';

interface SelectionScreenProps {
  type: 'products' | 'markets' | 'insumos';
  title: string;
  location: string;
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({
  type,
  title,
  location,
}) => {
  const { navigate } = useRouterNavigation();
  const { colors } = useTheme();
  const { data, loading, error } = useSelectionData(type);
  const { isFilterPaneVisible, openFilters, closeFilters } = useSelectionFilters();

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

  return (
    <View className="flex-1 bg-white">
      <SelectionHeader
        title={title}
        location={location}
        onFilterPress={openFilters}
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