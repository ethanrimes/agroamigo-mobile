// src/features/selection/components/header/FilterButton.tsx
import React from 'react';
import { FilterButton as SharedFilterButton } from '@/src/features/shared/slidingSideDrawer';
import { useSelectionFilters } from '../../hooks/useSelectionFilters';

interface FilterButtonProps {
  onPress?: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onPress }) => {
  const { openFilters } = useSelectionFilters();
  
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      openFilters();
    }
  };
  
  return <SharedFilterButton onPress={handlePress} />;
};

export default FilterButton;