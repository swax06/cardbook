import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import { useTheme } from '../../context/ThemeContext'
import EmptySpace from '../../shared-components/EmptySpace'
import { version } from '../../../package.json';

const privacyUrl = 'https://sites.google.com/view/card-book-privacy-policy/home';
const storeUrl = 'https://play.google.com/store/apps/details?id=com.cardbook.app';
const AboutSection = () => {
    const { theme } = useTheme();

    const handleClick = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <Text variant='titleSmall' style={{ color: theme.colors.primary, ...styles.heading }}>About</Text>
            <TouchableOpacity onPress={() => handleClick(storeUrl)}>
                <View style={styles.row}>
                    <Text variant='titleMedium' style={styles.subHeading}>Version Info</Text>
                    <Text variant='titleMedium'>{version}</Text>
                </View>
            </TouchableOpacity>
            <EmptySpace space={10} />
            <TouchableOpacity onPress={() => handleClick(privacyUrl)}>
                <View style={styles.row}>
                    <Text variant='titleMedium' style={styles.subHeading}>Privacy Policy</Text>
                    <Text variant='titleMedium' style={styles.subHeading}>&#9432;</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default AboutSection

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10
    },
    heading: {
        marginVertical: 15
    },
    subHeading: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
})