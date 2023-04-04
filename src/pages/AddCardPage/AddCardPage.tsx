import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import CardInputComponent from './CardInputComponent';
import AddCardHeaderComponent from './AddCardHeaderComponent';
import AddCardProvider from './AddCardContext';
import EmptySpace from '../../shared-components/EmptySpace';
import AddCardFooterComponent from './AddCardFooterComponent';
import { useRoute } from '@react-navigation/native';

const AddCardPage = () => {
  const params: any = useRoute().params;
  return (
    <AddCardProvider card={params?.card}>
      <AddCardHeaderComponent />
      <ScrollView style={styles.inputs}>
        <CardInputComponent />
        <EmptySpace space={'15%'} />
      </ScrollView>
      <AddCardFooterComponent />
    </AddCardProvider>
  );
};

export default AddCardPage;

const styles = StyleSheet.create({
  inputs: {
    paddingHorizontal: '4%',
    paddingTop: 10
  }
});
