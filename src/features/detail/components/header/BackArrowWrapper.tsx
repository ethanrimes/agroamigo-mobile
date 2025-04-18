// src/features/detail/components/header/BackArrowWrapper.tsx
import React from 'react';
import { View } from 'react-native';
import BackButton from '@/src/components/ui/buttons/BackButton';
import { useRouterNavigation } from '@/src/hooks';

const BackArrowWrapper: React.FC = () => {
  const { goBack } = useRouterNavigation();
  
  return (
    <View>
      <BackButton 
        onPress={goBack} 
        color="#FFFFFF" // White color for visibility on green background
      />
    </View>
  );
};

export default BackArrowWrapper;