// src/features/shared/searchableDropdown/components/DropdownItem.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface DropdownItemProps {
  item: any;
  type: string;
  onSelect: (item: any, type: string) => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ 
  item, 
  type,
  onSelect 
}) => {
  const { theme } = useTheme();
  
  // Get the display name based on the data type
  const getDisplayName = () => {
    switch (type) {
      case 'producto':
        return item.artiNombre || 'Unknown Product';
      case 'mercado':
        return item.Mercado || 'Unknown Market';
      case 'municipio':
        return item.Municipio || 'Unknown Municipality';
      case 'departamento':
        return item.Departamento || 'Unknown Department';
      case 'subcategory':
        return item.Subcategory || 'Unknown Subcategory';
      case 'majorCategory':
        return item.MajorCategory || 'Unknown Category';
      default:
        return 'Unknown Item';
    }
  };
  
  // Handle item selection with debug logging
  const handleItemSelect = () => {
    console.log('[DropdownItem] Item selected:', {
      name: getDisplayName(),
      type,
      itemId: type === 'producto' ? item.artiId : (item.id || 'No ID'),
      item: JSON.stringify(item)
    });
    
    onSelect(item, type);
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: theme.colors.background.primary }
      ]}
      onPress={handleItemSelect}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        <Text 
          style={[
            styles.itemText,
            { color: theme.colors.text.primary }
          ]}
          numberOfLines={1}
        >
          {getDisplayName()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 14,
    marginLeft: 8,
  },
});

export default DropdownItem;