// src/features/shared/searchableDropdown/components/SubcategoryHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import * as Icons from 'lucide-react-native';

interface SubcategoryHeaderProps {
  subcategory: any;
  type: string;
}

const SubcategoryHeader: React.FC<SubcategoryHeaderProps> = ({ 
  subcategory, 
  type 
}) => {
  const { theme } = useTheme();

  // Get the name field based on data type
  const getSubcategoryName = () => {
    if (type === 'producto') {
      return subcategory.Subcategory || 'Unknown Subcategory';
    } else if (type === 'mercado') {
      return subcategory.Municipio || 'Unknown Municipality';
    }
    return 'Unknown Subcategory';
  };

  // Get the icon component based on the Icon field in the data
  const renderIcon = () => {
    // Use the Icon field from the data, or a default icon if not available
    const iconName = subcategory.Icon || 'CircleDashed';
    
    // Check if the icon exists in Lucide icons
    // @ts-ignore - Dynamic icon component
    const IconComponent = Icons[iconName] || Icons.CircleDashed;
    
    return (
      <IconComponent 
        size={14} 
        color={theme.colors.text.tertiary} 
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background.light }
      ]}
    >
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text
        style={[
          styles.headerText,
          { color: theme.colors.text.tertiary }
        ]}
        numberOfLines={1}
      >
        {getSubcategoryName()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 24, // Indented
  },
  iconContainer: {
    marginRight: 8,
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 12,
    fontWeight: '400',
  },
});

export default SubcategoryHeader;