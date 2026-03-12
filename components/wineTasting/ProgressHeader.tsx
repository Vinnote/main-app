import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import type { TastingStep } from '@/src/app/hooks/useWineTasting';

const WINE = '#8B1A2B';
const STEP_LABELS = ['Identificação', 'Visual', 'Olfativa', 'Gustativa'];

interface ProgressHeaderProps {
  currentStep: TastingStep;
  onBack: () => void;
}

function ProgressBar({ currentStep }: { currentStep: TastingStep }) {
  return (
    <HStack className="px-5 gap-1.5 mt-1">
      {STEP_LABELS.map((label, i) => {
        const isActive = i < currentStep;
        const isCurrent = i === currentStep - 1;
        return (
          <View key={label} style={{ flex: 1 }}>
            <View
              style={{
                height: 3,
                borderRadius: 2,
                backgroundColor: '#E5E7EB',
                overflow: 'hidden',
              }}
            >
              <AnimatedBar active={isActive} />
            </View>
            {isCurrent && (
              <Text
                style={{
                  color: WINE,
                  fontSize: 10,
                  fontWeight: '700',
                  marginTop: 4,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </Text>
            )}
          </View>
        );
      })}
    </HStack>
  );
}

function AnimatedBar({ active }: { active: boolean }) {
  const style = useAnimatedStyle(() => ({
    width: withTiming(active ? '100%' : '0%', { duration: 400 }),
    height: 3,
    backgroundColor: WINE,
    borderRadius: 2,
  }));
  return <Animated.View style={style} />;
}

export default function ProgressHeader({ currentStep, onBack }: ProgressHeaderProps) {
  return (
    <View>
      <HStack className="px-5 py-3 items-center justify-between">
        <TouchableOpacity onPress={onBack} hitSlop={12}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '500' }}>
            Progresso da degustação
          </Text>
          <Text style={{ fontSize: 12, color: WINE, fontWeight: '700', marginTop: 2 }}>
            Passo {currentStep} de 4
          </Text>
        </View>
        <View style={{ width: 24 }} />
      </HStack>
      <ProgressBar currentStep={currentStep} />
    </View>
  );
}
