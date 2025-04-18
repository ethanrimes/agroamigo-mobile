// src/features/home/screens/HomeScreen.tsx
import React from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Box } from '@/components/ui/box';
import { Spinner } from '@/components/ui/spinner';
import { Center } from '@/components/ui/center';
import { HomeHeader } from '../components/header';
import { 
  SavedPricesCarousel, 
  HomeNewsSection 
} from '../components/body';
import { useHomeData, useHomeActions } from '../hooks';

const HomeScreen: React.FC = () => {
  const { prices, news, location, isLoading } = useHomeData();
  const { handlePricePress, handleSearchPress } = useHomeActions();
  
  if (isLoading) {
    return (
      <Center className="flex-1 bg-background-0">
        <Spinner size="large" color="primary.500" />
      </Center>
    );
  }
  
  return (
    <VStack className="flex-1 bg-background-0">
      <HomeHeader 
        location={location}
        onSearchPress={handleSearchPress}
      />
      
      <ScrollView 
        contentContainerStyle={{ 
          paddingVertical: 16 // lg spacing
        }}
      >
        <VStack className="space-y-lg px-4">
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