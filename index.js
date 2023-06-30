/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import ThemeProvider from './src/context/ThemeContext';
import AppPreferenceProvider from './src/context/AppPreferenceContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './App';
import { withIAPContext } from 'react-native-iap';
import 'react-native-get-random-values';

const Root = () => (
    <ThemeProvider>
        <AppPreferenceProvider>
            <SafeAreaProvider>
                <App />
            </SafeAreaProvider>
        </AppPreferenceProvider>
    </ThemeProvider>
);

AppRegistry.registerComponent(appName, () => withIAPContext(Root));
