// src/features/settings/components/SettingsSection.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import Divider from '@/src/components/ui/layout/Separator';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: spacing.spacing.lg }]}>
      <Text
        style={{
          fontFamily: typography.fontFamilies.body,
          fontSize: typography.fontSizes.sm,
          fontWeight: '600',
          color: colors.text.tertiary,
          marginVertical: spacing.spacing.sm,
          marginHorizontal: spacing.spacing.md,
        }}
      >
        {title.toUpperCase()}
      </Text>
      <View
        style={[
          styles.content,
          {
            backgroundColor: colors.background.primary,
            borderRadius: 8,
            marginHorizontal: spacing.spacing.md,
          },
        ]}
      >
        {React.Children.map(children, (child, index) => (
          <>
            {child}
            {index < React.Children.count(children) - 1 && (
              <Divider className="mx-4" />
            )}
          </>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  content: {
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default SettingsSection;