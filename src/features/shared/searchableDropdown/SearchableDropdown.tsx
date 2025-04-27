// src/features/shared/searchableDropdown/SearchableDropdown.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import SearchBar from '@/src/components/ui/search/SearchBar';
import DropdownList from './components/DropdownList';
import { useDropdownVisibility } from './hooks/useDropdownVisibility';
import { useDropdownData, DataType } from './hooks/useDropdownData';
import { useInputDataFilter } from './hooks/useInputDataFilter';
import { useSearchableSelection, SelectableItem } from './hooks/useSearchableSelection';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

// Types to define the data structure and the order of data types
export type DataTypeOrder = 'producto-mercado' | 'mercado-producto';

interface SearchableDropdownProps<T extends SelectableItem = SelectableItem> {
  placeholder?: string;
  onItemSelect?: (item: T, type: string) => void;
  dataTypeOrder?: DataTypeOrder;
  dataTypes?: DataType[];
  initialSelectedItem?: T | null;
  initialSelectedType?: string;
  enableSnapshotModal?: boolean; // Control snapshot modal integration
  containerStyle?: any; // Additional container styling
}

const SearchableDropdown = <T extends SelectableItem = SelectableItem>({
  placeholder = 'Buscar productos, mercados...',
  onItemSelect,
  dataTypeOrder = 'producto-mercado',
  dataTypes = ['producto', 'mercado'],
  initialSelectedItem = null,
  initialSelectedType = '',
  enableSnapshotModal = false,
  containerStyle = {},
}: SearchableDropdownProps<T>) => {
  const [searchText, setSearchText] = useState('');
  const { theme } = useTheme();
  
  // Hook to handle dropdown visibility and animation
  const { 
    isVisible, 
    dropdownHeight, 
    showDropdown, 
    hideDropdown 
  } = useDropdownVisibility();
  
  // Hook to handle selection state with visual enhancements
  const {
    selectedItem,
    selectedType,
    hasSelection,
    selectItem,
    clearSelection,
    getDisplayText,
    getSelectedStyle
  } = useSearchableSelection<T>({
    initialSelectedItem,
    initialSelectedType,
    // Creating a wrapper function that ensures types align correctly
    onSelectionChange: onItemSelect ? (item, type) => {
      // Only call onItemSelect when item is not null
      if (item !== null) {
        onItemSelect(item, type);
      }
    } : undefined
  });
  
  // Get style enhancements for the search bar
  const { containerStyle: selectionContainerStyle, textStyle } = getSelectedStyle();
  
  // Hook to fetch data from repositories
  const { data, isLoading } = useDropdownData({ dataTypes });
  
  // Hook to filter data based on search input
  const filteredData = useInputDataFilter(data, searchText, dataTypeOrder);
  
  // Handle search text change
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
    
    // Show dropdown if there's text, hide if empty
    if (text.length > 0) {
      showDropdown();
    } else {
      hideDropdown();
    }
  };
  
  // Internal handler for item selection
  const handleItemSelection = (item: any, type: string) => {
    console.log('[SearchableDropdown] Item selection detected:', { 
      type,
      itemId: item?.artiId || item?.fuenId || 'No ID',
      itemName: item?.artiNombre || item?.Mercado || 'Unknown',
      timestamp: new Date().toISOString()
    });
    
    // Call the selection handler
    selectItem(item as T, type);
    
    // Close dropdown and clear search after selection
    hideDropdown();
    setSearchText('');
    Keyboard.dismiss();
  };
  
  // Handle outside click to close dropdown
  const handleOutsideClick = () => {
    if (isVisible) {
      hideDropdown();
      Keyboard.dismiss();
    }
  };
  
  // Listen for keyboard hide to close dropdown
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        hideDropdown();
      }
    );
    
    return () => {
      keyboardDidHideListener.remove();
    };
  }, [hideDropdown]);
  
  // Return the JSX
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Touchable overlay for outside clicks when dropdown is visible */}
      {isVisible && (
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      
      {/* Enhanced SearchBar */}
      <View style={[
        hasSelection && styles.selectedContainer,
        selectionContainerStyle
      ]}>
        <SearchBar
          placeholder={placeholder}
          value={searchText}
          onChangeText={handleSearchTextChange}
          containerStyle={[
            hasSelection && styles.enhancedSearchContainer,
            selectionContainerStyle
          ]}
          inputStyle={textStyle}
          rightElement={
            hasSelection && !searchText ? (
              <View style={styles.selectionIndicator}>
                <Text 
                  style={[styles.selectionText, textStyle]} 
                  numberOfLines={1}
                >
                  {getDisplayText()}
                </Text>
                <TouchableWithoutFeedback onPress={clearSelection}>
                  <View style={styles.clearButton}>
                    <Text style={{ color: theme.colors.text.secondary }}>✕</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ) : undefined
          }
        />
      </View>
      
      {/* Dropdown List */}
      {isVisible && (
        <Animated.View style={[
          styles.dropdownContainer,
          { height: dropdownHeight }
        ]}>
          <DropdownList
            data={filteredData}
            isLoading={isLoading}
            onItemSelect={handleItemSelection}
            dataTypeOrder={dataTypeOrder}
            enableSnapshotModal={enableSnapshotModal}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 900,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 56, // Adjust based on your SearchBar height
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  selectedContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  enhancedSearchContainer: {
    borderWidth: 2,
    borderColor: '#28C888', // Primary color from the theme
  },
  selectionIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '75%',
  },
  selectionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#263238',
    marginRight: 8,
  },
  clearButton: {
    padding: 4,
  }
});

export default SearchableDropdown;