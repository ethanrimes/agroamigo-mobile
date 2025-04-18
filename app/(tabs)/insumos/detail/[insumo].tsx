// Import needed for app/tabs/insumos/detail/[insumo].tsx
import React from 'react';
import { Stack } from 'expo-router';
import InsumoDetailScreen from '@/src/features/detail/screens/InsumoDetailScreen';

const InsumoDetailPage = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <InsumoDetailScreen />
    </>
  );
};

export default InsumoDetailPage;