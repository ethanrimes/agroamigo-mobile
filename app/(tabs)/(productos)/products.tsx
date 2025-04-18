// app/(tabs)/(productos)/products.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductsSelectionScreen } from '@/src/features/selection';

export default function ProductsScreen() {
  return (
    <View style={styles.container}>
      <ProductsSelectionScreen />
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