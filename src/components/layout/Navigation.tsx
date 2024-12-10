import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useColorScheme } from '@/lib/useColorScheme';
import { NAV_THEME } from '@/theme';
import { DataContext, DataContextValue } from 'src/context/DataProvider';
import { supabase } from '@/utils/supabase';
import AuthHelper from '@auth/AuthHelper';
import { router } from 'expo-router';
import { View, Spinner } from '@AppComponents';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: '(root)',
};

// export default function Layout() {
//   return <Stack />;
// }

const SCREEN_OPTIONS = { animation: 'ios', headerShown: false } as const;
const ROOT_OPTIONS = { headerShown: false } as const;
const DRAWER_OPTIONS = { headerShown: false } as const;

const MODAL_OPTIONS = {
  presentation: 'modal',
  animation: 'fade_from_bottom',
  title: 'Settings',
  headerRight: () => <ThemeToggle />,
} as const;

export function Navigation() {
  const { colorScheme } = useColorScheme();
  const { userToken, setUserToken, isUser, isLoading, setIsLoading, setIsUser } = useContext(
    DataContext
  ) as DataContextValue;

  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);
  const [doneInit, setDoneInit] = useState<boolean>(false);

  // console.log('isUser:', isUser);
  // console.log('userToken:', userToken);
  // console.log('showOnboarding:', showOnboarding);

  useEffect(() => {
    if (userToken) {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
    setDoneInit(true);
  }, [userToken]);

  // useEffect(() => {
  //   setIsLoading(false);
  //   // if (!doneInit) {
  //   //   setDoneInit(true);
  //   //   if (isUser) {
  //   //     router.replace({ pathname: '/(drawer)/one' });
  //   //   }
  //   // }
  // }, [doneInit]);

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
                <Stack.Screen name="modal" options={MODAL_OPTIONS} />
              </Stack>
            </NavThemeProvider>
          </ActionSheetProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
