import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { ACTIONS, useAppData } from '../../context/AppDataContext';
import { PAGE_MODE, useCardData } from './AddCardContext';
import { FAB, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AddCardFooterComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { updateCardList } = useAppData();
    const { cardInput, pageMode } = useCardData();
    const { bottom } = useSafeAreaInsets();
    const [visible, setVisible] = React.useState(false);
    const [msg, setMsg] = useState('');

    const cardDataValid = () => {
        if (cardInput.cardNumber === '') {
            setMsg('Card number cannot be empty');
            setVisible(true);
            return false;
        }
        if (cardInput.expiryDate !== '') {
            let isValid = true;
            cardInput.expiryDate.split('/').forEach((item, index) => {
                if(item.length !== 2)
                    isValid = false;
                if(index === 0 && (parseInt(item) < 1 || parseInt(item) > 12))
                    isValid = false;
                if(index === 1 && (parseInt(item) < 21 || parseInt(item) > 99))
                    isValid = false;
            })
            if(!isValid) {
                setMsg('Invalid expiry date');
                setVisible(true);
                return false;
            }
        }
        return true;
    };
    return (
        <>
            <Snackbar wrapperStyle={{ position: 'absolute', bottom: bottom + 40 }}
                visible={visible}
                onDismiss={() => setVisible(false)}
                action={{
                    label: 'OK',
                    onPress: () => setVisible(false),
                }}>
                {msg}
            </Snackbar>
            <View style={{ ...styles.container, bottom: bottom + 10 }}>
                <FAB icon="check" mode='elevated' style={styles.button} customSize={55} onPress={() => {
                    if (cardDataValid()) {
                        if (pageMode === PAGE_MODE.EDIT)
                            updateCardList({ type: ACTIONS.MODIFY_CARDS, payload: cardInput });

                        else
                            updateCardList({ type: ACTIONS.ADD_CARDS, payload: cardInput });
                        navigation.goBack();
                    }
                }} />
            </View>
        </>
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