import React from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <View>
        <ScreenContent path="app/(drawer)/(tabs)/two.tsx" title="Tab Two" />
      </View>
    </>
  );
}
