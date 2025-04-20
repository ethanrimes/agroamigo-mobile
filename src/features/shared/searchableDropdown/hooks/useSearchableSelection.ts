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

export const useSearchableSelection = <T extends SelectableItem = SelectableItem>({
  initialSelectedItem = null,
  initialSelectedType = '',
  onSelectionChange,
}: UseSearchableSelectionProps<T> = {}) => {
  // Track whether we're in search mode or display mode
  const [isSearchMode, setIsSearchMode] = useState(!initialSelectedItem);
  
  // Track the selected item and its type
  const [selectedItem, setSelectedItem] = useState<T | null>(initialSelectedItem);
  const [selectedType, setSelectedType] = useState<string>(initialSelectedType);
  
  // Toggle between search mode and display mode
  const toggleSearchMode = useCallback(() => {
    setIsSearchMode(prev => !prev);
  }, []);
  
  // Enter search mode
  const enterSearchMode = useCallback(() => {
    setIsSearchMode(true);
  }, []);
  
  // Cancel search and return to display mode
  const cancelSearch = useCallback(() => {
    if (selectedItem) {
      setIsSearchMode(false);
    }
  }, [selectedItem]);
  
  // Handle item selection from dropdown
  const handleItemSelect = useCallback((item: T, type: string) => {
    setSelectedItem(item);
    setSelectedType(type);
    setIsSearchMode(false);
    
    if (onSelectionChange) {
      onSelectionChange(item, type);
    }
  }, [onSelectionChange]);
  
  // Clear the selected item
  const clearSelection = useCallback(() => {
    setSelectedItem(null);
    setSelectedType('');
    setIsSearchMode(true);
    
    if (onSelectionChange) {
      onSelectionChange(null, '');
    }
  }, [onSelectionChange]);
  
  // Get display text for the button based on selected item
  const getDisplayText = useCallback(() => {
    if (!selectedItem) {
      return 'Seleccionar';
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
  
  return {
    isSearchMode,
    selectedItem,
    selectedType,
    toggleSearchMode,
    enterSearchMode,
    cancelSearch,
    handleItemSelect,
    clearSelection,
    getDisplayText,
  };
};