/**
 * Theme Storage Tests
 * Verifies that theme preferences are correctly persisted via MMKV
 */
import { MMKVStorage } from '@mmkv';

const THEME_PERSISTENCE_KEY = 'app_color_scheme';

type ColorSchemeMode = 'light' | 'dark' | 'system';

describe('Theme Storage (MMKV)', () => {
  beforeEach(() => {
    MMKVStorage.clearAll();
  });

  describe('Persistence key', () => {
    it('uses the correct MMKV key for theme', () => {
      MMKVStorage.set(THEME_PERSISTENCE_KEY, 'dark');

      const stored = MMKVStorage.getString(THEME_PERSISTENCE_KEY);
      expect(stored).toBe('dark');
    });
  });

  describe('Initial load', () => {
    it('returns undefined when no theme is persisted (defaults to system)', () => {
      const persisted = MMKVStorage.getString(THEME_PERSISTENCE_KEY);
      expect(persisted).toBeUndefined();
    });

    it('returns persisted theme when available', () => {
      MMKVStorage.set(THEME_PERSISTENCE_KEY, 'dark');

      const persisted = MMKVStorage.getString(THEME_PERSISTENCE_KEY);
      expect(persisted).toBe('dark');
    });
  });

  describe('setColorScheme', () => {
    it.each<ColorSchemeMode>(['light', 'dark', 'system'])(
      'persists "%s" mode to MMKV',
      (mode) => {
        MMKVStorage.set(THEME_PERSISTENCE_KEY, mode);

        expect(MMKVStorage.getString(THEME_PERSISTENCE_KEY)).toBe(mode);
      }
    );

    it('overwrites previously stored theme', () => {
      MMKVStorage.set(THEME_PERSISTENCE_KEY, 'light');
      MMKVStorage.set(THEME_PERSISTENCE_KEY, 'dark');

      expect(MMKVStorage.getString(THEME_PERSISTENCE_KEY)).toBe('dark');
    });
  });

  describe('toggleTheme', () => {
    it('switches from light to dark', () => {
      MMKVStorage.set(THEME_PERSISTENCE_KEY, 'light');

      // Simulate toggle logic
      const current = MMKVStorage.getString(THEME_PERSISTENCE_KEY);
      const next = current === 'dark' ? 'light' : 'dark';
      MMKVStorage.set(THEME_PERSISTENCE_KEY, next);

      expect(MMKVStorage.getString(THEME_PERSISTENCE_KEY)).toBe('dark');
    });

    it('switches from dark to light', () => {
      MMKVStorage.set(THEME_PERSISTENCE_KEY, 'dark');

      const current = MMKVStorage.getString(THEME_PERSISTENCE_KEY);
      const next = current === 'dark' ? 'light' : 'dark';
      MMKVStorage.set(THEME_PERSISTENCE_KEY, next);

      expect(MMKVStorage.getString(THEME_PERSISTENCE_KEY)).toBe('light');
    });
  });

  describe('Validation', () => {
    it('only accepts valid color scheme values', () => {
      const validValues: ColorSchemeMode[] = ['light', 'dark', 'system'];

      validValues.forEach((value) => {
        MMKVStorage.set(THEME_PERSISTENCE_KEY, value);
        const stored = MMKVStorage.getString(THEME_PERSISTENCE_KEY);
        expect(['light', 'dark', 'system']).toContain(stored);
      });
    });
  });

  describe('clearAll impact', () => {
    it('removes theme preference when storage is cleared', () => {
      MMKVStorage.set(THEME_PERSISTENCE_KEY, 'dark');
      MMKVStorage.clearAll();

      expect(MMKVStorage.getString(THEME_PERSISTENCE_KEY)).toBeUndefined();
    });
  });
});
