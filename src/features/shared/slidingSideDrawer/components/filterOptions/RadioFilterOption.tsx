// src/features/shared/slidingSideDrawer/components/filterOptions/RadioFilterOption.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import HStack from '@/src/components/ui/layout/HStack';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { FilterOption } from '../../SlidingSideDrawer';

interface RadioFilterOptionProps {
  option: FilterOption;
  isSelected: boolean;
  onToggle: () => void;
}

const RadioFilterOption: React.FC<RadioFilterOptionProps> = ({
  option,
  isSelected,
  onToggle,
}) => {
  const { colors } = useTheme();
  
  return (
    <Pressable onPress={onToggle}>
      <HStack className="items-center space-x-2 py-1">
        <View className="w-5 h-5 rounded-full border border-neutral-grey items-center justify-center">
          {isSelected && (
            <View className="w-3 h-3 rounded-full bg-primary-default" />
          )}
        </View>
        <Text className="text-body-2 flex-1">{option.label}</Text>
      </HStack>
    </Pressable>
  );
};

export default RadioFilterOption;