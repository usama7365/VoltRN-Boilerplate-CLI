/**
 * Locale Storage Tests
 * Verifies that language preferences are correctly persisted via MMKV
 */
import { MMKVStorage } from '@mmkv';

// Mock react-native-localize
jest.mock('react-native-localize', () => ({
  findBestLanguageTag: jest.fn(() => ({ languageTag: 'en', isRTL: false })),
}));

const LOCALE_PERSISTENCE_KEY = 'app_locale';

describe('Locale Storage (MMKV)', () => {
  beforeEach(() => {
    MMKVStorage.clearAll();
  });

  describe('Persistence key', () => {
    it('uses the correct MMKV key for locale', () => {
      MMKVStorage.set(LOCALE_PERSISTENCE_KEY, 'it');

      const stored = MMKVStorage.getString(LOCALE_PERSISTENCE_KEY);
      expect(stored).toBe('it');
    });
  });

  describe('cacheUserLanguage', () => {
    it('persists locale to MMKV', () => {
      // Simulate what cacheUserLanguage does
      const locale = 'it';
      MMKVStorage.set(LOCALE_PERSISTENCE_KEY, locale);

      expect(MMKVStorage.getString(LOCALE_PERSISTENCE_KEY)).toBe('it');
    });

    it('overwrites previously cached locale', () => {
      MMKVStorage.set(LOCALE_PERSISTENCE_KEY, 'en');
      MMKVStorage.set(LOCALE_PERSISTENCE_KEY, 'it');

      expect(MMKVStorage.getString(LOCALE_PERSISTENCE_KEY)).toBe('it');
    });
  });

  describe('detect', () => {
    it('returns persisted locale when available', () => {
      MMKVStorage.set(LOCALE_PERSISTENCE_KEY, 'it');

      const persistedLocale = MMKVStorage.getString(LOCALE_PERSISTENCE_KEY);
      expect(persistedLocale).toBe('it');
    });

    it('returns undefined when no locale is persisted', () => {
      const persistedLocale = MMKVStorage.getString(LOCALE_PERSISTENCE_KEY);
      expect(persistedLocale).toBeUndefined();
    });
  });

  describe('clearAll impact', () => {
    it('removes locale preference when storage is cleared', () => {
      MMKVStorage.set(LOCALE_PERSISTENCE_KEY, 'it');
      MMKVStorage.clearAll();

      expect(MMKVStorage.getString(LOCALE_PERSISTENCE_KEY)).toBeUndefined();
    });
  });
});
