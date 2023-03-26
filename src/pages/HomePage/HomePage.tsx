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
        <ScrollView style={styles.cardList}>
          <CardListComponent />
          <EmptySpace space={'15%'} />
        </ScrollView>
        <HomeFooterComponent />
    </HomeProvider>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  cardList: {
    paddingHorizontal: '4%'
  }
});