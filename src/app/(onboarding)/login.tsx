import React from 'react';
// import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import LoginForm from '@/auth/Login';
// import Account from '@/components/Account'
import { View, Text } from '@AppComponents';
import { Session } from '@supabase/supabase-js';
import LoginHeader from '@components/header/LoginHeader';

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
    <View className="dark flex-1">
      <LoginHeader title="Login" />
      <View className="container flex-1 p-5">
        <LoginForm />
      </View>
      {/* {session && session.user && <Text>{session.user.id}</Text>} */}
    </View>
  );
}
