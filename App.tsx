import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { NativeModules, StatusBar, StyleSheet, ToastAndroid, View } from 'react-native';
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
import { initConnection, getProducts, endConnection, ProductPurchase, PurchaseError, SubscriptionPurchase, flushFailedPurchasesCachedAsPendingAndroid, purchaseErrorListener, purchaseUpdatedListener, finishTransaction } from 'react-native-iap';
import { LIFETIME_LICENSE_PRODUCT_ID } from './src/data/ProductIds';
import useAppState from './src/hooks/useAppState';

const { ReactHelperModule } = NativeModules;
const Stack = createNativeStackNavigator();

const AddCardPage = lazy(() => import('./src/pages/AddCardPage/AddCardPage'));
const SettingsPage = lazy(() => import('./src/pages/SettingsPage/SettingsPage'));

let purchaseUpdateSubscription: any;
let purchaseErrorSubscription: any;

function App(): JSX.Element {
  const { theme } = useTheme();
  const [authSuccess, setAuthSuccess] = useState(false);
  const { authEnabled, setIsPremiumUser } = useAppPreference();
  const appState = useAppState();
  const timeStamp = useRef(new Date());
  const initDone = useRef(false);

  useEffect(() => {
    if (!authEnabled) {
      setAuthSuccess(true);
      setTimeout(() => ReactHelperModule.removeSplashScreen(), 0);
      initPaymentService();
    }
    else {
      if (!authSuccess)
        LocalAuthentication.authenticateAsync({
          title: 'Unlock Card Book',
          description: 'Confirm your phone screen lock',
          reason: '',
          fallbackToPinCodeAction: true,
          cancelTitle: 'Cancel'
        }).then(response => {
          if (response.success || response.error === 'BiometryNotEnrolled') {
            setAuthSuccess(true);
            ReactHelperModule.removeSplashScreen();
            initPaymentService();
          } else {
            ToastAndroid.showWithGravity(
              'Authentication Failed',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            ReactHelperModule.closeApp();
          }
        });
    }
    return paymentServiceCleanup;
  }, [authSuccess]);

  useEffect(() => {
    if (appState === 'background') {
      timeStamp.current = new Date();
    }
    if (appState === 'active') {
      const currTimeStamp = new Date();
      const diff = currTimeStamp.getTime() - timeStamp.current.getTime();
      if (diff > 5 * 60 * 1000) {
        setAuthSuccess(false);
      }
    }
  }, [appState]);

  const initPaymentService = async () => {
    if (!initDone.current) {
      initDone.current = true;
      await initConnection();
      await flushFailedPurchasesCachedAsPendingAndroid();
      purchaseUpdateSubscription = purchaseUpdatedListener(
        async (purchase: SubscriptionPurchase | ProductPurchase) => {
          const receipt = purchase.transactionReceipt;
          if (!!receipt) {
            await finishTransaction({ purchase, isConsumable: false });
            setIsPremiumUser(true);
          }
        }
      );

      purchaseErrorSubscription = purchaseErrorListener(
        (error: PurchaseError) => {
          if (error.responseCode === 7) {
            ToastAndroid.showWithGravity(
              `Already owned! try restore purchase`,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
          else if (error.responseCode !== 2) {
            ToastAndroid.showWithGravity(
              `error code: ${error.code}`,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        },
      );
      await getProducts({ skus: [LIFETIME_LICENSE_PRODUCT_ID] });
    }
  }

  const paymentServiceCleanup = () => {
    if (!!purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = undefined;
    }

    if (!!purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = undefined;
    }
    endConnection();
  }

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
              {!authSuccess &&
                <View style={[styles.container, { backgroundColor: theme.colors.card }]}></View>
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

