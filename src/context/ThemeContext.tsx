import React, { useContext, useState, useEffect, useRef } from 'react';
import { useColorScheme } from 'react-native';
import { MD3LightTheme as PaperDefaultTheme, adaptNavigationTheme, MD3Theme } from 'react-native-paper';
import useLocalStorage from '../hooks/useLocalStorage';
import { ACCENT_STORAGE_KEY, THEME_MODE_STORAGE_KEY } from '../data/StorageKeys';
import { createMaterial3Theme } from '../lib/MaterialYouLib';
import { MD3Colors } from 'react-native-paper/lib/typescript/src/types';
import { createThemeFromSystemSchemes } from '../lib/MaterialYouLib/utils/createMaterial3Theme';
import { NativeModules } from 'react-native';
import { DefaultTheme, Theme } from '@react-navigation/native';
import { Platform } from 'react-native';
import { ACCENT_COLORS } from '../data/ColorDefinations';

const platformConstants: any = Platform.constants;
const androidVersion = platformConstants['Release'];

const {ReactHelperModule} = NativeModules;

const colorSchemes = ['system', 'light', 'dark'] as const;
export type colorSchemeTypes = typeof colorSchemes[number];
type appColorSchemeTypes = 'light' | 'dark';

const DEFAULT_COLOR_SCHEME: appColorSchemeTypes = 'light';
const DEFAULT_ACCENT_COLOR = ACCENT_COLORS[0];

export interface IThemeContext {
  theme: MD3Theme & Theme,
  accentColor: string,
  colorScheme: colorSchemeTypes,
  setAccentColor: (x: string) => void,
  setColorScheme: (x: colorSchemeTypes) => void
};

const generateTheme = (colorScheme: appColorSchemeTypes, accentColor: string, systemPallet: any): MD3Theme & Theme => {
  const isDarkMode = colorScheme === 'dark';
  let colorDefs;
  if(accentColor === 'system') {
    colorDefs = createThemeFromSystemSchemes(systemPallet);
  }
  else{
    colorDefs = createMaterial3Theme(accentColor);
  }
  const paperTheme = {
    ...PaperDefaultTheme,
    dark: isDarkMode,
    colors: (isDarkMode ? colorDefs.dark : colorDefs.light) as MD3Colors,
  };
  const navTheme = adaptNavigationTheme({ reactNavigationLight: DefaultTheme, materialLight: paperTheme }).LightTheme;
  const combinedTheme = {
    ...navTheme,
    ...paperTheme,
    colors: {
      ...navTheme.colors,
      ...paperTheme.colors,
    },
  };
  return combinedTheme;
};

const ThemeContext = React.createContext<IThemeContext>(
    { 
      theme: generateTheme(DEFAULT_COLOR_SCHEME, DEFAULT_ACCENT_COLOR, {}),
      accentColor: DEFAULT_ACCENT_COLOR,
      colorScheme: DEFAULT_COLOR_SCHEME,
      setAccentColor: (x) => { },
      setColorScheme: (x) => { } 
    }
  );

export function useTheme() {
  return useContext(ThemeContext);
};

export default function ThemeProvider({ children }: any) {
  const systemColorScheme = useColorScheme();
  // const accentcolorRef = useRef<string>(DEFAULT_ACCENT_COLOR);
  // const colorSchemeRef = useRef<'light' | 'dark'>(systemColorScheme ?? DEFAULT_COLOR_SCHEME);
  const [colorScheme, setColorScheme] = useLocalStorage<colorSchemeTypes>(THEME_MODE_STORAGE_KEY, 'system');
  const [theme, setTheme] = useState<MD3Theme & Theme>(() => generateTheme(systemColorScheme ?? DEFAULT_COLOR_SCHEME, DEFAULT_ACCENT_COLOR, systemPallet));
  const [accentColor, setAccentColor] = useLocalStorage<string>(ACCENT_STORAGE_KEY, androidVersion > 11 ? 'system' : DEFAULT_ACCENT_COLOR);
  const systemPallet = ReactHelperModule.getSystemColorPalette();

  useEffect(() => {
    updateTheme();
  }, [colorScheme, systemColorScheme, accentColor]);

  const updateTheme = () => {
      let appColorScheme: appColorSchemeTypes = DEFAULT_COLOR_SCHEME;
      if (colorScheme === 'system') {
        appColorScheme = systemColorScheme ?? DEFAULT_COLOR_SCHEME;
      }
      else {
        appColorScheme = colorScheme;
      }
      setTheme(generateTheme(appColorScheme, accentColor, systemPallet));
  }

  return (
    <ThemeContext.Provider value={{ theme, accentColor, colorScheme, setAccentColor, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
