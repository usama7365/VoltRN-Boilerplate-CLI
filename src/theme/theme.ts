/**
 * Theme definition combining colors, spacing, and typography
 */

import { lightColors, darkColors, type Colors } from './colors';
import { spacing, type Spacing } from './spacing';
import { typography, type Typography } from './typography';

export type Theme = {
  colors: Colors;
  spacing: Spacing;
  typography: Typography;
};

export const lightTheme: Theme = {
  colors: lightColors,
  spacing,
  typography,
};

export const darkTheme: Theme = {
  colors: darkColors,
  spacing,
  typography,
};

/**
 * Maps our theme to React Navigation's theme format
 */
export function toNavigationTheme(theme: Theme) {
  return {
    dark: theme.colors.background === darkColors.background,
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.danger,
    },
    fonts: {
      regular: { fontFamily: 'System', fontWeight: '400' as const },
      medium: { fontFamily: 'System', fontWeight: '500' as const },
      bold: { fontFamily: 'System', fontWeight: '700' as const },
      heavy: { fontFamily: 'System', fontWeight: '900' as const },
    },
  };
}
