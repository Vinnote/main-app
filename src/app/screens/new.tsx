import React, { useCallback } from 'react';
import { View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { WineTastingProvider, useWineTasting } from '@/src/app/hooks/useWineTasting';
import {
  IdentificationScreen,
  VisualAnalysisScreen,
  OlfactoryAnalysisScreen,
  GustatoryAnalysisScreen,
} from '@/src/app/screens/wineTasting';

function CreateWineReviewFlow() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { currentStep, setCurrentStep, reset } = useWineTasting();

  const handleBack = useCallback(() => {
    if (currentStep === 1) {
      Alert.alert(
        'Sair da degustação?',
        'Seu progresso será perdido.',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Sair',
            style: 'destructive',
            onPress: () => {
              reset();
              router.back();
            },
          },
        ],
      );
    } else {
      setCurrentStep((currentStep - 1) as 1 | 2 | 3 | 4);
    }
  }, [currentStep, reset, router, setCurrentStep]);

  const handleNextStep = useCallback(() => {
    // Step increment is handled inside each screen's onSubmit via context
  }, []);

  const handleFinish = useCallback(() => {
    Alert.alert(
      'Degustação concluída!',
      'Sua avaliação foi salva com sucesso.',
      [
        {
          text: 'OK',
          onPress: () => {
            reset();
            router.back();
          },
        },
      ],
    );
  }, [reset, router]);

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: '#FFF' }}>
      {currentStep === 1 && (
        <IdentificationScreen onNext={handleNextStep} onBack={handleBack} />
      )}
      {currentStep === 2 && (
        <VisualAnalysisScreen onNext={handleNextStep} onBack={handleBack} />
      )}
      {currentStep === 3 && (
        <OlfactoryAnalysisScreen onNext={handleNextStep} onBack={handleBack} />
      )}
      {currentStep === 4 && (
        <GustatoryAnalysisScreen onFinish={handleFinish} onBack={handleBack} />
      )}
    </View>
  );
}

export default function NewTastingScreen() {
  return (
    <WineTastingProvider>
      <Animated.View entering={SlideInDown.duration(350).springify()} style={{ flex: 1 }}>
        <CreateWineReviewFlow />
      </Animated.View>
    </WineTastingProvider>
  );
}
