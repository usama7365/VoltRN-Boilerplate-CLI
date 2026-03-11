import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@theme';

function TabsLayout() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('TabNavigator.privateHome'),
          tabBarLabel: t('TabNavigator.tabBarLabels.privateHome'),
          tabBarIcon: ({ color }) => <TabIcon label="🏠" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('TabNavigator.profile'),
          tabBarLabel: t('TabNavigator.tabBarLabels.profile'),
          tabBarIcon: ({ color }) => <TabIcon label="👤" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('TabNavigator.settings'),
          tabBarLabel: t('TabNavigator.tabBarLabels.settings'),
          tabBarIcon: ({ color }) => <TabIcon label="⚙️" color={color} />,
        }}
      />
    </Tabs>
  );
}

// Simple icon component
function TabIcon({ label, color }: { label: string; color: string }) {
  return <Text style={{ fontSize: 20, color }}>{label}</Text>;
}

export default TabsLayout;
