import EncryptedStorage from 'react-native-encrypted-storage';
import uuid from 'react-native-uuid';
import { CARD_COLORS } from '../data/ColorDefinations';
import { ICard } from '../types/CardInterface';

export const removeCardNumberSpaces = (cardNumber: string) => {
    return cardNumber.replace(/ /g, '');
}

export async function retrieveData(storageKey: string): Promise<any> {
    try {   
        const value = await EncryptedStorage.getItem(storageKey);
        return !!value ? JSON.parse(value) : null;
    } catch (error) {
        return null;
    }
};

export async function storeData(storageKey: string, data: any) {
    try {
        await EncryptedStorage.setItem(
            storageKey,
            JSON.stringify(data)
        );
    } catch (error) {
        // There was an error on the native side
    }
};

export async function clearStorage() {
    try {
        await EncryptedStorage.clear();
    } catch (error) {
        // There was an error on the native side
    }
}

export const newCard = (): ICard => (
    {
        id: String(uuid.v4()),
        cardHolder: '',
        cardNumber: '',
        expiryDate: '',
        securityCode: '',
        cardPin: '',
        bankName: '',
        cardName: '',
        cardType: 'Other',
        cardColor: CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length )],
    }
);