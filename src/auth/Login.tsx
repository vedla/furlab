import React, { useState } from 'react';
import { Alert } from 'react-native';
import { View } from '@AppComponents';
import { supabase } from '@utils/supabase';
import { Input } from '@AppComponents';

import { Button } from '@ui-kitten/components';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View>
      <View>
        <Input
          label="Email"
          // leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View className="mt-5 gap-4">
        <Input
          label="Password"
          // leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View className="mt-5 gap-4">
        <Button
          disabled={loading}
          onPress={() => signInWithEmail()}
          appearance="filled"
          status="primary">
          Sign in
        </Button>
      </View>
      {/* <View>
        <Button disabled={loading} onPress={() => signUpWithEmail()}>
          Sign up
        </Button>
      </View> */}
    </View>
  );
}
