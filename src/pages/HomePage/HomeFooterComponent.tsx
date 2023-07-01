import { StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FAB, Surface } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import { useFilteredCardList } from './HomeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

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
      appendFilter(COMPONENT_KEY, { bankName: inputText, cardName: inputText, cardHolder: inputText, tags: inputText })
  }, [input]);

  const containerStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    right: 0,
    bottom: withTiming(bottom + 20, { duration: 150 }),
  }), [bottom]);

  return (
    <Animated.View style={containerStyle}>
      <Surface style={styles.surface} elevation={3}>
        <TextInput
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholder='Search by bank or card name'
          inputMode='search'
          placeholderTextColor={theme.colors.text}
          numberOfLines={1}
          style={{ maxWidth: 220, color: theme.colors.text, overflow: 'hidden' }}
        />
        <FAB icon={!!input ? 'close' : 'plus'} mode='flat' style={styles.button} customSize={55} onPress={() => {
          !!input ? setInput('') : navigation.navigate('AddCard')
        }} />
      </Surface>
    </Animated.View>
  );
};

export default HomeFooterComponent;

const styles = StyleSheet.create({
  surface: {
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: 15,
    paddingLeft: 15,
  },
  button: {
    borderRadius: 15,
    margin: 0,
    marginLeft: 15,
  },
});