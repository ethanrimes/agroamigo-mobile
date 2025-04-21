// src/features/settings/components/SettingsHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface SettingsHeaderProps {
  title: string;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ title }) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <View 
      style={[
        styles.container, 
        { 
          paddingHorizontal: spacing.spacing.md,
          paddingVertical: spacing.spacing.md,
        }
      ]}
    >
      <Text
        style={{
          fontFamily: typography.fontFamilies.heading,
          fontSize: typography.fontSizes.headline3,
          fontWeight: '700',
          color: colors.text.primary,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default SettingsHeader;