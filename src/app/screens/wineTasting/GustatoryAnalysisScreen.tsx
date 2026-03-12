import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { ProgressHeader, StepFooter, SegmentedControl, TasteSlider, ChipSelector } from '@/components/wineTasting';
import { useWineTasting } from '@/src/app/hooks/useWineTasting';
import { GustatoryStepSchema, type GustatoryStep } from '@/src/app/types/wineTasting';

const RESIDUAL_SUGAR_OPTIONS = [
  { label: 'Nature', value: 'nature' },
  { label: 'Extra Seco', value: 'extra_seco' },
  { label: 'Seco', value: 'seco' },
  { label: 'Meio-Seco', value: 'meio_seco' },
  { label: 'Meio-Doce', value: 'meio_doce' },
  { label: 'Doce', value: 'doce' },
  { label: 'Licoroso', value: 'licoroso' },
];

const ACIDITY_OPTIONS = [
  { label: 'Baixa', value: 'baixa' },
  { label: 'Média (−)', value: 'media_menos' },
  { label: 'Média', value: 'media' },
  { label: 'Média (+)', value: 'media_mais' },
  { label: 'Alta', value: 'alta' },
];

const TANNINS_LEVEL_OPTIONS = [
  { label: 'Baixos', value: 'baixos' },
  { label: 'Médios', value: 'medios' },
  { label: 'Altos', value: 'altos' },
];

const TANNIN_QUALITY_OPTIONS = [
  { label: 'Finos', value: 'finos' },
  { label: 'Sedosos', value: 'sedosos' },
  { label: 'Maduros', value: 'maduros' },
  { label: 'Firmes', value: 'firmes' },
  { label: 'Rústicos', value: 'rusticos' },
];

const ALCOHOL_OPTIONS = [
  { label: 'Baixo', value: 'baixo' },
  { label: 'Médio', value: 'medio' },
  { label: 'Alto', value: 'alto' },
];

const BODY_OPTIONS = [
  { label: 'Leve', value: 'leve' },
  { label: 'Médio', value: 'medio' },
  { label: 'Encorpado', value: 'encorpado' },
];

const FLAVOR_INTENSITY_OPTIONS = [
  { label: 'Baixa', value: 'baixa' },
  { label: 'Média', value: 'media' },
  { label: 'Pronunciada', value: 'pronunciada' },
];

interface GustatoryAnalysisScreenProps {
  onFinish: () => void;
  onBack: () => void;
}

export default function GustatoryAnalysisScreen({ onFinish, onBack }: GustatoryAnalysisScreenProps) {
  const { gustatory, setGustatory, getFullReview } = useWineTasting();

  const {
    control,
    handleSubmit,
  } = useForm<GustatoryStep>({
    resolver: zodResolver(GustatoryStepSchema),
    defaultValues: {
      residualSugar: gustatory.residualSugar ?? 'seco',
      acidity: gustatory.acidity ?? 'media',
      tanninsLevel: gustatory.tanninsLevel ?? 'medios',
      tanninQuality: gustatory.tanninQuality ?? 'maduros',
      alcohol: gustatory.alcohol ?? 'medio',
      body: gustatory.body ?? 'medio',
      flavorIntensity: gustatory.flavorIntensity ?? 'media',
      persistence: gustatory.persistence ?? 10,
    },
  });

  const onSubmit = (data: GustatoryStep) => {
    setGustatory(data);
    // At this point the full review is ready
    // Future: call wineTastingApi.createWineReview(review)
    const review = getFullReview();
    if (__DEV__) {
      console.log('[WineTasting] Review complete:', JSON.stringify(review, null, 2));
    }
    onFinish();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ProgressHeader currentStep={4} onBack={onBack} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Heading size="2xl" className="text-gray-900 mb-1">
          Análise Gustativa
        </Heading>
        <Text className="text-gray-500 mb-6" size="md">
          Tome um pequeno gole e deixe o vinho percorrer toda a boca.
        </Text>

        {/* Açúcar Residual */}
        <Heading size="lg" className="text-gray-900 mb-3">
          Açúcar Residual
        </Heading>
        <Controller
          control={control}
          name="residualSugar"
          render={({ field: { value, onChange } }) => (
            <ChipSelector
              options={RESIDUAL_SUGAR_OPTIONS}
              selected={[value]}
              onToggle={onChange}
            />
          )}
        />

        <View style={{ height: 24 }} />

        {/* Acidez */}
        <Heading size="lg" className="text-gray-900 mb-3">
          Acidez
        </Heading>
        <Controller
          control={control}
          name="acidity"
          render={({ field: { value, onChange } }) => (
            <ChipSelector
              options={ACIDITY_OPTIONS}
              selected={[value]}
              onToggle={onChange}
            />
          )}
        />

        <View style={{ height: 24 }} />

        {/* Taninos — Nível */}
        <Heading size="lg" className="text-gray-900 mb-3">
          Taninos
        </Heading>
        <Controller
          control={control}
          name="tanninsLevel"
          render={({ field: { value, onChange } }) => (
            <SegmentedControl
              options={TANNINS_LEVEL_OPTIONS}
              value={value}
              onSelect={onChange}
            />
          )}
        />

        <View style={{ height: 16 }} />

        {/* Taninos — Qualidade */}
        <Text style={{ fontSize: 14, color: '#6B7280', fontWeight: '500', marginBottom: 8 }}>
          Qualidade dos taninos
        </Text>
        <Controller
          control={control}
          name="tanninQuality"
          render={({ field: { value, onChange } }) => (
            <ChipSelector
              options={TANNIN_QUALITY_OPTIONS}
              selected={[value]}
              onToggle={onChange}
            />
          )}
        />

        <View style={{ height: 24 }} />

        {/* Álcool */}
        <Heading size="lg" className="text-gray-900 mb-3">
          Álcool
        </Heading>
        <Controller
          control={control}
          name="alcohol"
          render={({ field: { value, onChange } }) => (
            <SegmentedControl
              options={ALCOHOL_OPTIONS}
              value={value}
              onSelect={onChange}
            />
          )}
        />

        <View style={{ height: 24 }} />

        {/* Corpo */}
        <Heading size="lg" className="text-gray-900 mb-3">
          Corpo
        </Heading>
        <Controller
          control={control}
          name="body"
          render={({ field: { value, onChange } }) => (
            <SegmentedControl
              options={BODY_OPTIONS}
              value={value}
              onSelect={onChange}
            />
          )}
        />

        <View style={{ height: 24 }} />

        {/* Intensidade de Sabor */}
        <Heading size="lg" className="text-gray-900 mb-3">
          Intensidade de Sabor
        </Heading>
        <Controller
          control={control}
          name="flavorIntensity"
          render={({ field: { value, onChange } }) => (
            <SegmentedControl
              options={FLAVOR_INTENSITY_OPTIONS}
              value={value}
              onSelect={onChange}
            />
          )}
        />

        <View style={{ height: 24 }} />

        {/* Persistência */}
        <Controller
          control={control}
          name="persistence"
          render={({ field: { value, onChange } }) => (
            <TasteSlider
              label="Persistência"
              value={value}
              onChange={onChange}
              min={0}
              max={45}
              unit="s"
            />
          )}
        />

        <View style={{ height: 24 }} />
      </ScrollView>

      <StepFooter
        label="Finalizar Degustação"
        onPress={handleSubmit(onSubmit)}
        isLastStep
      />
    </View>
  );
}
