import React, { useContext, useEffect, useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link, router, Slot } from 'expo-router';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { View } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { HeaderButton } from '~/components/HeaderButton';
import { Layout, Text, Button } from '@AppComponents';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '@/utils/supabase';

import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DataContext, DataContextValue } from '@context/DataProvider';
import AuthHelper from '@auth/AuthHelper';

interface CustomDrawerContentProps extends DrawerContentComponentProps {}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
  const { setUserToken, isUser, setIsUser, setIsLoading } = useContext(
    DataContext
  ) as DataContextValue;
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      setUserToken(null);
      setIsUser(false);
      console.info('User signed out [drawer]:', isUser);
      // router.replace('/(onboarding)/');
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const loadUserProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.id) {
      const { data, error } = await supabase.from('user_profile').select('username').single();

      console.info('User profile:', data);

      // if (data) {
      //     const { data, error } = await supabase
      //       .from('user_profile')
      //       .insert([{ some_column: 'someValue', other_column: 'otherValue' }])
      //       .select();
      // }

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }
    }

    // console.log('User:', user?.id);
  };

  useEffect(() => {
    if (isUser) {
      loadUserProfile();
    }
  }, [isUser]);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={{ padding: 16 }}>
        <Text>Custom Drawer Content</Text>
        <Button onPress={handleSignOut} style={{ marginTop: 16 }}>
          Sign Out
        </Button>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerLayout = () => {
  return (
    <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerTitle: 'Tabs',
          drawerLabel: 'Tabs',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="border-bottom" size={size} color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          headerTitle: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
