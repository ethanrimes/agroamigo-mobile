// app/(tabs)/index.tsx
import React from 'react';
import { HomeScreen } from '../../src/features/home';
import { SafeAreaView } from 'react-native';
import { useTheme } from '../../src/theme/providers/ThemeProvider';

export default function Home() {
  const { theme } = useTheme();

  return (
    <SafeAreaView 
      style={{ 
        flex: 1, 
        backgroundColor: theme.colors.background.primary 
      }}
    >
      <HomeScreen />
    </SafeAreaView>
  );
}