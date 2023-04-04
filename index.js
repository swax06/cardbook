/**
 * @format
 */

import { AppRegistry } from 'react-native';
import AuthPage from './AuthPage';
import { name as appName } from './app.json';
import ThemeProvider from './src/context/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const Root = () => (
    <ThemeProvider>
        <SafeAreaProvider>
            <AuthPage />
        </SafeAreaProvider>
    </ThemeProvider>
);

AppRegistry.registerComponent(appName, () => Root);
