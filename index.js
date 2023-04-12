/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import ThemeProvider from './src/context/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './App';


const Root = () => (
    <ThemeProvider>
        <SafeAreaProvider>
            <App />
        </SafeAreaProvider>
    </ThemeProvider>
);

AppRegistry.registerComponent(appName, () => Root);
