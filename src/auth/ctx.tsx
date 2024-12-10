import React, { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import { Session } from '@supabase/supabase-js';
const AuthContext = createContext<{
  signIn: (session: string | Session | null) => void;
  signOut: () => void;
  sessionToken?: string | Session | null;
  isLoading: boolean;
}>({
  signIn: (session: string | Session | null) => null,
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
        signIn: (session: string | Session | null) => {
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
