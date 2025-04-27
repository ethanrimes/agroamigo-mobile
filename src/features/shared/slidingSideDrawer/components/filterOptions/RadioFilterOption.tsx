// src/features/shared/slidingSideDrawer/components/filterOptions/RadioFilterOption.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
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
    <Pressable onPress={onToggle} style={styles.container}>
      <HStack style={styles.optionContainer}>
        <View style={[
          styles.radioOuter,
          isSelected ? styles.radioOuterSelected : {}
        ]}>
          {isSelected && (
            <View style={styles.radioInner} />
          )}
        </View>
        
        <View style={styles.optionLabel}>
          <Text style={styles.optionText}>{option.label}</Text>
          {option.label && (
            <View />
          )}
        </View>
      </HStack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  optionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#757575',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioOuterSelected: {
    borderColor: '#4a8139', // Green color from the theme
    borderWidth: 2,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4a8139', // Green color from the theme
  },
  optionLabel: {
    flex: 1,
    position: 'relative',
  },
  optionText: {
    fontSize: 16,
    paddingBottom: 2,
  }
});

export default RadioFilterOption;