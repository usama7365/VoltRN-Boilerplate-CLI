import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';
import ThemeToggle from '@components/ThemeToggle';

function SettingsScreen(): React.JSX.Element {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {t('SettingsScreen.title')}
      </Text>
      <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
        {t('SettingsScreen.description')}
      </Text>

      <ThemeToggle />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default SettingsScreen;
