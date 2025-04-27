// src/features/shared/slidingSideDrawer/components/FilterButton.tsx
import React from 'react';
import { Pressable } from 'react-native';
import { Filter } from 'lucide-react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface FilterButtonProps {
  onPress: () => void;
  size?: number;
  color?: string;
}

/**
 * Reusable filter button component that can be used to open the sliding drawer
 */
const FilterButton: React.FC<FilterButtonProps> = ({
  onPress,
  size = 24,
  color,
}) => {
  const { colors } = useTheme();
  
  // Use provided color or default to theme's text primary color
  const iconColor = color || colors.text.primary;
  
  return (
    <Pressable 
      onPress={onPress}
      className="p-2"
    >
      <Filter 
        size={size} 
        color={iconColor} 
      />
    </Pressable>
  );
};

export default FilterButton;