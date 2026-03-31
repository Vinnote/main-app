if (__DEV__) {
  require("./ReactotronConfig");
}
import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';

import { tokenStorage } from '../infrastructure/tokenStorage';
import { useAuth } from './hooks/useAuth';

// Import screens
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';

type StartupRoute = 'onboarding' | 'login' | 'feed';

export default function Index() {
  const { restoreSession } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [startupRoute, setStartupRoute] = useState<StartupRoute>('login');

  useEffect(() => {
    let isMounted = true;
    let splashTimeout: ReturnType<typeof setTimeout> | undefined;

    async function checkStartup() {
      try {
        const onboardingDone = await tokenStorage.isOnboardingDone();

        if (!onboardingDone) {
          if (isMounted) {
            setStartupRoute('onboarding');
          }
        } else {
          const rememberMe = await tokenStorage.getRememberMe();

          if (rememberMe) {
            const sessionRestored = await restoreSession();

            if (isMounted) {
              setStartupRoute(sessionRestored ? 'feed' : 'login');
            }
          } else if (isMounted) {
            setStartupRoute('login');
          }
        }
      } catch (error) {
        console.error('Error during startup check:', error);
        if (isMounted) {
          setStartupRoute('login');
        }
      } finally {
        // Simula o tempo da splash screen
        splashTimeout = setTimeout(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        }, 3000);
      }
    }

    void checkStartup();

    return () => {
      isMounted = false;
      if (splashTimeout) {
        clearTimeout(splashTimeout);
      }
    };
  }, [restoreSession]);

  if (isLoading) {
    return null;
  }

  // Mostra onboarding se não foi completado
  if (startupRoute === 'onboarding') {
    return <OnboardingScreen />;
  }

  if (startupRoute === 'feed') {
    return <Redirect href="/screens/feed" />;
  }

  // Mostra tela de login após onboarding
  return <LoginScreen />;
}
