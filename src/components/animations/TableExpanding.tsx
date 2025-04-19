// src/components/animations/TableExpanding.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withSequence,
  withDelay
} from 'react-native-reanimated';

interface TableExpandingProps {
  expanded: boolean;
  children: React.ReactNode;
  duration?: number;
  style?: any;
}

const TableExpanding: React.FC<TableExpandingProps> = ({
  expanded,
  children,
  duration = 300,
  style
}) => {
  // Shared values for animations
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  
  // Configure the animation when expanded state changes
  useEffect(() => {
    if (expanded) {
      // Expanding animation
      opacity.value = withTiming(1, { 
        duration: duration * 0.7, 
        easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
      });
      
      height.value = withTiming(1, { 
        duration, 
        easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
      });
    } else {
      // Collapsing animation
      opacity.value = withTiming(0, { 
        duration: duration * 0.3, 
        easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
      });
      
      height.value = withSequence(
        withDelay(
          duration * 0.2,
          withTiming(0, { 
            duration: duration * 0.8, 
            easing: Easing.bezier(0.25, 0.1, 0.25, 1) 
          })
        )
      );
    }
  }, [expanded, duration, height, opacity]);
  
  // Animated styles
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: expanded ? 'auto' : 0,
      opacity: opacity.value,
      overflow: 'hidden',
    };
  });

  return (
    <Animated.View style={[animatedStyles, style]}>
      {children}
    </Animated.View>
  );
};

export default TableExpanding;