import { FlatList, Image, StyleSheet, useWindowDimensions, View } from 'react-native';
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
                <Image
                        style={styles.img}
                        source={require('../../assets/no-card.png')}
                    />
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
    img: {
        width: 300,
        height: 200,
        resizeMode: 'stretch',
        alignSelf:'center',
        marginTop: '50%'
      },
});