import { StyleSheet, View } from 'react-native';
import React from 'react';
import { IconButton } from 'react-native-paper';
import color from 'color';

const PADDING = 14;

const ColorPicker = ({ colorList = [['blue']], initColor = 'blue', onChangeColor = (x: string[]) => { }, size = 30, style = { borderRadius: 100, borderWidth: 0 } }) => {
    return (
        <View style={styles.container}>
            <View style={styles.colorPicker}>
                {colorList.map((x, i) => (
                    <View key={i}>
                        <View style={{ margin: PADDING / 2 }}>
                            <View style={[styles.row, { height: PADDING + size, width: PADDING + size, borderRadius: style.borderRadius }]}>
                                {x.map((y, i) => (
                                    <View key={i}
                                        style={{
                                            backgroundColor: y,
                                            flexGrow: 1,
                                            borderBottomLeftRadius: i === 0 ? style.borderRadius / 2 : 0,
                                            borderTopLeftRadius: i === 0 ? style.borderRadius / 2 : 0,
                                            borderBottomRightRadius: i === x.length - 1 ? style.borderRadius / 2 : 0,
                                            borderTopRightRadius: i === x.length - 1 ? style.borderRadius / 2 : 0,
                                        }}>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <IconButton
                            icon={initColor === x[0] ? 'check-circle' : undefined}
                            iconColor={color(x[0]).isDark() ? '#eeeeee' : '#333333'}
                            size={size}
                            style={{ ...style, position: 'absolute' }}
                            containerColor={'transparent'}
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
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    label: {
        padding: 10
    },
    row: {
        flexDirection: 'row'
    }
});