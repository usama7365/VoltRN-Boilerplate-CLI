/**
 * Theme Context and Provider
 * Provides theme state management with system color scheme detection and MMKV persistence
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { MMKVStorage } from '@mmkv';
import { lightTheme, darkTheme, type Theme } from './theme';

type ColorSchemeMode = 'light' | 'dark' | 'system';

type ThemeContextType = {
  /** The resolved theme object (colors, spacing, typography) */
  theme: Theme;
  /** Current color scheme mode: 'light', 'dark', or 'system' */
  colorScheme: ColorSchemeMode;
  /** Toggle between light and dark (ignores system) */
  toggleTheme: () => void;
  /** Set a specific color scheme mode */
  setColorScheme: (mode: ColorSchemeMode) => void;
  /** Whether the current resolved theme is dark */
  isDark: boolean;
};

const THEME_PERSISTENCE_KEY = 'app_color_scheme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();

  const [colorScheme, setColorSchemeState] = useState<ColorSchemeMode>(() => {
    const persisted = MMKVStorage.getString(THEME_PERSISTENCE_KEY);
    if (persisted === 'light' || persisted === 'dark' || persisted === 'system') {
      return persisted;
    }
    return 'system';
  });

  const setColorScheme = useCallback((mode: ColorSchemeMode) => {
    setColorSchemeState(mode);
    MMKVStorage.set(THEME_PERSISTENCE_KEY, mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  }, [colorScheme, setColorScheme]);

  const resolvedIsDark = useMemo(() => {
    if (colorScheme === 'system') {
      return systemColorScheme === 'dark';
    }
    return colorScheme === 'dark';
  }, [colorScheme, systemColorScheme]);

  const theme = useMemo(() => {
    return resolvedIsDark ? darkTheme : lightTheme;
  }, [resolvedIsDark]);

  const value = useMemo(
    () => ({
      theme,
      colorScheme,
      toggleTheme,
      setColorScheme,
      isDark: resolvedIsDark,
    }),
    [theme, colorScheme, toggleTheme, setColorScheme, resolvedIsDark],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access the current theme
 * @returns ThemeContextType with theme, colorScheme, toggleTheme, setColorScheme, isDark
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
