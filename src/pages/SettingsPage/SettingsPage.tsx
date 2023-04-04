import { StyleSheet, View, ScrollView } from 'react-native';
import React from 'react';
import { Divider } from 'react-native-paper';
import AppearanceSection from './AppearanceSection';
import SettingsHeaderComponent from './SettingsHeaderComponent';
import SettingsFooterComponent from './SettingsFooterComponent';

const SettingsPage = () => {
  return (
    <View style={styles.container}>
      <SettingsHeaderComponent />
      <ScrollView style={styles.content}>
        <AppearanceSection />
        <Divider />
      </ScrollView>
      {/* <SettingsFooterComponent /> */}
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingVertical: 20
  },
  content: {
    paddingHorizontal: '4%'
  }
});