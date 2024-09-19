import { Dispatch, SetStateAction, ReactNode } from 'react';

import { useStyleSheet } from '@ui-kitten/components';

/**
 * Represents the value of the DataContext.
 */
export type DataContextValue = {
  checkConnection: boolean;
  setCheckConnection: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  loadInitialData: () => Promise<void>;
  setData: (key: string, value: StorageValue) => Promise<void>;
  deleteData: (key: string) => Promise<void>;
  getData: (key: string) => Promise<StorageValue | null>;
  doOnboarding: boolean;
  setDoOnboarding: Dispatch<SetStateAction<boolean>>;
};

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
