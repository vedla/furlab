import { Dispatch, SetStateAction, ReactNode } from 'react';

import { useStyleSheet } from '@ui-kitten/components';
import { Session, User } from '@supabase/supabase-js';

/**
 * Represents the value of the DataContext.
 */

export interface DataContextValue {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  checkConnection: boolean;
  setCheckConnection: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  loadInitialData: () => Promise<void>;
  setData: (key: string, value: StorageValue) => Promise<void>;
  deleteData: (key: string) => Promise<void>;
  getData: (key: string) => Promise<StorageValue | null>;
  setIsUser: Dispatch<SetStateAction<boolean>>;
  isUser: boolean;
  userToken: Session | null;
  setUserToken: Dispatch<SetStateAction<Session | null>>;
}

/**
 * Represents a value that can be stored in storage.
 * It can be a string, number, boolean, object, null, or undefined.
 */
export type StorageValue = string | number | boolean | object | null | undefined;

/**
 * Represents the props for the DataProvider component.
 */
export type DataProviderProps = {
  children: ReactNode;
};

/**
 * Represents the type of a StyleSheet, which is the return type of the `useStyleSheet` function.
 */
export type StyleSheetType = ReturnType<typeof useStyleSheet>;
