import React, { useContext, useCallback, useState, useEffect } from 'react';
import { View, Text, Button, Image } from '@AppComponents';
// import * as Updates from 'expo-updates';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect, Slot } from 'expo-router';
import { DataContext } from '@context/DataProvider';
import { DataContextValue } from '@context/Types';

export default function Welcome() {
  // const insets = useSafeAreaInsets();

  const { theUser, isLoading, setIsLoading } = useContext(DataContext) as DataContextValue;
  const [isReady, setIsReady] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    console.log('StackLayout mounted');
    return () => {
      console.log('StackLayout unmounted');
    };
  }, []);

  // console.log(Updates);

  return (
    <View className="dark container flex-1 items-center justify-center bg-primary-500 text-white">
      <View className="flex-1 items-center justify-center">
        <Image
          source={require('@/assets/logo/logo.png')}
          style={{ width: 100, height: 100 }}
          contentFit="contain"
        />
        <Text category="h1" className="text-center text-white">
          Welcome to {'\n'}Furlab
        </Text>
        <Text category="label" className="text-center text-white" status="control">
          BETA
        </Text>
        <Text className="mt-1 text-xs text-white">Prebuild 0.0.1</Text>
      </View>
      <View className="flex-2">
        <Text className="mb-5 text-white">Get started by creating an account or logging in</Text>

        <View className="mb-5 gap-4">
          <Button
            onPress={() => {
              router.navigate({ pathname: '/(auth)/login' });
            }}>
            Login
          </Button>
          <Button
            onPress={() => {
              router.navigate({ pathname: '/(auth)/disclaimer' });
            }}>
            Create an account
          </Button>
        </View>
      </View>
    </View>
  );
}
