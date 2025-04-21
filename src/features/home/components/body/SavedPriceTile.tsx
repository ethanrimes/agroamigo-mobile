// src/features/home/components/body/SavedPriceTile.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import TrendTicker from '@/src/components/ui/data/TrendTicker';
import ItemIcon from '@/src/components/ui/icons/ItemIcon';

interface SavedPriceTileProps {
  item: {
    artiId: number;
    artiNombre: string;
    minPrice: number;
    maxPrice: number;
    icon: string;
    trend: 'up' | 'down' | 'neutral';
    trendValue: string;
    unitsPresentationName?: string;
  };
  onPress?: () => void;
}

const SavedPriceTile: React.FC<SavedPriceTileProps> = ({ 
  item,
  onPress 
}) => {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { 
          backgroundColor: theme.colors.neutral.white, // Lighter color as requested
          borderColor: theme.colors.border.light,
          ...theme.componentShadows.card
        }
      ]}
      onPress={onPress}
    >
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <ItemIcon 
            name={item.icon} 
            size={20} 
            color={theme.colors.green.shade5} // Darker green to match header
          />
        </View>
        
        <View style={styles.detailsContainer}>
          <Text style={[styles.productName, { color: theme.colors.text.primary }]} numberOfLines={1}>
            {item.artiNombre}
          </Text>
          
          {item.unitsPresentationName && (
            <Text style={[styles.unitPresentation, { color: theme.colors.text.tertiary }]} numberOfLines={1}>
              {item.unitsPresentationName}
            </Text>
          )}
          
          <Text style={[styles.priceRange, { color: theme.colors.text.secondary }]}>
            ${item.minPrice.toLocaleString()} - ${item.maxPrice.toLocaleString()}
          </Text>
          
          <View style={styles.trendContainer}>
            <TrendTicker 
              value={item.trendValue} 
              trend={item.trend} 
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
    marginRight: 8,
    marginBottom: 8,
    width: 110, // Smaller width to fit 3 in a row
    height: 110, // Increased height to accommodate unit presentation
  },
  contentContainer: {
    padding: 8,
    justifyContent: 'space-between',
    height: '100%',
  },
  iconContainer: {
    marginBottom: 4,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  productName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  unitPresentation: {
    fontSize: 9,
    marginBottom: 2,
  },
  priceRange: {
    fontSize: 10,
    marginBottom: 2,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SavedPriceTile;