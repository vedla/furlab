
import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useSession } from '@context/AuthContext';
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
  Models,
} from 'react-native-appwrite';

import { User } from '@context/Types';

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_URL,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID,
};

const client = new Client();

if (
  !appwriteConfig.endpoint ||
  !appwriteConfig.platform ||
  !appwriteConfig.projectId ||
  !appwriteConfig.databaseId
) {
  // const router = useRouter();
  Alert.alert('Something went wrong', 'App cannot connect to Server');
  throw new Error('Missing Appwrite configuration');
}

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);


export async function createUser(email: string, password: string, username: string): Promise<User> {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument<User>(
      appwriteConfig.databaseId || '',
      appwriteConfig.userCollectionId || '',
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}


export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    const { setSessionToken } = useSession();
    setSessionToken(session);

    return session;
  } catch (error) {
    console.error(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function getSession(
  $sessionID = 'current'
): Promise<Models.Session | string | boolean> {
  try {
    const session = await account.getSession(String($sessionID));

    const { setSessionToken } = useSession();
    setSessionToken(session);
    return session;
  } catch (e) {
    return false;
  }
}

export async function checkIfUserLoggedIn() {
  try {
    await account.get();
    return true;
  } catch (e) {
    return false;
  }
}

// Get Account
export async function getAccount() {
  if (await checkIfUserLoggedIn()) {
    try {
      const currentAccount = await account.get();

      return currentAccount;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  } else {
    return null;
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    // console.log(currentAccount);
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId || '',
      appwriteConfig.userCollectionId || '',
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    // console.info(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export const useAppwrite = (fn: () => Promise<any>) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

const API = {
  createUser,
  signIn,
  getSession,
  checkIfUserLoggedIn,
  getAccount,
  getCurrentUser,
  signOut,
};

export default API;