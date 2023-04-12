import React from "react";
import { StyleSheet, Text } from "react-native";
import Animated, { interpolate, Extrapolate, SharedValue, useSharedValue, useDerivedValue } from "react-native-reanimated";

const styles = StyleSheet.create({
    remove: {
        color: "white",
        fontFamily: "UberMoveMedium",
        fontSize: 14,
    },
});

interface ActionProps {
    x: SharedValue<number>;
    deleteOpacity: number;
    itemHeight: number;
}

const Action = ({ x, deleteOpacity = 1, itemHeight}: ActionProps) => {
    const HEIGHT = itemHeight;
    const absX = Math.abs(x.value);
    const size = useDerivedValue(() => -x.value < HEIGHT ? -x.value : (2 * -x.value) - HEIGHT);
    const translateX = useDerivedValue(() => -x.value < HEIGHT ? 0 : (-x.value - HEIGHT) / 2);
    const borderRadius = useDerivedValue(() => size.value / 2);
    const scale = useDerivedValue(() => 
        interpolate(size.value,
        [20, 30],
        [0.01, 1],
        Extrapolate.CLAMP
    ));
    const iconOpacity = useDerivedValue(() =>
        interpolate(size.value,
        [HEIGHT - 10, HEIGHT + 10],
        [1, 0])
    );
    const textOpacity = useDerivedValue(() => (1 - iconOpacity.value));
    return (
        <Animated.View
            style={{
                backgroundColor: "#D93F12",
                borderRadius,
                justifyContent: "center",
                alignItems: "center",
                height: size,
                width: size,
                transform: [{ translateX }],
            }}
        >
            <Animated.View
                style={{
                    height: 5,
                    width: 20,
                    backgroundColor: "white",
                    opacity: iconOpacity,
                    transform: [{ scale }],
                }}
            />
            <Animated.View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: textOpacity,
                }}
            >
                <Text style={styles.remove}>Remove</Text>
            </Animated.View>
        </Animated.View>
    );
};

export default Action;

