import React from 'react';
import { View, Text, Button } from '@AppComponents';
import { router } from 'expo-router';

export default function Welcome() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Welcome</Text>
      <Button
        onPress={() => {
          router.navigate('login');
        }}>
        Login
      </Button>
      <Button
        onPress={() => {
          router.navigate('new-account');
        }}>
        Create an account
      </Button>
    </View>
  );
}
