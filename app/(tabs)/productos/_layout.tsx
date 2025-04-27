// app/(tabs)/(productos)/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function ProductosLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="products"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="detail/[producto]"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}