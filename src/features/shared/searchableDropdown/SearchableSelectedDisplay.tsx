// src/features/shared/searchableDropdown/SearchableSelectedDisplay.tsx
import React, { useRef } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Feather } from "@expo/vector-icons";
import SearchableDropdown, { DataTypeOrder } from './SearchableDropdown';
import { useSearchableSelection } from './hooks/useSearchableSelection';
import { useTheme } from '@/src/theme/providers/ThemeProvider';


interface SearchableSelectedDisplayProps {
  placeholder?: string;
  onItemSelect?: (item: any, type: string) => void;
  dataTypeOrder?: DataTypeOrder;
  initialSelectedItem?: any;
  initialSelectedType?: string;
  buttonVariant?: 'solid' | 'outline' | 'link';
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg';
  enableSnapshotModal?: boolean; // Added this prop
}

const SearchableSelectedDisplay: React.FC<SearchableSelectedDisplayProps> = ({
  placeholder = 'Buscar productos, mercados...',
  onItemSelect,
  dataTypeOrder = 'producto-mercado',
  initialSelectedItem = null,
  initialSelectedType = '',
  buttonVariant = 'outline',
  buttonSize = 'md',
  enableSnapshotModal = false, // Added with default value
}) => {
  const { theme, colors, spacing, borders } = useTheme();
  const dropdownRef = useRef<View>(null);
  const styles = createStyles(theme);
  
  // Use our custom hook to manage the selection state
  const {
    isSearchMode,
    selectedItem,
    selectedType,
    enterSearchMode,
    cancelSearch,
    handleItemSelect,
    clearSelection,
    getDisplayText,
  } = useSearchableSelection({
    initialSelectedItem,
    initialSelectedType,
    onSelectionChange: onItemSelect,
  });
  
  // Handle selection from the dropdown
  const onDropdownItemSelect = (item: any, type: string) => {
    handleItemSelect(item, type);
    Keyboard.dismiss();
  };
  
  // Handle outside click to close dropdown
  const handleOutsideClick = () => {
    if (isSearchMode) {
      cancelSearch();
      Keyboard.dismiss();
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Touchable overlay for outside clicks when in search mode */}
      {isSearchMode && (
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      
      {isSearchMode ? (
        // Show SearchableDropdown in search mode
        <View ref={dropdownRef} style={styles.searchContainer}>
          <SearchableDropdown
            placeholder={placeholder}
            onItemSelect={onDropdownItemSelect}
            dataTypeOrder={dataTypeOrder}
            enableSnapshotModal={enableSnapshotModal}
          />
        </View>
      ) : (
        // Show button with selected item in display mode
        <Button
          onPress={enterSearchMode}
          variant={buttonVariant}
          size={buttonSize}
          style={styles.selectButton}
          action="primary"
        >
          <ButtonText>{getDisplayText()}</ButtonText>
          <View style={styles.buttonIconContainer}>
            <ButtonIcon as={Feather}  /> 
            {selectedItem && (
              <TouchableWithoutFeedback onPress={(e) => {
                e.stopPropagation();
                clearSelection();
              }}>
                <View style={styles.clearButtonContainer}>
                  <ButtonIcon 
                    as={Feather} 
                    // name="x" 
                    size="sm" 
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </Button>
      )}
    </View>
  );
};

// Create styles with theme values
const createStyles = (theme: any) => StyleSheet.create({
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
  searchContainer: {
    width: '100%',
  },
  selectButton: {
    width: '100%',
    justifyContent: 'space-between',
    borderColor: theme.colors.border.light,
    backgroundColor: theme.colors.background.primary,
  },
  buttonIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButtonContainer: {
    marginLeft: theme.spacing.sm,
    padding: theme.spacing.xs,
    borderRadius: theme.borders.borderRadii.round,
    backgroundColor: theme.colors.background.muted,
  },
});

export default SearchableSelectedDisplay;