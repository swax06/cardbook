import { StyleSheet, View } from 'react-native';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import color from 'color';

const ColorPicker = ({ colorList = ['blue'], initColor = 'blue', onChangeColor = (x: string) => { }, size = 30, style = { borderRadius: 100, borderWidth: 0 } }) => {
    const { theme } = useTheme();
    return (
        <View style={styles.container}>
            <View style={styles.colorPicker}>
                {colorList.map((x) => (
                    <IconButton
                        key={x}
                        icon={initColor === x ? 'check-circle' : undefined}
                        iconColor={color(x).isDark() ? '#ffffff99' : '#00000099'}
                        size={size}
                        style={style}
                        containerColor={x}
                        animated={true}
                        mode='contained'
                        onPress={() => onChangeColor(x)} />
                ))}
            </View>
        </View>
    );
};

export default ColorPicker;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    colorPicker: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    label: {
        padding: 10
    }
});