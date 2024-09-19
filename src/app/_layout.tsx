// import React, { useContext, useEffect, useState } from 'react';
// import 'expo-dev-client';
// import '@/global.css';
// import '@AppTranslation';
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import { ActionSheetProvider } from '@expo/react-native-action-sheet';
// // import { Stack } from 'expo-router';
// // import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import * as SystemUI from 'expo-system-ui';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import Auth from 'src/auth/Auth';
// import { Appearance, Pressable, Vie } from 'react-native';
// import {
//   ApplicationProvider,
//   Icon,
//   IconRegistry,
//   Text,
//   Button,
//   Spinner,
// } from '@ui-kitten/components';

// import { EvaIconsPack } from '@ui-kitten/eva-icons';
// import * as eva from '@eva-design/eva';
// import {
//   DataProvider,
//   setData,
//   getData,
//   DataContext,
//   DataContextValue,
// } from 'src/context/DataProvider';
// import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
// import { ThemeToggle } from '@/components/ThemeToggle';
// import { cn } from '@/lib/cn';
// import { useColorScheme, useInitialAndroidBarSync } from '@/lib/useColorScheme';
// import { NAV_THEME } from '@/theme';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// // import { LoadFonts } from '@/constants/theme';
// import { StatusBar } from 'expo-status-bar';
// import { ThemeContext } from 'src/context/ThemeContext';

// // import { useColorScheme } from 'nativewind';

// // import { SafeAreaProvider } from 'react-native-safe-area-context';

// export { ErrorBoundary } from 'expo-router';

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

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(onboarding)',
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

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
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  // const { fontsLoaded, fontError } = LoadFonts();
  // State variables
  // const [theme] = useState<string>('dark');
  // const { setColorScheme } = useColorScheme();

  // Get saved display mode from local storage
  // const savedDisplayMode = getData('theme');

  // Set theme based on saved display mode
  // useEffect(() => {
  //   const seTheme = async () => {
  //     const value = await savedDisplayMode;
  //     const color = await SystemUI.getBackgroundColorAsync();

  //     if (value == null) {
  //       setTheme('dark');
  //       setColorScheme('dark');
  //     } else {
  //       const displayMode = String(value) === 'light' ? 'light' : 'dark';
  //       setTheme(displayMode);
  //       setColorScheme(displayMode);
  //     }
  //   };

  //   seTheme();
  // }, []);

  // console.log('color', theme);
  // Toggle theme between light and dark
  // const toggleTheme = () => {
  //   const toggle = theme === 'light' ? 'dark' : 'light';
  //   setTheme(toggle);
  //   setData('theme', toggle);
  // };

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  // useEffect(() => {
  //   if (fontError) throw fontError;
  // }, [fontError]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  // SplashScreen.hideAsync();

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      {/* WRAP YOUR APP WITH ANY ADDITIONAL PROVIDERS HERE */}
      {/* <ExampleProvider> */}
      {/* <ApplicationProvider {...eva} theme={eva[isDarkColorScheme ? 'light' : 'dark']}> */}
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

      {/* </ExampleProvider> */}

      {/* <IconRegistry icons={EvaIconsPack} />
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <DataProvider>
            <RootLayoutNav />
          </DataProvider>
        </ThemeContext.Provider> */}
      {/* </ApplicationProvider> */}
    </>
  );
}

// function RootLayoutNav() {
//   const [isConnected, setIsConnected] = useState<boolean | unknown>(true);

//   const { checkConnection, setCheckConnection } = useContext(DataContext) as DataContextValue;

//   // Check internet connection
//   // const CheckConnection = async () => {
//   //   clearCache();
//   //   setCheckConnection(true);
//   //   const network = await Network.getNetworkStateAsync();
//   //   setIsConnected(network.isConnected);
//   //   setCheckConnection(false);
//   // };

//   // // Check connection status whenever `isConnected` changes
//   // useEffect(() => {
//   //   CheckConnection();
//   // }, [isConnected]);
//   console.log(Appearance.getColorScheme());
//   return (
//     <View className="dark flex-1">
//       {isConnected === true ? (
//         <Navigation />
//       ) : (
//         <View className="bg-primary-500 container flex flex-1 content-center items-center justify-center">
//           <Icon name="wifi-off-outline" fill="white" width={100} height={100} />
//           <Text category="h4" className="text-center text-white">
//             No Internet Connection
//           </Text>
//           <Button
//             // onPress={CheckConnection}
//             className="absolute bottom-20 mx-5 w-6/12"
//             status="control"
//             size="large"
//             disabled={checkConnection}
//             accessoryLeft={() => {
//               return checkConnection ? <Spinner size="medium" status="control" /> : <></>;
//             }}>
//             <Text>{checkConnection ? 'Checking...' : 'Try again'}</Text>
//           </Button>
//         </View>
//       )}
//     </View>
//   );
// }

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
