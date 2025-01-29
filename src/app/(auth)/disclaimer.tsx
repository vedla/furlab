import { router } from 'expo-router';
import {
  Button,
  Icon,
  IconElement,
  IconProps,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { cssInterop } from 'nativewind';

import Markdown from 'react-native-markdown-display';

cssInterop(Markdown, { className: 'style' });

export default function DisclaimerScreen() {
  const notice = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien. Nullam nec`;

  /**
   * Renders the location header component.
   * @returns The rendered location header component.
   */
  function DisclamerHeader() {
    const BackIcon = (props: IconProps): IconElement => (
      <Icon {...props} name="arrow-back" fill="white" />
    );

    const BackAction = (): ReactElement => {
      return <TopNavigationAction icon={BackIcon} onPress={() => router.back()} />;
    };

    const Title = (): ReactElement => (
      <Text className="font-raleway600 text-lg text-white">Let's get started!</Text>
    );

    return (
      <View className="bg-transparent">
        <TopNavigation
          alignment="center"
          accessoryLeft={BackAction}
          className="bg-transparent"
          title={Title}
        />
      </View>
    );
  }

  return (
    <View className="container relative h-full bg-primary-500">
      <DisclamerHeader />
      <View className="flex-1">
        <View className="container h-screen flex-1 px-5">
          <Text className="font-raleway-bold mb-1 px-5 py-12 text-center text-3xl text-white">
            Lorem ipsum dolor sit amet
          </Text>
          <View className="flex content-center justify-center text-white">
            <View className="px-7">
              <Markdown mergeStyle={true} style={{ body: { color: 'white' } }}>
                {notice}
              </Markdown>
            </View>
          </View>
        </View>
        <View className="absolute bottom-0 w-full px-5">
          <Button
            onPress={() => {
              router.navigate('/sign-up');
            }}
            appearance="filled"
            status="control"
            className="mb-3 mt-4 w-full">
            Get Started
          </Button>
        </View>
      </View>
    </View>
  );
}
