import React from 'react';
import { View, Text, Button, Image } from '@AppComponents';
import { Container } from '@/components/Container';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function Welcome() {
  const insets = useSafeAreaInsets();

  return (
    // <Container style={{ paddingTop: insets.top }}>
    <View className="bg-primary-500 dark container flex-1 items-center justify-center text-white">
      <View className="flex-1 items-center justify-center">
        <Image
          source={require('@/assets/logo/logo.png')}
          style={{ width: 100, height: 100 }}
          contentFit="contain"
        />
        <Text category="h1" className="text-center text-white">
          Welcome to {'\n'}Furlab
        </Text>
      </View>
      <View className="flex-2">
        <Text className="mb-5 text-white">Get started by creating an account or logging in</Text>
        <View className="gap-4">
          <Button
            onPress={() => {
              router.navigate({ pathname: '/(onboarding)/disclaimer' });
            }}>
            Login
          </Button>
          <Button
            onPress={() => {
              router.navigate({ pathname: '/(onboarding)/new-account' });
            }}>
            Create an account
          </Button>
        </View>
      </View>
    </View>
    // </Container>
  );
}
