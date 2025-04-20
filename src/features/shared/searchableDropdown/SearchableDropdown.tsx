// src/features/shared/searchableDropdown/SearchableDropdown.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import SearchBar from '@/src/components/ui/search/SearchBar';
import DropdownList from './components/DropdownList';
import { useDropdownVisibility } from './hooks/useDropdownVisibility';
import { useDropdownData } from './hooks/useDropdownData';
import { useInputDataFilter } from './hooks/useInputDataFilter';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

// Types to define the data structure and the order of data types
export type DataTypeOrder = 'producto-mercado' | 'mercado-producto';

interface SearchableDropdownProps {
  placeholder?: string;
  onItemSelect?: (item: any, type: string) => void;
  dataTypeOrder?: DataTypeOrder;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  placeholder = 'Buscar productos, mercados...',
  onItemSelect,
  dataTypeOrder = 'producto-mercado',
}) => {
  const [searchText, setSearchText] = useState('');
  const { theme } = useTheme();
  
  // Hook to handle dropdown visibility and animation
  const { 
    isVisible, 
    dropdownHeight, 
    showDropdown, 
    hideDropdown 
  } = useDropdownVisibility();
  
  // Hook to fetch data from repositories
  const { data, isLoading } = useDropdownData();
  
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
  
  // Handle item selection
  const handleItemSelect = (item: any, type: string) => {
    if (onItemSelect) {
      onItemSelect(item, type);
    }
    
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
  
  return (
    <View style={styles.container}>
      {/* Touchable overlay to detect outside clicks when dropdown is open */}
      {isVisible && (
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      
      {/* Search Bar */}
      <SearchBar
        placeholder={placeholder}
        value={searchText}
        onChangeText={handleSearchTextChange}
        onSubmitEditing={() => {
          // If there are filtered results, select the first one
          if (filteredData && Object.keys(filteredData).length > 0) {
            const firstType = Object.keys(filteredData)[0];
            const firstCategory = filteredData[firstType]?.[0];
            if (firstCategory?.items?.length > 0) {
              handleItemSelect(firstCategory.items[0], firstType);
            }
          }
        }}
      />
      
      {/* Dropdown List */}
      <Animated.View
        style={[
          styles.dropdownContainer,
          { 
            height: dropdownHeight,
            backgroundColor: theme.colors.background.primary,
            borderColor: theme.colors.border.light,
            shadowColor: theme.shadows.shadows.md.shadowColor,
            shadowOffset: theme.shadows.shadows.md.shadowOffset,
            shadowOpacity: theme.shadows.shadows.md.shadowOpacity,
            shadowRadius: theme.shadows.shadows.md.shadowRadius,
            elevation: theme.shadows.shadows.md.elevation,
          }
        ]}
      >
        {isVisible && (
          <DropdownList 
            data={filteredData} 
            isLoading={isLoading}
            onItemSelect={handleItemSelect}
            dataTypeOrder={dataTypeOrder}
          />
        )}
      </Animated.View>
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
    top: 55, // Position below search bar
    left: 0,
    right: 0,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 1000,
  },
});

export default SearchableDropdown;