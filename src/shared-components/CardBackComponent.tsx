import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { ICard } from '../types/CardInterface';
import color from 'color';
import { CARD_DARK_FONT_COLOR, CARD_LIGHT_FONT_COLOR } from '../data/ColorDefinations';

const CardBackComponent = ({ card }: { card: ICard }) => {
    const { width } = useWindowDimensions();
    const [textColor, setTextColor] = useState<string>(CARD_LIGHT_FONT_COLOR);
    const styles = useMemo(() => createStyles(1075 / width), [width]);
    useEffect(() => {
        if (color(card.cardColor).luminosity() > 0.260) {
          setTextColor(CARD_DARK_FONT_COLOR);
        } else {
          setTextColor(CARD_LIGHT_FONT_COLOR);
        }
    }, [card.cardColor]);
    return (
        <View style={{ ...styles.card, backgroundColor: card.cardColor }}>
            <View style={styles.strip}></View>
            <View style={styles.tape}>
                <Text allowFontScaling={false} style={styles.cvv}>{card.securityCode}</Text>
            </View>
            <Text allowFontScaling={false} style={{...styles.pin, color: textColor}}>PIN: {card.cardPin}</Text>
            <Text allowFontScaling={false} style={{...styles.bankName, color: textColor}}>{card.bankName}</Text>
        </View>
    );
};

export default CardBackComponent;

const createStyles = (scaleFactor: number) => StyleSheet.create({
    card: {
        width: '100%',
        aspectRatio: 43 / 27,
        borderRadius: 15,
        paddingVertical: '4%',
        borderWidth: 0.5,
        borderColor: '#3d3d3d'
    },
    strip: {
        backgroundColor: 'black',
        height: '30%',
        borderColor: 'white',
        borderTopWidth: 0.25,
        borderBottomWidth: 0.25,
    },
    tape: {
        backgroundColor: '#e8e8e8',
        borderColor: '#00000088',
        borderWidth: 0.25,
        height: '20%',
        marginTop: 10,
        width: '60%',
        marginStart: '5%',
        alignItems: 'flex-end',
        justifyContent:'center'
    },
    cvv: {
        textAlign: 'center',
        marginHorizontal: '3%',
        color: 'black',
        fontSize: 56 / scaleFactor
    },
    pin: {
        color: 'white',
        fontSize: 56 / scaleFactor,
        margin: 15
    },
    bankName: {
        color: 'white',
        fontSize: 56 / scaleFactor,
        marginRight: 15,
        marginLeft: 'auto'
    },
});