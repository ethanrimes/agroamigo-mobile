import React, { useEffect, useState } from 'react';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@/src/theme/providers/ThemeProvider';
import { Navigator } from '@/src/components/navigation/Navigator';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store'; // Import to ensure module is loaded
import SnapshotModal from '@/src/features/shared/snapshot/snapshotModal'; // Import the SnapshotModal component
// import { setPointerEventsDebugMode } from 'react-native';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();
// setPointerEventsDebugMode(true);  // This will highlight views capturing touches

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Initialize any necessary services
        // This also ensures SecureStore is properly loaded before it's used
        await SecureStore.isAvailableAsync();
      } catch (e) {
        console.warn("Error initializing app:", e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

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
            
            {/* Add the SnapshotModal here so it's accessible globally */}
            <SnapshotModal />
          </Navigator>
        </ThemeProvider>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}