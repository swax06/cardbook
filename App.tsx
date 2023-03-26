import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useTheme } from './src/context/ThemeContext';
import AddCardPage from './src/pages/AddCardPage/AddCardPage';
import HomePage from './src/pages/HomePage/HomePage';
import SettingsPage from './src/pages/SettingsPage/SettingsPage';
import { useKeyboard } from './src/hooks/UseKeyboardHook';
import { Provider as PaperProvider } from 'react-native-paper';
import { StateNavigator } from 'navigation';
import { NavigationHandler } from 'navigation-react';
import { NavigationStack, Scene } from 'navigation-react-native';
import { SafeAreaView, useSafeAreaInsets, useSafeAreaFrame } from 'react-native-safe-area-context';
// import { changeBarColors } from 'react-native-immersive-bars';

const stateNavigator = new StateNavigator([
  { key: 'Home' },
  { key: 'Settings', trackCrumbTrail: true },
  { key: 'AddCard', trackCrumbTrail: true },
]);

function App(): JSX.Element {
  const { theme } = useTheme();
  const keyboardHeight = useKeyboard();
  const i = useSafeAreaInsets();
  const f = useSafeAreaFrame();

  useEffect(() => {
    console.log(i, f);
    // changeBarColors(theme.dark, '#50000000', 'transparent');
  }, [i, f])

  const CreatePage = (page: any) => (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      {page}
    </View>
  )

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.inverseOnSurface}
      />
      <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
        <NavigationHandler stateNavigator={stateNavigator}>
          <NavigationStack>
            <Scene stateKey="Home">{CreatePage(<HomePage />)}</Scene>
            <Scene stateKey="Settings">{CreatePage(<SettingsPage />)}</Scene>
            <Scene stateKey="AddCard">{CreatePage(<AddCardPage />)}</Scene>
          </NavigationStack>
        </NavigationHandler>
        {/* <HomePage /> */}
        {/* <NavigationContainer theme={theme}>
          <Stack.Navigator screenOptions={{ 
            headerShown: false,
            statusBarTranslucent: true,
            statusBarStyle: theme.dark ? 'light' : 'dark',
            navigationBarColor: 'transparent' 
            }}>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="AddCard" component={AddCardPage} />
            <Stack.Screen name="Settings" component={SettingsPage} />
          </Stack.Navigator>
        </NavigationContainer> */}
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;

