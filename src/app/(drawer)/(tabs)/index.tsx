import React, { useContext, useEffect } from 'react';
import { router, Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

import { DataContext, DataContextValue } from '@context/DataProvider';
import AuthHelper from '@auth/AuthHelper';
import { supabase } from '@utils/supabase';

export default function Home() {
  const { setToken, isUser } = useContext(DataContext) as DataContextValue;

  useEffect(() => {
    const checkUserStatus = async () => {
      if (isUser) {
        const user = await AuthHelper.getUser();
        if (user) {
          console.info('User is signed in:', user);
          const {
            data: { session },
          } = await supabase.auth.getSession();
          if (session) {
            setToken(session);

            router.replace({ pathname: '/(drawer)/one' });
          }
        } else {
          console.info('User is not sign in');
          router.replace({ pathname: '/(onboarding)/welcome' });
        }
      } else {
        router.replace({ pathname: '/(onboarding)/welcome' });
      }
    };
    checkUserStatus();
  }, [isUser, setToken]);

  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <Container>
        <ScreenContent path="app/(drawer)/(tabs)/one.tsx" title="Tab One" />
      </Container>
    </>
  );
}
