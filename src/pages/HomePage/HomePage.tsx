import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import HomeHeaderComponent from './HomeHeaderComponent';
import CardListComponent from './CardListComponent';
import HomeFooterComponent from './HomeFooterComponent';
import HomeProvider from './HomeContext';
import EmptySpace from '../../shared-components/EmptySpace';

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