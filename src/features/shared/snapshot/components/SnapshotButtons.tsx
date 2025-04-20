// src/features/shared/snapshot/components/SnapshotButtons.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  ButtonText,
} from '@/components/ui/button';
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
      {/* Compare button */}
      <Button
        style={[
          styles.button,
          { 
            borderColor: colors.border.light,
            borderRadius: borders.borderRadii.md,
          }
        ]}
        onPress={onCompare}
        variant="outline"
        action="secondary"
        disabled={!onCompare}
      >
        <ButtonText 
          style={{ textDecorationLine: 'underline' }}
        >
          Comparar mercados
        </ButtonText>
      </Button>
      
      {/* Add to favorites button */}
      <Button
        style={[
          styles.button,
          { 
            borderColor: colors.border.light,
            borderRadius: borders.borderRadii.md,
          }
        ]}
        onPress={onAddFavorite}
        variant="outline"
        action="secondary"
        disabled={!onAddFavorite}
      >
        <ButtonText>
          Agregar a favoritos
        </ButtonText>
      </Button>
      
      {/* View analysis button (full width) */}
      <Button
        style={[
          styles.fullWidthButton,
          { 
            borderColor: colors.border.light,
            borderRadius: borders.borderRadii.md,
          }
        ]}
        onPress={onViewAnalysis}
        variant="outline"
        action="secondary"
        disabled={!onViewAnalysis}
      >
        <ButtonText style={{ textDecorationLine: 'underline' }}>
          Ver análisis
        </ButtonText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%', // Almost half, with a little space between
    marginBottom: 12,
  },
  fullWidthButton: {
    width: '100%',
  },
});

export default SnapshotButtons;