import { StyleSheet, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { Chip, IconButton, Text } from 'react-native-paper';
import { cardTypes, cardTypeValues } from '../../types/CardInterface';
import { useTheme } from '../../context/ThemeContext';
import { useFilteredCardList } from './HomeContext';
import EmptySpace from '../../shared-components/EmptySpace';
import { NavigationContext } from 'navigation-react';

const ALL_STATE = 'All';
const COMPONENT_KEY = 'HomeHeaderComponent';

const HomeHeaderComponent = () => {
  const [selected, setSelected] = useState<string>(ALL_STATE);
  const { stateNavigator } = useContext(NavigationContext);
  const { appendFilter, removeFilter } = useFilteredCardList();
  const { theme } = useTheme();

  const handleSelect = (x: 'All' | cardTypes) => {
    setSelected(x);
    if (x === ALL_STATE)
      removeFilter(COMPONENT_KEY);
    else
      appendFilter(COMPONENT_KEY, { cardType: x });
  };

  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors.inverseOnSurface }}>
      {/* <EmptySpace space={20} /> */}
      <View style={styles.row}>
        <Text style={styles.heading} variant="headlineSmall">Your Cards</Text>
        <IconButton icon="cog" style={styles.button} size={20} onPress={() => stateNavigator.navigate('Settings')} />
      </View>
      <EmptySpace space={5} />
      <View style={styles.chipContainer}>
        {[ALL_STATE, ...cardTypeValues].map(x => (
          <Chip
            mode={selected === x ? 'flat' : 'outlined'}
            textStyle={{ fontWeight: 'bold', ...(selected === x ? { color: theme.colors.onSurface } : {}) }}
            style={{ margin: selected === x ? 6 : 5 }}
            onPress={() => handleSelect(x as cardTypes)}
            key={x}
          >
            {x}
          </Chip>
        ))}
      </View>
    </View>
  );
};

export default HomeHeaderComponent;

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  heading: {
    fontWeight: 'bold',
    paddingLeft: 10
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    borderRadius: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});