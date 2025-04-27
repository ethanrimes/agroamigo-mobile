// src/features/shared/slidingSideDrawer/components/SideDrawerHeader.tsx
import React from 'react';
import { Text, View } from 'react-native';
import HStack from '@/src/components/ui/layout/HStack';
import Divider from '@/src/components/ui/layout/Separator';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import BackButton from './BackButton';

interface SideDrawerHeaderProps {
  title: string;
  onBackPress?: () => void;
}

const SideDrawerHeader: React.FC<SideDrawerHeaderProps> = ({
  title,
  onBackPress,
}) => {
  return (
    <View>
      <View className="w-full bg-green-shade6 px-4 py-2">
        <View className="w-full flex-row justify-between items-center">
          <BackButton onPress={onBackPress} />
          <Text className="text-headline-4 text-typography-white font-semibold">{title}</Text>
          <View className="w-10" />
        </View>
      </View>
      <Divider className="bg-neutral-black h-0.5" />
    </View>
  );
};

export default SideDrawerHeader;