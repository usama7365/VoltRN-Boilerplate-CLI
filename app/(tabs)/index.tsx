import React, { useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import i18n from '@i18n/i18n';
import { switchLocaleTo } from '@i18n/utils';
import { useTheme, type Theme } from '@theme';



function PrivateHomeScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const currentLocale = i18n.language;

  const switchLocale = useCallback(
    (locale: string) => () => {
      switchLocaleTo(locale);
    },
    [],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>{t('PrivateHomeScreen.welcome')}</Text>
      <Text style={styles.title}>{t('PrivateHomeScreen.title')}</Text>
      <Text style={styles.description}>
        {t('PrivateHomeScreen.description')}
      </Text>

      <Pressable
        style={styles.detailsButton}
        onPress={() => router.push('/details')}
      >
        <Text style={styles.buttonText}>
          {t('PrivateHomeScreen.goToDetails')}
        </Text>
      </Pressable>

      <View style={styles.languageButtonsContainer}>
        <Pressable
          style={[
            styles.languageButton,
            currentLocale === 'it'
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={switchLocale('it')}
        >
          <Text style={styles.languageButtonText}>{t('common.italian')}</Text>
        </Pressable>

        <Pressable
          style={[
            styles.languageButton,
            currentLocale === 'en'
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={switchLocale('en')}
        >
          <Text style={styles.languageButtonText}>{t('common.english')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.surface,
  },
  welcome: {
    fontSize: 20,
    color: theme.colors.text,
    marginBottom: 10,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.text,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  detailsButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: theme.colors.buttonText,
    fontWeight: '600',
  },
  languageButton: {
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 150,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: theme.colors.success,
  },
  inactiveButton: {
    backgroundColor: theme.colors.warning,
  },
  languageButtonText: {
    fontSize: 16,
    color: theme.colors.buttonText,
    fontWeight: '600',
  },
  languageButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 30,
  },
});

export default PrivateHomeScreen;
