import * as React from 'react';
import { Stack } from 'expo-router';
import { View, Text } from '~/components/AppComponents';
const { Screen } = Stack;

export default function Home() {
  // const searchValue = useHeaderSearchBar({ hideWhenScrolling: COMPONENTS.length === 0 });

  return (
    <View>
      <Screen options={{ title: 'Home' }} />
      <Text>Home</Text>
    </View>
  );
}
