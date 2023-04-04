import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import CardBackComponent from './CardBackComponent';
import CardFrontComponent from './CardFrontComponent';
import { trigger } from "react-native-haptic-feedback";
import { ICard } from '../types/CardInterface';

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};

const CardComponent = ({card}: {card: ICard}) => {
    const [showCardBack, setShowCardBack] = useState(false);
    return (<TouchableWithoutFeedback onLongPress={() => {setShowCardBack(true); trigger("impactLight", options)}} onPressOut={() => {setShowCardBack(false)}}>
        <View>
            {!showCardBack && <CardFrontComponent card={card} copySupport={true} />}
            {showCardBack && <CardBackComponent card={card} />}
        </View>
    </TouchableWithoutFeedback >);
} 

export default CardComponent

const styles = StyleSheet.create({})