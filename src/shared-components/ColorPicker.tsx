import { StyleSheet, View } from 'react-native';
import React from 'react';
import { IconButton } from 'react-native-paper';

const ColorPicker = ({ colorList = ['blue'], initColor = 'blue', onChangeColor = (x: string) => { }, size = 30, borderRadius = 5 }) => {
    return (
        <View style={styles.container}>
            <View style={styles.colorPicker}>
                {colorList.map((x) => (
                    <IconButton
                        key={x}
                        icon={initColor === x ? "check-circle-outline" : 'blank'}
                        iconColor='#ffffff88'
                        size={size}
                        style={{ borderRadius: borderRadius }}
                        containerColor={x}
                        animated={true}
                        mode='contained'
                        onPress={() => onChangeColor(x)} />
                ))}
            </View>
        </View>
    )
};

export default ColorPicker;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    colorPicker: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    label: {
        padding: 10
    }
});