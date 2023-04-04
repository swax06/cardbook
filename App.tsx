import React, { lazy, Suspense } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from './src/context/ThemeContext';
// import AddCardPage from './src/pages/AddCardPage/AddCardPage';
import HomePage from './src/pages/HomePage/HomePage';
// import SettingsPage from './src/pages/SettingsPage/SettingsPage';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppDataProvider from './src/context/AppDataContext';

const Stack = createNativeStackNavigator();

// const options: AuthenticateOptionsAndroid
const AddCardPage = lazy(() => import('./src/pages/AddCardPage/AddCardPage'));
const SettingsPage = lazy(() => import('./src/pages/SettingsPage/SettingsPage'));

function App(): JSX.Element {
  const { theme } = useTheme();

  return (
    <AppDataProvider>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container} edges={['top']}>
          <Suspense>
            <NavigationContainer theme={theme}>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="AddCard" component={AddCardPage} />
                <Stack.Screen name="Settings" component={SettingsPage} />
              </Stack.Navigator>
            </NavigationContainer>
          </Suspense>
        </SafeAreaView>
      </PaperProvider>
    </AppDataProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;

