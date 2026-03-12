import React from 'react';
import { View, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from 'lucide-react-native';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { ProgressHeader, StepFooter, HueSlider, ClaritySelector, SegmentedControl } from '@/components/wineTasting';
import { useWineTasting } from '@/src/app/hooks/useWineTasting';
import { VisualStepSchema, type VisualStep } from '@/src/app/types/wineTasting';

const VISCOSITY_OPTIONS = [
  { label: 'Baixa', value: 'low' },
  { label: 'Média', value: 'medium' },
  { label: 'Alta', value: 'high' },
];

interface VisualAnalysisScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function VisualAnalysisScreen({ onNext, onBack }: VisualAnalysisScreenProps) {
  const { visual, setVisual, setCurrentStep } = useWineTasting();

  const {
    control,
    handleSubmit,
  } = useForm<VisualStep>({
    resolver: zodResolver(VisualStepSchema),
    defaultValues: {
      hue: visual.hue ?? 70,
      clarity: visual.clarity ?? 'clear',
      viscosity: visual.viscosity ?? 'medium',
    },
  });

  const onSubmit = (data: VisualStep) => {
    setVisual(data);
    setCurrentStep(3);
    onNext();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ProgressHeader currentStep={2} onBack={onBack} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Heading size="2xl" className="text-gray-900 mb-1">
          Análise Visual
        </Heading>
        <Text className="text-gray-500 mb-6" size="md">
          Incline a taça contra um fundo branco.{'\n'}Observe a tonalidade e intensidade do vinho.
        </Text>

        {/* Hue */}
        <Controller
          control={control}
          name="hue"
          render={({ field: { value, onChange } }) => (
            <HueSlider value={value} onChange={onChange} />
          )}
        />

        <View style={{ height: 24 }} />

        {/* Clarity */}
        <Controller
          control={control}
          name="clarity"
          render={({ field: { value, onChange } }) => (
            <ClaritySelector value={value} onChange={onChange} />
          )}
        />

        <View style={{ height: 24 }} />

        {/* Viscosity */}
        <HStack className="items-center gap-1.5 mb-3">
          <Heading size="lg" className="text-gray-900">
            Viscosidade
          </Heading>
          <Info size={16} color="#9CA3AF" />
        </HStack>
        <Controller
          control={control}
          name="viscosity"
          render={({ field: { value, onChange } }) => (
            <SegmentedControl options={VISCOSITY_OPTIONS} value={value} onSelect={onChange} />
          )}
        />

        <View style={{ height: 24 }} />
      </ScrollView>

      <StepFooter label="Próximo: Análise Olfativa" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
