import { Platform, StyleSheet, View } from 'react-native';
import React from 'react';
import { Checkbox, IconButton, SegmentedButtons, Text } from 'react-native-paper';
import { colorSchemeTypes, useTheme } from '../../context/ThemeContext';
import ColorPicker from '../../shared-components/ColorPicker';
import { ACCENT_COLORS } from '../../data/ColorDefinations';
import EmptySpace from '../../shared-components/EmptySpace';

const radius = 22;

const AppearanceSection = () => {
    const { theme, accentColor, colorScheme, setAccentColor, setColorScheme, systemPallet } = useTheme();
    return (
        <View style={styles.container}>
            <Text variant='titleSmall' style={{color: theme.colors.primary, ...styles.heading}}>Appearance</Text>
            <Text variant='titleLarge' style={styles.subHeading}>Color scheme</Text>
            <View style={styles.content}>
                <SegmentedButtons
                    value={colorScheme}
                    onValueChange={(value) => setColorScheme(value as colorSchemeTypes)}
                    buttons={[
                        {
                            value: 'system',
                            label: 'System',
                            icon: 'theme-light-dark',
                            style: styles.colorSchemeController
                        },
                        {
                            value: 'light',
                            label: 'Light',
                            icon: 'weather-sunny'
                        },
                        {
                            value: 'dark',
                            label: 'Dark',
                            icon: 'weather-night',
                            style: styles.colorSchemeController
                        },
                    ]}
                />
            </View>
            <Text variant='titleLarge' style={styles.subHeading}>Accent color</Text>
            <View style={styles.content}>
                {Number(Platform.Version) > 30 && 
                <>
                <View style={styles.row}>
                    <View style={{ borderRadius: 100, marginHorizontal: 7 }}>
                        <View style={{backgroundColor: systemPallet.dark.primary, height: radius, width: 2 * radius, borderTopStartRadius: 100, borderTopEndRadius: 100 }}></View>
                        <View style={styles.row}>
                        <View style={{backgroundColor: systemPallet.dark.tertiary, height: radius, width: radius, borderBottomStartRadius: 100 }}></View>
                        <View style={{backgroundColor: systemPallet.dark.inversePrimary, height: radius, width: radius, borderBottomEndRadius: 100 }}></View>
                        </View>
                    </View>
                    <IconButton
                        icon={accentColor === 'system' ? 'check-circle' : undefined}
                        iconColor={'#ffffffee'}
                        size={30}
                        style={{ borderRadius: 100, position: 'absolute', left: 0 }}
                        containerColor={'transparent'}
                        animated={true}
                        mode='contained'
                        onPress={() => setAccentColor('system')} />
                    <Text variant='titleMedium' style={{fontWeight:'bold'}}> System Color Pallet</Text>
                </View>
                <EmptySpace space={4}/>
                </>}
                <ColorPicker colorList={ACCENT_COLORS} initColor={accentColor} size={25} onChangeColor={(color) => setAccentColor(color[0])} />
            </View>
        </View>
    );
};

export default AppearanceSection;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10
    },
    heading: {
        paddingVertical: 15
    },
    subHeading: {
        paddingTop: 10,
        paddingBottom: 5
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        padding: 10
    },
    colorSchemeController: {
        borderRadius: 10
    }
});