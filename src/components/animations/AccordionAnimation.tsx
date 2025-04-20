import React, { ReactNode } from 'react';
import { StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

interface AccordionAnimationProps {
  isOpen: boolean;
  children: ReactNode;
  onAnimationComplete?: () => void;
}

const AccordionAnimation: React.FC<AccordionAnimationProps> = ({
  isOpen,
  children,
  onAnimationComplete,
}) => {
  const animatedValue = useSharedValue(isOpen ? 1 : 0);
  const [height, setHeight] = React.useState<number | null>(null);
  const [isVisible, setIsVisible] = React.useState(isOpen);

  React.useEffect(() => {
    if (isOpen && !isVisible) {
      // If opening, make content visible immediately
      setIsVisible(true);
    }

    // Animate open/closed
    animatedValue.value = withTiming(
      isOpen ? 1 : 0,
      {
        duration: 300,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      },
      (finished) => {
        if (finished && !isOpen && onAnimationComplete) {
          // Hide content when closed animation completes
          runOnJS(setIsVisible)(false);
          onAnimationComplete && runOnJS(onAnimationComplete)();
        }
      }
    );
  }, [isOpen, animatedValue, onAnimationComplete]);

  const animatedStyle = useAnimatedStyle(() => {
    // If we don't have a height yet, don't animate
    if (height === null) {
      return { opacity: isOpen ? 1 : 0 };
    }

    const contentHeight = interpolate(
      animatedValue.value,
      [0, 1],
      [0, height]
    );

    return {
      height: contentHeight,
      opacity: interpolate(animatedValue.value, [0, 0.5], [0, 1]),
      overflow: 'hidden',
    };
  });

  // This is a hidden view used to measure the full content height
  const measureLayout = (event: LayoutChangeEvent) => {
    const { height: measuredHeight } = event.nativeEvent.layout;
    setHeight(measuredHeight);
  };

  return (
    <>
      {/* Invisible measurement view */}
      {!height && (
        <Animated.View style={[styles.measurementView]} onLayout={measureLayout}>
          {children}
        </Animated.View>
      )}

      {/* Actual animated view */}
      {(isVisible || isOpen) && (
        <Animated.View style={[animatedStyle]}>
          {children}
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  measurementView: {
    opacity: 0,
    position: 'absolute',
    width: '100%',
  },
});

export default AccordionAnimation;