// src/features/shared/searchableDropdown/components/MajorCategoryHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import * as Icons from 'lucide-react-native';

interface MajorCategoryHeaderProps {
  category: any;
  type: string;
}

const MajorCategoryHeader: React.FC<MajorCategoryHeaderProps> = ({ 
  category, 
  type 
}) => {
  const { theme } = useTheme();

  // Get the name field based on data type
  const getCategoryName = () => {
    if (type === 'producto') {
      return category.MajorCategory || 'Unknown Category';
    } else if (type === 'mercado') {
      return category.Departamento || 'Unknown Department';
    }
    return 'Unknown Category';
  };

  // Get the icon component based on the Icon field in the data
  const renderIcon = () => {
    // Use the Icon field from the data, or a default icon if not available
    const iconName = category.Icon || 'CircleDot';
    
    // Check if the icon exists in Lucide icons
    // @ts-ignore - Dynamic icon component
    const IconComponent = Icons[iconName] || Icons.CircleDot;
    
    return (
      <IconComponent 
        size={16} 
        color={theme.colors.secondary.default} 
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        { 
          backgroundColor: theme.colors.background.tertiary,
          borderBottomColor: theme.colors.border.light,
          borderBottomWidth: 1 
        }
      ]}
    >
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text
        style={[
          styles.headerText,
          { color: theme.colors.text.secondary }
        ]}
        numberOfLines={1}
      >
        {getCategoryName()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginRight: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 13,
    fontWeight: '500',
  },
});

export default MajorCategoryHeader;