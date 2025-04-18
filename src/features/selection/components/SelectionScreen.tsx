// src/features/selection/components/SelectionScreen.tsx
import React, { useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SelectionHeader } from './header';
import { SelectionPageContentSpace, SelectionItem } from './body';
import { useSelectionData } from '../hooks';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

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
  const router = useRouter();
  const { colors } = useTheme();
  const [filterVisible, setFilterVisible] = useState(false);
  const { data, loading, error } = useSelectionData(type);

  const handleItemPress = (item: SelectionItem) => {
    // Navigate to detail screen based on item type
    if (type === 'products') {
      router.push(`/products/${item.id}`);
    } else if (type === 'markets') {
      router.push(`/markets/${item.id}`);
    } else if (type === 'insumos') {
      router.push(`/insumos/${item.id}`);
    }
  };

  const handleFilterPress = () => {
    setFilterVisible(true);
    // Here you would implement the logic to show the filter drawer
  };

  return (
    <View className="flex-1 bg-white">
      <SelectionHeader
        title={title}
        location={location}
        onFilterPress={handleFilterPress}
      />
      
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={colors.primary.default} />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-base text-red-500">{error}</Text>
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
    </View>
  );
};

export default SelectionScreen;