// src/features/shared/searchableDropdown/hooks/useSearchableSelection.ts
import { useState, useCallback } from 'react';

// Define common item interface
export interface SelectableItem {
  id: string | number;
  name?: string;
  title?: string;
  display?: string;
  [key: string]: any; // Allow other properties
}

interface UseSearchableSelectionProps<T extends SelectableItem = SelectableItem> {
  initialSelectedItem?: T | null;
  initialSelectedType?: string;
  onSelectionChange?: (item: T | null, type: string) => void;
}

interface UseSearchableSelectionResult<T> {
  // Selection state
  selectedItem: T | null;
  selectedType: string;
  // Visual indicators
  hasSelection: boolean;
  // Actions
  selectItem: (item: T, type: string) => void;
  clearSelection: () => void;
  // Helpers
  getDisplayText: () => string;
  getSelectedStyle: () => {
    containerStyle: any;
    textStyle: any;
  };
}

export const useSearchableSelection = <T extends SelectableItem = SelectableItem>({
  initialSelectedItem = null,
  initialSelectedType = '',
  onSelectionChange,
}: UseSearchableSelectionProps<T> = {}): UseSearchableSelectionResult<T> => {
  // Track the selected item and its type
  const [selectedItem, setSelectedItem] = useState<T | null>(initialSelectedItem);
  const [selectedType, setSelectedType] = useState<string>(initialSelectedType);
  
  // Computed property to check if there's a selection
  const hasSelection = selectedItem !== null;
  
  // Handle item selection from dropdown
  const selectItem = useCallback((item: T, type: string) => {
    setSelectedItem(item);
    setSelectedType(type);
    
    if (onSelectionChange) {
      onSelectionChange(item, type);
    }
  }, [onSelectionChange]);
  
  // Clear the selected item
  const clearSelection = useCallback(() => {
    setSelectedItem(null);
    setSelectedType('');
    
    if (onSelectionChange) {
      onSelectionChange(null, '');
    }
  }, [onSelectionChange]);
  
  // Get display text for the button based on selected item
  const getDisplayText = useCallback(() => {
    if (!selectedItem) {
      return '';
    }
    
    // Try to find the best property to display, checking in order of preference
    const displayProperties = ['name', 'title', 'display', 'label', 'text', 'value'];
    
    for (const prop of displayProperties) {
      if (selectedItem[prop] && typeof selectedItem[prop] === 'string') {
        return selectedItem[prop] as string;
      }
    }
    
    // If no suitable property is found, return a default
    return `${selectedType}: Seleccionado`;
  }, [selectedItem, selectedType]);
  
  // Get styles for the search bar based on selection state
  const getSelectedStyle = useCallback(() => {
    // Default styles when there's no selection
    const baseContainerStyle = {};
    const baseTextStyle = {};
    
    if (hasSelection) {
      // Enhanced styles when there's a selection
      return {
        containerStyle: {
          ...baseContainerStyle,
          borderWidth: 2,
          borderColor: '#28C888', // Primary color
          backgroundColor: 'rgba(40, 200, 136, 0.05)', // Light primary color
        },
        textStyle: {
          ...baseTextStyle,
          fontWeight: 'bold',
          color: '#263238', // Dark text color
        },
      };
    }
    
    return {
      containerStyle: baseContainerStyle,
      textStyle: baseTextStyle,
    };
  }, [hasSelection]);
  
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