// src/features/detail/components/header/InfoButtonWrapper.tsx
import React from 'react';
import { Pressable } from 'react-native';
import { HelpCircle } from 'lucide-react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

const InfoButtonWrapper: React.FC = () => {
  const { colors } = useTheme();
  
  const handlePress = () => {
    // Would open information modal in a real implementation
    console.log('Info button pressed');
  };
  
  return (
    <Pressable 
      onPress={handlePress}
      className="p-2"
    >
      <HelpCircle 
        size={24} 
        color={colors.text.inverse} 
      />
    </Pressable>
  );
};

export default InfoButtonWrapper;
