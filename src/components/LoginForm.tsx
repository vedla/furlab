import React, { useState, ReactElement, useContext } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { Text, View, Input, Link, Button } from '@AppComponents';
import { IconElement, Icon, IconProps } from '@ui-kitten/components';
import { DataContext, DataContextValue } from 'src/context/DataProvider';
import { TouchableOpacity, ImageProps } from 'react-native';
import API from '@utils/appwrite';
import { useSession } from '@context/AuthContext';

// // const AlertIcon = (props?: Partial<IconElement>): IconElement => (
// //   // <Icon {...props} name="alert-circle-outline" />
// // );

// export const PasswordInput = (): ReactElement => {
//   const [value, setValue] = useState('');

//   const renderCaption = (): ReactElement => {
//     return (
//       <View>
//         {/* {AlertIcon()} */}
//         <Text>Should contain at least 8 symbols</Text>
//       </View>
//     );
//   };

//   return (
//     <Input
//       value={value}
//       label="Password"
//       placeholder="Place your Text"
//       // caption={renderCaption}
//       // accessoryRight={renderIcon}
//       // secureTextEntry={secureTextEntry}
//       onChangeText={(nextValue) => setValue(nextValue)}
//     />
//   );
// };

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);

  const { setTheUser, setIsLogged } = useContext(DataContext) as DataContextValue;

  async function signInWithEmail() {
    setProcessing(true);

    console.log('Email:', email);
    console.log('Password, length:', password.length);

    try {
      await API.signIn(email, password);
      const result = await API.getCurrentUser();

      setTheUser(result);
      setIsLogged(true);

      Alert.alert('Success', 'User signed in successfully');
      router.replace('/(drawer)/one');
    } catch (error) {
      Alert.alert('Error', String(error instanceof Error ? error.message : String(error)));
    } finally {
      setProcessing(false);
    }

    // setProcessing(false);
  }
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const loadUser = async () => {};

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  interface RenderIconProps extends Partial<IconProps> {}

  const renderIcon = (props: RenderIconProps): ReactElement => (
    <TouchableOpacity onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableOpacity>
  );

  const Email = (props?: IconProps) => <Icon name="email-outline" {...props} />;
  const Password = (props?: IconProps) => <Icon name="lock" {...props} />;

  return (
    <View className="flex-column flex h-full py-5">
      <View className="container bg-primary-600 py-10">
        <Text className="text-center text-white" category="h2">
          Sign in to your account
        </Text>
      </View>
      <View className="flex-3 container my-10 grow px-5 py-3">
        <View>
          <Input
            label="Email"
            accessoryLeft={Email}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
          />
        </View>
        <View className="mt-5 gap-4">
          <Input
            label="Password"
            accessoryLeft={Password}
            onChangeText={(text) => setPassword(text)}
            accessoryRight={(props = {}) => renderIcon(props)}
            value={password}
            secureTextEntry={secureTextEntry}
            placeholder="Password"
            autoCapitalize={'none'}
          />
          {/* <Input
            value={password}
            label="Password"
            placeholder="Place your Text"
            caption={renderCaption}
            accessoryRight={renderIcon}

            onChangeText={(nextValue) => setValue(nextValue)}
          /> */}
        </View>
        <View className="mt-5 gap-4">
          <Button
            disabled={processing}
            onPress={() => signInWithEmail()}
            appearance="filled"
            status="primary">
            Sign in
          </Button>
        </View>
        <Text className="mt-10 text-center text-white">
          Forgot your password?{' '}
          <Link
            replace={true}
            href="/(auth)/forgot-password"
            className="font-semibold underline decoration-solid">
            Reset it here
          </Link>
        </Text>
      </View>
      <View className="mb-5 mt-5 gap-4 text-center">
        <Text className="mt-5 text-center text-white">
          Don't have an account?{' '}
          <Link
            href="/(auth)/disclaimer"
            replace={true}
            className="font-semibold underline decoration-solid">
            Sign up here
          </Link>
        </Text>
      </View>
    </View>
  );
}
