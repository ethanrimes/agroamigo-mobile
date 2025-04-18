// app/(tabs)/(insumos)/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function InsumosLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="insumos"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(detail)/[insumo]"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}