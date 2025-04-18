// src/features/detail/components/header/FilterButtonWrapper.tsx
import React from 'react';
import { View } from 'react-native';
import FilterButton from '@/src/components/ui/buttons/FilterButton';

const FilterButtonWrapper: React.FC = () => {
  const handlePress = () => {
    // Would open filter modal in a real implementation
    console.log('Filter button pressed');
  };
  
  return (
    <View className="ml-2">
      <FilterButton onPress={handlePress} />
    </View>
  );
};

export default FilterButtonWrapper;