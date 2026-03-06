import { Tabs, Redirect, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import BottomTabBar from '@/src/app/navigation/BottomTabBar';
import { tokenStorage } from '@/src/infrastructure/tokenStorage';

const PROTECTED_ROUTES = ['feed', 'search', 'new', 'discover', 'profile'];
const PUBLIC_ROUTES = ['LoginScreen', 'RegisterScreen', 'OnboardingScreen'];

export default function TabsLayout() {
  const segments = useSegments();
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadSessionState() {
      const token = await tokenStorage.getToken();

      if (isMounted) {
        setHasToken(Boolean(token));
      }
    }

    loadSessionState();

    return () => {
      isMounted = false;
    };
  }, [segments]);

  const currentRoute = typeof segments[segments.length - 1] === 'string' ? segments[segments.length - 1] : '';

  if (hasToken === null) {
    return null;
  }

  if (!hasToken && PROTECTED_ROUTES.includes(currentRoute)) {
    return <Redirect href="/" />;
  }

  if (hasToken && PUBLIC_ROUTES.includes(currentRoute)) {
    return <Redirect href="/screens/feed" />;
  }

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
      <Tabs.Screen name="RegisterScreen" options={{ href: null }} />
      <Tabs.Screen name="OnboardingScreen" options={{ href: null }} />
    </Tabs>
  );
}
