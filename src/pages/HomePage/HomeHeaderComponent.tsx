import { ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import React, { useState } from 'react';
import { Chip, IconButton, Text } from 'react-native-paper';
import { cardTypes, cardTypeValues } from '../../types/CardInterface';
import { useTheme } from '../../context/ThemeContext';
import { useFilteredCardList } from './HomeContext';
import EmptySpace from '../../shared-components/EmptySpace';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDataSync } from '../../context/AppDataContext';
import { useAppPreference } from '../../context/AppPreferenceContext';

const ALL_STATE = 'All';
const COMPONENT_KEY = 'HomeHeaderComponent';

const HomeHeaderComponent = () => {
  const [selected, setSelected] = useState<string>(ALL_STATE);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { appendFilter, removeFilter } = useFilteredCardList();
  const { theme } = useTheme();
  const { pendingUpload, pendingDownload } = useAppDataSync();
  const { cloudBackupEnabled } = useAppPreference();

  const handleSelect = (x: 'All' | cardTypes) => {
    setSelected(x);
    if (x === ALL_STATE)
      removeFilter(COMPONENT_KEY);
    else
      appendFilter(COMPONENT_KEY, { cardType: x });
  };

  const getSyncIcon = () => {
    if (cloudBackupEnabled) {
      if (pendingDownload || pendingUpload)
        return 'sync-alert';
      else
        return 'sync';
    }
    else
      return 'sync-off';
  }

  const showToast = () => {
    let msg = '';
    if (cloudBackupEnabled) {
      if (pendingDownload || pendingUpload)
        msg = 'sync pending';
      else
        msg = 'sync complete';
    }
    else
      msg = 'sync disabled';
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors.card }}>
      <View style={styles.row}>
        <Text style={styles.heading} variant="headlineSmall">Your Cards</Text>
        <View style={styles.headingButtons}>
          <IconButton animated={true} icon={getSyncIcon()} style={styles.button} size={20} onPress={() => showToast()} />
          <IconButton icon="cog-outline" style={styles.button} size={20} onPress={() => navigation.navigate('Settings')} />
        </View>

      </View>
      <EmptySpace space={5} />
      <ScrollView style={styles.chipContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
        {[ALL_STATE, ...cardTypeValues].map(x => (
          <Chip
            // compact={true}
            mode={selected === x ? 'flat' : 'outlined'}
            textStyle={{ fontWeight: 'bold', ...(selected === x ? { color: theme.colors.onSurface } : {}) }}
            style={{ margin: selected === x ? 6 : 5 }}
            onPress={() => handleSelect(x as cardTypes)}
            key={x}
          >
            {x}
          </Chip>
        ))}
      </ScrollView>
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
    flexDirection: 'row'
  },
  button: {
    borderRadius: 100,
    marginHorizontal: 0
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headingButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});