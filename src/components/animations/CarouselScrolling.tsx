// src/components/animations/CarouselScrolling.tsx
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { AnimatePresence } from 'moti';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';

interface CarouselScrollingProps {
  children: React.ReactNode;
  autoScroll?: boolean;
  scrollDuration?: number;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const CarouselScrolling: React.FC<CarouselScrollingProps> = ({
  children,
  autoScroll = true,
  scrollDuration = 20000, // 20 seconds for a full scroll
  style,
  contentContainerStyle,
}) => {
  // Shared value for scroll position
  const scrollX = useSharedValue(0);
  const contentWidth = useSharedValue(0);
  const scrollViewWidth = useSharedValue(0);

  // Handler for scroll events
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onEndDrag: (event) => {
      // If user manually scrolls, we reset the auto-scroll after a pause
      if (autoScroll) {
        scrollX.value = event.contentOffset.x;
      }
    },
  });

  // Start auto-scrolling animation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (autoScroll && contentWidth.value > scrollViewWidth.value) {
      // Add a small delay before starting auto-scroll
      timeoutId = setTimeout(() => {
        // Calculate the maximum scroll distance
        const maxScroll = contentWidth.value - scrollViewWidth.value;
        
        // Animated loop from current position to the end, then back to start
        scrollX.value = withRepeat(
          withTiming(maxScroll, { duration: scrollDuration }),
          -1, // Infinite repeat
          true // Reverse on each repeat
        );
      }, 1000);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      cancelAnimation(scrollX);
    };
  }, [autoScroll, scrollDuration]);

  // Animated style for scroll view content
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -scrollX.value }],
    };
  });

  return (
    <AnimatePresence>
      <AnimatedScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        style={[styles.container, style]}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        onContentSizeChange={(width) => {
          contentWidth.value = width;
        }}
        onLayout={(event) => {
          scrollViewWidth.value = event.nativeEvent.layout.width;
        }}
      >
        <Animated.View style={[styles.animatedContainer, animatedStyle]}>
          {children}
        </Animated.View>
      </AnimatedScrollView>
    </AnimatePresence>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  contentContainer: {
    paddingHorizontal: 8,
  },
  animatedContainer: {
    flexDirection: 'row',
  },
});

export default CarouselScrolling;