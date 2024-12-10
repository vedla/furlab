import React, { useContext, useEffect } from 'react';
import { Slot, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View } from '@AppComponents';
import { DataContext, DataContextValue } from '@context/DataProvider';

export default function StackLayout() {
  const { setIsLoading } = useContext(DataContext) as DataContextValue;

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <View className="flex-1 bg-primary-500">
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="welcome" options={{ title: 'Welcome', headerShown: false }} />
          <Stack.Screen name="disclaimer" options={{ title: 'Login', headerShown: false }} />
          <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
          <Stack.Screen
            name="sign-up"
            options={{ title: 'Create an account', headerShown: false }}
          />
        </Stack>
      </SafeAreaView>
    </View>
  );
}
