// app/(tabs)/settings/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="settings" 
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}