import React, { useState, useEffect } from 'react';
import { config } from './config';
import { View, ViewProps, Appearance, useColorScheme, ColorSchemeName } from 'react-native';
import { OverlayProvider } from '@gluestack-ui/overlay';
import { ToastProvider } from '@gluestack-ui/toast';
import { ModeType } from './types';

export function GluestackUIProvider({
  mode = 'light',
  ...props
}: {
  mode?: ModeType;
  children?: React.ReactNode;
  style?: ViewProps['style'];
}) {
  const colorScheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(mode === 'system' ? (colorScheme || 'light') : mode);
  
  console.log('Initial color scheme:', colorScheme);
  
  useEffect(() => {
    // Convert ModeType to ColorSchemeName for Appearance API
    let colorSchemeName: ColorSchemeName = null;
    
    if (mode === 'light' || mode === 'dark') {
      colorSchemeName = mode;
      setCurrentTheme(mode);
    } else if (mode === 'system') {
      // For 'system', we let the system decide but don't explicitly set it
      colorSchemeName = null;
      setCurrentTheme(colorScheme || 'light');
    }
    
    // Set color scheme using Appearance API
    Appearance.setColorScheme(colorSchemeName);
    
    console.log('After setting color scheme:', useColorScheme());
  }, [mode, colorScheme]);

  return (
    <View
      style={[
        config[currentTheme],
        { flex: 1, height: '100%', width: '100%' },
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}