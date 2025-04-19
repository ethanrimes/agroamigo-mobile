// src/features/home/components/body/SavedPricesCarousel.tsx
import React, { useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import SavedPriceTile from './SavedPriceTile';
import { useRouter } from 'expo-router';

interface SavedPricesCarouselProps {
  savedPrices: Array<{
    artiId: number;
    artiNombre: string;
    minPrice: number;
    maxPrice: number;
    icon: string;
    trend: 'up' | 'down' | 'neutral';
    trendValue: string;
  }>;
}

const { width: screenWidth } = Dimensions.get('window');
const ITEMS_PER_ROW = 3; // Show 3 items per row
const ITEM_WIDTH = (screenWidth - 48) / ITEMS_PER_ROW; // Calculate item width (accounting for margins and padding)

const SavedPricesCarousel: React.FC<SavedPricesCarouselProps> = ({ 
  savedPrices 
}) => {
  const { theme } = useTheme();
  const router = useRouter();
  
  // Refs for both FlatLists to sync their scrolling
  const topRowRef = useRef<FlatList>(null);
  const bottomRowRef = useRef<FlatList>(null);
  
  // Split the data into two rows
  const splitData = () => {
    const topRow = [];
    const bottomRow = [];
    
    for (let i = 0; i < savedPrices.length; i++) {
      if (i % 2 === 0) {
        topRow.push(savedPrices[i]);
      } else {
        bottomRow.push(savedPrices[i]);
      }
    }
    
    return { topRow, bottomRow };
  };
  
  const { topRow, bottomRow } = splitData();
  
  const handleItemPress = (artiId: number) => {
    // Navigate to the product detail screen
    router.push(`/productos/detail/${artiId}`);
  };
  
  // Handle synchronized scrolling
  const handleScroll = (event: any, otherListRef: React.RefObject<FlatList>) => {
    if (otherListRef.current) {
      const scrollX = event.nativeEvent.contentOffset.x;
      otherListRef.current.scrollToOffset({ offset: scrollX, animated: false });
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        Precios Guardados
      </Text>
      
      <View style={styles.carouselContainer}>
        {/* Top row */}
        <FlatList
          ref={topRowRef}
          data={topRow}
          keyExtractor={(item) => `top-${item.artiId.toString()}`}
          renderItem={({ item }) => (
            <SavedPriceTile
              item={item}
              onPress={() => handleItemPress(item.artiId)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          onScroll={(e) => handleScroll(e, bottomRowRef)}
          scrollEventThrottle={16}
          snapToAlignment="start"
          snapToInterval={ITEM_WIDTH + 8} // Width + margin
          decelerationRate="fast"
        />
        
        {/* Bottom row */}
        <FlatList
          ref={bottomRowRef}
          data={bottomRow}
          keyExtractor={(item) => `bottom-${item.artiId.toString()}`}
          renderItem={({ item }) => (
            <SavedPriceTile
              item={item}
              onPress={() => handleItemPress(item.artiId)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.listContainer, styles.bottomRow]}
          onScroll={(e) => handleScroll(e, topRowRef)}
          scrollEventThrottle={16}
          snapToAlignment="start"
          snapToInterval={ITEM_WIDTH + 8} // Width + margin
          decelerationRate="fast"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  carouselContainer: {
    flexDirection: 'column',
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  bottomRow: {
    marginTop: 8,
  },
});

export default SavedPricesCarousel;