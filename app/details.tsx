import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useProfile } from '@hooks/useProfile';
import { useTheme, type Theme } from '@theme';

function DetailsScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { profileData, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>{t('DetailsScreen.loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{t('DetailsScreen.error')}</Text>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    );
  }

  if (!profileData) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{t('DetailsScreen.noData')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t('DetailsScreen.title')}</Text>

      {profileData.avatar && (
        <View style={styles.avatarContainer}>
          <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('DetailsScreen.id')}</Text>
        <Text style={styles.value}>{profileData.id}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('DetailsScreen.name')}</Text>
        <Text style={styles.value}>{profileData.name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('DetailsScreen.email')}</Text>
        <Text style={styles.value}>{profileData.email}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('DetailsScreen.role')}</Text>
        <Text style={styles.value}>{profileData.role}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>{t('DetailsScreen.password')}</Text>
        <Text style={styles.value}>{profileData.password}</Text>
      </View>
    </ScrollView>
  );
}

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.surface,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: theme.colors.text,
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: theme.colors.primary,
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
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 18,
    color: theme.colors.text,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.danger,
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default DetailsScreen;
