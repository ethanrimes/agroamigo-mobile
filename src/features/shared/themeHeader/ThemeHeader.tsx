// src/features/shared/themeHeader/ThemeHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import HStack from '@/src/components/ui/layout/HStack';

interface ThemeHeaderProps {
  title?: string;
  showBackButton?: boolean;
}

const ThemeHeader: React.FC<ThemeHeaderProps> = ({ 
  title, 
  showBackButton = false,
}) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  
  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: theme.colors.primary.dark }
      ]}
    >
      <View style={styles.headerContainer}>
        <HStack className="items-center justify-center px-4 py-3 w-full relative">
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
});

export default ThemeHeader;