import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from '@AppComponents';

export default function StackLayout() {
  return (
    <View className="flex-1 bg-primary-500">
      <SafeAreaView style={{ flex: 1 }}>
        <Stack initialRouteName="(onboarding)/welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="welcome" options={{ title: 'Welcome', headerShown: false }} />
          <Stack.Screen name="login" options={{ title: 'Login', presentation: 'modal' }} />
          <Stack.Screen
            name="sign-up"
            options={{ title: 'Create an account', headerShown: false }}
          />
        </Stack>
      </SafeAreaView>
    </View>
  );
}
