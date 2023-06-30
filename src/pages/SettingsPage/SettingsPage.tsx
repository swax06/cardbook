import { StyleSheet, View, ScrollView } from 'react-native';
import React from 'react';
import AppearanceSection from './AppearanceSection';
import SettingsHeaderComponent from './SettingsHeaderComponent';
import SecuritySection from './SecuritySection';
import DataSection from './DataSection';
import EmptySpace from '../../shared-components/EmptySpace';
import AboutSection from './AboutSection';
import PurchaseSection from './PurchaseSection';
import { useAppPreference } from '../../context/AppPreferenceContext';
import MiscSection from './MiscSection';

const SettingsPage = () => {
  const { isPremiumUser } = useAppPreference();
  return (
    <View style={styles.container}>
      <SettingsHeaderComponent />
      <ScrollView style={styles.content}>
        <AppearanceSection />
        <SecuritySection />
        <DataSection />
        <MiscSection />
        {!isPremiumUser && <PurchaseSection />}
        <AboutSection />
        <EmptySpace space={50} />
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