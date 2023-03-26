import { StyleSheet, View, TextInput } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Card, FAB, IconButton, Surface } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import { useFilteredCardList } from './HomeContext';
import { NavigationContext } from 'navigation-react';

const COMPONENT_KEY = 'HomeFooterComponent';

const HomeFooterComponent = () => {
  const { stateNavigator } = useContext(NavigationContext);
  const [input, setInput] = useState('');
  const { appendFilter, removeFilter } = useFilteredCardList();
  const { theme } = useTheme();

  useEffect(() => {
    if (!input)
      removeFilter(COMPONENT_KEY);
    else
      appendFilter(COMPONENT_KEY, { bankName: input, cardName: input, cardHolder: input })
  }, [input]);

  return (
    <View style={styles.container}>
      <Card style={styles.surface} elevation={3} >
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder='Search by bank or card name'
          inputMode='search'
          placeholderTextColor={theme.dark ? 'white' : 'black'}
          style={{ fontWeight: 'bold', color: theme.dark ? 'white' : 'black' }}
        />
      </Card>
      <FAB icon="plus" mode='elevated' style={styles.button} customSize={50} onPress={() => stateNavigator.navigate('AddCard')} />
    </View>
  );
};

export default HomeFooterComponent;

const styles = StyleSheet.create({
  surface: {
    borderRadius: 15,
    flexGrow: 1,
    paddingHorizontal: 15,
    // shadowColor: 'transparent'
  },
  button: {
    borderRadius: 15,
    margin: 0,
    marginLeft: 5,
    // shadowRadius: 0,
    // shadowColor: 'rgba(0,0,0,1)'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderColor: 'transparent',
    position: 'absolute',
    bottom: 5
  }
});