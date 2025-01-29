import { Alert, Pressable } from 'react-native';
// import { supabase } from '@/utils/supabase';
import { Text, View, Input, Link, Button, ScrollView, CheckBox } from '@AppComponents';
import React, { useState, ReactElement } from 'react';
import { Icon, IconProps } from '@ui-kitten/components';
import { TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [result, setResult] = useState<WebBrowser.WebBrowserResult | null>(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://expo.dev');
    setResult(result);
  };

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: Partial<IconProps>): ReactElement => (
    <TouchableOpacity onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableOpacity>
  );

  const Email = (props?: IconProps) => <Icon name="email-outline" {...props} />;
  const Username = (props?: IconProps) => <Icon name="at-outline" {...props} />;
  const DisplayName = (props?: IconProps) => <Icon name="person-outline" {...props} />;
  const Password = (props?: IconProps) => <Icon name="lock" {...props} />;

  // Validation function
  const isFormValid = (): boolean => {
    return email !== '' && username !== '' && displayName !== '' && password !== '' && acceptTerms;
  };

  const TERMS_VERSION = '1'; // Set this to your current terms version

  async function signUpWithEmail() {
    if (!isFormValid()) {
      Alert.alert('Validation Error', 'Please fill in all fields and accept the terms.');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error instanceof Error ? error.message : String(error));
    } else if (data?.session) {
      Alert.alert('Success', 'Please check your inbox for email verification!');

      const { error: profileError } = await supabase.from('user_profile').insert([
        {
          id: data.user?.id,
          username: username,
          display_name: displayName,
          terms_version: TERMS_VERSION,
        },
      ]);

      if (profileError) {
        Alert.alert('Profile Error', 'Failed to save profile information.');
      }
    }

    setLoading(false);
  }

  return (
    <>
      <View className="flex-column flex h-full py-5">
        <View className="container bg-primary-600 py-10">
          <Text className="text-center text-white" category="h2">
            Create your account
          </Text>
        </View>
        <ScrollView>
          <View className="flex-3 container my-10 grow px-5 py-3">
            <View>
              <Input
                label="Display Name"
                autoComplete="name"
                accessoryLeft={DisplayName}
                onChangeText={(text) => setDisplayName(text)}
                value={displayName}
                placeholder="Display Name"
                autoCapitalize={'none'}
              />
            </View>
            <View className="mt-5 gap-4">
              <Input
                label="Email"
                autoComplete="email"
                accessoryLeft={Email}
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="email@address.com"
                autoCapitalize={'none'}
              />
            </View>
            <View className="mt-5 gap-4">
              <Input
                label="Username"
                autoComplete="username"
                accessoryLeft={Username}
                onChangeText={(text) => setUsername(text)}
                value={username}
                placeholder="Username"
                autoCapitalize={'none'}
              />
            </View>
            <View className="mt-5 gap-4">
              <Input
                label="Password"
                autoComplete="password"
                accessoryLeft={Password}
                onChangeText={(text) => setPassword(text)}
                accessoryRight={(props = {}) => renderIcon(props)}
                value={password}
                secureTextEntry={secureTextEntry}
                placeholder="Password"
                autoCapitalize={'none'}
              />
            </View>
            <View className="mt-5 gap-4 bg-slate-100 p-5">
              <CheckBox
                checked={acceptTerms}
                onChange={(acceptTerms) => setAcceptTerms(acceptTerms)}>
                <Text>
                  I have read and accept the
                  <Pressable onPress={_handlePressButtonAsync}>
                    <Text className="font-semibold underline decoration-solid">
                      terms and conditions.
                    </Text>
                  </Pressable>
                </Text>
              </CheckBox>
            </View>
            <View className="mt-5 gap-4">
              <Button
                disabled={loading || !isFormValid()}
                onPress={signUpWithEmail}
                appearance="filled"
                status="primary">
                Sign up
              </Button>
            </View>
          </View>
        </ScrollView>
        <View className="mb-5 mt-5 gap-4 text-center">
          <Text className="mt-5 text-center text-white">
            Do you have an account?{' '}
            <Link
              href="/(auth)/login"
              replace={true}
              className="font-semibold underline decoration-solid">
              Sign in here
            </Link>
          </Text>
        </View>
      </View>
    </>
  );
}
