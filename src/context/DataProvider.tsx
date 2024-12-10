/**
 * @file DataProvider.tsx
 * @desc The DataProvider component provides data and functionality to its children components.
 */

import React, { useState, useEffect, FC, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContextValue, DataProviderProps, StorageValue } from '~/context/Types';
import AuthHelper from '@/auth/AuthHelper';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@utils/supabase';
import { router } from 'expo-router';
import { useSession } from '@auth/ctx';

/**
 * The DataContext provides a context for sharing data across components.
 */
const DataContext = createContext<DataContextValue | undefined>(undefined);

/**
 * Sets data in AsyncStorage for the given key.
 * @param key - The key to set the data for.
 * @param value - The value to be stored.
 * @returns A promise that resolves when the data is set successfully.
 */
const setData = async (key: string, value: StorageValue): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set data for key ${key}:`, error);
  }
};

/**
 * Retrieves data from AsyncStorage for the given key.
 * @param key - The key to retrieve the data for.
 * @returns A promise that resolves with the retrieved data, or null if the data is not found.
 */
const getData = async (key: string): Promise<StorageValue | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Failed to get data for key ${key}:`, error);
    return null;
  }
};

/**
 * Deletes data from AsyncStorage for the given key.
 * @param key - The key to retrieve the data for.
 * @returns A promise that resolves with the retrieved data, or null if the data is not found.
 */
const deleteData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to delete data for key ${key}:`, error);
  }
};

/**
 * DataProvider component that provides data and functionality to its children components.
 * @param children - The child components to render.
 * @returns The rendered DataProvider component.
 */
const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [checkConnection, setCheckConnection] = useState<boolean>(true);
  const [isUser, setIsUser] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<Session | null>(null);
  const { sessionToken, signIn } = useSession();
  /**
   * Loads the initial data for the DataProvider.
   */
  const loadInitialData = async () => {
    try {
      setUserToken(null);
      // setIsLoading(false);
    } catch (error) {
      console.error('Failed to load initial data:', error);
      // setIsLoading(false);
    }
  };

  // isUser;

  useEffect(() => {
    loadInitialData();
    checkUserStatus();
  }, []);

  const [init, setInit] = useState<boolean>(false);
  const checkUserStatus = async () => {
    const user = await AuthHelper.getUser();
    if (user) {
      setIsLoading(true);
      // console.info('User is signed in:', user);

      console.log('session', sessionToken);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUserToken(session);
        signIn(session);
        setIsUser(true);
        // setIsLoading(false);
        console.info('User logged in [navigation]:', isUser);
        // router.replace({ pathname: '/(drawer)/one' });
      }
    } else {
      console.info('User is not sign in');
      console.info('User logged out [navigation]:', isUser);
      setIsUser(false);
      // router.replace('/(onboarding)/');
    }
  };

  useEffect(() => {
    // setIsLoading(true);
    // checkUserStatus();
  }, [init]);

  const contextValue = {
    setIsLoading,
    checkConnection,
    setCheckConnection,
    isLoading,
    loadInitialData,
    setData,
    deleteData,
    getData,
    isUser,
    setIsUser,
    userToken,
    setUserToken,
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export { DataProvider, DataContext, DataContextValue, deleteData, setData, getData };
