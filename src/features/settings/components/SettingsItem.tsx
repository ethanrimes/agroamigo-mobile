// src/features/settings/components/SettingsItem.tsx
import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/src/theme/providers/ThemeProvider';
import { useRouterNavigation } from '@/src/hooks/useRouterNavigation';

interface SettingsItemProps {
  title: string;
  onPress?: () => void;
  route?: string;
  rightElement?: React.ReactNode;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  onPress,
  route,
  rightElement,
}) => {
  const { colors, spacing, typography } = useTheme();
  const { navigate } = useRouterNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (route) {
      navigate(route);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: pressed ? colors.background.secondary : colors.background.primary,
          paddingHorizontal: spacing.spacing.md,
          paddingVertical: spacing.spacing.sm,
        },
      ]}
      onPress={handlePress}
    >
      <Text
        style={{
          fontFamily: typography.fontFamilies.body,
          fontSize: typography.fontSizes.body3,
          color: colors.text.primary,
        }}
      >
        {title}
      </Text>
      <View style={styles.rightContent}>
        {rightElement || (
          <ChevronRight size={20} color={colors.text.tertiary} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SettingsItem;