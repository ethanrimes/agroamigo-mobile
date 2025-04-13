// app/(tabs)/_layout.tsx
import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { TabNavigator } from '../../src/components/ui/navigation';

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
        tabBar={() => <TabNavigator />}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="(productos)" />
        <Tabs.Screen name="(mercados)" />
        <Tabs.Screen name="(insumos)" />
      </Tabs>
    </View>
  );
}