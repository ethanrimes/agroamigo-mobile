// src/features/shared/slidingSideDrawer/components/FilterElement.tsx
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      {/* Category title with red underline effect */}
      <Pressable onPress={toggleExpand}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{title}</Text>
          <View />
          {showMoreIndicator && (
            isExpanded ? (
              <ChevronUp size={20} color={colors.text.primary} />
            ) : (
              <ChevronDown size={20} color={colors.text.primary} />
            )
          )}
        </View>
      </Pressable>
      
      {/* Filter options */}
      {isExpanded && (
        <VStack style={styles.optionsContainer}>
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
      
      {showDivider && <Divider />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  optionsContainer: {
    paddingLeft: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 8,
  },
});

export default FilterElement;