// src/components/animations/ModalAnimation.tsx
import React, { useEffect, useState, ReactNode } from 'react';
import { 
  View, 
  Dimensions, 
  StyleSheet, 
  TouchableWithoutFeedback,
  BackHandler,
  Platform
} from 'react-native';
import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface ModalAnimationProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: number | `${number}%`;
  height?: number | `${number}%`;
  backdropOpacity?: number;
}

const ModalAnimation: React.FC<ModalAnimationProps> = ({
  visible,
  onClose,
  children,
  width = '80%' as `${number}%`,  // Increased from 75% to 80%
  height = '80%' as `${number}%`, // Increased from 75% to 80%
  backdropOpacity = 0.5,
}) => {
  const { colors, spacing, borders, shadows } = useTheme();
  const [modalVisible, setModalVisible] = useState(visible);
  
  // Shared animation values
  const backdropOpacityValue = useSharedValue(0);
  const scaleValue = useSharedValue(0.8);
  const opacityValue = useSharedValue(0);
  
  // Screen dimensions for centering
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  
  // Handler to hide the modal
  const hideModal = () => {
    backdropOpacityValue.value = withTiming(0, { duration: 250 });
    scaleValue.value = withSpring(0.8, { damping: 14, stiffness: 120 });
    opacityValue.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(setModalVisible)(false);
    });
  };
  
  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      backdropOpacityValue.value = withTiming(backdropOpacity, { duration: 300 });
      scaleValue.value = withSpring(1, { damping: 14, stiffness: 120 });
      opacityValue.value = withTiming(1, { duration: 250 });
    } else {
      hideModal();
    }
  }, [visible, backdropOpacity]);
  
  // Handle back button press on Android
  useEffect(() => {
    const handleBackPress = () => {
      if (modalVisible) {
        onClose();
        return true;
      }
      return false;
    };
    
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [modalVisible, onClose]);
  
  // Animated styles
  const backdropAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: backdropOpacityValue.value,
    };
  });
  
  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
      opacity: opacityValue.value,
    };
  });
  
  // If not visible, don't render anything
  if (!modalVisible) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View 
          style={[
            styles.backdrop, 
            { backgroundColor: colors.neutral.black },
            backdropAnimatedStyle
          ]} 
        />
      </TouchableWithoutFeedback>
      
      {/* Modal Container */}
      <Animated.View 
        style={[
          styles.modalContainer,
          {
            width,
            height,
            backgroundColor: colors.background.primary,
            borderRadius: borders.borderRadii.lg,
            ...shadows.componentShadows.modal
          },
          modalAnimatedStyle
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default ModalAnimation;