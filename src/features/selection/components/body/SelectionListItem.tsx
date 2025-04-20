// src/features/selection/components/body/SelectionListItem.tsx
import React from 'react';
import { Text, Pressable, StyleSheet, View, Platform } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { TrendTicker } from '@/src/components/ui/data';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface SelectionListItemProps {
  title: string;
  subtitle?: string;
  price: string;
  trend: 'up' | 'down' | 'stable';
  trendValue?: string;
  onPress?: () => void;
}

const SelectionListItem: React.FC<SelectionListItemProps> = ({
  title,
  subtitle,
  price,
  trend,
  trendValue = "",
  onPress,
}) => {
  const { colors, shadows } = useTheme();
  
  // Convert trend to the format expected by TrendTicker
  const trendForTicker = trend === 'stable' ? 'neutral' : trend;
  
  // Extract shadow properties
  const shadowProps = shadows.componentShadows.card;

  return (
    <Pressable 
      onPress={onPress}
      style={({pressed}) => [
        styles.container,
        // Apply platform-specific shadow styling
        Platform.OS === 'ios' ? {
          shadowColor: shadowProps.shadowColor || '#000',
          shadowOffset: shadowProps.shadowOffset || { width: 0, height: 2 },
          shadowOpacity: shadowProps.shadowOpacity || 0.3,
          shadowRadius: shadowProps.shadowRadius || 4,
        } : {
          elevation: shadowProps.elevation || 6,
        },
        pressed && styles.pressed
      ]}
    >
      <View style={styles.innerContainer}>
        {/* Component content remains the same */}
        <HStack className="justify-between items-center">
          <Box className="flex-1">
            <Text style={[styles.title, { color: colors.text.primary }]}>{title}</Text>
            {subtitle && (
              <Text style={[styles.subtitle, { color: colors.text.secondary }]}>{subtitle}</Text>
            )}
          </Box>
          
          <HStack className="space-x-4 items-center">
            <Text style={[styles.price, { color: colors.text.primary }]}>{price}</Text>
            <TrendTicker trend={trendForTicker} value={trendValue} />
          </HStack>
        </HStack>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  innerContainer: {
    padding: 16,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.9,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
  }
});

export default SelectionListItem;