// src/features/shared/snapshot/components/SnapshotButtons.tsx
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface SnapshotButtonsProps {
  onCompare?: () => void;
  onAddFavorite?: () => void;
  onViewAnalysis?: () => void;
}

const SnapshotButtons: React.FC<SnapshotButtonsProps> = ({
  onCompare,
  onAddFavorite,
  onViewAnalysis,
}) => {
  const { colors, spacing, borders } = useTheme();
  
  return (
    <View style={styles.container}>
      {/* Row with two buttons */}
      <View style={styles.buttonRow}>
        {/* Compare Markets button */}
        <TouchableOpacity
          style={styles.button}
          onPress={onCompare}
          disabled={!onCompare}
        >
          <Text style={styles.buttonText}>
            Comparar mercados
          </Text>
        </TouchableOpacity>
        
        {/* Add to Favorites button */}
        <TouchableOpacity
          style={styles.button}
          onPress={onAddFavorite}
          disabled={!onAddFavorite}
        >
          <Text style={styles.buttonText}>
            Agregar a favoritos
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* View Analysis button (full width) */}
      <TouchableOpacity
        style={styles.fullWidthButton}
        onPress={onViewAnalysis}
        disabled={!onViewAnalysis}
      >
        <Text style={styles.buttonText}>
          Ver análisis
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  fullWidthButton: {
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    textDecorationLine: 'underline',
  }
});

export default SnapshotButtons;