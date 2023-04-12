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
                    <View key={x} style={{ flexBasis: '16.6%', alignItems: 'center' }}>
                        <IconButton
                            icon={initColor === x ? "check-circle" : 'blank'}
                            iconColor={color(x).isDark() ? '#ffffff99' : '#00000099'}
                            size={size}
                            style={style}
                            containerColor={x}
                            animated={true}
                            mode='contained'
                            onPress={() => onChangeColor(x)} />
                    </View>
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    label: {
        padding: 10
    }
});