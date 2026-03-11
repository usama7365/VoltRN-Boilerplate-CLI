import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTheme, type Theme } from '@theme';



function IntroScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('IntroScreen.welcome')}</Text>
      <Text style={styles.description}>
        {t('IntroScreen.description')}
      </Text>

      <View style={styles.buttonsContainer}>
        <Pressable
          style={[styles.button, styles.publicButton]}
          onPress={() => router.push('/public-home')}
        >
          <Text style={styles.buttonText}>{t('IntroScreen.continueAsGuest')}</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.loginButton]}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>{t('IntroScreen.login')}</Text>
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
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.text,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: theme.colors.textSecondary,
    lineHeight: 26,
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 15,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  publicButton: {
    backgroundColor: theme.colors.secondary,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    fontSize: 18,
    color: theme.colors.buttonText,
    fontWeight: '600',
  },
});

export default IntroScreen;
