// src/components/animations/NewsBulletTransition.tsx
import React, { useEffect } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { View } from 'moti';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';

interface NewsBulletTransitionProps {
  children: React.ReactNode;
  isActive: boolean;
  index: number;
  style?: ViewStyle;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const NewsBulletTransition: React.FC<NewsBulletTransitionProps> = ({
  children,
  isActive,
  index,
  style,
}) => {
  // Animation values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const rotateX = useSharedValue(30); // For flip effect

  useEffect(() => {
    if (isActive) {
      // Sequence for entry animation with delay based on index
      opacity.value = withDelay(
        index * 100, // Stagger items
        withTiming(1, { duration: 500 })
      );
      
      translateY.value = withDelay(
        index * 100,
        withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) })
      );
      
      rotateX.value = withDelay(
        index * 100,
        withSequence(
          withTiming(10, { duration: 250, easing: Easing.inOut(Easing.cubic) }),
          withTiming(0, { duration: 250, easing: Easing.out(Easing.cubic) })
        )
      );
    } else {
      // Exit animation
      opacity.value = withTiming(0, { duration: 300 });
      translateY.value = withTiming(-30, { duration: 300 });
      rotateX.value = withTiming(-30, { duration: 300 });
    }
  }, [isActive, index]);

  // Combine animations into a single style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { perspective: 1000 },
        { rotateX: `${rotateX.value}deg` },
      ],
    };
  });

  return (
    <AnimatedView style={[styles.container, animatedStyle, style]}>
      {children}
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
});

export default NewsBulletTransition;