/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import ThemeProvider from './src/context/ThemeContext';
import AppDataProvider from './src/context/AppDataContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const Root = () => (
    <AppDataProvider>
        <ThemeProvider>
            <SafeAreaProvider>
                <App />
            </SafeAreaProvider>
        </ThemeProvider>
    </AppDataProvider>
);

AppRegistry.registerComponent(appName, () => Root);
