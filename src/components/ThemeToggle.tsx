import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@theme';
import { useTranslation } from 'react-i18next';

function ThemeToggle(): React.JSX.Element {
  const { theme, colorScheme, setColorScheme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { borderTopColor: theme.colors.border }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {t('common.themeAppearance')}
      </Text>
      <View style={styles.options}>
        <Pressable
          style={[
            styles.option,
            { borderColor: theme.colors.border },
            colorScheme === 'light' && { borderColor: theme.colors.primary, backgroundColor: theme.colors.primary + '15' },
          ]}
          onPress={() => setColorScheme('light')}
        >
          <Text style={[styles.optionText, { color: theme.colors.text }]}>
            {t('common.themeLight')}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.option,
            { borderColor: theme.colors.border },
            colorScheme === 'dark' && { borderColor: theme.colors.primary, backgroundColor: theme.colors.primary + '15' },
          ]}
          onPress={() => setColorScheme('dark')}
        >
          <Text style={[styles.optionText, { color: theme.colors.text }]}>
            {t('common.themeDark')}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.option,
            { borderColor: theme.colors.border },
            colorScheme === 'system' && { borderColor: theme.colors.primary, backgroundColor: theme.colors.primary + '15' },
          ]}
          onPress={() => setColorScheme('system')}
        >
          <Text style={[styles.optionText, { color: theme.colors.text }]}>
            {t('common.themeSystem')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  options: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ThemeToggle;
