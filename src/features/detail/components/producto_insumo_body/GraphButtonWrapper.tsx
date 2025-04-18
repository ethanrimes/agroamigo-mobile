// src/features/detail/components/producto_insumo_body/GraphButtonWrapper.tsx
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface GraphButtonWrapperProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  className?: string;
}

const GraphButtonWrapper: React.FC<GraphButtonWrapperProps> = ({ 
  label, 
  isActive, 
  onPress,
  className = ''
}) => {
  const { colors } = useTheme();
  
  return (
    <Pressable onPress={onPress} className={className}>
      <View 
        className={`px-4 py-2 rounded-full ${isActive ? 'bg-primary-default' : 'bg-gray-200'}`}
      >
        <Text 
          className={`font-medium ${isActive ? 'text-white' : 'text-gray-700'}`}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

export default GraphButtonWrapper;