// src/features/home/components/body/FeaturedPriceTile.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import ItemIcon from '@/src/components/ui/icons/ItemIcon';
import TrendTicker from '@/src/components/ui/data/TrendTicker';
import FeaturePriceTransition from '@/src/components/animations/FeaturePriceTransition';
import { useRouter } from 'expo-router';

interface FeaturedPriceItemType {
  artiId: number;
  artiNombre: string;
  minPrice: number;
  maxPrice: number;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  origin?: string;
  unitsPresentationName?: string;
}

interface FeaturedPriceTileProps {
  item: FeaturedPriceItemType | FeaturedPriceItemType[] | null;
}

const FeaturedPriceTile: React.FC<FeaturedPriceTileProps> = ({ item }) => {
  const { theme } = useTheme();
  const router = useRouter();
  
  // Handle null case
  if (!item) {
    return (
      <View>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Ultimos Precios
        </Text>
        <View style={[
          styles.container,
          {
            backgroundColor: theme.colors.neutral.white,
            borderColor: theme.colors.border.light,
            ...theme.componentShadows.card,
          },
        ]}>
          <Text style={[styles.noDataText, { color: theme.colors.text.tertiary }]}>
            No hay datos disponibles
          </Text>
        </View>
      </View>
    );
  }
  
  const items = Array.isArray(item) ? item : [item];
  
  const handlePress = (artiId: number) => {
    router.push(`/productos/detail/${artiId}`);
  };
  
  // Separate the stable container and the swipeable content
  return (
    <View>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        Ultimos Precios
      </Text>
      
      <View style={[
        styles.container,
        {
          backgroundColor: theme.colors.neutral.white,
          borderColor: theme.colors.border.light,
          ...theme.componentShadows.card,
        }
      ]}>
        {items.length > 1 ? (
          <FeaturePriceTransition>
            {items.map(featuredItem => (
              <TouchableOpacity
                key={featuredItem.artiId}
                style={styles.transitionContent}
                onPress={() => handlePress(featuredItem.artiId)}
              >
                <View style={styles.content}>
                  {/* Left section: Icon and Product Name */}
                  <View style={styles.leftSection}>
                    <View style={styles.iconContainer}>
                      <ItemIcon 
                        name={featuredItem.icon} 
                        size={50} 
                        color={theme.colors.green.shade5}
                      />
                    </View>
                    
                    <View style={styles.productInfoContainer}>
                      <Text style={[styles.productName, { color: theme.colors.text.primary }]}>
                        {featuredItem.artiNombre}
                      </Text>
                      {featuredItem.unitsPresentationName && (
                        <Text style={[styles.unitText, { color: theme.colors.text.tertiary }]}>
                          {featuredItem.unitsPresentationName}
                        </Text>
                      )}
                      {featuredItem.origin && (
                        <Text style={[styles.originText, { color: theme.colors.text.tertiary }]}>
                          {featuredItem.origin}
                        </Text>
                      )}
                    </View>
                  </View>
                  
                  {/* Right section: Price and Trend */}
                  <View style={styles.rightSection}>
                    <Text style={[styles.priceText, { color: theme.colors.text.primary }]}>
                      ${featuredItem.minPrice.toLocaleString()} - ${featuredItem.maxPrice.toLocaleString()}
                    </Text>
                    <View style={styles.trendContainer}>
                      <TrendTicker value={featuredItem.trendValue} trend={featuredItem.trend} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </FeaturePriceTransition>
        ) : (
          <TouchableOpacity
            style={styles.content}
            onPress={() => handlePress(items[0].artiId)}
          >
            {/* Left section: Icon and Product Name */}
            <View style={styles.leftSection}>
              <View style={styles.iconContainer}>
                <ItemIcon 
                  name={items[0].icon} 
                  size={50} 
                  color={theme.colors.green.shade5}
                />
              </View>
              
              <View style={styles.productInfoContainer}>
                <Text style={[styles.productName, { color: theme.colors.text.primary }]}>
                  {items[0].artiNombre}
                </Text>
                {items[0].unitsPresentationName && (
                  <Text style={[styles.unitText, { color: theme.colors.text.tertiary }]}>
                    {items[0].unitsPresentationName}
                  </Text>
                )}
                {items[0].origin && (
                  <Text style={[styles.originText, { color: theme.colors.text.tertiary }]}>
                    {items[0].origin}
                  </Text>
                )}
              </View>
            </View>
            
            {/* Right section: Price and Trend */}
            <View style={styles.rightSection}>
              <Text style={[styles.priceText, { color: theme.colors.text.primary }]}>
                ${items[0].minPrice.toLocaleString()} - ${items[0].maxPrice.toLocaleString()}
              </Text>
              <View style={styles.trendContainer}>
                <TrendTicker value={items[0].trendValue} trend={items[0].trend} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  container: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
  },
  transitionContent: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  productInfoContainer: {
    flexDirection: 'column',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  unitText: {
    fontSize: 11,
    marginBottom: 2,
  },
  originText: {
    fontSize: 12,
    marginBottom: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
    textAlign: 'right',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});

export default FeaturedPriceTile;