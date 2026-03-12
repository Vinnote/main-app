import React, { createContext, useContext, useState, useCallback } from 'react';
import type {
  WineTastingReview,
  Identification,
  VisualStep,
  OlfactoryStep,
  GustatoryStep,
} from '@/src/app/types/wineTasting';

export type TastingStep = 1 | 2 | 3 | 4;

interface WineTastingContextValue {
  currentStep: TastingStep;
  setCurrentStep: (step: TastingStep) => void;
  identification: Partial<Identification>;
  setIdentification: (data: Identification) => void;
  visual: Partial<VisualStep>;
  setVisual: (data: VisualStep) => void;
  olfactory: Partial<OlfactoryStep>;
  setOlfactory: (data: OlfactoryStep) => void;
  gustatory: Partial<GustatoryStep>;
  setGustatory: (data: GustatoryStep) => void;
  getFullReview: () => WineTastingReview | null;
  reset: () => void;
}

const WineTastingContext = createContext<WineTastingContextValue | null>(null);

export function WineTastingProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState<TastingStep>(1);
  const [identification, setIdentification] = useState<Partial<Identification>>({});
  const [visual, setVisual] = useState<Partial<VisualStep>>({});
  const [olfactory, setOlfactory] = useState<Partial<OlfactoryStep>>({});
  const [gustatory, setGustatory] = useState<Partial<GustatoryStep>>({});

  const getFullReview = useCallback((): WineTastingReview | null => {
    if (
      !identification.wineStyle ||
      !visual.hue === undefined ||
      !olfactory.aromaIntensity ||
      !gustatory.residualSugar
    ) {
      return null;
    }
    return {
      identification: identification as Identification,
      visual: visual as VisualStep,
      olfactory: olfactory as OlfactoryStep,
      gustatory: gustatory as GustatoryStep,
    };
  }, [identification, visual, olfactory, gustatory]);

  const reset = useCallback(() => {
    setCurrentStep(1);
    setIdentification({});
    setVisual({});
    setOlfactory({});
    setGustatory({});
  }, []);

  return (
    <WineTastingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        identification,
        setIdentification,
        visual,
        setVisual,
        olfactory,
        setOlfactory,
        gustatory,
        setGustatory,
        getFullReview,
        reset,
      }}
    >
      {children}
    </WineTastingContext.Provider>
  );
}

export function useWineTasting() {
  const ctx = useContext(WineTastingContext);
  if (!ctx) {
    throw new Error('useWineTasting must be used within WineTastingProvider');
  }
  return ctx;
}
