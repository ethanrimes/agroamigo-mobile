// src/features/detail/components/header/CitySelector.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { AlignJustify } from 'lucide-react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import Box from '@/src/components/ui/layout/Box';

interface CitySelectorProps {
  currentCity: string;
}

const CitySelector: React.FC<CitySelectorProps> = ({ currentCity }) => {
  const { colors } = useTheme();
  
  const handlePress = () => {
    // Would open city selection modal in a real implementation
    console.log('City selector pressed');
  };
  
  return (
    <Pressable onPress={handlePress}>
      <Box className="bg-white border border-gray-300 rounded-lg px-4 py-3 mt-2 flex-row justify-between items-center">
        <Text className="text-gray-800 text-base font-medium">{currentCity}</Text>
        <AlignJustify size={20} color={colors.text.secondary} />
      </Box>
    </Pressable>
  );
};

export default CitySelector;