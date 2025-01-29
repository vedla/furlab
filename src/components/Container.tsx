import React from 'react';
import { StyleSheet, SafeAreaView, StyleProp } from 'react-native';

export const Container = ({ children, style }: { children: React.ReactNode; style: any }) => {
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'transparent',
  },
});
