import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';
import SideDrawerHeader from '@/src/features/selection/components/drawer/SideDrawerHeader';
import SideDrawerContentSpace from '@/src/features/selection/components/drawer/SideDrawerContentSpace';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface SlidingSideDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  screenType: 'products' | 'markets' | 'insumos';
  children?: React.ReactNode;
}

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.8;

const SlidingSideDrawer: React.FC<SlidingSideDrawerProps> = ({
  isVisible,
  onClose,
  screenType,
  children,
}) => {
  const { colors, shadows } = useTheme();
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -DRAWER_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, translateX, backdropOpacity]);

  if (!isVisible) return null; //  && backdropOpacity._value === 0

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              backgroundColor: colors.neutral.black,
              opacity: backdropOpacity,
            },
          ]}
        />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.drawer,
          {
            width: DRAWER_WIDTH,
            backgroundColor: colors.background.light,
            transform: [{ translateX }],
            ...shadows.componentShadows.modal,
          },
        ]}
      >
        <SideDrawerHeader title="Filters" onBackPress={onClose} />
        <SideDrawerContentSpace screenType={screenType}>
          {children}
        </SideDrawerContentSpace>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  drawer: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
});

export default SlidingSideDrawer;