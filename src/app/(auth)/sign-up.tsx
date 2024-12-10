import SignUpForm from '@auth/SignupForm';

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
      <Text className="font-raleway600 text-lg text-white">Welcome to Furlab</Text>
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
      <View className="container flex-1 p-5">
        <SignUpForm />
      </View>
    </View>
  );
}
