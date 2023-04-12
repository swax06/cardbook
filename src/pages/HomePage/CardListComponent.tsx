import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import { useFilteredCardList } from './HomeContext';
import CardComponent from './CardComponent';
import EmptySpace from '../../shared-components/EmptySpace';

const CardListComponent = () => {
    const { filteredCardList } = useFilteredCardList();
    return (
        <FlatList
            data={filteredCardList}
            keyExtractor={(x) => x.id}
            contentContainerStyle={{paddingHorizontal: '3%'}}
            ListFooterComponent={<EmptySpace space={'25%'} />}
            ListEmptyComponent={
                <View style={styles.message}>
                    <Text variant='titleMedium' style={{ fontWeight: 'bold' }} children={'No Cards'}></Text>
                </View>
            }
            renderItem={(x) => <CardComponent card={x.item} />}>
        </FlatList>
    );
};

export default CardListComponent;

const styles = StyleSheet.create({
    card: {
        marginVertical: 10
    },
    message: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '70%'
    }
});