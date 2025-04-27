// src/features/detail/components/common/PriceQuantityToggle.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface PriceQuantityToggleProps {
  isPriceView: boolean;
  onToggle: (isPriceView: boolean) => void;
}

/**
 * Toggle component that switches between price and quantity views
 */
const PriceQuantityToggle: React.FC<PriceQuantityToggleProps> = ({ 
  isPriceView, 
  onToggle 
}) => {
  const { theme, colors, borders, shadows } = useTheme();
  
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.toggleContainer,
          { 
            borderColor: colors.border.light,
            ...shadows.componentShadows.card
          }
        ]}
      >
        <TouchableOpacity
          style={[
            styles.toggleButton,
            { 
              backgroundColor: isPriceView ? colors.primary.default : colors.background.primary,
              borderColor: colors.border.light,
              borderRightWidth: 1
            }
          ]}
          onPress={() => onToggle(true)}
        >
          <Text 
            style={[
              styles.toggleText,
              { 
                color: isPriceView ? colors.text.inverse : colors.text.primary,
                fontWeight: isPriceView ? '600' : '400',
                textDecorationLine: isPriceView ? 'underline' : 'none',
                textDecorationColor: isPriceView ? 'red' : 'transparent'
              }
            ]}
          >
            Precio
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.toggleButton,
            { 
              backgroundColor: !isPriceView ? colors.background.secondary : colors.background.primary
            }
          ]}
          onPress={() => onToggle(false)}
        >
          <Text
            style={[
              styles.toggleText,
              { 
                color: !isPriceView ? colors.text.primary : colors.text.primary,
                fontWeight: !isPriceView ? '600' : '400',
                textDecorationLine: !isPriceView ? 'underline' : 'none',
                textDecorationColor: !isPriceView ? 'red' : 'transparent'
              }
            ]}
          >
            Cant.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    height: 40,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  toggleText: {
    fontSize: 14,
  },
});

export default PriceQuantityToggle;