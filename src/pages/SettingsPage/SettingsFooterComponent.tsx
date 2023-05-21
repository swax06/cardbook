import { StyleSheet, View } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { FAB } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SettingsFooterComponent = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { bottom } = useSafeAreaInsets();
    return (
        <View style={{ ...styles.container, bottom: bottom + 10 }}>
            <FAB icon="keyboard-backspace" mode='elevated' elevation={3} style={styles.button} customSize={55} onPress={() => navigation.goBack()} />
        </View>
    );
};

export default SettingsFooterComponent;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        // paddingVertical: 5,
        borderColor: 'transparent',
        position: 'absolute',
        left: 0,
        bottom: 20
    },
    button: {
        borderRadius: 15,
        margin: 0
    },
});