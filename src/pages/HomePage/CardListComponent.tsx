import { PixelRatio, StyleSheet, useWindowDimensions, View } from 'react-native';
import React, { useState } from 'react';
import { FAB, Text } from 'react-native-paper';
import { useFilteredCardList } from './HomeContext';
import { ACTIONS, useAppData } from '../../context/AppDataContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CardComponent from '../../shared-components/CardComponent';

const CardListComponent = () => {
    const { filteredCardList } = useFilteredCardList()
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { width } = useWindowDimensions();
    const { updateCardList } = useAppData();
    const scale = 1075 / width;
    return (
        <View>
            {filteredCardList.map(x => (
                <View key={x.id}>
                    <View style={styles.card}>
                        <CardComponent card={x} />
                    </View>
                    <FAB style={styles.fab} icon="pencil-outline" mode='flat' variant='surface' customSize={80 / scale} onPress={() => navigation.navigate('AddCard', { card: x })} />
                    <FAB style={{ ...styles.fab, right: '14%' }} icon="delete-outline" mode='flat' variant='surface' customSize={80 / scale} onPress={() => updateCardList({ type: ACTIONS.DELETE_CARDS, payload: x })} />
                </View>
            ))}
            {filteredCardList.length === 0 &&
                <View style={styles.message}>
                    <Text variant='titleMedium' style={{ fontWeight: 'bold' }} children={'No Cards'}></Text>
                </View>
            }
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
        top: '37%',
    },
    message: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 300
    }
});