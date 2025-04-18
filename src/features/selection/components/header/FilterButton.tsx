// src/features/selection/components/header/FilterButton.tsx
import React from 'react';
import { Pressable } from 'react-native';
import { FilterIcon } from 'lucide-react-native';
import { Box } from '@/components/ui/box';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface FilterButtonProps {
  onPress?: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onPress }) => {
  const { colors } = useTheme();
  
  return (
    <Pressable onPress={onPress}>
      <Box className="p-2">
        <FilterIcon size={24} color={colors.primary.default} />
      </Box>
    </Pressable>
  );
};

export default FilterButton;