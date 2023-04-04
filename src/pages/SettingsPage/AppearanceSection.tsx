import { Platform, StyleSheet, View } from 'react-native';
import React from 'react';
import { IconButton, SegmentedButtons, Text } from 'react-native-paper';
import { colorSchemeTypes, useTheme } from '../../context/ThemeContext';
import ColorPicker from '../../shared-components/ColorPicker';
import { ACCENT_COLORS } from '../../data/ColorDefinations';
import EmptySpace from '../../shared-components/EmptySpace';

const platformConstants: any = Platform.constants;
const androidVersion = platformConstants['Release'];

const AppearanceSection = () => {
    const { theme, accentColor, colorScheme, setAccentColor, setColorScheme } = useTheme();
    return (
        <View style={styles.container}>
            <Text variant="titleSmall" style={{color: theme.colors.primary, ...styles.heading}}>Appearance</Text>
            <Text variant="titleLarge" style={styles.subHeading}>Color Scheme</Text>
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
            <Text variant="titleLarge" style={styles.subHeading}>Accent Color</Text>
            <View style={styles.content}>
                {androidVersion > 11 && 
                <>
                <View style={styles.row}>
                    <IconButton
                        icon={accentColor === 'system' ? "check-circle-outline" : 'blank'}
                        iconColor='#ffffff88'
                        size={30}
                        style={{ borderRadius: 100, marginVertical: 0 }}
                        containerColor={'blue'}
                        animated={true}
                        mode='contained'
                        onPress={() => setAccentColor('system')} />
                    <Text variant='titleMedium' style={{fontWeight:'bold'}}> System Color Pallet</Text>
                </View>
                <EmptySpace space={4}/>
                </>}
                <ColorPicker colorList={ACCENT_COLORS} initColor={accentColor} size={25} borderRadius={100} onChangeColor={(color) => setAccentColor(color)} />
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