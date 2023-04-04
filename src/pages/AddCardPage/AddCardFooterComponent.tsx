import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ACTIONS, useAppData } from '../../context/AppDataContext';
import { PAGE_MODE, useCardData } from './AddCardContext';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AddCardFooterComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { updateCardList } = useAppData();
    const { cardInput, pageMode } = useCardData();
    const { bottom } = useSafeAreaInsets();
    return (
        <View style={{...styles.container, bottom: bottom + 10}}>
            {/* <Button labelStyle={styles.buttonLabel} style={styles.button} mode='text' onPress={() => navigation.goBack()}>
                CANCEL
            </Button>
            {pageMode === PAGE_MODE.EDIT &&
                <Button labelStyle={styles.buttonLabel} style={styles.button} mode='contained-tonal' onPress={() => {
                    updateCardList({ type: ACTIONS.MODIFY_CARDS, payload: cardInput });
                    navigation.goBack();
                }}>
                    Save
                </Button>}
            {pageMode === PAGE_MODE.ADD &&
                <Button labelStyle={styles.buttonLabel} style={styles.button} mode='contained-tonal' onPress={() => {
                    updateCardList({ type: ACTIONS.ADD_CARDS, payload: cardInput });
                    navigation.goBack();
                }}>
                    ADD
                </Button>} */}
            <FAB icon="check" mode='elevated' style={styles.button} customSize={55} onPress={() => {
                    if(pageMode === PAGE_MODE.EDIT)
                        updateCardList({ type: ACTIONS.MODIFY_CARDS, payload: cardInput });
                    else
                        updateCardList({ type: ACTIONS.ADD_CARDS, payload: cardInput });
                        navigation.goBack();
                }} />
        </View>
    );
};

export default AddCardFooterComponent;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        // paddingVertical: 5,
        borderColor: 'transparent',
        position: 'absolute',
        right: 0,
        bottom: 20
    },
    button: {
        borderRadius: 15,
        margin: 0
    },
    buttonLabel: {
        fontWeight: 'bold',
    }
});