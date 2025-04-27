// app/(tabs)/(mercados)/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function MercadosLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="markets"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="detail/[mercado]"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}