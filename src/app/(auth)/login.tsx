import React, { ReactElement } from 'react';

import { useState } from 'react';

import LoginForm from '@components/LoginForm';

import { View, Text, Icon, TopNavigation } from '@AppComponents';

import { Platform } from 'react-native';

import { IconProps, IconElement, TopNavigationAction } from '@ui-kitten/components';

import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface LoginHeaderProps {
  title: string;
}

const LoginHeader = ({ title }: LoginHeaderProps): ReactElement => {
  const os = Platform.OS;
  const insets = useSafeAreaInsets();

  /**
   * Icon component for the back icon.
   *
   * @param {IconProps} props - The icon props.
   * @returns {IconElement} - The rendered icon component.
   */
  const BackIcon = (props: IconProps): IconElement => (
    <Icon {...props} name="arrow-back" fill="white" />
  );

  /**
   * Top navigation action component for the back action.
   *
   * @returns {ReactElement} - The rendered top navigation action component.
   */
  const BackAction = (): ReactElement => {
    return <TopNavigationAction icon={BackIcon} onPress={() => router.back()} />;
  };

  const Title = (): ReactElement => (
    <Text className="font-raleway600 text-lg text-white">Welcome back</Text>
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
};

export default function Login() {
  const [session, setSession] = useState<Session | null>(null);

  return (
    <View className="container relative h-full bg-primary-500">
      <LoginHeader title="Welcome back" />
      <View className="container flex-1 p-5">
        <LoginForm />
      </View>
    </View>
  );
}
