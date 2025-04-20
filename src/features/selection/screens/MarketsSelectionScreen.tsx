// src/features/selection/screens/MarketsSelectionScreen.tsx
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { SelectionHeader } from '../components/header';
import { SelectionPageContentSpace, SelectionItem } from '../components/body';
import SlidingSideDrawer from '../components/SlidingSideDrawer';
import { useMarketData } from '../hooks/useMarketData';
import { useSelectionFilters } from '../hooks/useSelectionFilters';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { useRouterNavigation } from '@/src/hooks/useRouterNavigation';

const MarketsSelectionScreen: React.FC = () => {
  const { navigate } = useRouterNavigation();
  const { colors } = useTheme();
  const { data, loading, error } = useMarketData();
  const { isFilterPaneVisible, openFilters, closeFilters } = useSelectionFilters();

  const handleItemPress = (item: SelectionItem) => {
    // Navigate to market detail screen
    navigate(`/mercados/detail/${item.id}`);
  };

  return (
    <View className="flex-1 bg-white">
      <SelectionHeader
        title="Mercados"
        location="Medellín, Antioquia"
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
        screenType="markets"
      />
    </View>
  );
};

export default MarketsSelectionScreen;