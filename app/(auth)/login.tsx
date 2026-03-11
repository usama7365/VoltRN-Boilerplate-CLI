import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useAuthClient } from '@auth';
import { useUserCredentials } from '@hooks/useUserCredentials';
import { useAsyncCallback } from '@hooks/useAsyncCallback';
import { useTheme, type Theme } from '@theme';



function LoginScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const router = useRouter();
  const client = useAuthClient();
  const userCredentials = useUserCredentials();

  const [onLogin, isLoginLoading] = useAsyncCallback(
    async () => {
      const creds = {
        email: userCredentials.email,
        password: userCredentials.password,
      };
      console.log('[Login] Button pressed, credentials:', {
        email: creds.email,
        passwordLength: creds.password?.length ?? 0,
      });
      try {
        const result = await client.login(creds);
        console.log('[Login] Success, result:', JSON.stringify(result));
        return result;
      } catch (err) {
        console.log('[Login] Error:', err);
        if (err && typeof err === 'object' && 'response' in err) {
          const res = (err as { response?: { data?: unknown; status?: number } })
            .response;
          console.log('[Login] API response:', res?.status, res?.data);
        }
        throw err;
      }
    },
    [client, userCredentials],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('LoginScreen.title')}</Text>
      <Text style={styles.subtitle}>{t('LoginScreen.subtitle')}</Text>

      <View style={styles.form}>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          value={userCredentials.email}
          onChangeText={userCredentials.updateEmail}
          style={styles.textInputStyle}
          
          placeholder={t('LoginScreen.emailPlaceholder')}
          keyboardType="email-address"
        />
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
          value={userCredentials.password}
          onChangeText={userCredentials.updatePassword}
          style={styles.textInputStyle}
          
          placeholder={t('LoginScreen.passwordPlaceholder')}
        />

        <Pressable
          style={[styles.button, isLoginLoading && styles.buttonDisabled]}
          onPress={() => {
            console.log('[Login] Pressable onPress fired, isLoginLoading:', isLoginLoading);
            onLogin();
          }}
          disabled={isLoginLoading}
        >
          <Text style={styles.buttonText}>
            {isLoginLoading
              ? t('LoginScreen.loading')
              : t('LoginScreen.loginButton')}
          </Text>
        </Pressable>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
          disabled={isLoginLoading}
        >
          <Text style={styles.backButtonText}>{t('LoginScreen.back')}</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: theme.colors.textSecondary,
  },
  form: {
    width: '100%',
    maxWidth: 350,
    gap: 15,
  },
  textInputStyle: {
    borderColor: theme.colors.inputBorder,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: theme.colors.surface,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.secondary,
  },
  buttonText: {
    fontSize: 18,
    color: theme.colors.buttonText,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: theme.colors.primary,
  },
});

export default LoginScreen;
