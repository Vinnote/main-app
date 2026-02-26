if (__DEV__) {
  require("./ReactotronConfig");
}
import React, { useEffect, useState } from 'react';

import { tokenStorage } from '../infrastructure/tokenStorage';

// Import screens
import OnboardingScreen from './(tabs)/OnboardingScreen';
import LoginScreen from './(tabs)/LoginScreen';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    async function checkOnboarding() {
      const onboardingDone = await tokenStorage.isOnboardingDone();
      console.log('Onboarding done:', onboardingDone);
      setShowOnboarding(!onboardingDone);
      
      // Simula o tempo da splash screen
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }

    checkOnboarding();
  }, []);



  console.log('Current state - isLoading:', isLoading, 'showOnboarding:', showOnboarding);

  // Mostra onboarding se não foi completado
  if (showOnboarding) {
    return <OnboardingScreen />;
  }

  // Mostra tela de login após onboarding
  return <LoginScreen />;
}
