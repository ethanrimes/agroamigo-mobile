// src/components/animations/ModalAnimation.tsx
import React, { useEffect, useState, ReactNode } from 'react';
import { 
  View, 
  Animated, 
  Dimensions, 
  StyleSheet, 
  TouchableWithoutFeedback,
  BackHandler,
  Platform
} from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface ModalAnimationProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  backdropOpacity?: number;
}

const ModalAnimation: React.FC<ModalAnimationProps> = ({
  visible,
  onClose,
  children,
  width = '75%',
  height = '75%',
  backdropOpacity = 0.5,
}) => {
  const { colors, spacing, borders, shadows } = useTheme();
  const [modalVisible, setModalVisible] = useState(visible);
  
  // Animation values
  const backdropOpacityAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const opacityAnim = new Animated.Value(0);
  
  // Screen dimensions for centering
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  
  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(backdropOpacityAnim, {
          toValue: backdropOpacity,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 65,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropOpacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 0.8,
          tension: 65,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
      });
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
            { 
              backgroundColor: colors.neutral.black,
              opacity: backdropOpacityAnim 
            }
          ]} 
        />
      </TouchableWithoutFeedback>
      
      {/* Modal Container */}
      <Animated.View 
        style={[
          styles.modalContainer,
        //   {
        //     width: typeof width === 'string' ? width : width,
        //     height: typeof height === 'string' ? height : height,
        //     backgroundColor: colors.background.primary,
        //     borderRadius: borders.borderRadii.lg,
        //     transform: [{ scale: scaleAnim }],
        //     opacity: opacityAnim,
        //     ...shadows.componentShadows.modal
        //   }
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