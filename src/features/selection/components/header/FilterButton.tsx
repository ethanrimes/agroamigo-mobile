// src/features/selection/components/header/FilterButton.tsx
import React from 'react';
import { FilterButton as SharedFilterButton } from '@/src/components/ui/buttons';
import { useSelectionFilters } from '../../hooks/useSelectionFilters';

interface FilterButtonProps {
  onPress?: () => void;
  testID?: string;
}

/**
 * A filter button component that can either use a provided onPress handler
 * or the default selection filters hook to open the filter drawer
 */
const FilterButton: React.FC<FilterButtonProps> = ({ 
  onPress,
  testID = 'selection-filter-button'
}) => {
  const { openFilters } = useSelectionFilters();
  
  const handlePress = () => {
    if (onPress) {
      // Use the provided onPress handler if available
      onPress();
    } else {
      // Otherwise use the default hook's openFilters method
      openFilters();
    }
  };
  
  return <SharedFilterButton onPress={handlePress} />;
};

export default FilterButton;