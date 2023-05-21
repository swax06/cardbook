import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext';
import { Text } from 'react-native-paper';
import EmptySpace from '../../shared-components/EmptySpace';

const SettingsHeaderComponent = () => {
    const { theme } = useTheme();
    return (
        <View style={{ ...styles.container, backgroundColor: theme.colors.card }}>
            {/* <EmptySpace space={20} /> */}
            <Text style={styles.heading} variant="headlineSmall">Settings</Text>
            <EmptySpace space={5} />
        </View>
    )
}

export default SettingsHeaderComponent;

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    heading: {
        fontWeight: 'bold',
        paddingLeft: 10,
    },
});