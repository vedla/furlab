import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from '@AppComponents';

export default function StackLayout() {
  return (
    <View className="bg-primary-500 flex-1">
      <SafeAreaView style={{ flex: 1 }}>
        <Stack initialRouteName="(stack)/index" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ title: 'Welcome', headerShown: false }} />
          <Stack.Screen name="login" options={{ title: 'Login', presentation: 'modal' }} />
          <Stack.Screen
            name="new-account"
            options={{ title: 'Create an account', presentation: 'modal' }}
          />
        </Stack>
      </SafeAreaView>
    </View>
  );
}
