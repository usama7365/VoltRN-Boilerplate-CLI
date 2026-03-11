import React, { useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import i18n from '@i18n/i18n';
import { switchLocaleTo } from '@i18n/utils';
import { useTheme, type Theme } from '@theme';



function PublicHomeScreen(): React.JSX.Element {
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
      <Text style={styles.title}>{t('PublicHomeScreen.title')}</Text>
      <Text style={styles.description}>
        {t('PublicHomeScreen.description')}
      </Text>

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

      <Pressable
        style={styles.backButton}
        onPress={() => router.push('/intro')}
      >
        <Text style={styles.backButtonText}>{t('PublicHomeScreen.backToIntro')}</Text>
      </Pressable>
    </View>
  );
}

const createStyles = (theme: Theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.background,
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
    marginBottom: 30,
    color: theme.colors.textSecondary,
    lineHeight: 24,
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
    marginTop: 20,
  },
  backButton: {
    marginTop: 40,
  },
  backButtonText: {
    fontSize: 16,
    color: theme.colors.primary,
  },
});

export default PublicHomeScreen;
