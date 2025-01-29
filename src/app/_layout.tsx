import React, { useContext, useEffect, useState } from 'react';

import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { DataProvider } from 'src/context/DataProvider';
import { useColorScheme, useInitialAndroidBarSync } from '@/lib/useColorScheme';
import '@/global.css';
import { SessionProvider } from '@context/AuthContext';
import NetInfo from '@react-native-community/netinfo';
import { DataContext, DataContextValue } from 'src/context/DataProvider';
import { LoadFonts } from '@/constants/AppFonts';
import { ConnectionStatus } from '@components/ConnectionStatus';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
// import { ThemeToggle } from '@/components/ThemeToggle';
import { NAV_THEME } from '@/constants/Theme';
import { View, Spinner } from '@AppComponents';
import { Slot } from 'expo-router';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

function LayoutNavigation() {
  const [isConnected, setIsConnected] = useState<boolean | unknown>(true);
  const { setCheckConnection, setTheUser } = useContext(DataContext) as DataContextValue;
  const { fontsLoaded, fontError } = LoadFonts();

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  const checkConnectionStatus = async () => {
    setCheckConnection(true);
    console.log('Checking connection status...');
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
      setCheckConnection(false);
    });
  };

  useEffect(() => {
    checkConnectionStatus();
  }, [isConnected]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Slot />;
  }

  return isConnected === true ? (
    <Navigation />
  ) : (
    <ConnectionStatus checkConnectionStatus={checkConnectionStatus} />
  );
}

export const unstable_settings = {
  initialRouteName: '(root)',
};

const SCREEN_OPTIONS = { animation: 'ios', headerShown: false } as const;
const ROOT_OPTIONS = { headerShown: false } as const;
const DRAWER_OPTIONS = { headerShown: false } as const;

// const MODAL_OPTIONS = {
//   presentation: 'modal',
//   animation: 'fade_from_bottom',
//   title: 'Settings',
//   headerRight: () => <ThemeToggle />,
// } as const;

export function Navigation() {
  const { colorScheme } = useColorScheme();
  const { isLoading } = useContext(DataContext) as DataContextValue;

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <ActionSheetProvider>
            <NavThemeProvider value={NAV_THEME[colorScheme]}>
              {isLoading ? (
                <View className="loader">
                  <Spinner status="control" size="giant" />
                </View>
              ) : null}
              <Stack screenOptions={SCREEN_OPTIONS}>
                <Stack.Screen name="(root)" options={ROOT_OPTIONS} />
                <Stack.Screen name="(drawer)" options={DRAWER_OPTIONS} />
                {/* <Stack.Screen name="modal" options={MODAL_OPTIONS} /> */}
              </Stack>
            </NavThemeProvider>
          </ActionSheetProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  useInitialAndroidBarSync();

  const { isDarkColorScheme } = useColorScheme();
  const themeColour = !isDarkColorScheme ? 'light' : 'dark';

  return (
    <ApplicationProvider {...eva} theme={eva[themeColour]}>
      <StatusBar key={`root-status-bar-${themeColour}`} style={themeColour} />
      <IconRegistry icons={EvaIconsPack} />
      <DataProvider>
        <SessionProvider>
          <LayoutNavigation />
        </SessionProvider>
      </DataProvider>
    </ApplicationProvider>
  );
}
