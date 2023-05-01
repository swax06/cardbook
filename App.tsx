import React, { lazy, Suspense, useEffect, useState } from 'react';
import { NativeModules, StatusBar, StyleSheet,ToastAndroid } from 'react-native';
import { useTheme } from './src/context/ThemeContext';
import HomePage from './src/pages/HomePage/HomePage';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppDataProvider from './src/context/AppDataContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LocalAuthentication from 'rn-local-authentication';
import { useAppPreference } from './src/context/AppPreferenceContext';

const { ReactHelperModule } = NativeModules;
const Stack = createNativeStackNavigator();

const AddCardPage = lazy(() => import('./src/pages/AddCardPage/AddCardPage'));
const SettingsPage = lazy(() => import('./src/pages/SettingsPage/SettingsPage'));

function App(): JSX.Element {
  const { theme } = useTheme();
  const [authSuccess, setAuthSuccess] = useState(false);
  const { authEnabled } = useAppPreference();

  useEffect(() => {
    if (!authEnabled) {
      setAuthSuccess(true);
      setTimeout(() => ReactHelperModule.removeSplashScreen(), 0);
    }
    else {
      LocalAuthentication.authenticateAsync({
        title: 'Unlock Card Book',
        description: 'Confirm your phone screen lock',
        reason: '',
        fallbackToPinCodeAction: true,
        cancelTitle: 'Cancel'
      }).then(response => {
        console.log(response);
        if (response.success) {
          setAuthSuccess(true);
          ReactHelperModule.removeSplashScreen();
        } else {
          if(response.error === 'BiometryNotEnrolled') {
            setAuthSuccess(true);
          }
          else {
            ToastAndroid.showWithGravity(
              'Authentication Failed',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            ReactHelperModule.closeApp();
          }
        }
      });
    }
  }, []);

  return (
    <AppDataProvider>
      <GestureHandlerRootView style={styles.container}>
        <PaperProvider theme={theme}>
          <StatusBar
            barStyle={theme.dark ? 'light-content' : 'dark-content'}
            backgroundColor={theme.colors.card}
          />
          <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Suspense>
              {authSuccess &&
                <NavigationContainer theme={theme}>
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='Home' component={HomePage} />
                    <Stack.Screen name='AddCard' component={AddCardPage} />
                    <Stack.Screen name='Settings' component={SettingsPage} />
                  </Stack.Navigator>
                </NavigationContainer>
              }
            </Suspense>
          </SafeAreaView>
        </PaperProvider>
      </GestureHandlerRootView>
    </AppDataProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;

