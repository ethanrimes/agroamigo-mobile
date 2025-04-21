// src/features/shared/themeHeader/ThemeHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import useThemeHeaderLocation from './hooks/useThemeHeaderLocation';
import LocationComponent from '@/src/components/ui/data/LocationComponent';
import HStack from '@/src/components/ui/layout/HStack';

interface ThemeHeaderProps {
  title?: string;
  showBackButton?: boolean;
  customLocation?: string; // Optional override for location
}

const ThemeHeader: React.FC<ThemeHeaderProps> = ({ 
  title, 
  showBackButton = false,
  customLocation,
}) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { locationDisplayString, isLoading } = useThemeHeaderLocation();
  
  // Use custom location if provided, otherwise use the one from the hook
  const displayLocation = customLocation || locationDisplayString;
  
  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: theme.colors.primary.dark }
      ]}
    >
      <HStack className="items-center justify-between px-4 py-3">
        <HStack className="items-center">
          {showBackButton && (
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <ChevronLeft color="white" size={24} />
            </TouchableOpacity>
          )}
          <Text className="text-white text-xl font-semibold">
            {title || "Agro Amigo"}
          </Text>
        </HStack>
        {!isLoading && (
          <LocationComponent location={displayLocation} />
        )}
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  backButton: {
    marginRight: 8,
  },
});

export default ThemeHeader;