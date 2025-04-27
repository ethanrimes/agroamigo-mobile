// src/features/shared/searchableDropdown/hooks/useSearchableSelection.ts
import { useState, useCallback, useEffect } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

// Define the base structure any selectable item must have
export interface SelectableItem {
  [key: string]: any;
}

interface UseSearchableSelectionProps<T extends SelectableItem = SelectableItem> {
  initialSelectedItem?: T | null;
  initialSelectedType?: string;
  onSelectionChange?: (item: T | null, type: string) => void;
}

interface UseSearchableSelectionResult<T extends SelectableItem = SelectableItem> {
  selectedItem: T | null;
  selectedType: string;
  hasSelection: boolean;
  selectItem: (item: T, type: string) => void;
  clearSelection: () => void;
  getDisplayText: () => string;
  getSelectedStyle: () => {
    containerStyle: StyleProp<ViewStyle>;
    textStyle: StyleProp<TextStyle>;
  };
}

export const useSearchableSelection = <T extends SelectableItem = SelectableItem>({
  initialSelectedItem = null,
  initialSelectedType = '',
  onSelectionChange,
}: UseSearchableSelectionProps<T>): UseSearchableSelectionResult<T> => {
  // Get theme colors for styling
  const { theme } = useTheme();
  
  // Selection state
  const [selectedItem, setSelectedItem] = useState<T | null>(initialSelectedItem);
  const [selectedType, setSelectedType] = useState<string>(initialSelectedType);
  
  // Computed property to check if we have a selection
  const hasSelection = selectedItem !== null;
  
  // Handle initial values if provided
  useEffect(() => {
    if (initialSelectedItem && initialSelectedType) {
      setSelectedItem(initialSelectedItem);
      setSelectedType(initialSelectedType);
      
      // If there's a selection change callback, call it
      if (onSelectionChange) {
        onSelectionChange(initialSelectedItem, initialSelectedType);
      }
    }
  }, []);
  
  // Function to handle item selection
  const selectItem = useCallback((item: T, type: string) => {
    setSelectedItem(item);
    setSelectedType(type);
    
    // If there's a selection change callback, call it
    if (onSelectionChange) {
      onSelectionChange(item, type);
    }
  }, [onSelectionChange]);
  
  // Function to clear the current selection
  const clearSelection = useCallback(() => {
    setSelectedItem(null);
    setSelectedType('');
    
    // If there's a selection change callback, call it with null
    if (onSelectionChange) {
      onSelectionChange(null, '');
    }
  }, [onSelectionChange]);
  
  // Get display text based on the selected item type
  const getDisplayText = useCallback(() => {
    if (!selectedItem) return '';
    
    switch (selectedType) {
      case 'producto':
        return selectedItem.artiNombre || 'Producto seleccionado';
      case 'mercado':
        return selectedItem.Mercado || 'Mercado seleccionado';
      case 'municipio':
        return selectedItem.Municipio || 'Municipio seleccionado';
      case 'departamento':
        return selectedItem.Departamento || 'Departamento seleccionado';
      case 'insumo':
        return selectedItem.insumoNombre || selectedItem.artiNombre || 'Insumo seleccionado';
      default:
        return 'Item seleccionado';
    }
  }, [selectedItem, selectedType]);
  
  // Get styles based on selection state
  const getSelectedStyle = useCallback((): {
    containerStyle: StyleProp<ViewStyle>;
    textStyle: StyleProp<TextStyle>;
  } => {
    // Only apply special styling if there's a selection
    if (!hasSelection) {
      return {
        containerStyle: {} as StyleProp<ViewStyle>,
        textStyle: {} as StyleProp<TextStyle>,
      };
    }
    
    return {
      containerStyle: {
        borderColor: theme.colors.primary.default,
        backgroundColor: theme.colors.background.light,
      } as StyleProp<ViewStyle>,
      textStyle: {
        color: theme.colors.primary.default,
        fontWeight: 'bold' as 'bold',
      } as StyleProp<TextStyle>,
    };
  }, [hasSelection, theme.colors]);
  
  return {
    selectedItem,
    selectedType,
    hasSelection,
    selectItem,
    clearSelection,
    getDisplayText,
    getSelectedStyle,
  };
};

export default useSearchableSelection;