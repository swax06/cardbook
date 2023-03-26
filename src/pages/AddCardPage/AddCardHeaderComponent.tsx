import { SharedElement } from 'navigation-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import CardComponent from '../../shared-components/CardComponent';
import EmptySpace from '../../shared-components/EmptySpace';
import { useCardData } from './AddCardContext';

const AddCardHeaderComponent = () => {
  const { cardInput, pageMode } = useCardData();
  const { theme } = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors.inverseOnSurface }}>
      {/* <EmptySpace space={20} /> */}
      <Text style={styles.heading} variant="headlineSmall">{`${pageMode} Card Details`}</Text>
      <EmptySpace space={5} />
      <View style={{padding: 10}}>
        <SharedElement name={cardInput.id}>
          <CardComponent card={cardInput} />
        </SharedElement>
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