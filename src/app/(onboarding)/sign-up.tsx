import SignUpForm from '@auth/SignupForm';
// export default function Login() {
//   const [session, setSession] = useState<Session | null>(null);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//     });

//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });
//   }, []);
//   return (
//     <View className="dark flex-1">
//       <LoginHeader title="Create an Account" />
//       <View className="container flex-1 p-5">
//         <SignUp />
//       </View>
//       {/* {session && session.user && <Text>{session.user.id}</Text>} */}
//     </View>
//   );
// }

import { router } from 'expo-router';
import {
  Button,
  Icon,
  IconElement,
  IconProps,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { cssInterop } from 'nativewind';

import Markdown from 'react-native-markdown-display';

cssInterop(Markdown, { className: 'style' });

export default function DisclaimerScreen() {
  /**
   * Renders the location header component.
   * @returns The rendered location header component.
   */
  function DisclamerHeader() {
    const BackIcon = (props: IconProps): IconElement => (
      <Icon {...props} name="arrow-back" fill="white" />
    );

    const BackAction = (): ReactElement => {
      return <TopNavigationAction icon={BackIcon} onPress={() => router.back()} />;
    };

    const Title = (): ReactElement => (
      <Text className="font-raleway600 text-lg text-white">Welcome to Furlab</Text>
    );

    return (
      <View className="bg-transparent">
        <TopNavigation
          alignment="center"
          accessoryLeft={BackAction}
          className="bg-transparent"
          title={Title}
        />
      </View>
    );
  }

  return (
    <View className="container relative h-full bg-primary-500">
      <DisclamerHeader />
      <View className="container flex-1 p-5">
        <SignUpForm />
      </View>
    </View>
  );
}
