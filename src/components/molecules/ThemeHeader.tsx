// src/features/home/screens/ThemeHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import LocationComponent from '@/src/components/ui/data/LocationComponent';
import Logo from '@/src/components/ui/icons/Logo';
import HStack from '@/src/components/ui/layout/HStack';

interface ThemeHeaderProps {
  location: string;
}

const ThemeHeader: React.FC<ThemeHeaderProps> = ({ location }) => {
  const { theme } = useTheme();
  
  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: theme.colors.primary.dark }
      ]}
    >
      <HStack className="items-center justify-between px-4 py-3">
        <Text className="text-white text-xl font-semibold">
          Agro Amigo
        </Text>
        <LocationComponent location={location} />
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default ThemeHeader;