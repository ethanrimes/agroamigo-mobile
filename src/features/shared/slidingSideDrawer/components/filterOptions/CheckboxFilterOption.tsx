// src/features/shared/slidingSideDrawer/components/filterOptions/CheckboxFilterOption.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
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
    <Pressable onPress={onToggle} style={styles.container}>
      <HStack style={styles.optionContainer}>
        <View style={[
          styles.checkbox,
          isSelected ? styles.checkedBox : styles.uncheckedBox
        ]}>
          {isSelected && <Check size={14} color="#ffffff" />}
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
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: '#4a8139', // Green color from the theme
    borderWidth: 0,
  },
  uncheckedBox: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#757575',
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

export default CheckboxFilterOption;