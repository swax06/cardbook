import { BackHandler, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ACTIONS, useAppData } from '../../context/AppDataContext';
import { PAGE_MODE, useCardData } from './AddCardContext';
import { Button, FAB, Modal, Portal, Snackbar, Text } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppPreference } from '../../context/AppPreferenceContext';
import { useTheme } from '../../context/ThemeContext';

const AddCardFooterComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { updateCardList } = useAppData();
    const { cardInput, pageMode } = useCardData();
    const { bottom } = useSafeAreaInsets();
    const [visible, setVisible] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [msg, setMsg] = useState('');
    const { isPremiumUser } = useAppPreference();
    const { theme } = useTheme();
    const change = useRef(0);

    useEffect(() => {
        change.current++;
    }, [cardInput]);

    useEffect(() => {
        if(visible)
            setModalVisible(false);
    }, [visible])

    const cardDataValid = () => {
        if (cardInput.cardNumber === '') {
            setMsg('Card number cannot be empty');
            setVisible(true);
            return false;
        }
        if (cardInput.expiryDate !== '') {
            let isValid = true;
            cardInput.expiryDate.split('/').forEach((item, index) => {
                if (item.length !== 2)
                    isValid = false;
                if (index === 0 && (parseInt(item) < 1 || parseInt(item) > 12))
                    isValid = false;
                if (index === 1 && (parseInt(item) < 21 || parseInt(item) > 99))
                    isValid = false;
            })
            if (!isValid) {
                setMsg('Invalid expiry date');
                setVisible(true);
                return false;
            }
        }

        if (!isPremiumUser) {
            if (!!cardInput.cardTextColor) {
                setMsg('License not found! select a basic card');
                setVisible(true);
                return false;
            }
        }
        return true;
    };

    const handleSave = () => {
        if (cardDataValid()) {
            if (pageMode === PAGE_MODE.EDIT)
                updateCardList({ type: ACTIONS.MODIFY_CARDS, payload: [cardInput] });

            else
                updateCardList({ type: ACTIONS.ADD_CARDS, payload: [cardInput] });
            navigation.goBack();
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                const isChanged = change.current >= 2;
                setModalVisible(isChanged);
                return isChanged;
            };
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => subscription.remove();
        }, [])
    );

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
                <FAB icon='check' mode='elevated' style={styles.button} customSize={55} onPress={() => handleSave()} />
            </View>
            <Portal>
                <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.card }]} dismissable={false}>
                    <Text variant='titleMedium'>Your changes have not been saved</Text>
                    <View style={styles.modalFooter}>
                        <Button children={'Discard'} onPress={() => navigation.goBack()} />
                        <Button children={'Save'} onPress={() => handleSave()} />
                    </View>
                </Modal>
            </Portal>
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
    },
    modal: {
        padding: 20,
        margin: 40,
        borderRadius: 20
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
    },
});