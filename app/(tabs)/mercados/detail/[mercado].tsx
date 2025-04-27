// app/tabs/mercados/detail/[mercado].tsx
import React from 'react';
import { Stack } from 'expo-router';
import MarketDetailScreen from '@/src/features/detail/screens/MarketDetailScreen';

const MercadoDetailPage = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <MarketDetailScreen />
    </>
  );
};

export default MercadoDetailPage;