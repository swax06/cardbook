import { useState } from 'react';
import { Material3Theme, SystemScheme } from './types/ExpoMaterial3Theme.types';
import { createThemeFromSourceColor, createThemeFromSystemSchemes } from './utils/createMaterial3Theme';

/**
 * Hook to handle material3 theme
 *
 * It returns:
 * - the material3 theme from the system (or a fallback theme if not supported)
 * - a function to update the theme based on a source color
 * - a function to reset the theme to the system theme (or the fallback theme if not supported)
 *
 * @param fallbackSourceColor source color for the fallback theme (default to #6750A4)
 * @returns
 */
// export function useMaterial3Theme(params?: { fallbackSourceColor?: string; overwrite?: boolean }) {
//   const { fallbackSourceColor = '#6750A4', overwrite } = params || {};
//   const [theme, setTheme] = useState<Material3Theme>(
//     overwrite ? createMaterial3Theme(fallbackSourceColor) : getMaterial3Theme(fallbackSourceColor)
//   );

//   const updateTheme = (sourceColor: string) => {
//     setTheme(createThemeFromSourceColor(sourceColor));
//   };

//   const resetTheme = () => {
//     setTheme(getMaterial3Theme(fallbackSourceColor));
//   };

//   return { theme, updateTheme, resetTheme };
// }

// /**
//  * Get the Material3 theme from the system (works only on Android 12+).
//  *
//  * If the system does not support Material3, it will return a theme based on the fallback source color.
//  *
//  * @param fallbackSourceColor source color for the fallback theme (default to #6750A4)
//  * @returns
//  */
// export function getMaterial3Theme(fallbackSourceColor: string = '#6750A4'): Material3Theme {
//   const systemSchemes = ExpoMaterial3ThemeModule.getSystemTheme() as {
//     light: SystemScheme;
//     dark: SystemScheme;
//   } | null;

//   if (systemSchemes) {
//     return createThemeFromSystemSchemes(systemSchemes);
//   }
//   return createThemeFromSourceColor(fallbackSourceColor);
// }

// export async function getMaterial3ThemeAsync(fallbackSourceColor: string = '#6750A4'): Promise<Material3Theme> {
//   const systemSchemes = (await ExpoMaterial3ThemeModule.getSystemThemeAsync()) as {
//     light: SystemScheme;
//     dark: SystemScheme;
//   } | null;

//   if (systemSchemes) {
//     return createThemeFromSystemSchemes(systemSchemes);
//   }
//   return createThemeFromSourceColor(fallbackSourceColor);
// }

/**
 * Create a Material3 theme based on the source color.
 *
 * @param sourceColor source color for the theme
 * @returns
 */
export function createMaterial3Theme(sourceColor: string): Material3Theme {
  return createThemeFromSourceColor(sourceColor);
}

export type { Material3Theme };
