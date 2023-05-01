import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useAppPreference } from '../../context/AppPreferenceContext';
import { Divider, Switch, Text } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';

const SecuritySection = () => {
    const { authEnabled, setAuthEnabled } = useAppPreference();
    const { theme } = useTheme();
    return (
        <View style={styles.container}>
            <Text variant="titleSmall" style={{ color: theme.colors.primary, ...styles.heading }}>Security</Text>
            <View style={styles.row}>
                <View>
                <Text variant='titleLarge' style={styles.subHeading}>App lock</Text>
                <Text variant='bodySmall'>System lock should be enabled</Text>
                </View>
                <Divider style={{ width: 1, height: '50%', marginLeft: 'auto' }} horizontalInset={true} />
                <Switch style={{ backfaceVisibility: 'hidden'}} value={authEnabled} onValueChange={(x) => setAuthEnabled(x)} />
            </View>
        </View>
    );
};

export default SecuritySection;

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
    }
});