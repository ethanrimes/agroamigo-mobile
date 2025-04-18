// app/(tabs)/_layout.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import TabNavigator from '@/src/components/ui/navigation/TabNavigator';

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Slot />
      </View>
      <TabNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
  }
});