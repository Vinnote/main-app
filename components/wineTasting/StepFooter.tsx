import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ArrowRight, Check } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

const WINE = '#8B1A2B';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface StepFooterProps {
  label: string;
  onPress: () => void;
  isLastStep?: boolean;
  disabled?: boolean;
}

export default function StepFooter({ label, onPress, isLastStep, disabled }: StepFooterProps) {
  const insets = useSafeAreaInsets();

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(disabled ? 0.98 : 1) }],
    opacity: withSpring(disabled ? 0.5 : 1),
  }));

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingBottom: insets.bottom + 12,
        paddingTop: 12,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
      }}
    >
      <AnimatedTouchable
        activeOpacity={0.85}
        onPress={onPress}
        disabled={disabled}
        style={[
          {
            backgroundColor: WINE,
            borderRadius: 28,
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          },
          animStyle,
        ]}
      >
        <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 16 }}>{label}</Text>
        {isLastStep ? (
          <Check size={18} color="#FFF" strokeWidth={2.5} />
        ) : (
          <ArrowRight size={18} color="#FFF" />
        )}
      </AnimatedTouchable>
    </View>
  );
}
