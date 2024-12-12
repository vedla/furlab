import { Dispatch, SetStateAction, ReactNode } from 'react';
import { Models } from 'react-native-appwrite';
import { useStyleSheet } from '@ui-kitten/components';

/**
 * Represents the value of the DataContext.
 */


export interface DataContextValue {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  checkConnection: boolean;
  setCheckConnection: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  loadInitialData: () => Promise<void>;
  setData: (key: string, value: StorageValue) => Promise<void>;
  deleteData: (key: string) => Promise<void>;
  getData: (key: string) => Promise<StorageValue | null>;
  theUser: Models.Document| null;
  setTheUser: React.Dispatch<React.SetStateAction<Models.Document| null>>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;

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

// Register user
export interface User extends Document {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  accountId: string;
  email: string;
  username: string;
  avatar: string;
}


// Interface for the expected Fluffle API response
export interface FluffleResult {
  id: string;
  stats: {
    count: number;
    elapsedMilliseconds: number;
  };
  results: {
    id: number;
    score: number;
    match: string;
    platform: string;
    location: string;
    isSfw: boolean;
    thumbnail: {
      width: number;
      height: number;
      centerX: number;
      centerY: number;
      location: string;
    };
    credits: {
      id: number;
      name: string;
    }[];
  }[];
}

// Define a union type for platforms
export type SupportedPlatform =
  | 'Fur Affinity'
  | 'Twitter'
  | 'e621'
  | 'Weasyl'
  | 'Furry Network'
  | 'DeviantArt'
  | 'Inkbunny';

export interface ConnectionStatusProps {
  checkConnectionStatus: () => void;
}