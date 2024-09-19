import React from 'react';
// import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from 'src/utils/supabase';
import Auth from 'src/auth/Login';
// import Account from '@/components/Account'
import { View, Text } from '@AppComponents';
import { Session } from '@supabase/supabase-js';

export default function Login() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <View className="dark">
      <Auth />
      {session && session.user && <Text>{session.user.id}</Text>}
    </View>
  );
}
