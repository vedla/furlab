import React, { useContext, useEffect, useState } from 'react';

import * as SplashScreen from 'expo-splash-screen';

import { Text, Button, View } from '@AppComponents';

import { ApplicationProvider, Icon, IconRegistry, Spinner } from '@ui-kitten/components';
import NetInfo from '@react-native-community/netinfo';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { DataProvider, DataContext, DataContextValue } from 'src/context/DataProvider';

import { LoadFonts } from '@/constants/theme';

import '@/global.css';
import 'expo-dev-client';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeToggle } from '@/components/ThemeToggle';
import { useColorScheme, useInitialAndroidBarSync } from '@/lib/useColorScheme';
import { NAV_THEME } from '@/theme';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(onboarding)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

/**
 * The root component of the application.
 * @returns The rendered JSX element.
 */
/**
 * The main component of the application.
 * Renders the entire app UI and handles theme toggling and internet connection checking.
 */
export default function RootLayout() {
  useInitialAndroidBarSync();

  const { isDarkColorScheme } = useColorScheme();
  const { fontsLoaded, fontError } = LoadFonts();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  if (!fontsLoaded) {
    return null;
  }

  SplashScreen.hideAsync();

  const themeColour = !isDarkColorScheme ? 'light' : 'dark';

  return (
    <>
      <StatusBar key={`root-status-bar-${themeColour}`} style={themeColour} />

      <ApplicationProvider {...eva} theme={eva[themeColour]}>
        <IconRegistry icons={EvaIconsPack} />

        <DataProvider>
          <RootLayoutNav />
        </DataProvider>
      </ApplicationProvider>
    </>
  );
}

function RootLayoutNav() {
  const [isConnected, setIsConnected] = useState<boolean | unknown>(true);

  const { checkConnection, setCheckConnection } = useContext(DataContext) as DataContextValue;

  // Check internet connection
  const CheckConnection = async () => {
    setCheckConnection(true);

    NetInfo.fetch().then((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
      setCheckConnection(false);
    });
  };

  // Check connection status whenever `isConnected` changes
  useEffect(() => {
    CheckConnection();
  }, [isConnected]);

  return (
    <View className="dark flex-1">
      {isConnected === true ? (
        <Navigation />
      ) : (
        <View className="bg-primary-500 container flex flex-1 content-center items-center justify-center">
          <Icon name="wifi-off-outline" fill="white" width={100} height={100} />
          <Text category="h4" className="text-center text-white">
            No Internet Connection
          </Text>
          <Button
            onPress={CheckConnection}
            className="absolute bottom-20 mx-5 w-6/12"
            status="control"
            size="large"
            disabled={checkConnection}
            accessoryLeft={() => {
              return checkConnection ? <Spinner size="medium" status="control" /> : <></>;
            }}>
            <Text>{checkConnection ? 'Checking...' : 'Try again'}</Text>
          </Button>
        </View>
      )}
    </View>
  );
}

const SCREEN_OPTIONS = {
  animation: 'ios', // for android
} as const;

const DRAWER_OPTIONS = {
  headerShown: false,
} as const;

const MODAL_OPTIONS = {
  presentation: 'modal',
  animation: 'fade_from_bottom', // for android
  title: 'Settings',
  headerRight: () => <ThemeToggle />,
} as const;

function Navigation() {
  const { colorScheme } = useColorScheme();
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <ActionSheetProvider>
          <NavThemeProvider value={NAV_THEME[colorScheme]}>
            <Stack screenOptions={SCREEN_OPTIONS}>
              <Stack.Screen name="(drawer)" options={DRAWER_OPTIONS} />
              <Stack.Screen name="modal" options={MODAL_OPTIONS} />
            </Stack>
          </NavThemeProvider>
        </ActionSheetProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
