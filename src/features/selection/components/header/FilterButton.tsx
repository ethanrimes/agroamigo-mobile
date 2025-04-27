import React from 'react';
import { useSelectionFilters } from '../../hooks/useSelectionFilters';
import { Pressable } from 'react-native';
import { Filter } from 'lucide-react-native';

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
  
  // Directly use the Filter icon with black color
  return (
    <Pressable 
      onPress={handlePress}
      className="p-2"
    >
      <Filter 
        size={24} 
        color="black" 
      />
    </Pressable>
  );
};

export default FilterButton;