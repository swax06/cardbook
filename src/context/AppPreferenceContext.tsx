import React from 'react';
import { APP_PREFERENCE_KEYS } from '../data/StorageKeys';
import useLocalStorage from '../hooks/useLocalStorage';

const appPreferenceContext = React.createContext<{ authEnabled: boolean, setAuthEnabled: Function, cloudBackupEnabled: boolean, setCloudBackupEnabled: Function, isPremiumUser: boolean, setIsPremiumUser: Function, areTipsEnabled: boolean, setAreTipsEnabled: Function }>
    ({ authEnabled: false, setAuthEnabled: () => { }, cloudBackupEnabled: false, setCloudBackupEnabled: () => { }, isPremiumUser: false, setIsPremiumUser: () => { }, areTipsEnabled: true, setAreTipsEnabled: () => { } });
export const useAppPreference = () => React.useContext(appPreferenceContext);

const AppPreferenceProvider = ({ children }: any) => {
    const [authEnabled, setAuthEnabled] = useLocalStorage<boolean>(APP_PREFERENCE_KEYS.AUTH_ENABLED_KEY, false);
    const [cloudBackupEnabled, setCloudBackupEnabled] = useLocalStorage<boolean>(APP_PREFERENCE_KEYS.BACKUP_ENABLED_KEY, false);
    const [isPremiumUser, setIsPremiumUser] = useLocalStorage<boolean>(APP_PREFERENCE_KEYS.PREMIUM_STATE_KEY, false);
    const [areTipsEnabled, setAreTipsEnabled] = useLocalStorage<boolean>(APP_PREFERENCE_KEYS.TIPS_ENABLED_KEY, true);
    return (
        <appPreferenceContext.Provider value={{ authEnabled, setAuthEnabled, cloudBackupEnabled, setCloudBackupEnabled, isPremiumUser, setIsPremiumUser, areTipsEnabled, setAreTipsEnabled }}>
            {children}
        </appPreferenceContext.Provider>
    );
};

export default AppPreferenceProvider;