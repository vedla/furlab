import React, { useContext, useEffect } from 'react';
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

const SCREEN_OPTIONS = { animation: 'ios' } as const;
const DRAWER_OPTIONS = { headerShown: false } as const;
const MODAL_OPTIONS = {
  presentation: 'modal',
  animation: 'fade_from_bottom',
  title: 'Settings',
  headerRight: () => <ThemeToggle />,
} as const;

export function Navigation() {
  const { colorScheme } = useColorScheme();
  const { setToken, isUser } = useContext(DataContext) as DataContextValue;

  useEffect(() => {
    const checkUserStatus = async () => {
      if (isUser) {
        const user = await AuthHelper.getUser();
        if (user) {
          console.info('User is signed in:', user);
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session) {
            setToken(session);

            router.replace({ pathname: '/(drawer)/one' });
          }
        } else {
          console.info('User is not sign in');
          router.replace({ pathname: '/(onboarding)/welcome' });
        }
      } else {
        router.replace({ pathname: '/(onboarding)/welcome' });
      }
    };
    checkUserStatus();
  }, [isUser, setToken]);

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <ActionSheetProvider>
            <NavThemeProvider value={NAV_THEME[colorScheme]}>
              <Stack screenOptions={SCREEN_OPTIONS}>
                <Stack.Screen name="(drawer)" options={DRAWER_OPTIONS} />
                <Stack.Screen name="(onboarding)" options={DRAWER_OPTIONS} />
                <Stack.Screen name="modal" options={MODAL_OPTIONS} />
              </Stack>
            </NavThemeProvider>
          </ActionSheetProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
