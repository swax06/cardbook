import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { ICard } from '../types/CardInterface';
import { CreditCardProcessor } from '../lib/CardProcessorLib/types/types';
import creditCardProcessor from '../lib/CardProcessorLib';
import { removeCardNumberSpaces } from '../utils/utilFunctions';
import { useWindowDimensions } from 'react-native';
import color from 'color';
import Clipboard from '@react-native-clipboard/clipboard';
import { CARD_DARK_FONT_COLOR, CARD_LIGHT_FONT_COLOR } from '../data/ColorDefinations';

export default function CardFrontComponent({ card, copySupport = false }: { card: ICard, copySupport?: boolean }) {
  const [cardProcessor, setCardProcessor] = useState<CreditCardProcessor[]>(() => creditCardProcessor(''));
  const [textColor, setTextColor] = useState<string>(CARD_LIGHT_FONT_COLOR);
  const { width } = useWindowDimensions();
  const styles = useMemo(() => createStyles(1075 / width), [width]);

  useEffect(() => {
    setCardProcessor(creditCardProcessor(removeCardNumberSpaces(card.cardNumber)));
  }, [card.cardNumber]);

  useEffect(() => {
    if (color(card.cardColor).luminosity() > 0.270) {
      setTextColor(CARD_DARK_FONT_COLOR);
    } else {
      setTextColor(CARD_LIGHT_FONT_COLOR);
    }
  }, [card.cardColor]);

  const copyToClipboard = (text: string) => {
    if(copySupport)
      Clipboard.setString(text);
  };

  return (
    <View style={{ ...styles.card, backgroundColor: card.cardColor }}>
      <View style={styles.header}>
        <Text allowFontScaling={false} style={{ ...styles.mediumText, color: textColor }} numberOfLines={1} ellipsizeMode='middle'>{card.bankName.trim().toUpperCase()}</Text>
        <Text allowFontScaling={false} style={{ ...styles.smallText, color: textColor }} numberOfLines={1} ellipsizeMode='middle'>{card.cardName.trim().toUpperCase()}</Text>
      </View>
      <View style={styles.content}>
        <Image
          style={styles.chip}
          source={require('../assets/chip.jpg')}
        />
        <TouchableWithoutFeedback onPress={() => copyToClipboard(removeCardNumberSpaces(card.cardNumber.trim()))}>
          <Text allowFontScaling={false} style={{ ...styles.largeText, color: textColor }}>{card.cardNumber.trim()}</Text>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerText}>
          <View style={styles.expiryDate}>
            <Text allowFontScaling={false} style={{ ...styles.expiryLabel, color: textColor }} numberOfLines={2}>VALID THRU</Text>
            <TouchableWithoutFeedback onPress={() => copyToClipboard(card.expiryDate.trim())}>
              <Text allowFontScaling={false} style={{ ...styles.smallText, color: textColor }}>{card.expiryDate.trim()}</Text>
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback onPress={() => copyToClipboard(card.cardHolder.trim().toUpperCase())}>
            <Text allowFontScaling={false} style={{ ...styles.cardHolder, color: textColor }} numberOfLines={1}>{card.cardHolder.trim().toUpperCase()}</Text>
          </TouchableWithoutFeedback>
        </View>
        { cardProcessor[0].processor !== 'default' && <Image
          style={styles.logo}
          source={cardProcessor[0].logoFilled}
        />}
      </View>
      <Text style={{ ...styles.cardType, color: textColor }}>{!!card.cardType && `${card.cardType} Card`}</Text>
    </View>
  );
};

const createStyles = (scaleFactor: number) => StyleSheet.create({
  card: {
    width: '100%',
    aspectRatio: 86 / 54,
    borderRadius: 15,
    paddingHorizontal: '5%',
    paddingVertical: '4%',
    borderWidth: 0.5,
    borderColor: '#3d3d3d'
  },
  cardHolder: {
    fontSize: 45 / scaleFactor,
    maxWidth: 600 / scaleFactor,
    marginRight: 'auto'
  },
  cardNumber: {
    // alignSelf:'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: '1%'
  },
  chip: {
    width: 111 / scaleFactor,
    height: 84 / scaleFactor,
    borderRadius: 5,
    resizeMode: 'stretch',
    margin: '5%',
    borderWidth: 0.5,
    borderColor: '#3d3d3d'
  },
  logo: {
    width: 189 / scaleFactor,
    height: 130.5 / scaleFactor,
    borderRadius: 5,
    resizeMode: 'stretch',
    borderWidth: 0.25,
    borderColor: '#3d3d3d'
  },
  content: {
    marginTop: '5%',
    marginBottom: '5%',
    paddingLeft: '5%'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '5%'
  },
  footerText: {
    flexBasis: '75%'
  },
  cardType: {
    position: 'absolute',
    fontSize: 28 / scaleFactor,
    transform: [{ rotate: '-90deg' }],
    left: '-3.5%',
    bottom: '20%'
  },
  expiryDate: {
    marginLeft: 50 / scaleFactor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  expiryLabel: {
    fontSize: 20 / scaleFactor,
    width: 80 / scaleFactor,
    height: 50 / scaleFactor
  },
  smallText: {
    fontSize: 42 / scaleFactor
  },
  mediumText: {
    fontSize: 50 / scaleFactor
  },
  largeText: {
    fontSize: 64 / scaleFactor,
    marginRight: 'auto'
  },
});

