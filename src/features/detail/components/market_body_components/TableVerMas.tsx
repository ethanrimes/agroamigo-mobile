// src/features/detail/components/market_body_components/TableVerMas.tsx
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import Animated, { 
  useAnimatedStyle, 
  withTiming,
  Easing
} from 'react-native-reanimated';

interface TableVerMasProps {
  expanded: boolean;
  onPress: () => void;
}

const TableVerMas: React.FC<TableVerMasProps> = ({
  expanded,
  onPress
}) => {
  const { colors, typography, spacing } = useTheme();

  // Animation for the icon rotation
  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { 
          rotate: withTiming(
            expanded ? '180deg' : '0deg', 
            { 
              duration: 300, 
              easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
            }
          ) 
        }
      ],
    };
  });

  return (
    <TouchableOpacity 
      onPress={onPress}
      className="py-3 bg-background-secondary rounded-b-lg items-center justify-center"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        <Text 
          style={[
            // typography.textStyles.body3Medium,
            { color: colors.primary.default }
          ]}
          className="mr-2"
        >
          {expanded ? 'Ver menos' : 'Ver 5 más...'}
        </Text>
        
        <Animated.View style={iconStyle}>
          <Text style={{ fontSize: 16, color: colors.primary.default }}>
            ▼
          </Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default TableVerMas;