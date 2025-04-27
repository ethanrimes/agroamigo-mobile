// src/components/animations/SlideAnimation.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, ViewStyle } from 'react-native';

interface SlideAnimationProps {
  visible: boolean;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  duration?: number;
  style?: ViewStyle;
  children: React.ReactNode;
}

/**
 * A reusable slide animation component that can animate from any direction
 */
const SlideAnimation: React.FC<SlideAnimationProps> = ({
  visible,
  direction = 'left',
  duration = 300,
  style,
  children,
}) => {
  const { width, height } = Dimensions.get('window');
  const translateValue = useRef(new Animated.Value(0)).current;
  
  // Determine the initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'right':
        return width;
      case 'top':
        return -height;
      case 'bottom':
        return height;
      case 'left':
      default:
        return -width;
    }
  };
  
  // Set up the transform property based on direction
  const getTransform = () => {
    switch (direction) {
      case 'right':
      case 'left':
        return [{ translateX: translateValue }];
      case 'top':
      case 'bottom':
        return [{ translateY: translateValue }];
      default:
        return [{ translateX: translateValue }];
    }
  };
  
  useEffect(() => {
    // Reset to initial position if becoming visible
    if (visible) {
      translateValue.setValue(getInitialPosition());
    }
    
    Animated.timing(translateValue, {
      toValue: visible ? 0 : getInitialPosition(),
      duration,
      useNativeDriver: true,
    }).start();
  }, [visible, duration]);
  
  return (
    <Animated.View
      style={[
        style,
        {
          transform: getTransform(),
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default SlideAnimation;