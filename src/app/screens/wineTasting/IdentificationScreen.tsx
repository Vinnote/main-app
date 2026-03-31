import React from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { useForm, Controller, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { ProgressHeader, StepFooter, SegmentedControl, ChipSelector } from '@/components/wineTasting';
import { useWineTasting } from '@/src/app/hooks/useWineTasting';
import { IdentificationSchema, type Identification, type VinificationMethod } from '@/src/app/types/wineTasting';

const WINE = '#8B1A2B';

const WINE_STYLE_OPTIONS = [
  { label: 'Tranquilo', value: 'tranquilo' },
  { label: 'Espumante', value: 'espumante' },
  { label: 'Fortificado', value: 'fortificado' },
  { label: 'Laranja', value: 'laranja' },
];

const WINE_COLOR_OPTIONS = [
  { label: 'Branco', value: 'branco' },
  { label: 'Rosé', value: 'rosé' },
  { label: 'Tinto', value: 'tinto' },
  { label: 'Laranja', value: 'laranja' },
];

const VINIFICATION_OPTIONS = [
  { label: 'Inox', value: 'inox' },
  { label: 'Madeira', value: 'madeira' },
  { label: 'Sur Lies', value: 'sur_lies' },
  { label: 'Malolática', value: 'malolatica' },
  { label: 'Ânfora', value: 'anfora' },
  { label: 'Maceração Carbônica', value: 'maceracao_carbonica' },
  { label: 'Skin Contact', value: 'skin_contact' },
];

interface IdentificationScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function IdentificationScreen({ onNext, onBack }: IdentificationScreenProps) {
  const { identification, setIdentification, setCurrentStep } = useWineTasting();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Identification>({
    resolver: zodResolver(IdentificationSchema) as Resolver<Identification>,
    defaultValues: {
      wineStyle: identification.wineStyle ?? 'tranquilo',
      wineColor: identification.wineColor ?? 'tinto',
      grapeVarieties: identification.grapeVarieties ?? [],
      region: identification.region ?? '',
      country: identification.country ?? '',
      vintage: identification.vintage,
      producer: identification.producer ?? '',
      alcoholContent: identification.alcoholContent,
      vinificationMethods: identification.vinificationMethods ?? [],
    },
  });

  const onSubmit = (data: Identification) => {
    setIdentification(data);
    setCurrentStep(2);
    onNext();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ProgressHeader currentStep={1} onBack={onBack} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Heading size="2xl" className="text-gray-900 mb-1">
          Identificação do Vinho
        </Heading>
        <Text className="text-gray-500 mb-6" size="md">
          Insira as informações básicas do vinho que você está degustando. Todas estas informações podem ser encontradas no rótulo da garrafa.
        </Text>

        {/* Tipo de vinho */}
        <SectionLabel label="Tipo de vinho" />
        <Controller
          control={control}
          name="wineStyle"
          render={({ field: { value, onChange } }) => (
            <SegmentedControl options={WINE_STYLE_OPTIONS} value={value} onSelect={onChange} variant="grid" />
          )}
        />

        {/* Cor */}
        <SectionLabel label="Cor" />
        <Controller
          control={control}
          name="wineColor"
          render={({ field: { value, onChange } }) => (
            <SegmentedControl options={WINE_COLOR_OPTIONS} value={value} onSelect={onChange} variant="grid" />
          )}
        />

        {/* Castas */}
        <SectionLabel label="Casta(s)" />
        <Controller
          control={control}
          name="grapeVarieties"
          render={({ field: { value, onChange } }) => (
            <TagInput
              placeholder="Ex: Cabernet Sauvignon"
              tags={value}
              onChangeTags={onChange}
            />
          )}
        />
        {errors.grapeVarieties && (
          <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>
            {errors.grapeVarieties.message}
          </Text>
        )}

        {/* Região */}
        <SectionLabel label="Região / Denominação" />
        <Controller
          control={control}
          name="region"
          render={({ field: { value, onChange } }) => (
            <StyledInput placeholder="Ex: Douro DOC" value={value} onChangeText={onChange} />
          )}
        />
        {errors.region && <ErrorText message={errors.region.message} />}

        {/* País */}
        <SectionLabel label="País" />
        <Controller
          control={control}
          name="country"
          render={({ field: { value, onChange } }) => (
            <StyledInput placeholder="Ex: Portugal" value={value} onChangeText={onChange} />
          )}
        />
        {errors.country && <ErrorText message={errors.country.message} />}

        {/* Safra */}
        <SectionLabel label="Safra" />
        <Controller
          control={control}
          name="vintage"
          render={({ field: { value, onChange } }) => (
            <StyledInput
              placeholder="Ex: 2020"
              value={value?.toString() ?? ''}
              onChangeText={(t) => onChange(t ? Number(t) : undefined)}
              keyboardType="number-pad"
              maxLength={4}
            />
          )}
        />

        {/* Produtor */}
        <SectionLabel label="Produtor" />
        <Controller
          control={control}
          name="producer"
          render={({ field: { value, onChange } }) => (
            <StyledInput placeholder="Ex: Quinta do Crasto" value={value} onChangeText={onChange} />
          )}
        />
        {errors.producer && <ErrorText message={errors.producer.message} />}

        {/* Teor alcoólico */}
        <SectionLabel label="Teor alcoólico (%)" />
        <Controller
          control={control}
          name="alcoholContent"
          render={({ field: { value, onChange } }) => (
            <StyledInput
              placeholder="Ex: 13.5"
              value={value?.toString() ?? ''}
              onChangeText={(t) => onChange(t ? Number(t) : undefined)}
              keyboardType="decimal-pad"
            />
          )}
        />

        {/* Método de vinificação */}
        <SectionLabel label="Método de vinificação" />
        <Controller
          control={control}
          name="vinificationMethods"
          render={({ field: { value, onChange } }) => (
            <ChipSelector
              options={VINIFICATION_OPTIONS}
              selected={value}
              multi
              onToggle={(v) => {
                const method = v as VinificationMethod;
                if (value.includes(method)) {
                  onChange(value.filter((m) => m !== method));
                } else {
                  onChange([...value, method]);
                }
              }}
            />
          )}
        />

        <View style={{ height: 24 }} />
      </ScrollView>

      <StepFooter label="Próximo: Análise Visual" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <Heading size="md" className="text-gray-900 mt-6 mb-3">
      {label}
    </Heading>
  );
}

function StyledInput(props: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      placeholderTextColor="#9CA3AF"
      {...props}
      style={{
        backgroundColor: '#F3F4F6',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: '#1F2937',
      }}
    />
  );
}

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>{message}</Text>
  );
}

function TagInput({
  tags,
  onChangeTags,
  placeholder,
}: {
  tags: string[];
  onChangeTags: (tags: string[]) => void;
  placeholder: string;
}) {
  const [text, setText] = React.useState('');

  const addTag = () => {
    const trimmed = text.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChangeTags([...tags, trimmed]);
    }
    setText('');
  };

  return (
    <View>
      {tags.length > 0 && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
          {tags.map((tag) => (
            <View
              key={tag}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F5E6E9',
                borderRadius: 16,
                paddingHorizontal: 12,
                paddingVertical: 6,
                gap: 6,
                borderWidth: 1,
                borderColor: WINE,
              }}
            >
              <Text style={{ color: WINE, fontWeight: '600', fontSize: 13 }}>{tag}</Text>
              <Text
                onPress={() => onChangeTags(tags.filter((t) => t !== tag))}
                style={{ color: WINE, fontWeight: '700', fontSize: 16, lineHeight: 18 }}
              >
                ×
              </Text>
            </View>
          ))}
        </View>
      )}
      <StyledInput
        placeholder={placeholder}
        value={text}
        onChangeText={setText}
        onSubmitEditing={addTag}
        returnKeyType="done"
      />
    </View>
  );
}
