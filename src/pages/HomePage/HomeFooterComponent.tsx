import { StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FAB, Surface } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import { useFilteredCardList } from './HomeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COMPONENT_KEY = 'HomeFooterComponent';

const HomeFooterComponent = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [input, setInput] = useState('');
  const { appendFilter, removeFilter } = useFilteredCardList();
  const { theme } = useTheme();
  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    const inputText = input.trim();
    if (!inputText)
      removeFilter(COMPONENT_KEY);
    else
      appendFilter(COMPONENT_KEY, { bankName: inputText, cardName: inputText, cardHolder: inputText })
  }, [input]);

  return (
    <Surface style={{ ...styles.surface, bottom: bottom + 10 }} elevation={3} >
      <TextInput
        value={input}
        onChangeText={(text) => setInput(text)}
        placeholder='Search by bank or card name'
        inputMode='search'
        placeholderTextColor={theme.colors.text}
        clearButtonMode='always'
        style={{ maxWidth: 200, color: theme.colors.text }}
      />
      <FAB icon={!!input ? 'close' : 'plus'} mode='flat' style={styles.button} customSize={55} onPress={() => {
        !!input ? setInput('') : navigation.navigate('AddCard')
      }} />
    </Surface>
  );
};

export default HomeFooterComponent;

const styles = StyleSheet.create({
  surface: {
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: 15,
    paddingLeft: 15,
    position: 'absolute',
    bottom: 20,
    right: 0,
  },
  button: {
    borderRadius: 15,
    margin: 0,
    marginLeft: 15,
  },
});