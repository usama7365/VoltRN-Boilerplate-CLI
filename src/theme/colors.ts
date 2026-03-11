/**
 * Color tokens for light and dark themes
 * Customize these to match your brand
 */

export const lightColors = {
  /** Main brand color - used for primary buttons, links, active states */
  primary: '#3498db',
  /** Secondary actions and accents */
  secondary: '#95a5a6',
  /** Success states, confirmations, active language buttons */
  success: '#27ae60',
  /** Warnings, inactive language buttons */
  warning: '#e67e22',
  /** Errors, destructive actions, logout buttons */
  danger: '#e74c3c',
  /** Main screen background */
  background: '#f8f9fa',
  /** Card/surface background */
  surface: '#ffffff',
  /** Primary text color */
  text: '#2c3e50',
  /** Secondary/muted text */
  textSecondary: '#7f8c8d',
  /** Border and divider color */
  border: '#ecf0f1',
  /** Card background */
  card: '#ffffff',
  /** Input background */
  inputBackground: '#ffffff',
  /** Input border */
  inputBorder: 'grey',
  /** Button text on colored backgrounds */
  buttonText: '#ffffff',
};

export const darkColors = {
  primary: '#5dade2',
  secondary: '#7f8c8d',
  success: '#2ecc71',
  warning: '#f39c12',
  danger: '#e74c3c',
  background: '#121212',
  surface: '#1e1e1e',
  text: '#ecf0f1',
  textSecondary: '#bdc3c7',
  border: '#2c2c2c',
  card: '#1e1e1e',
  inputBackground: '#2c2c2c',
  inputBorder: '#555555',
  buttonText: '#ffffff',
};

export type Colors = typeof lightColors;
