import React from 'react';
import { Pressable } from 'react-native';
import { Filter } from 'lucide-react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface FilterButtonProps {
  onPress?: () => void;
  size?: number;
  color?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ 
  onPress, 
  size = 24, 
  color 
}) => {
  const { colors } = useTheme();
  
  return (
    <Pressable 
      onPress={onPress}
      className="p-2"
    >
      <Filter 
        size={size} 
        color={color || colors.text.inverse} 
      />
    </Pressable>
  );
};

export default FilterButton;