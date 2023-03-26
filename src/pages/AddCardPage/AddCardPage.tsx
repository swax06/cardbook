import { ScrollView, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import CardInputComponent from './CardInputComponent';
import AddCardHeaderComponent from './AddCardHeaderComponent';
import AddCardProvider from './AddCardContext';
import EmptySpace from '../../shared-components/EmptySpace';
import AddCardFooterComponent from './AddCardFooterComponent';
import { NavigationContext } from 'navigation-react';

const AddCardPage = () => {
  const { data } = useContext(NavigationContext);
  return (
    <AddCardProvider card={data.id ? data : null}>
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
