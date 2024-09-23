import React, { ReactElement } from 'react';
import { Text } from '@ui-kitten/components';
import { Platform, View } from 'react-native';

// import '@/constants/DealsCard.css';

import {
  IconProps,
  IconElement,
  Icon,
  TopNavigationAction,
  TopNavigation,
} from '@ui-kitten/components';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LoginHeader = ({ title }): ReactElement => {
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

export default LoginHeader;
