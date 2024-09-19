import React from 'react';
// import { t } from '@AppTranslation';
import { Button, StyleSheet, View } from 'react-native';

export const InternalizationExample = () => {
  // const toggleLanguage = (locale: 'en' | 'fr') => {
  //   i18n.changeLanguage(locale);
  // };
  return (
    <>
      <View style={styles.content}>
        {/* <Button title={t('button.french')} onPress={() => toggleLanguage('fr')} />
        <Button title={t('button.english')} onPress={() => toggleLanguage('en')} /> */}
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  content: { gap: 20, padding: 20 },
});
