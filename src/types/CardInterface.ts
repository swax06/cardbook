export const cardTypeValues = [ 'Credit', 'Debit', 'Other'] as const;
export type cardTypes = typeof cardTypeValues[number];

export interface IBasicCard {
    cardHolder: string;
    cardNumber: string;
    bankName: string;
    cardName: string;
    cardType: cardTypes;
};

export interface ICard extends IBasicCard {
    id: string;
    expiryDate: string;
    securityCode: string;
    cardPin: string;
    cardColor: string; 
};