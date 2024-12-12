import React, { useContext, useEffect, useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link, router, Slot } from 'expo-router';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { View } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { HeaderButton } from '~/components/HeaderButton';
import { Layout, Text, Button } from '@AppComponents';
import { useNavigation } from '@react-navigation/native';

import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DataContext, DataContextValue } from '@context/DataProvider';

interface CustomDrawerContentProps extends DrawerContentComponentProps {}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
  const { theUser, setTheUser, setIsLoading } = useContext(DataContext) as DataContextValue;
  const handleSignOut = async () => {
    try {
      console.info('User signed out [drawer]:', theUser);
      // router.replace('/(onboarding)/');
      // if (error) throw error;/
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // useEffect(() => {
  //   if (theUser) {
  //     loadUserProfile();
  //   }
  // }, [theUser]);

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
            <></>
            // <Link href="/modal" asChild>
            //   <HeaderButton />
            // </Link>
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
