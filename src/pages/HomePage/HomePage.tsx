import { ScrollView, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import HomeHeaderComponent from './HomeHeaderComponent';
import CardListComponent from './CardListComponent';
import HomeFooterComponent from './HomeFooterComponent';
import HomeProvider from './HomeContext';

const HomePage = () => {
  return (
    <HomeProvider>
        <HomeHeaderComponent />
        <CardListComponent />
        <HomeFooterComponent />
    </HomeProvider>
  );
};

export default HomePage;