import React, { useState } from 'react';
import HomeHeaderComponent from './HomeHeaderComponent';
import CardListComponent from './CardListComponent';
import HomeFooterComponent from './HomeFooterComponent';
import HomeProvider from './HomeContext';
import { Banner } from 'react-native-paper';
import { useAppPreference } from '../../context/AppPreferenceContext';

const TIPS = [
  'Swipe card left to see card actions.',
  'Swipe left beyond half way to delete card.',
  'Long press on card logo to see CVV and PIN.',
  'Tap on card number, name or date to copy it.',
  'Enable App Lock from settings page.',
  'Your data is encrypted in local and cloud storage.',
  '[Premium] Unlock encrypted Drive backup.',
  '[Premium] Unlock more card colors.'
];
const HomePage = () => {
  const [tipNumber, setTipNumber] = useState(0);
  const { areTipsEnabled, setAreTipsEnabled } = useAppPreference();
  return (
    <HomeProvider>
      <HomeHeaderComponent />
      <Banner
        visible={areTipsEnabled}
        contentStyle={{ alignSelf: 'center' }}
        actions={[
          {
            label: 'Next',
            onPress: () => setTipNumber((tipNumber + 1) % TIPS.length),
          },
          {
            label: 'Hide',
            onPress: () => setAreTipsEnabled(false),
          },
        ]}>
        {`${TIPS[tipNumber]} (${tipNumber + 1}/${TIPS.length})`}
      </Banner>
      <CardListComponent />
      <HomeFooterComponent />
    </HomeProvider>
  );
};

export default HomePage;