import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { ICard } from '../types/CardInterface';
import { CreditCardProcessor } from '../lib/CardProcessorLib/types/types';
import creditCardProcessor from '../lib/CardProcessorLib';
import { removeCardNumberSpaces } from '../utils/utilFunctions';
import { useWindowDimensions } from 'react-native';
import color from 'color';

export default function CardComponent({ card }: { card: ICard }) {
  const [cardProcessor, setCardProcessor] = useState<CreditCardProcessor[]>(() => creditCardProcessor(''));
  const [textColor, setTextColor] = useState<string>('white')
  const { scale, fontScale } = useWindowDimensions();
  const styles = useMemo(() => createStyles(scale, (scale * fontScale)), [scale, fontScale]);

  useEffect(() => {
    setCardProcessor(creditCardProcessor(removeCardNumberSpaces(card.cardNumber)));
  }, [card.cardNumber]);

  useEffect(() => {
    if (color(card.cardColor).luminosity() > 0.260) {
      setTextColor('#1d1d1d');
    } else {
      setTextColor('#f0f0f0');
    }
  }, [card.cardColor]);

  return (
    <View style={{ ...styles.card, backgroundColor: card.cardColor }}>
      <View style={styles.header}>
        <Text style={{ ...styles.mediumText, color: textColor }} numberOfLines={1} ellipsizeMode='middle'>{card.bankName.trim().toUpperCase()}</Text>
        <Text style={{ ...styles.smallText, color: textColor }} numberOfLines={1} ellipsizeMode='middle'>{card.cardName.trim().toUpperCase()}</Text>
      </View>
      <View style={styles.content}>
        <Image
          style={styles.chip}
          source={require('../assets/chip.jpg')}
        />
        <Text style={{ ...styles.largeText, color: textColor }}>{card.cardNumber.trim()}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerText}>
          <View style={styles.expiryDate}>
            <Text style={{ ...styles.expiryLabel, color: textColor }} numberOfLines={2}>VALID THRU</Text>
            <Text style={{ ...styles.smallText, color: textColor }}>{card.expiryDate.trim()}</Text>
          </View>
          <Text style={{ ...styles.cardHolder, color: textColor }} numberOfLines={1}>{card.cardHolder.trim().toUpperCase()}</Text>
        </View>
        <Image
          style={styles.logo}
          source={cardProcessor[0].logoFilled}
        />
      </View>
      <Text style={{ ...styles.cardType, color: textColor }}>{!!card.cardType && `${card.cardType} Card`}</Text>
    </View>
  );
};

const createStyles = (lenFactor: number, fontFactor: number) => StyleSheet.create({
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
    fontSize: 45 / fontFactor,
    maxWidth: 600 / lenFactor
  },
  cardNumber: {
    // alignSelf:'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  chip: {
    width: 111 / lenFactor,
    height: 84 / lenFactor,
    borderRadius: 5,
    resizeMode: 'stretch',
    margin: '5%',
    borderWidth: 0.5,
    borderColor: '#3d3d3d'
  },
  logo: {
    width: 189 / lenFactor,
    height: 130.5 / lenFactor,
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
    fontSize: 28 / fontFactor,
    transform: [{ rotate: '-90deg' }],
    left: '-3.5%',
    bottom: '20%'
  },
  expiryDate: {
    marginLeft: 50 / lenFactor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  expiryLabel: {
    fontSize: 20 / fontFactor,
    width: 80 / lenFactor,
    height: 50 / lenFactor
  },
  smallText: {
    fontSize: 42 / fontFactor
  },
  mediumText: {
    fontSize: 50 / fontFactor
  },
  largeText: {
    fontSize: 64 / fontFactor
  },
});

