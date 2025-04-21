// src/components/ui/navigation/TabNavigator.tsx
import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Home, Leaf, ShoppingBag, Globe, Settings } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';
import { useTheme } from '@/src/theme/providers/ThemeProvider';

interface TabIconProps {
  size: number;
  color: string;
}

interface TabItem {
  name: string;
  label: string;
  icon: React.ComponentType<TabIconProps>;
  path: string;
}

export const TabNavigator: React.FC = () => {
  const { colors, typography, spacing } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  // Define tab items with properly typed icons and updated paths
  const tabs: TabItem[] = [
    {
      name: 'home',
      label: 'Home',
      icon: (props: TabIconProps) => <Home {...props} />,
      path: '/',
    },
    {
      name: 'productos',
      label: 'Productos',
      icon: (props: TabIconProps) => <Leaf {...props} />,
      path: '/productos', // Updated to match folder name
    },
    {
      name: 'mercados',
      label: 'Mercados',
      icon: (props: TabIconProps) => <Globe {...props} />,
      path: '/mercados', // Updated to match folder name
    },
    {
      name: 'insumos',
      label: 'Insumos',
      icon: (props: TabIconProps) => <ShoppingBag {...props} />,
      path: '/insumos',
    },
    {
      name: 'settings',
      label: 'Ajustes',
      icon: (props: TabIconProps) => <Settings {...props} />,
      path: '/settings',
    },
  ];

  // Check if a tab is active
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: colors.background.primary,
      borderTopWidth: 1,
      borderTopColor: colors.border.light,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      elevation: 2,
      flexDirection: 'row',
      height: 60,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    tabButton: {
      alignItems: 'center',
      padding: spacing.spacing.xs,
    },
    tabLabel: {
      fontFamily: typography.fontFamilies.body,
      fontSize: typography.fontSizes.sm,
      marginTop: spacing.spacing[1],
      fontWeight: '500', // Using a string literal that's valid for RN
      color: colors.text.tertiary,
    },
    activeTabLabel: {
      color: colors.primary.default,
    }
  });

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const active = isActive(tab.path);
        const Icon = tab.icon;
        
        return (
          <Pressable
            key={tab.name}
            style={styles.tabButton}
            onPress={() => {
              if (tab.path === '/') {
                router.push('/');
              } else {
                router.push(tab.path as any);
              }
            }}
          >
            <Icon
              size={24}
              color={active ? colors.primary.default : colors.text.tertiary}
            />
            <Text
              style={[
                styles.tabLabel,
                active && styles.activeTabLabel
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default TabNavigator;