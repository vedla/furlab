import React, { useContext, useEffect } from 'react';
import { router, Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { View } from '@AppComponents';
import { DataContext, DataContextValue } from '@context/DataProvider';
import AuthHelper from '@auth/AuthHelper';
import { supabase } from '@utils/supabase';

export default function Home() {
  const { userToken, isUser, setIsLoading } = useContext(DataContext) as DataContextValue;
  useEffect(() => {
    setIsLoading(false);
  }, [isUser]);

  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View>
        <ScreenContent path="app/(drawer)/(tabs)/one.tsx" title="Tab One 1" />
      </View>
    </>
  );
}
