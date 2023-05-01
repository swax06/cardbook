import { StyleSheet, View, ScrollView } from 'react-native';
import React from 'react';
import AppearanceSection from './AppearanceSection';
import SettingsHeaderComponent from './SettingsHeaderComponent';
import SettingsFooterComponent from './SettingsFooterComponent';
import SecuritySection from './SecuritySection';
import DataSection from './DataSection';
import EmptySpace from '../../shared-components/EmptySpace';
import AboutSection from './AboutSection';

const SettingsPage = () => {
  return (
    <View style={styles.container}>
      <SettingsHeaderComponent />
      <ScrollView style={styles.content}>
        <AppearanceSection />
        <SecuritySection />
        <DataSection />
        <AboutSection />
        <EmptySpace space={50}/>
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