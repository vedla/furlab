import React from 'react';
import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useSession } from '@auth/ctx';

export default function AppLayout() {
  const { sessionToken, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  console.log(sessionToken, isLoading);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!sessionToken) {
    console.log('Redirecting to sign-in screen...');
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/(auth)/welcome" />;
    // return <Text>Loading...</Text>;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
