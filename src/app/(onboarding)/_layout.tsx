import React from 'react';
import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <Stack initialRouteName="(stack)/index">
      <Stack.Screen name="index" options={{ title: 'Welcome', headerShown: false }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen
        name="new-account"
        options={{ title: 'Create an account', presentation: 'modal' }}
      />
    </Stack>
  );
}
