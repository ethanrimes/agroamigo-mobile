// src/features/shared/slidingSideDrawer/components/FilterElement.tsx
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ChevronDown, ChevronUp } from 'lucide-react-native';
import VStack from '@/src/components/ui/layout/VStack';
import HStack from '@/src/components/ui/layout/HStack';
import Divider from '@/src/components/ui/layout/Separator';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { FilterOption } from '../SlidingSideDrawer';
import CheckboxFilterOption from './filterOptions/CheckboxFilterOption';
import RadioFilterOption from './filterOptions/RadioFilterOption';

interface FilterElementProps {
  title: string;
  options: FilterOption[];
  category: string;
  selectedOptions: string[];
  onToggleOption: (optionId: string) => void;
  type?: 'checkbox' | 'radio';
  showMoreIndicator?: boolean;
  defaultExpanded?: boolean;
  showDivider?: boolean;
}

/**
 * Reusable filter element component that can be configured as checkbox or radio
 */
const FilterElement: React.FC<FilterElementProps> = ({
  title,
  options,
  category,
  selectedOptions,
  onToggleOption,
  type = 'checkbox',
  showMoreIndicator = true,
  defaultExpanded = true,
  showDivider = true,
}) => {
  const { colors } = useTheme();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  // Toggle expansion state
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <View>
      <Pressable onPress={toggleExpand}>
        <HStack className="justify-between py-2">
          <Text className="text-body-1-semibold">{title}</Text>
          {showMoreIndicator && (
            isExpanded ? (
              <ChevronUp size={20} color={colors.text.primary} />
            ) : (
              <ChevronDown size={20} color={colors.text.primary} />
            )
          )}
        </HStack>
      </Pressable>
      
      {isExpanded && (
        <VStack className="pl-1 space-y-2 py-2">
          {options.map((option) => (
            type === 'radio' ? (
              <RadioFilterOption
                key={option.id}
                option={option}
                isSelected={selectedOptions.includes(option.id)}
                onToggle={() => onToggleOption(option.id)}
              />
            ) : (
              <CheckboxFilterOption
                key={option.id}
                option={option}
                isSelected={selectedOptions.includes(option.id)}
                onToggle={() => onToggleOption(option.id)}
              />
            )
          ))}
        </VStack>
      )}
      
      {showDivider && <Divider className="bg-neutral-grey/30 h-px my-2" />}
    </View>
  );
};

export default FilterElement;