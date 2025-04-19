// src/features/home/components/body/UpdatedFeaturePriceTransition.tsx
import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, StyleSheet, PanResponder } from 'react-native';

interface FeaturePriceTransitionProps {
  children: React.ReactNode[];
  intervalDuration?: number;
  transitionDuration?: number;
}

const FeaturePriceTransition: React.FC<FeaturePriceTransitionProps> = ({
  children,
  intervalDuration = 5000, // 5 seconds default
  transitionDuration = 300, // 0.3 seconds default
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateXAnim = useRef(new Animated.Value(0)).current;
  
  // Add automatic interval transition
  useEffect(() => {
    const interval = setInterval(() => {
      animateToNextSlide();
    }, intervalDuration);
    
    return () => clearInterval(interval);
  }, [children.length, intervalDuration]);
  
  // Function to animate to the next slide
  const animateToNextSlide = () => {
    // Start slide out animation
    Animated.timing(translateXAnim, {
      toValue: -100,
      duration: transitionDuration,
      useNativeDriver: true,
    }).start(() => {
      // Update index and reset position
      setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
      translateXAnim.setValue(100);
      
      // Slide in the new content
      Animated.timing(translateXAnim, {
        toValue: 0,
        duration: transitionDuration,
        useNativeDriver: true,
      }).start();
    });
  };
  
  // Function to animate to the previous slide
  const animateToPrevSlide = () => {
    // Start slide out animation
    Animated.timing(translateXAnim, {
      toValue: 100,
      duration: transitionDuration,
      useNativeDriver: true,
    }).start(() => {
      // Update index and reset position
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? children.length - 1 : prevIndex - 1
      );
      translateXAnim.setValue(-100);
      
      // Slide in the new content
      Animated.timing(translateXAnim, {
        toValue: 0,
        duration: transitionDuration,
        useNativeDriver: true,
      }).start();
    });
  };
  
  // Add swipe gesture handling with PanResponder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderMove: (_, gestureState) => {
        // Move the content with the gesture
        translateXAnim.setValue(gestureState.dx / 3); // Divide by 3 to make it less sensitive
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50) {
          // Swipe left, go to next slide
          animateToNextSlide();
        } else if (gestureState.dx > 50) {
          // Swipe right, go to previous slide
          animateToPrevSlide();
        } else {
          // Return to current slide if swipe wasn't sufficient
          Animated.spring(translateXAnim, {
            toValue: 0,
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;
  
  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.contentContainer,
          {
            transform: [
              {
                translateX: translateXAnim.interpolate({
                  inputRange: [-100, 0, 100],
                  outputRange: ['-100%', '0%', '100%'],
                }),
              },
            ],
          },
        ]}
      >
        {children[currentIndex]}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
  },
  contentContainer: {
    width: '100%',
  },
});

export default FeaturePriceTransition;