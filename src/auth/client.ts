import { MMKVStorage } from '@mmkv';
import type { AuthClient } from '@forward-software/react-auth';
import axios, { AxiosInstance } from 'axios';
import isJwtTokenExpired from 'jwt-check-expiry';
import env from '@env/env';

type AuthTokens = Partial<{
  access_token: string;
  refresh_token: string;
}>;

type AuthCredentials = {
  email: string;
  password: string;
};

class MyAuthClient implements AuthClient<AuthTokens, AuthCredentials> {
  private axiosAuthClient: AxiosInstance | null = null;

  async onInit() {
    this.axiosAuthClient = axios.create({
      baseURL: env.API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // get tokens from persisted state (MMKV (suggested))
    const tokens = MMKVStorage.getString('tokens');

    if (tokens) {
      return JSON.parse(tokens);
    }

    return null;
  }

  async onLogin(credentials?: AuthCredentials): Promise<AuthTokens> {
    if (!this.axiosAuthClient) {
      console.log('[Auth] onLogin: axios client not initialized');
      return Promise.reject('axios client not initialized!');
    }

    const body = {
      email: credentials?.email,
      password: credentials?.password,
    };
    console.log('[Auth] onLogin: POST /v1/auth/login', body);

    try {
      const payload = await this.axiosAuthClient.post('/v1/auth/login', body);
      console.log('[Auth] onLogin: success', {
        hasAccessToken: !!payload.data?.access_token,
        hasRefreshToken: !!payload.data?.refresh_token,
      });
      MMKVStorage.set('tokens', JSON.stringify(payload.data));
      return payload.data;
    } catch (err) {
      console.log('[Auth] onLogin: request failed', err);
      if (err && typeof err === 'object' && 'response' in err) {
        const res = (err as { response?: { data?: unknown; status?: number } })
          .response;
        console.log('[Auth] onLogin: response status', res?.status, 'data', res?.data);
      }
      throw err;
    }
  }

  async onRefresh(currentTokens: AuthTokens): Promise<AuthTokens> {
    if (!this.axiosAuthClient) {
      return Promise.reject('axios client not initialized!');
    }

    if (
      !!currentTokens.access_token &&
      !isJwtTokenExpired(currentTokens.access_token)
    ) {
      return currentTokens;
    }

    const payload = await this.axiosAuthClient.post(
      // Replace jwt/refresh with your url without the domain
      '/v1/auth/refresh-token',
      {
        refreshToken: currentTokens.refresh_token,
      },
      {
        headers: {
          Authorization: `Bearer ${currentTokens.access_token}`,
        },
      },
    );

    MMKVStorage.set('tokens', JSON.stringify(payload.data));
    return payload.data;
  }

  onLogout(): Promise<void> {
    MMKVStorage.clearAll();
    // If you need to call an API to logout, just use the onLogin code to do your stuff
    return Promise.resolve();
  }
}

export default MyAuthClient;
