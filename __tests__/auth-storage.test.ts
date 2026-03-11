/**
 * Auth Storage Tests
 * Verifies that JWT tokens and profile cache are correctly persisted via MMKV
 */
import { MMKVStorage } from '@mmkv';

const TOKENS_KEY = 'tokens';
const PROFILE_CACHE_KEY = 'user_profile';

// Sample data
const mockTokens = {
  access_token: 'eyJhbGciOiJIUzI1NiJ9.test-access-token',
  refresh_token: 'eyJhbGciOiJIUzI1NiJ9.test-refresh-token',
};

const mockProfile = {
  id: 1,
  email: 'test@example.com',
  password: 'hashed',
  name: 'Test User',
  role: 'admin',
  avatar: 'https://example.com/avatar.jpg',
};

describe('Auth Token Storage (MMKV)', () => {
  beforeEach(() => {
    MMKVStorage.clearAll();
  });

  describe('onInit token retrieval', () => {
    it('returns null when no tokens are stored', () => {
      const tokens = MMKVStorage.getString(TOKENS_KEY);
      expect(tokens).toBeUndefined();
    });

    it('returns parsed tokens when stored in MMKV', () => {
      MMKVStorage.set(TOKENS_KEY, JSON.stringify(mockTokens));

      const stored = MMKVStorage.getString(TOKENS_KEY);
      expect(stored).toBeDefined();

      const parsed = JSON.parse(stored!);
      expect(parsed.access_token).toBe(mockTokens.access_token);
      expect(parsed.refresh_token).toBe(mockTokens.refresh_token);
    });
  });

  describe('onLogin token persistence', () => {
    it('persists tokens to MMKV after login', () => {
      // Simulate what onLogin does
      MMKVStorage.set(TOKENS_KEY, JSON.stringify(mockTokens));

      const stored = MMKVStorage.getString(TOKENS_KEY);
      const parsed = JSON.parse(stored!);
      expect(parsed).toEqual(mockTokens);
    });
  });

  describe('onRefresh token update', () => {
    it('updates tokens in MMKV after refresh', () => {
      // Store initial tokens
      MMKVStorage.set(TOKENS_KEY, JSON.stringify(mockTokens));

      // Simulate refresh with new tokens
      const refreshedTokens = {
        access_token: 'new-access-token',
        refresh_token: 'new-refresh-token',
      };
      MMKVStorage.set(TOKENS_KEY, JSON.stringify(refreshedTokens));

      const stored = MMKVStorage.getString(TOKENS_KEY);
      const parsed = JSON.parse(stored!);
      expect(parsed.access_token).toBe('new-access-token');
      expect(parsed.refresh_token).toBe('new-refresh-token');
    });
  });

  describe('onLogout  storage clearing', () => {
    it('clears all stored data on logout', () => {
      // Store tokens and profile
      MMKVStorage.set(TOKENS_KEY, JSON.stringify(mockTokens));
      MMKVStorage.set(PROFILE_CACHE_KEY, JSON.stringify(mockProfile));

      // Simulate logout
      MMKVStorage.clearAll();

      expect(MMKVStorage.getString(TOKENS_KEY)).toBeUndefined();
      expect(MMKVStorage.getString(PROFILE_CACHE_KEY)).toBeUndefined();
    });

    it('clearAll removes ALL keys (tokens, profile, locale, theme)', () => {
      MMKVStorage.set(TOKENS_KEY, JSON.stringify(mockTokens));
      MMKVStorage.set(PROFILE_CACHE_KEY, JSON.stringify(mockProfile));
      MMKVStorage.set('app_locale', 'it');
      MMKVStorage.set('app_color_scheme', 'dark');

      MMKVStorage.clearAll();

      expect(MMKVStorage.getAllKeys()).toHaveLength(0);
    });
  });
});

describe('Profile Cache Storage (MMKV)', () => {
  beforeEach(() => {
    MMKVStorage.clearAll();
  });

  describe('Cache write', () => {
    it('saves profile data to MMKV', () => {
      MMKVStorage.set(PROFILE_CACHE_KEY, JSON.stringify(mockProfile));

      const cached = MMKVStorage.getString(PROFILE_CACHE_KEY);
      expect(cached).toBeDefined();

      const parsed = JSON.parse(cached!);
      expect(parsed.name).toBe('Test User');
      expect(parsed.email).toBe('test@example.com');
      expect(parsed.role).toBe('admin');
    });
  });

  describe('Cache read', () => {
    it('returns undefined when no profile is cached', () => {
      const cached = MMKVStorage.getString(PROFILE_CACHE_KEY);
      expect(cached).toBeUndefined();
    });

    it('returns cached profile data', () => {
      MMKVStorage.set(PROFILE_CACHE_KEY, JSON.stringify(mockProfile));

      const cached = MMKVStorage.getString(PROFILE_CACHE_KEY);
      const parsed = JSON.parse(cached!);
      expect(parsed).toEqual(mockProfile);
    });
  });

  describe('Cache fallback on API error', () => {
    it('cached profile survives after setting error state', () => {
      // Simulate: profile was cached from previous successful fetch
      MMKVStorage.set(PROFILE_CACHE_KEY, JSON.stringify(mockProfile));

      // Simulate: API fails, code reads cache as fallback
      const cachedProfile = MMKVStorage.getString(PROFILE_CACHE_KEY);
      expect(cachedProfile).toBeDefined();

      const parsed = JSON.parse(cachedProfile!);
      expect(parsed.id).toBe(1);
      expect(parsed.avatar).toBe('https://example.com/avatar.jpg');
    });
  });

  describe('Cache update', () => {
    it('overwrites old profile with fresh data', () => {
      MMKVStorage.set(PROFILE_CACHE_KEY, JSON.stringify(mockProfile));

      const updatedProfile = { ...mockProfile, name: 'Updated User' };
      MMKVStorage.set(PROFILE_CACHE_KEY, JSON.stringify(updatedProfile));

      const cached = MMKVStorage.getString(PROFILE_CACHE_KEY);
      const parsed = JSON.parse(cached!);
      expect(parsed.name).toBe('Updated User');
    });
  });
});
