import React, { useContext, useEffect, useState } from 'react';
import { SplashScreen } from 'expo-router';
import NetInfo from '@react-native-community/netinfo';
import { DataContext, DataContextValue } from 'src/context/DataProvider';
import { LoadFonts } from '@/constants/theme';
import { ConnectionStatus } from '@componentslayout/ConnectionStatus';
import { Navigation } from '@componentslayout/Navigation';
import AuthHelper from '@auth/AuthHelper';
import { Slot } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export function LayoutNavigation() {
  const [isConnected, setIsConnected] = useState<boolean | unknown>(true);
  const { setCheckConnection, setIsUser } = useContext(DataContext) as DataContextValue;
  // const { fontsLoaded, fontError } = LoadFonts();

  // useEffect(() => {
  //   if (fontError) throw fontError;
  // }, [fontError]);

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
    SplashScreen.hideAsync();
  }, [isConnected]);

  // useEffect(() => {
  //   loadUser();
  // }, [fontsLoaded]);

  const loadUser = async () => {
    const isUser = await AuthHelper.isUserSignedIn();
    setIsUser(isUser);
  };

  // useEffect(() => {
  //   if (fontsLoaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return <Slot />;
  // }

  return isConnected === true ? (
    <Navigation />
  ) : (
    <ConnectionStatus checkConnectionStatus={checkConnectionStatus} />
  );
}
