import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export const unstable_settings = {
  initialRouteName: 'intro',
};

function AuthLayout() {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen name="intro" />
      <Stack.Screen name="login" />
      <Stack.Screen
        name="public-home"
        options={{
          headerShown: true,
          title: t('AppNavigator.publicHome'),
        }}
      />
    </Stack>
  );
}

export default AuthLayout;
