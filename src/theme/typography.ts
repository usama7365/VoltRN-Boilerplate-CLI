/**
 * Typography scale
 * Consistent font sizes used across the app
 */

export const typography = {
  h1: 28,
  h2: 24,
  h3: 20,
  body: 16,
  caption: 14,
  label: 12,
} as const;

export type Typography = typeof typography;
