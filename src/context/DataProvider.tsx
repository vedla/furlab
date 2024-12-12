/**
 * @file DataProvider.tsx
 * @desc The DataProvider component provides data and functionality to its children components.
 */

import React, { useState, useEffect, FC, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContextValue, DataProviderProps, StorageValue } from '~/context/Types';
import { router } from 'expo-router';
import { useSession } from '@context/AuthContext';
import { checkIfUserLoggedIn, getSession } from '@utils/appwrite';
import { Models } from 'react-native-appwrite';

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
  const [theUser, setTheUser] = useState<Models.Document | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const { setSessionToken } = useSession();
  /**
   * Loads the initial data for the DataProvider.
   */
  const loadInitialData = async () => {
    try {
      // setIsLoading(false);
    } catch (error) {
      console.error('Failed to load initial data:', error);
      // setIsLoading(false);
    }
  };

  // theUser;

  // useEffect(() => {
  //   loadInitialData();
  //   checkUserStatus();
  // }, []);

  const checkUserStatus = async () => {
    const theUser = await checkIfUserLoggedIn();

    if (theUser) {
      setIsLoading(true);
      console.info('User is signed in:', theUser);

      const session = await getSession();
      console.log('session', session);

      if (session) {
        setSessionToken(session);
        // setTheUser(true);
        setIsLoading(false);
        console.info('User logged in [dataProvider]:', theUser);
        // router.replace({ pathname: '/(drawer)/one' });
      }
    } else {
      console.info('User is not sign in');
      console.info('User logged out [dataProvider]:', theUser);
      // setTheUser(false);
      // router.replace('/(onboarding)/');
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const contextValue = {
    setIsLoading,
    checkConnection,
    setCheckConnection,
    isLoading,
    loadInitialData,
    setData,
    deleteData,
    getData,
    theUser,
    setTheUser,
    isLogged,
    setIsLogged,
  };

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export { DataProvider, DataContext, DataContextValue, deleteData, setData, getData };
