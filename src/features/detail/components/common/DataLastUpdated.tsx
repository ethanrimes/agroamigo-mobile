// src/features/detail/components/common/DataLastUpdated.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface DataLastUpdatedProps {
  lastUpdated?: string | Date;
}

/**
 * Component to display when data was last updated
 */
const DataLastUpdated: React.FC<DataLastUpdatedProps> = ({ 
  lastUpdated 
}) => {
  const { theme, colors } = useTheme();
  
  // Format the date for display
  const formattedDate = lastUpdated 
    ? typeof lastUpdated === 'string' 
      ? lastUpdated 
      : lastUpdated.toLocaleDateString()
    : 'No data';
  
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.text.tertiary }]}>
        Última actualización: {formattedDate}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  text: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
  },
});

export default DataLastUpdated;