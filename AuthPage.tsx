import { StyleSheet, Image, View, StatusBar, NativeModules } from 'react-native'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import LocalAuthentication from 'rn-local-authentication';
import useAppState from './src/hooks/useAppState';
import { useTheme } from './src/context/ThemeContext';
import App from './App';

const {ReactHelperModule} = NativeModules;

// const App = lazy(() => import('./App'));

const AuthPage = () => {
    const appState = useAppState();
    const {theme} = useTheme();
    const [authSuccess, setAuthSuccess] = useState(false);

    useEffect(() => {
        LocalAuthentication.authenticateAsync({
            title: 'Unlock Card Book',
            description: "Confirm your phone screen lock",
            reason: '',
            fallbackToPinCodeAction: true,
            cancelTitle: 'Cancel'
        }).then(response => {
            if (response.success) {
                setAuthSuccess(true);
                ReactHelperModule.removeSplashScreen();
            } else {
                ReactHelperModule.closeApp();
            }
        });
    }, []);

    return (
        <>
        <StatusBar
            barStyle={theme.dark ? 'light-content' : 'dark-content'}
            backgroundColor={authSuccess ? theme.colors.card : theme.colors.background}
        />
        { authSuccess && 
                <App />
        }
        </>
    )
}

export default AuthPage;

const styles = StyleSheet.create({});