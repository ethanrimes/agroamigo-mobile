import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ChevronDown, ChevronUp, Check } from 'lucide-react-native';
import  VStack from '@/src/components/ui/organization/VStack';
import HStack from '@/src/components/ui/organization/HStack';
import Divider from '@/src/components/ui/layout/Separator';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { useSelectionFilters } from '../../hooks/useSelectionFilters';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterElementProps {
  title: string;
  options: FilterOption[];
  category: string;
}

const FilterElement: React.FC<FilterElementProps> = ({
  title,
  options,
  category,
}) => {
  const { colors } = useTheme();
  const { filters, toggleFilter } = useSelectionFilters();
  // Start expanded for better UX, matching the screenshot
  const [expanded, setExpanded] = useState(true);
  
  const selectedOptions = filters[category] || [];
  
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
              onPress={() => toggleFilter(category, option.id)}
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
          <Text className="text-xl text-neutral-grey text-center">...</Text>
        </VStack>
      )}
      
      {/* Divider below each category */}
      <Divider className="bg-neutral-lightGrey" />
    </View>
  );
};

export default FilterElement;