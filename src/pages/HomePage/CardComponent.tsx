import { Pressable, StyleSheet, View, useWindowDimensions, Animated as Animated1, GestureResponderEvent, TouchableHighlight, PanResponder, Share } from 'react-native'
import React, { Ref, useRef, useState } from 'react'
import CardBackComponent from '../../shared-components/CardBackComponent';
import CardFrontComponent from '../../shared-components/CardFrontComponent';
import { trigger } from 'react-native-haptic-feedback';
import { ICard } from '../../types/CardInterface';
import Animated, { Extrapolate, interpolate, interpolateColor, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { Button, FAB, IconButton, IconButtonProps, Modal, Portal, Text, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ACTIONS, useAppData } from '../../context/AppDataContext';
import { useTheme } from '../../context/ThemeContext';
import PanButton from './PanButton';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { removeCardNumberSpaces } from '../../utils/utilFunctions';

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};

type contextType = {
    inDismissArea: boolean,
    inSnapArea: boolean,
    prevTranslateX: number
};

const CardComponent = ({ card }: { card: ICard }) => {
    const [showCardBack, setShowCardBack] = useState(false);
    const { theme } = useTheme();
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const SCREEN_WIDTH = useWindowDimensions().width;
    const scale = 1075 / SCREEN_WIDTH;
    const itemTranslateX = useSharedValue(0);
    const HEIGHT = 634 / scale;
    const WIDTH = HEIGHT * 86 / 54;
    const DISMISS_THRESHOLD = -WIDTH * 0.6;
    const SNAP_THRESHOLD = -WIDTH * 0.2;
    const itemHeight = useSharedValue(HEIGHT);
    const itemMarginTop = useSharedValue(15);
    const menuOpacity = useSharedValue(1);
    const { updateCardList } = useAppData();
    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, contextType>({
        onStart(event, context) {
            context.prevTranslateX = itemTranslateX.value;
        },
        onActive: (e, context) => {
            itemTranslateX.value = context.prevTranslateX + e.translationX;
            if (!context.inSnapArea && itemTranslateX.value < SNAP_THRESHOLD/2) {
                context.inSnapArea = true;
            }
            if (context.inSnapArea && itemTranslateX.value > SNAP_THRESHOLD/2) {
                context.inSnapArea = false;
            }
            if (!context.inDismissArea && itemTranslateX.value < DISMISS_THRESHOLD) {
                context.inDismissArea = true;
                runOnJS(trigger)('impactLight', options);
                menuOpacity.value = 0;
            }
            if (context.inDismissArea && itemTranslateX.value > DISMISS_THRESHOLD) {
                context.inDismissArea = false;
                context.inSnapArea = true;
                runOnJS(trigger)('impactLight', options);
                menuOpacity.value = 1;
            }
        },
        onEnd: (e, context) => {
            if (context.inDismissArea) {
                itemTranslateX.value = withTiming(-SCREEN_WIDTH);
                itemHeight.value = withTiming(0);
                itemMarginTop.value = withTiming(0);
                context.inDismissArea = false;
                runOnJS(setVisible)(true);
            }
            else if (context.inSnapArea) {
                itemTranslateX.value = withTiming(SNAP_THRESHOLD);
            }
            else {
                itemTranslateX.value = withTiming(0);
            }
        },
    });

    const cardStyle = useAnimatedStyle(() => ({
        transform: [{
            translateX: itemTranslateX.value,
        }],
        height: itemHeight.value,
        marginTop: itemMarginTop.value
    }));

    const handleCancelDelete = () => {
        setVisible(false);
        closeMenu();
        itemHeight.value = withTiming(HEIGHT);
        itemMarginTop.value = withTiming(15);
        menuOpacity.value = 1;
    }

    const actionStyle = useAnimatedStyle(() => {
        const interBackground = interpolateColor(-itemTranslateX.value, [-SNAP_THRESHOLD, WIDTH / 2], [theme.colors.card, theme.colors.errorContainer]);
        return ({
            height: itemHeight.value,
            width: -itemTranslateX.value > WIDTH ? WIDTH : -itemTranslateX.value,
            position: 'absolute',
            right: 0,
            marginTop: itemMarginTop.value,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: interBackground,
        })
    });

    const optionsStyle = useAnimatedStyle(() => ({
        opacity: menuOpacity.value,
        transform: [{
            scale: interpolate(-itemTranslateX.value < HEIGHT ? -itemTranslateX.value : (2 * -itemTranslateX.value) - HEIGHT,
                [20, 30],
                [0.01, 1],
                Extrapolate.CLAMP)
        }],
    }));

    const removeTextStyle = useAnimatedStyle(() => ({
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1 - menuOpacity.value,
    }));

    const closeMenu = () => {
        itemTranslateX.value = withTiming(0);
    }

    const handleShare = async () => {
        await Share.share({
            message: `Card Number: ${removeCardNumberSpaces(card.cardNumber)}\nExpiry Date: ${card.expiryDate}\n\nThis Card is shared via Card Book App`,
        });
        closeMenu();
    }

    return (
        <View>
            <Animated.View style={actionStyle}>
                <Animated.View style={[optionsStyle, { flexDirection: 'column' }]}>
                    <PanButton onPress={() => {navigation.navigate('AddCard', { card: card }); closeMenu();}} icon={'credit-card-edit-outline'}/>
                    <PanButton onPress={handleShare} icon={'share-variant'} />
                    <PanButton onPress={closeMenu} icon={'close'} />
                </Animated.View>
                <Animated.View style={removeTextStyle}>
                    <Text style={[styles.removeText]}>Delete</Text>
                </Animated.View>
            </Animated.View>
            <PanGestureHandler onGestureEvent={panGesture} activeOffsetX={[-50, SCREEN_WIDTH]} activeOffsetY={[-9999, 9999]}>
                <Animated.View style={cardStyle} >
                    <Pressable onLongPress={() => { setShowCardBack(true); trigger('impactLight', options) }} onPressOut={() => { setShowCardBack(false) }}>
                        {!showCardBack &&
                            <>
                                <CardFrontComponent card={card} copySupport={true} />

                                {/* <FAB icon='pencil-outline' style={styles.editBtn} mode='flat' variant='surface' customSize={70 / scale} onPress={() => navigation.navigate('AddCard', { card: card })} /> */}
                            </>
                        }
                        {showCardBack && <CardBackComponent card={card} />}
                    </Pressable>
                </Animated.View>
            </PanGestureHandler>
            <Portal>
                <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.card }]} dismissable={false}>
                    <Text variant='titleMedium'>Delete this card?</Text>
                    <View style={styles.modalFooter}>
                        <Button children={'Cancel'} onPress={() => handleCancelDelete()} />
                        <Button children={'Delete'} onPress={() => updateCardList({ type: ACTIONS.DELETE_CARDS, payload: [card] })} />
                    </View>
                </Modal>
            </Portal>
        </View>
    );
};

export default CardComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
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
    removeText: {
        fontWeight: 'bold',
    },
    editBtn: {
        position: 'absolute',
        right: 1,
        top: 1,
        borderRadius: 25
    }
});
