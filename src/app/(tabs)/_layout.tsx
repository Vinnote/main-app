import { Tabs } from 'expo-router';
import BottomTabBar from '@/src/app/navigation/BottomTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="feed" options={{ title: 'Início' }} />
      <Tabs.Screen name="search" options={{ title: 'Busca' }} />
      <Tabs.Screen name="new" options={{ title: 'Novo' }} />
      <Tabs.Screen name="discover" options={{ title: 'Descobrir' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
      <Tabs.Screen name="LoginScreen" options={{ href: null }} />
      <Tabs.Screen name="OnboardingScreen" options={{ href: null }} />
    </Tabs>
  );
}
