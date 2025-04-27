// src/features/shared/slidingSideDrawer/components/filterOptions/CheckboxFilterOption.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Check } from 'lucide-react-native';
import HStack from '@/src/components/ui/layout/HStack';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { FilterOption } from '../../SlidingSideDrawer';

interface CheckboxFilterOptionProps {
  option: FilterOption;
  isSelected: boolean;
  onToggle: () => void;
}

const CheckboxFilterOption: React.FC<CheckboxFilterOptionProps> = ({
  option,
  isSelected,
  onToggle,
}) => {
  const { colors } = useTheme();
  
  return (
    <Pressable onPress={onToggle}>
      <HStack className="items-center space-x-2 py-1">
        <View
          className={`w-5 h-5 rounded-sm items-center justify-center ${
            isSelected ? 'bg-primary-default' : 'bg-transparent border border-neutral-grey'
          }`}
        >
          {isSelected && <Check size={14} color={colors.text.inverse} />}
        </View>
        <Text className="text-body-2 flex-1">{option.label}</Text>
      </HStack>
    </Pressable>
  );
};

export default CheckboxFilterOption;