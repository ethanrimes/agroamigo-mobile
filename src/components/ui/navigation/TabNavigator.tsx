// src/components/ui/navigation/TabNavigator.tsx
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Home, Leaf, ShoppingBag, Globe } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';
import { Typography } from '../typography';
import { useTheme } from '../../../theme/providers/ThemeProvider';

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
  const { theme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  // Define tab items with properly typed icons
  const tabs: TabItem[] = [
    {
      name: 'home',
      label: 'Home',
      icon: (props: TabIconProps) => <Home {...props} />,
      path: '/',
    },
    {
      name: 'products',
      label: 'Productos',
      icon: (props: TabIconProps) => <Leaf {...props} />,
      path: '/products',
    },
    {
      name: 'markets',
      label: 'Mercados',
      icon: (props: TabIconProps) => <Globe {...props} />,
      path: '/markets',
    },
    {
      name: 'insumos',
      label: 'Insumos',
      icon: (props: TabIconProps) => <ShoppingBag {...props} />,
      path: '/insumos',
    },
  ];

  // Check if a tab is active
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.includes(path)) return true;
    return false;
  };

  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: theme.colors.background.primary,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border.light,
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
      padding: 4,
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
            onPress={() => router.push(tab.path as any)}
          >
            <Icon
              size={24}
              color={
                active
                  ? theme.colors.primary.default
                  : theme.colors.text.tertiary
              }
            />
            <Typography
              variant="body4"
              color={
                active
                  ? theme.colors.primary.default
                  : theme.colors.text.tertiary
              }
            >
              {tab.label}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
};

export default TabNavigator;