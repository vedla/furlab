import { supabase } from '@utils/supabase';
import { router } from 'expo-router';

const AuthHelper = {
  getUser: async function () {
    try {
      const { data } = await supabase.auth.getSession();

      if (!data.session) return false;
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error) {
      console.error('Error fetching user [E-10]:', error);
      return null;
    }
  },

  isUserSignedIn: async function () {
    try {
      const user = await this.getUser();

      if (!user) return false;
      if (user.aud === 'authenticated') {
        return true;
      } else return false;
    } catch (error) {
      console.error('Error checking if user is signed in:', error);
      return false;
    }
  },

  signOut: async function () {
    try {
      const { error } = await supabase.auth.signOut();
      router.replace('/(onboarding)');
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
    }
  },
};

export default AuthHelper;
