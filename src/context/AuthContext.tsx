import React, { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '../constants/useStorageState';
import { Models } from 'react-native-appwrite';

const AuthContext = createContext<{
  setSessionToken: (session: string | true | Models.Session) => void;
  signOut: () => void;
  sessionToken?: string | null;
  isLoading: boolean;
}>({
  setSessionToken: (session: string | true | Models.Session) => null,
  signOut: () => null,
  sessionToken: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSessionToken must be wrapped in a <SessionTokenProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, sessionToken], setSessionToken] = useStorageState('sessionToken');

  return (
    <AuthContext.Provider
      value={{
        setSessionToken: (session: string | true | Models.Session) => {
          // Perform sign-in logic here
          setSessionToken(session as string);
        },
        signOut: () => {
          setSessionToken(null);
        },
        sessionToken,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
