import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ChevronDown, ChevronUp, Check } from 'lucide-react-native';
import VStack from '@/src/components/ui/layout/VStack';
import HStack from '@/src/components/ui/layout/HStack';
import Divider from '@/src/components/ui/layout/Separator';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterElementProps {
  /**
   * Title of the filter category
   */
  title: string;
  
  /**
   * Available filter options
   */
  options: FilterOption[];
  
  /**
   * Currently selected options
   */
  selectedOptions: string[];
  
  /**
   * Callback when an option is toggled
   */
  onToggleOption: (optionId: string) => void;
  
  /**
   * Whether to show the "..." indicator
   * @default true
   */
  showMoreIndicator?: boolean;
  
  /**
   * Whether the filter starts expanded or collapsed
   * @default true
   */
  defaultExpanded?: boolean;
  
  /**
   * Whether to show the divider at the bottom
   * @default true
   */
  showDivider?: boolean;
}

/**
 * Reusable filter element component for displaying collapsible filter categories
 */
const FilterElement: React.FC<FilterElementProps> = ({
  title,
  options,
  selectedOptions,
  onToggleOption,
  showMoreIndicator = true,
  defaultExpanded = true,
  showDivider = true,
}) => {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);
  
  return (
    <View className="w-full">
      {/* Category Header */}
      <Pressable
        onPress={() => setExpanded(!expanded)}
        className="py-3"
      >
        <HStack className="w-full justify-between items-center">
          <Text className="text-xl font-semibold text-neutral-black">{title}</Text>
          {expanded ? (
            <ChevronUp size={24} color={colors.neutral.black} />
          ) : (
            <ChevronDown size={24} color={colors.neutral.black} />
          )}
        </HStack>
      </Pressable>
      
      {/* Options List */}
      {expanded && (
        <VStack className="mt-2 mb-4 space-y-3">
          {options.map((option) => (
            <Pressable
              key={option.id}
              onPress={() => onToggleOption(option.id)}
              className="py-2"
            >
              <HStack className="justify-between items-center">
                <Text 
                  className={`text-body-2 ${
                    selectedOptions.includes(option.id) 
                      ? 'text-primary-default font-medium' 
                      : 'text-neutral-grey'
                  }`}
                >
                  {option.label}
                </Text>
                {selectedOptions.includes(option.id) && (
                  <Check size={20} color={colors.primary.default} />
                )}
              </HStack>
            </Pressable>
          ))}
          
          {/* Triple dot indicator for more items */}
          {showMoreIndicator && (
            <Text className="text-xl text-neutral-grey text-center">...</Text>
          )}
        </VStack>
      )}
      
      {/* Optional Divider */}
      {showDivider && (
        <Divider className="bg-neutral-lightGrey" />
      )}
    </View>
  );
};

export default FilterElement;