// components/charts/D3Container.tsx
import React from 'react';
import { View } from 'react-native';
import Svg from 'react-native-svg';
import { useTheme } from '../../theme/providers/ThemeProvider';

interface D3ContainerProps {
  width: number;
  height: number;
  children: React.ReactNode;
  style?: any;
  backgroundColor?: string;
}

const D3Container: React.FC<D3ContainerProps> = ({
  width,
  height,
  children,
  style,
  backgroundColor,
}) => {
  const { svg } = useTheme();
  
  // Default to the theme's primary background color if not provided
  const bgColor = backgroundColor || svg.colors.background.primary;
  
  return (
    <View style={[{ width, height }, style]}>
      <Svg width={width} height={height} style={{ backgroundColor: bgColor }}>
        {children}
      </Svg>
    </View>
  );
};

export default D3Container;