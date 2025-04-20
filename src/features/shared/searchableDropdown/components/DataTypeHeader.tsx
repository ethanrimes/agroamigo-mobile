// src/features/shared/searchableDropdown/components/DataTypeHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { Package, ShoppingBag } from 'lucide-react-native';

interface DataTypeHeaderProps {
  type: string;
}

const DataTypeHeader: React.FC<DataTypeHeaderProps> = ({ type }) => {
  const { theme } = useTheme();
  
  // Get header title based on type
  const getHeaderTitle = () => {
    switch (type) {
      case 'producto':
        return 'Productos';
      case 'mercado':
        return 'Mercados';
      case 'municipio':
        return 'Municipios';
      case 'departamento':
        return 'Departamentos';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  // Get appropriate icon for the data type
  const renderIcon = () => {
    switch (type) {
      case 'producto':
        return <Package size={18} color={theme.colors.primary.default} />;
      case 'mercado':
        return <ShoppingBag size={18} color={theme.colors.primary.default} />;
      default:
        return null;
    }
  };
  
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background.secondary }
      ]}
    >
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text
        style={[
          styles.headerText,
          { color: theme.colors.text.primary }
        ]}
      >
        {getHeaderTitle()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  iconContainer: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DataTypeHeader;