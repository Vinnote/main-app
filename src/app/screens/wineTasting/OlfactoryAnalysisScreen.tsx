import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react-native';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { ProgressHeader, StepFooter, SegmentedControl, AromaSelectorModal } from '@/components/wineTasting';
import { useWineTasting } from '@/src/app/hooks/useWineTasting';
import { OlfactoryStepSchema, type OlfactoryStep, type SelectedAroma } from '@/src/app/types/wineTasting';

const WINE = '#8B1A2B';
const WINE_LIGHT = '#F5E6E9';

const INTENSITY_OPTIONS = [
  { label: 'Baixa', value: 'baixa' },
  { label: 'Média', value: 'media' },
  { label: 'Pronunciada', value: 'pronunciada' },
];

const AGE_STATE_OPTIONS = [
  { label: 'Jovem', value: 'jovem' },
  { label: 'Em evolução', value: 'em_evolucao' },
  { label: 'Evoluído', value: 'evoluido' },
];

interface OlfactoryAnalysisScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function OlfactoryAnalysisScreen({ onNext, onBack }: OlfactoryAnalysisScreenProps) {
  const { olfactory, setOlfactory, setCurrentStep } = useWineTasting();
  const [aromaModalVisible, setAromaModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OlfactoryStep>({
    resolver: zodResolver(OlfactoryStepSchema),
    defaultValues: {
      aromaIntensity: olfactory.aromaIntensity ?? 'media',
      wineAgeState: olfactory.wineAgeState ?? 'jovem',
      selectedAromas: olfactory.selectedAromas ?? [],
    },
  });

  const onSubmit = (data: OlfactoryStep) => {
    setOlfactory(data);
    setCurrentStep(4);
    onNext();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ProgressHeader currentStep={3} onBack={onBack} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Heading size="2xl" className="text-gray-900 mb-1">
          Análise Olfativa
        </Heading>
        <Text className="text-gray-500 mb-6" size="md">
          Gire suavemente a taça e aproxime o nariz.{'\n'}Identifique os aromas predominantes.
        </Text>

        {/* Intensidade Aromática */}
        <Heading size="lg" className="text-gray-900 mb-3">
          Intensidade Aromática
        </Heading>
        <Controller
          control={control}
          name="aromaIntensity"
          render={({ field: { value, onChange } }) => (
            <SegmentedControl options={INTENSITY_OPTIONS} value={value} onSelect={onChange} />
          )}
        />

        <View style={{ height: 24 }} />

        {/* Estado do Vinho */}
        <Heading size="lg" className="text-gray-900 mb-3">
          Estado do Vinho
        </Heading>
        <Controller
          control={control}
          name="wineAgeState"
          render={({ field: { value, onChange } }) => (
            <SegmentedControl options={AGE_STATE_OPTIONS} value={value} onSelect={onChange} />
          )}
        />

        <View style={{ height: 24 }} />

        {/* Aromas */}
        <HStack className="justify-between items-center mb-3">
          <Heading size="lg" className="text-gray-900">
            Aromas
          </Heading>
          <Controller
            control={control}
            name="selectedAromas"
            render={({ field: { value } }) => (
              <View
                style={{
                  backgroundColor: WINE_LIGHT,
                  borderRadius: 12,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                }}
              >
                <Text style={{ color: WINE, fontWeight: '700', fontSize: 12 }}>
                  {value.length}/6
                </Text>
              </View>
            )}
          />
        </HStack>

        <Controller
          control={control}
          name="selectedAromas"
          render={({ field: { value, onChange } }) => (
            <>
              {value.length > 0 && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                  {value.map((a: SelectedAroma) => (
                    <View
                      key={a.aroma}
                      style={{
                        backgroundColor: WINE_LIGHT,
                        borderRadius: 20,
                        paddingHorizontal: 14,
                        paddingVertical: 8,
                        borderWidth: 1,
                        borderColor: WINE,
                      }}
                    >
                      <Text style={{ color: WINE, fontWeight: '600', fontSize: 13 }}>
                        {a.aroma}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              <TouchableOpacity
                onPress={() => setAromaModalVisible(true)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  paddingVertical: 14,
                  borderRadius: 28,
                  borderWidth: 2,
                  borderColor: '#E5E7EB',
                  borderStyle: 'dashed',
                }}
              >
                <Plus size={20} color={WINE} />
                <Text style={{ color: WINE, fontWeight: '600', fontSize: 15 }}>
                  Selecionar Aromas
                </Text>
              </TouchableOpacity>

              <AromaSelectorModal
                visible={aromaModalVisible}
                onClose={() => setAromaModalVisible(false)}
                selected={value}
                onChangeSelection={onChange}
              />
            </>
          )}
        />
        {errors.selectedAromas && (
          <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>
            {errors.selectedAromas.message}
          </Text>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>

      <StepFooter label="Próximo: Análise Gustativa" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
