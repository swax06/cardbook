import { PixelRatio, StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import CardComponent from '../../shared-components/CardComponent';
import { FAB } from 'react-native-paper';
import { useFilteredCardList } from './HomeContext';
import { ACTIONS, useAppData } from '../../context/AppDataContext';
import { SharedElement } from 'navigation-react-native';
import { NavigationContext } from 'navigation-react';
import { ICard } from '../../types/CardInterface';

const CardListComponent = () => {
    const { filteredCardList } = useFilteredCardList()
    // const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { stateNavigator } = useContext(NavigationContext);
    const {updateCardList} = useAppData();
    
    return (
        <View>
            {filteredCardList.map(x => (
                <View key={x.id}>
                    <View style={styles.card}>
                        <SharedElement name={x.id}>
                            <CardComponent card={x} />
                        </SharedElement>
                    </View>
                    <FAB style={styles.fab} icon="pencil-outline" mode='flat' variant='surface' customSize={80 / PixelRatio.get()} onPress={() => stateNavigator.navigate('AddCard', x)}  />
                    <FAB style={{ ...styles.fab, right: '14%' }} icon="delete-outline" mode='flat' variant='surface' customSize={80 / PixelRatio.get()} onPress={() => updateCardList({type: ACTIONS.DELETE_CARDS, payload: x})} />
                </View>
            ))}
        </View>
    );
};

export default CardListComponent;

const styles = StyleSheet.create({
    card: {
        marginVertical: 10
    },
    fab: {
        position: 'absolute',
        right: '5%',
        top: '25%',
    },
});