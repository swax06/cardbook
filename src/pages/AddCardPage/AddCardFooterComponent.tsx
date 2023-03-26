import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { ACTIONS, useAppData } from '../../context/AppDataContext';
import { PAGE_MODE, useCardData } from './AddCardContext';
import { Button, FAB } from 'react-native-paper';
import { NavigationContext } from 'navigation-react';

const AddCardFooterComponent = () => {
    const {stateNavigator} = useContext(NavigationContext);
    const { updateCardList } = useAppData();
    const { cardInput, pageMode } = useCardData();
    return (
        <View style={styles.container}>
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
            <FAB icon="check" mode='elevated' style={styles.button} customSize={50} onPress={() => {
                    if(pageMode === PAGE_MODE.EDIT)
                        updateCardList({ type: ACTIONS.MODIFY_CARDS, payload: cardInput });
                    else
                        updateCardList({ type: ACTIONS.ADD_CARDS, payload: cardInput });
                        stateNavigator.navigateBack(1);
                }} />
        </View>
    );
};

export default AddCardFooterComponent;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderColor: 'transparent',
        position: 'absolute',
        bottom: 25,
        right: 10
    },
    button: {
        borderRadius: 15
    },
    buttonLabel: {
        fontWeight: 'bold',
    }
});