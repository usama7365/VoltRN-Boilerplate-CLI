import { Stack } from 'expo-router';
import BootSplash from 'react-native-bootsplash';
import { AuthProvider, useAuthClient } from '@auth';
import '@i18n/i18n';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider, useTheme, toNavigationTheme } from '@theme';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';


function SplashScreenController() {
  const { isAuthenticated, tokens } = useAuthClient();

  useEffect(() => {
    if (isAuthenticated !== undefined && tokens !== undefined) {
      BootSplash.hide({ fade: true });
    }
  }, [isAuthenticated, tokens]);

  return null;
}

function RootLayoutNav() {
  const { isAuthenticated } = useAuthClient();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigationTheme = toNavigationTheme(theme);

  return (
    <NavThemeProvider value={navigationTheme}>
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      {/* Protected routes - only accessible when authenticated */}
      <Stack.Protected guard={!!isAuthenticated}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="details"
          options={{
            headerShown: true,
            title: t('AppNavigator.details'),
          }}
        />
      </Stack.Protected>

      {/* Public routes - only accessible when NOT authenticated */}
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
    </NavThemeProvider>
  );
}

function RootLayout() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <SplashScreenController />
      <RootLayoutNav />
    </AuthProvider>
    </ThemeProvider>
  );
}

export default RootLayout;
