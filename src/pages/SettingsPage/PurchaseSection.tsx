import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import EmptySpace from '../../shared-components/EmptySpace'
import { useTheme } from '../../context/ThemeContext'
import { useIAP, requestPurchase, getPurchaseHistory } from 'react-native-iap'
import { useAppPreference } from '../../context/AppPreferenceContext'
import { LIFETIME_LICENSE_PRODUCT_ID } from '../../data/ProductIds'

const PurchaseSection = () => {
    const { theme } = useTheme();
    const { connected } = useIAP();
    const { isPremiumUser, setIsPremiumUser } = useAppPreference();

    const purchase = async () => {
        try {
            await requestPurchase({
                skus: [LIFETIME_LICENSE_PRODUCT_ID]
            });
        } catch (err: any) {
            // console.error(err);
            // ToastAndroid.showWithGravity(
            //     'Something went wrong! Please try again',
            //     ToastAndroid.SHORT,
            //     ToastAndroid.CENTER,
            // );
        }
    };

    const restorePurchase = async () => {
        ToastAndroid.showWithGravity(
            'Restoring purchase',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
        try {
            const receipt = (await getPurchaseHistory())?.at(0)?.transactionReceipt;
            if (!!receipt) {
                fetch('https://europe-west2-pc-api-8215003641780118744-999.cloudfunctions.net/validatePurchase', {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify({ data: receipt }),
                }).then(async (deliveryResult: any) => {
                    let res = await deliveryResult.json();
                    if (res?.result?.isPremiumUser) {
                        setIsPremiumUser(true);
                        ToastAndroid.showWithGravity(
                            'Purchase Restored',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        );
                    } else {
                        ToastAndroid.showWithGravity(
                            'Restore failed',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER,
                        );
                    }
                });
            } else {
                ToastAndroid.showWithGravity(
                    'Could not find receipt',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        } catch (err) {
            // console.error(err);
            // ToastAndroid.showWithGravity(
            //     'Something went wrong! Please try later',
            //     ToastAndroid.SHORT,
            //     ToastAndroid.CENTER,
            // );
        }
    };

    return (
        <View style={styles.container}>
            <Text variant='titleSmall' style={{ color: theme.colors.primary, ...styles.heading }}>Purchase</Text>
            <TouchableOpacity onPress={() => purchase()} disabled={!connected}>
                <View style={[styles.row]}>
                    <View>
                        <Text variant='titleLarge' style={styles.subHeading}>Buy premium license</Text>
                        <Text variant='bodySmall'>Unlock premium features and support the dev</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <EmptySpace space={15} />
            <TouchableOpacity onPress={() => restorePurchase()} disabled={!connected}>
                <View style={[styles.row]}>
                    <View>
                        <Text variant='titleLarge' style={styles.subHeading}>Restore purchase</Text>
                        <Text variant='bodySmall'>Already bought the license? restore your purchase</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default PurchaseSection;

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