// src/features/home/screens/HomeScreen.tsx
import React from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { VStack, Box } from '@gluestack-ui/themed';
import { HomeHeader } from '../components/header';
import { 
  SavedPricesCarousel, 
  HomeNewsSection 
} from '../components/body';
import { useHomeData, useHomeActions } from '../hooks';
import { useTheme } from '../../../theme/providers/ThemeProvider';

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const { prices, news, location, isLoading } = useHomeData();
  const { handlePricePress, handleSearchPress } = useHomeActions();
  
  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color={theme.colors.primary.default} />
      </Box>
    );
  }
  
  return (
    <VStack flex={1} backgroundColor={theme.colors.background.primary}>
      <HomeHeader 
        location={location}
        onSearchPress={handleSearchPress}
      />
      
      <ScrollView 
        contentContainerStyle={{ 
          paddingVertical: theme.spacing.spacing.lg 
        }}
      >
        <VStack paddingHorizontal={theme.spacing.spacing.md}>
          <SavedPricesCarousel 
            prices={prices}
            onPricePress={handlePricePress}
          />
          
          <HomeNewsSection news={news} />
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default HomeScreen;