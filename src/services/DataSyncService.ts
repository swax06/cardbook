import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GDrive, MimeTypes } from '@robinbobin/react-native-google-drive-api-wrapper';
import { AES, enc } from 'crypto-js';

const UNKNOWN = 'unknown';
let gdrive: GDrive;
let userId = UNKNOWN;
const ENCRYPTION_KEY = 'card-book-secret-key-';

const initDataSyncService = () => {
    if (!gdrive) {
        gdrive = new GDrive();
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.appdata'],
        });
    }
}

const getAppfiles = async () => {
    await googleSignIn();
    const fileList = await gdrive.files.list({
        pageSize: 100,
        spaces: 'appDataFolder',
        fields: 'files(id, name)'
    });
    return fileList.files;
}

const getFileContent = async (fileId: string) => {
    const data = (await gdrive.files.getText(fileId));
    try {
        if (userId !== UNKNOWN) {
            const key = ENCRYPTION_KEY + userId;
            const parsedData = JSON.parse(AES.decrypt(data, key).toString(enc.Utf8));
            return parsedData;
        }
        else
            return [];
    } catch (error) {
        return [];
    }

}

export const deleteCloudBackup = async () => {
    try {
        await googleSignIn();
        const files = await getAppfiles();
        files.forEach((f: any) => {
            gdrive.files.delete(f.id);
        })
        await GoogleSignin.revokeAccess();
    } catch (error) {
        console.error('Failed to delete backup');
    }
}

export const googleSignIn = async () => {
    initDataSyncService();
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!isSignedIn) {
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true
            });
            await GoogleSignin.signIn();
            gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
            userId = (await GoogleSignin.getCurrentUser())?.user.id ?? UNKNOWN;
            return true;
        } catch (error) {
            console.error('Failed to signin');
            return false;
        }
    }
    else {
        if (!gdrive.accessToken) {
            gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
            userId = (await GoogleSignin.getCurrentUser())?.user.id ?? UNKNOWN;
            return true;
        }
        else {
            return false;
        }
    }
}

export const signOut = async () => {
    try {
        initDataSyncService();
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            await GoogleSignin.signOut();
            gdrive.accessToken = undefined;
        }
        return true;
    } catch (error) {
        console.error(error, 'Failed to signout');
        return false;
    }
}

export const uploadData = async (fileName: string, payload: any) => {
    try {
        await googleSignIn();
        const files = await getAppfiles();
        let fileId = files.find((x: any) => x.name === fileName)?.id;
        if (!fileId) {
            fileId = (await gdrive.files.newMetadataOnlyUploader()
                .setRequestBody(
                    {
                        'mimeType': MimeTypes.TEXT,
                        'name': fileName,
                        'parents': [
                            'appDataFolder'
                        ]
                    }
                ).execute()).id;
        }
        if (userId !== UNKNOWN) {
            const key = ENCRYPTION_KEY + userId;
            await gdrive.files.newMediaUploader()
                .setData(AES.encrypt(JSON.stringify(payload), key).toString(), MimeTypes.TEXT)
                .setIdOfFileToUpdate(fileId)
                .execute();
            return true;
        }
        else {
            return false;
        }
    } catch (error: any) {
        if (error.name === 'AbortError')
            return true;
        console.error(error, 'Failed to upload data');
        return false;
    }
}

export const downloadData = async (fileName: string) => {
    try {
        await googleSignIn();
        const files = await getAppfiles();
        const fileInfo = files.find((x: any) => x.name === fileName);
        let data = null;
        if (!!fileInfo)
            data = await getFileContent(fileInfo.id);
        return data;
    } catch (error) {
        console.error(error, 'Failed to download data');
        return undefined;
    }
}