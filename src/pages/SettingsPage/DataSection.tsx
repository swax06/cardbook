import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Divider, Modal, Portal, Switch, Text } from 'react-native-paper'
import { useTheme } from '../../context/ThemeContext'
import { useAppPreference } from '../../context/AppPreferenceContext';
import { useAppDataSync } from '../../context/AppDataContext';
import EmptySpace from '../../shared-components/EmptySpace';
import { deleteCloudBackup, googleSignIn, signOut } from '../../services/DataSyncService';


const DataSection = () => {
    const { theme } = useTheme();
    const { cloudBackupEnabled, setCloudBackupEnabled } = useAppPreference();
    const { setPendingDownload } = useAppDataSync();
    const [visible, setVisible] = useState(false);

    const handleBackupSwitch = async (x: boolean) => {
        if (x === true) {
            const success = await googleSignIn();
            if (success) {
                setPendingDownload(true);
                setCloudBackupEnabled(true);
            }
            else {
                ToastAndroid.showWithGravity(
                    'Signin Failed',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        }
        else {
            const success = await signOut();
            if (success) {
                setPendingDownload(false);
                setCloudBackupEnabled(false);
            }
            else {
                ToastAndroid.showWithGravity(
                    'Signout Failed',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            }
        }
    };

    const handleDelete = async () => {
        await deleteCloudBackup();
        await signOut();
        setCloudBackupEnabled(false);
        setVisible(false);
    }

    return (
        <View style={styles.container}>
            <Text variant='titleSmall' style={{ color: theme.colors.primary, ...styles.heading }}>Data and sync</Text>
            <View style={styles.row}>
                <View>
                    <Text variant='titleLarge' style={styles.subHeading}>Sync card data</Text>
                    <Text variant='bodySmall'>Backup cards to Google Drive</Text>
                </View>
                <Divider style={{ width: 1, height: '50%', marginLeft: 'auto' }} horizontalInset={true} />
                <Switch style={{ backfaceVisibility: 'hidden' }} value={cloudBackupEnabled} onValueChange={(x) => handleBackupSwitch(x)} />
            </View>
            <EmptySpace space={15} />
            <TouchableOpacity onPress={() => setVisible(true)} disabled={!cloudBackupEnabled}>
                <View style={[styles.row, { opacity: cloudBackupEnabled ? 1 : 0.5 }]}>
                    <View>
                        <Text variant='titleLarge' style={styles.subHeading}>Unlink card book</Text>
                        <Text variant='bodySmall'>Delete cloud backup and revoke access</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Portal>
                <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.card }]} dismissable={false}>
                    <Text variant='titleMedium'>This action will erase all the Card Book's data and revoke its access from the Google Drive.</Text>
                    <View style={styles.modalFooter}>
                        <Button children={'Cancel'} onPress={() => setVisible(false)} />
                        <Button children={'Delete'} onPress={() => handleDelete()} />
                    </View>
                </Modal>
            </Portal>
        </View>
    );
};

export default DataSection;

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