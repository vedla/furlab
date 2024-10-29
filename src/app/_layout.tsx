import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { DataProvider } from 'src/context/DataProvider';
import { useColorScheme, useInitialAndroidBarSync } from '@/lib/useColorScheme';
import { LayoutNavigation } from '@componentslayout/LayoutNavigation';
import '@/global.css';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useInitialAndroidBarSync();

  const { isDarkColorScheme } = useColorScheme();
  const themeColour = !isDarkColorScheme ? 'light' : 'dark';

  return (
    <>
      <StatusBar key={`root-status-bar-${themeColour}`} style={themeColour} />
      <ApplicationProvider {...eva} theme={eva[themeColour]}>
        <IconRegistry icons={EvaIconsPack} />
        <DataProvider>
          <LayoutNavigation />
        </DataProvider>
      </ApplicationProvider>
    </>
  );
}
