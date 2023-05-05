import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import CardFrontComponent from '../../shared-components/CardFrontComponent';
import EmptySpace from '../../shared-components/EmptySpace';
import { useCardData } from './AddCardContext';

const AddCardHeaderComponent = () => {
  const { cardInput, pageMode } = useCardData();
  const { theme } = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors.card }}>
      {/* <EmptySpace space={20} /> */}
      <Text style={styles.heading} variant="headlineSmall">{`${pageMode} Card Details`}</Text>
      <EmptySpace space={5} />
      <View style={{paddingTop: 10}}>
        <CardFrontComponent card={cardInput} />
      </View>
    </View>
  );
};

export default AddCardHeaderComponent;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontWeight: 'bold',
    paddingLeft: 10
  },
});