// src/features/home/screens/HomeScreen.tsx
import React from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import ThemeHeader from '@/src/components/molecules/ThemeHeader';
import HomeHeader from '../components/header/HomeHeader';
import SavedPricesCarousel from '../components/body/SavedPricesCarousel';
import Divider from '@/src/components/ui/layout/Separator';
import FeaturedPriceTile from '../components/body/FeaturedPriceTile';
import { useHomeData } from '../hooks/useHomeData';

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { 
    savedPrices, 
    featuredPriceData, 
    isLoading, 
    error,
    locationName,
    currentLocationId
  } = useHomeData();
  
  // Create a location display string
  const locationDisplayString = React.useMemo(() => {
    return locationName || `Market ID: ${currentLocationId}`;
  }, [locationName, currentLocationId]);
  
  // Render loading state
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.colors.background.primary }]}>
        <ActivityIndicator size="large" color={theme.colors.green.shade5} />
      </View>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.colors.background.primary }]}>
        <Text style={{ color: theme.colors.action.error, fontSize: 16 }}>
          {error}
        </Text>
      </View>
    );
  }
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Theme Header with Logo and Location from locationStore */}
      <ThemeHeader location={locationDisplayString} />
      
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {/* Welcome Message and Search Bar */}
        <HomeHeader />
        
        {/* Saved Prices Section */}
        <View style={styles.sectionContainer}>
          <SavedPricesCarousel savedPrices={savedPrices} />
        </View>
        
        {/* Divider */}
        <Divider className="my-4" />
        
        {/* Featured Price Section */}
        <View style={styles.sectionContainer}>
          <FeaturedPriceTile 
            item={featuredPriceData} 
          />
        </View>
        
        {/* Add some padding at the bottom for better scrolling experience */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 20, // Add padding at the bottom for better scrolling
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  bottomPadding: {
    height: 60, // Extra padding at the bottom to account for the tab bar
  }
});

export default HomeScreen;