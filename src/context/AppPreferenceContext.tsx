import React from 'react';
import { APP_PREFERENCE_KEYS } from '../data/StorageKeys';
import useLocalStorage from '../hooks/useLocalStorage';

const appPreferenceContext = React.createContext<{ authEnabled: boolean, setAuthEnabled: Function, cloudBackupEnabled: boolean, setCloudBackupEnabled: Function }>
    ({ authEnabled: false, setAuthEnabled: () => { }, cloudBackupEnabled: false, setCloudBackupEnabled: () => { } });
export const useAppPreference = () => React.useContext(appPreferenceContext);

const AppPreferenceProvider = ({ children }: any) => {
    const [authEnabled, setAuthEnabled] = useLocalStorage<boolean>(APP_PREFERENCE_KEYS.AUTH_ENABLED_KEY, false);
    const [cloudBackupEnabled, setCloudBackupEnabled] = useLocalStorage<boolean>(APP_PREFERENCE_KEYS.BACKUP_ENABLED_KEY, false);
    return (
        <appPreferenceContext.Provider value={{ authEnabled, setAuthEnabled, cloudBackupEnabled, setCloudBackupEnabled }}>
            {children}
        </appPreferenceContext.Provider>
    );
};

export default AppPreferenceProvider;