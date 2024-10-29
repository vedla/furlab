import React, { useContext } from 'react';
import { Icon, Spinner } from '@ui-kitten/components';
import { View, Text, Button } from '@AppComponents';
import { DataContext, DataContextValue } from 'src/context/DataProvider';

interface ConnectionStatusProps {
  checkConnectionStatus: () => void;
}

export function ConnectionStatus({ checkConnectionStatus }: ConnectionStatusProps) {
  const { checkConnection } = useContext(DataContext) as DataContextValue;

  return (
    <View className="container flex flex-1 content-center items-center justify-center bg-primary-500">
      <Icon name="wifi-off-outline" fill="white" width={100} height={100} />
      <Text category="h4" className="text-center text-white">
        No Internet Connection
      </Text>
      <Button
        onPress={checkConnectionStatus}
        className="absolute bottom-20 mx-5 w-6/12"
        status="control"
        size="large"
        disabled={checkConnection}
        accessoryLeft={() => {
          return checkConnection ? <Spinner size="medium" status="control" /> : <></>;
        }}>
        <Text>{checkConnection ? 'Checking...' : 'Try again'}</Text>
      </Button>
    </View>
  );
}
