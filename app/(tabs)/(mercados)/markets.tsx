// app/(tabs)/(mercados)/markets.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MarketsSelectionScreen } from '@/src/features/selection';

export default function MarketsScreen() {
  return (
    <View style={styles.container}>
      <MarketsSelectionScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});