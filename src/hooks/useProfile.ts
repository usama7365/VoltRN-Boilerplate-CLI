import { useEffect, useState, useCallback } from 'react';
import { useAuthClient } from '@auth';
import { MMKVStorage } from '@mmkv';
import axios from 'axios';
import env from '@env/env';

type ProfileData = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};

const PROFILE_CACHE_KEY = 'user_profile';

export function useProfile() {
  const { tokens } = useAuthClient();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfileFromAPI = useCallback(async () => {
    if (!tokens?.access_token) {
      setError('No access token available');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get<ProfileData>(
        `${env.API_URL}/v1/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        },
      );

      const profile = response.data;
      setProfileData(profile);

      // Save to MMKV cache
      MMKVStorage.set(PROFILE_CACHE_KEY, JSON.stringify(profile));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch profile data',
      );
      // On error, try to load from cache as fallback
      try {
        const cachedProfile = MMKVStorage.getString(PROFILE_CACHE_KEY);
        if (cachedProfile) {
          const parsedProfile = JSON.parse(cachedProfile) as ProfileData;
          setProfileData(parsedProfile);
        }
      } catch {
        // If cache also fails, leave error state
      }
    } finally {
      setIsLoading(false);
    }
  }, [tokens?.access_token]);

  const fetchProfile = useCallback(
    async (forceRefresh = false) => {
      // Try to load from cache first if not forcing refresh
      if (!forceRefresh) {
        try {
          const cachedProfile = MMKVStorage.getString(PROFILE_CACHE_KEY);
          if (cachedProfile) {
            const parsedProfile = JSON.parse(cachedProfile) as ProfileData;
            setProfileData(parsedProfile);
            setIsLoading(false);
            setError(null);
            // Still fetch in background to update cache
            fetchProfileFromAPI().catch(() => {
              // Silent fail for background refresh
            });
            return;
          }
        } catch (err) {
          // If cache read fails, continue to fetch from API
          console.warn('Failed to read profile from cache:', err);
        }
      }

      // Fetch from API
      await fetchProfileFromAPI();
    },
    [fetchProfileFromAPI],
  );

  useEffect(() => {
    fetchProfile(false);
  }, [fetchProfile]);

  const refreshProfile = useCallback(() => {
    fetchProfile(true);
  }, [fetchProfile]);

  return {
    profileData,
    isLoading,
    error,
    refreshProfile,
  };
}
