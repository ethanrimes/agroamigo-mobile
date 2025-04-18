// app/(tabs)/(insumos)/insumos.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { InsumosSelectionScreen } from '@/src/features/selection';

export default function InsumosScreen() {
  return (
    <View style={styles.container}>
      <InsumosSelectionScreen />
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