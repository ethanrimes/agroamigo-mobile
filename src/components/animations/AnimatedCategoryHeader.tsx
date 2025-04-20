// src/features/selection/components/body/AnimatedCategoryHeader.tsx
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  interpolate 
} from 'react-native-reanimated';
import CategoryIcon, { CategoryIconName } from '@/src/components/ui/icons/CategoryIcon';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface AnimatedCategoryHeaderProps {
  title: string;
  icon: CategoryIconName;
  isOpen: boolean;
  onToggle: () => void;
}

const AnimatedCategoryHeader: React.FC<AnimatedCategoryHeaderProps> = ({ 
  title, 
  icon, 
  isOpen, 
  onToggle 
}) => {
  const { colors } = useTheme();
  
  // Animation value for arrow rotation
  const rotateValue = useSharedValue(isOpen ? 1 : 0);
  
  // Update animation value when isOpen changes
  React.useEffect(() => {
    rotateValue.value = withTiming(isOpen ? 1 : 0, { duration: 300 });
  }, [isOpen, rotateValue]);
  
  // Animated style for the arrow icon
  const arrowAnimatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      rotateValue.value,
      [0, 1],
      [0, 90] // Rotate from 0 to 90 degrees
    );
    
    return {
      transform: [{ rotate: `${rotation}deg` }]
    };
  });
  
  return (
    <TouchableOpacity 
      onPress={onToggle} 
      activeOpacity={0.8}
      style={[styles.container, { backgroundColor: colors.primary.dark }]}
    >
      <View style={styles.content}>
        <CategoryIcon name={icon} size={32} color={colors.neutral.white} />
        <Text style={[styles.title, { color: colors.neutral.white }]}>{title}</Text>
      </View>
      
      <Animated.View style={arrowAnimatedStyle}>
        <ChevronDown size={24} color={colors.neutral.white} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  }
});

export default AnimatedCategoryHeader;