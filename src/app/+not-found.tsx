import React from 'react';
import { router, Stack } from 'expo-router';
import { View, Button, Text, Layout } from '@AppComponents';

export default function NotFoundScreen() {
  return (
    <View className="bg-primary-500 text-white">
      <Stack.Screen options={{ title: 'Owu Something is broken', headerShown: false }} />
      <View className="container flex h-full p-10">
        <View className="flex-1 items-center justify-center">
          <View className="w-full bg-primary-900 p-5">
            <Text category="h4" className="text-center text-white">
              This screen doesn't exist or got lost in the void.
            </Text>
            <Text category="label" className="mt-2 text-center text-white">
              Err 404
            </Text>
          </View>
          <View className="w-full bg-primary-700 p-5">
            <Text className="p-5 text-white" category="s1">
              Do not fear! Our highly fluffy and trained team is working hard to fix this issue.
            </Text>
          </View>
        </View>

        <View className="flex-2 p-5">
          <Text appearance="hint" className="mb-5">
            Has been a while and the issue is still not fixed? Please contact our support team at
            support@furlab.net
          </Text>
          <Button
            onPress={() => {
              router.navigate({ pathname: '/(drawer)' });
            }}>
            Go to home screen
          </Button>
        </View>
      </View>
    </View>
  );
}
