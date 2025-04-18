import React from 'react';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '../src/theme/providers/ThemeProvider';
import { Navigator } from '../src/components/ui/navigation/Navigator';

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <Navigator>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="modal"
                options={{
                  presentation: 'modal',
                }}
              />
            </Stack>
          </Navigator>
        </ThemeProvider>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}