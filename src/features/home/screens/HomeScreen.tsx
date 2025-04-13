// src/features/home/screens/HomeScreen.tsx
import React from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { VStack } from '../../../components/ui/organization';
import { Box } from '../../../components/ui/organization';
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
      <Box 
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: theme.colors.background.primary }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary.default} />
      </Box>
    );
  }
  
  return (
    <VStack 
      className="flex-1"
      style={{ backgroundColor: theme.colors.background.primary }}
    >
      <HomeHeader 
        location={location}
        onSearchPress={handleSearchPress}
      />
      
      <ScrollView 
        contentContainerStyle={{ 
          paddingVertical: theme.spacing.spacing.lg 
        }}
      >
        <VStack 
          space="lg"
          style={{ 
            paddingHorizontal: theme.spacing.spacing.md 
          }}
        >
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