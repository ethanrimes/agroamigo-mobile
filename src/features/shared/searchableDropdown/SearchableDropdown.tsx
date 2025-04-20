// src/features/shared/searchableDropdown/SearchableDropdown.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import SearchBar from '@/src/components/ui/search/SearchBar';
import DropdownList from './components/DropdownList';
import { useDropdownVisibility } from './hooks/useDropdownVisibility';
import { useDropdownData } from './hooks/useDropdownData';
import { useInputDataFilter } from './hooks/useInputDataFilter';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { useSnapshotStore } from '@/src/store/snapshotStore';

// Define SnapshotType to prevent type errors
type SnapshotType = 'producto' | 'mercado' | 'insumo';

// Types to define the data structure and the order of data types
export type DataTypeOrder = 'producto-mercado' | 'mercado-producto';

interface SearchableDropdownProps {
  placeholder?: string;
  onItemSelect?: (item: any, type: string) => void;
  dataTypeOrder?: DataTypeOrder;
  enableSnapshotModal?: boolean; // New prop to control snapshot modal integration
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  placeholder = 'Buscar productos, mercados...',
  onItemSelect,
  dataTypeOrder = 'producto-mercado',
  enableSnapshotModal = false, // Default to false to maintain backward compatibility
}) => {
  const [searchText, setSearchText] = useState('');
  const { theme } = useTheme();
  
  // IMPORTANT: Get the openModal function from the store
  const { openModal } = useSnapshotStore();
  
  // Add debug logging for props
  console.log('[SearchableDropdown] Props:', { 
    placeholder, 
    dataTypeOrder, 
    enableSnapshotModal,
    hasOnItemSelect: !!onItemSelect
  });
  
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
    console.log('[SearchableDropdown] Item selected:', { item, type });
    
    if (onItemSelect) {
      console.log('[SearchableDropdown] Calling onItemSelect callback');
      onItemSelect(item, type);
    }
    
    // Open snapshot modal if enabled
    if (enableSnapshotModal) {
      console.log('[SearchableDropdown] enableSnapshotModal is true, attempting to open modal');
      
      // Map the type to the snapshot type
      let snapshotType: SnapshotType | null = null;
      switch(type) {
        case 'producto':
          snapshotType = 'producto';
          break;
        case 'mercado':
          snapshotType = 'mercado';
          break;
        case 'insumo':
          snapshotType = 'insumo';
          break;
        default:
          snapshotType = null;
      }
      
      console.log('[SearchableDropdown] Mapped type:', { originalType: type, snapshotType });
      
      // Open the modal if we have a valid type and ID
      if (snapshotType && item.artiId) {
        console.log('[SearchableDropdown] Opening modal with:', { snapshotType, itemId: item.artiId });
        openModal(snapshotType, item.artiId);
      } else {
        console.log('[SearchableDropdown] Cannot open modal - missing data:', { 
          snapshotType, 
          itemId: item?.artiId,
          item: JSON.stringify(item)
        });
      }
    } else {
      console.log('[SearchableDropdown] enableSnapshotModal is false, not opening modal');
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
  
  // Return the JSX
  return (
    <View style={styles.container}>
      {/* Touchable overlay for outside clicks when in search mode */}
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
        // onClear={() => {
        //   setSearchText('');
        //   hideDropdown();
        // }}
      />
      
      {/* Dropdown List */}
      {isVisible && (
        <Animated.View style={[
          styles.dropdownContainer,
          { height: dropdownHeight }
        ]}>
          <DropdownList
            data={filteredData}
            isLoading={isLoading}
            onItemSelect={handleItemSelect}
            dataTypeOrder={dataTypeOrder}
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
  }
});

export default SearchableDropdown;