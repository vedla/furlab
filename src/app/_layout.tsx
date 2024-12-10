import React from 'react';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { DataProvider } from 'src/context/DataProvider';
import { useColorScheme, useInitialAndroidBarSync } from '@/lib/useColorScheme';
import { LayoutNavigation } from '@componentslayout/LayoutNavigation';
import '@/global.css';
import { SessionProvider } from '@auth/ctx';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

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
