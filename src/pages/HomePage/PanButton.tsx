import { StyleSheet } from 'react-native'
import React from 'react'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { IconButton } from 'react-native-paper'

const PanButton = ({ onPress, icon }: { onPress: () => void, icon: string }) => {
    const buttonOpacity = useSharedValue(1);

    const panGesture1 = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onStart() {
            buttonOpacity.value = 0.2;
        },
        onFail() {
            buttonOpacity.value = withTiming(1);
        }
    });
    const buttonStyle = useAnimatedStyle(() => ({
        opacity: buttonOpacity.value
    }));
    return (
        <PanGestureHandler onGestureEvent={panGesture1} onBegan={onPress}>
            <Animated.View style={buttonStyle}>
                <IconButton
                    icon={icon}
                    mode='outlined'
                    size={20}
                />
            </Animated.View>
        </PanGestureHandler>
    );
};

export default PanButton;

const styles = StyleSheet.create({});