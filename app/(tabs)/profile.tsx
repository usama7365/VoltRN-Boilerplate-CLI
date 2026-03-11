import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuthClient } from '@auth';
import { useAsyncCallback } from '@hooks/useAsyncCallback';

import { useRouter } from 'expo-router';
import { useTheme, type Theme } from '@theme';

function ProfileScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const client = useAuthClient();
  const { tokens } = client;

  const [onLogout, isLogoutLoading] = useAsyncCallback(async () => {
    await client.logout();
    router.replace('/intro');
  }, [client]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('ProfileScreen.title')}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('ProfileScreen.accessToken')}</Text>
        <Text style={styles.value} numberOfLines={1} ellipsizeMode="middle">
          {tokens?.access_token || '-'}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('ProfileScreen.refreshToken')}</Text>
        <Text style={styles.value} numberOfLines={1} ellipsizeMode="middle">
          {tokens?.refresh_token || '-'}
        </Text>
      </View>

      <Pressable
        style={styles.logoutButton}
        onPress={onLogout}
        disabled={!client.isAuthenticated || isLogoutLoading}
      >
        <Text style={styles.logoutButtonText}>{t('ProfileScreen.logout')}</Text>
      </Pressable>
    </View>
  );
}

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.surface,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: theme.colors.text,
  },
  infoContainer: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  label: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 5,
    fontWeight: '500',
  },
  value: {
    fontSize: 18,
    color: theme.colors.text,
  },
  logoutButton: {
    marginTop: 30,
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: theme.colors.danger,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    color: theme.colors.buttonText,
    fontWeight: '600',
  },
});

export default ProfileScreen;
