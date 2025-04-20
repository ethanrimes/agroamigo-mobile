// src/features/shared/snapshot/modals/mercadoSnapshot.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

// Component for displaying market information in the snapshot modal
interface MercadoSnapshotProps {
  marketId: number;
}

const MercadoSnapshot: React.FC<MercadoSnapshotProps> = ({
  marketId,
}) => {
  const { colors, typography } = useTheme();
  
  return (
    <View style={styles.container}>
      <Text style={[
        styles.placeholder, 
        { color: colors.text.primary },
        // typography.textStyles.body1
      ]}>
        Mercado Snapshot (ID: {marketId})
      </Text>
      <Text style={[
        styles.description, 
        { color: colors.text.secondary },
        // typography.textStyles.body3
      ]}>
        Esta pantalla mostrará información detallada sobre el mercado seleccionado.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  placeholder: {
    marginBottom: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
});

export default MercadoSnapshot;