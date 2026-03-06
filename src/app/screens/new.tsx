import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  GestureResponderEvent,
  LayoutChangeEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Rect,
} from 'react-native-svg';
import { X, HelpCircle, Info, ArrowRight, Check } from 'lucide-react-native';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { useRouter } from 'expo-router';

const WINE = '#8B1A2B';
const WINE_LIGHT = '#F5E6E9';

const HUE_LABELS: Record<number, string> = {
  0: 'Palha Claro',
  1: 'Limão',
  2: 'Dourado',
  3: 'Âmbar',
  4: 'Rosa Claro',
  5: 'Rosé',
  6: 'Salmão',
  7: 'Vermelho Rubi',
  8: 'Granada',
  9: 'Granada Profundo',
};

const CLARITY_OPTIONS = [
  { label: 'Límpido', value: 'clear' },
  { label: 'Turvo', value: 'hazy' },
  { label: 'Brilhante', value: 'brilliant' },
  { label: 'Opaco', value: 'dull' },
];

const VISCOSITY_OPTIONS = [
  { label: 'Baixa', value: 'low' },
  { label: 'Média', value: 'medium' },
  { label: 'Alta', value: 'high' },
];

const GRADIENT_STOPS = [
  { offset: '0%', color: '#F5E6C8' },
  { offset: '15%', color: '#E8D5A0' },
  { offset: '30%', color: '#D4A870' },
  { offset: '42%', color: '#D4918A' },
  { offset: '55%', color: '#C87080' },
  { offset: '70%', color: '#A83050' },
  { offset: '85%', color: '#8B1A2B' },
  { offset: '100%', color: '#5C0A1A' },
];

const STEP_LABELS = ['VISUAL', 'OLFATIVO', 'GUSTATIVO', 'CONCLUSÃO'];

export default function NewTastingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [huePosition, setHuePosition] = useState(0.7);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [selectedClarity, setSelectedClarity] = useState('clear');
  const [selectedViscosity, setSelectedViscosity] = useState('medium');

  const hueIndex = Math.min(9, Math.max(0, Math.round(huePosition * 9)));
  const currentHueLabel = HUE_LABELS[hueIndex];

  const onSliderLayout = useCallback((e: LayoutChangeEvent) => {
    setSliderWidth(e.nativeEvent.layout.width);
  }, []);

  const handleSliderTouch = useCallback(
    (e: GestureResponderEvent) => {
      if (sliderWidth <= 0) return;
      const x = e.nativeEvent.locationX;
      setHuePosition(Math.min(1, Math.max(0, x / sliderWidth)));
    },
    [sliderWidth],
  );

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: '#FFF' }}>
      {/* Header */}
      <HStack className="px-4 py-3 items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <X size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-sm text-gray-500" style={{ fontWeight: '500' }}>
          ETAPA 1 DE 4
        </Text>
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: WINE,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <HelpCircle size={16} color="#FFF" />
        </View>
      </HStack>

      {/* Progress Bar */}
      <HStack className="px-4 gap-1.5">
        {STEP_LABELS.map((label, i) => (
          <View key={label} style={{ flex: 1 }}>
            <View
              style={{
                height: 3,
                borderRadius: 2,
                backgroundColor: i === 0 ? WINE : '#E5E7EB',
              }}
            />
            {i === 0 && (
              <Text
                style={{
                  color: WINE,
                  fontSize: 11,
                  fontWeight: '700',
                  marginTop: 4,
                }}
              >
                {label}
              </Text>
            )}
          </View>
        ))}
      </HStack>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Heading size="2xl" className="text-gray-900 mb-1">
          Análise Visual
        </Heading>
        <Text className="text-gray-500 mb-6" size="md">
          Incline a taça contra um fundo branco.{'\n'}Observe a tonalidade e intensidade do
          vinho.
        </Text>

        {/* Hue */}
        <HStack className="justify-between items-center mb-3">
          <Heading size="lg" className="text-gray-900">
            Tonalidade
          </Heading>
          <View
            style={{
              backgroundColor: WINE_LIGHT,
              borderRadius: 16,
              paddingHorizontal: 12,
              paddingVertical: 5,
              borderWidth: 1,
              borderColor: WINE,
            }}
          >
            <Text style={{ color: WINE, fontWeight: '600', fontSize: 13 }}>
              {currentHueLabel}
            </Text>
          </View>
        </HStack>

        {/* Gradient Slider */}
        <View
          onLayout={onSliderLayout}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
          onResponderGrant={handleSliderTouch}
          onResponderMove={handleSliderTouch}
          style={{
            height: 56,
            borderRadius: 28,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Svg width="100%" height="56" style={{ position: 'absolute', top: 0, left: 0 }}>
            <Defs>
              <SvgLinearGradient id="hueGrad" x1="0" y1="0" x2="1" y2="0">
                {GRADIENT_STOPS.map((s) => (
                  <Stop key={s.offset} offset={s.offset} stopColor={s.color} />
                ))}
              </SvgLinearGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="56" rx="28" ry="28" fill="url(#hueGrad)" />
          </Svg>
          {/* Thumb */}
          <View
            style={{
              position: 'absolute',
              left: huePosition * (sliderWidth > 28 ? sliderWidth - 28 : 0),
              top: 14,
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: '#FFF',
              borderWidth: 3,
              borderColor: 'rgba(255,255,255,0.9)',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 4,
            }}
          />
          {/* RED label */}
          <View style={{ position: 'absolute', right: 16, top: 20 }}>
            <Text
              style={{ color: '#FFF', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 }}
            >
              RED
            </Text>
          </View>
        </View>
        <HStack className="justify-between mt-2 mb-4">
          <Text
            style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '600', letterSpacing: 0.5 }}
          >
            PALHA CLARO
          </Text>
          <Text
            style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '600', letterSpacing: 0.5 }}
          >
            GRANADA PROFUNDO
          </Text>
        </HStack>

        {/* Clarity */}
        <Heading size="lg" className="text-gray-900 mt-2 mb-3">
          Limpidez
        </Heading>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {CLARITY_OPTIONS.map((option) => {
            const selected = selectedClarity === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                activeOpacity={0.7}
                onPress={() => setSelectedClarity(option.value)}
                style={{
                  flexBasis: '47%',
                  flexGrow: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 14,
                  paddingHorizontal: 16,
                  borderRadius: 28,
                  backgroundColor: selected ? WINE_LIGHT : '#F3F4F6',
                  borderWidth: selected ? 1.5 : 0,
                  borderColor: selected ? WINE : 'transparent',
                }}
              >
                <Text
                  style={{
                    color: selected ? WINE : '#6B7280',
                    fontWeight: '600',
                    fontSize: 15,
                  }}
                >
                  {option.label}
                </Text>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    borderWidth: selected ? 0 : 2,
                    borderColor: '#D1D5DB',
                    backgroundColor: selected ? WINE : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selected && <Check size={14} color="#FFF" strokeWidth={3} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Viscosity */}
        <HStack className="items-center gap-1.5 mt-6 mb-3">
          <Heading size="lg" className="text-gray-900">
            Viscosidade
          </Heading>
          <Info size={16} color="#9CA3AF" />
        </HStack>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#F3F4F6',
            borderRadius: 28,
            padding: 4,
          }}
        >
          {VISCOSITY_OPTIONS.map((option) => {
            const selected = selectedViscosity === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                activeOpacity={0.7}
                onPress={() => setSelectedViscosity(option.value)}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderRadius: 24,
                  backgroundColor: selected ? '#FFF' : 'transparent',
                  ...(selected
                    ? {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        elevation: 2,
                      }
                    : {}),
                }}
              >
                <Text
                  style={{
                    color: selected ? '#1F2937' : '#6B7280',
                    fontWeight: selected ? '600' : '400',
                    fontSize: 15,
                  }}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: insets.bottom + 12,
          paddingTop: 12,
          backgroundColor: '#FFF',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          style={{
            backgroundColor: WINE,
            borderRadius: 28,
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 16 }}>
            Próximo: Análise Olfativa
          </Text>
          <ArrowRight size={18} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
