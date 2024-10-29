import React, { ReactElement } from 'react';

import { useState } from 'react';

import LoginForm from '@/auth/LoginForm';

import { View, Text, Icon, TopNavigation } from '@AppComponents';
import { Session } from '@supabase/supabase-js';

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
  const BackIcon = (props: IconProps): IconElement => <Icon {...props} name="arrow-back" />;

  /**
   * Top navigation action component for the back action.
   *
   * @returns {ReactElement} - The rendered top navigation action component.
   */
  const BackAction = (): ReactElement => {
    return <TopNavigationAction icon={BackIcon} onPress={() => router.back()} />;
  };

  return (
    <View>
      <TopNavigation
        style={{ paddingTop: os === 'ios' ? 22 : insets.top + 12 }}
        className="bg-light"
        accessoryLeft={BackAction}
        title={() => <Text className="font-raleway-bold mx-3 text-lg">{title}</Text>}
        alignment="center"
      />
    </View>
  );
};

export default function Login() {
  const [session, setSession] = useState<Session | null>(null);

  return (
    <View className="dark flex-1">
      <LoginHeader title="Welcome back" />
      <View className="container flex-1 p-5">
        <LoginForm />
      </View>
    </View>
  );
}
