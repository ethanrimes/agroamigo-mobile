import React from 'react';
import { FilterButton as BaseFilterButton } from '@/src/components/ui/buttons';
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
  
  return <BaseFilterButton onPress={handlePress} />;
};

export default FilterButton;