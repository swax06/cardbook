import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Divider, Switch, Text } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';
import { useAppPreference } from '../../context/AppPreferenceContext';

const MiscSection = () => {
    const { theme } = useTheme();
    const { areTipsEnabled, setAreTipsEnabled } = useAppPreference();

    return (
        <View style={styles.container}>
            <Text variant='titleSmall' style={{ color: theme.colors.primary, ...styles.heading }}>Misc</Text>
            <View style={styles.row}>
                <View>
                    <Text variant='titleLarge' style={styles.subHeading}>Show Suggestions</Text>
                    <Text variant='bodySmall'>Tips banner on Home page</Text>
                </View>
                <Divider style={{ width: 1, height: '50%', marginLeft: 'auto' }} horizontalInset={true} />
                <Switch style={{ backfaceVisibility: 'hidden' }} value={areTipsEnabled} onValueChange={(x) => setAreTipsEnabled(x)} />
            </View>
        </View>
    )
}

export default MiscSection;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10
    },
    heading: {
        marginVertical: 15
    },
    subHeading: {
        marginTop: 10,
        marginBottom: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    content: {
        padding: 10
    },
    colorSchemeController: {
        borderRadius: 10
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
});