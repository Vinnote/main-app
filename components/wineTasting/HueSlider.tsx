import React, { useCallback, useState } from 'react';
import { View, GestureResponderEvent, LayoutChangeEvent } from 'react-native';
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Rect,
} from 'react-native-svg';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';

const WINE = '#8B1A2B';
const WINE_LIGHT = '#F5E6E9';

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

const HUE_LABELS: Record<number, string> = {
  0: 'Palha Claro',
  10: 'Palha',
  20: 'Limão',
  30: 'Dourado',
  40: 'Âmbar',
  50: 'Rosa Claro',
  60: 'Rosé',
  70: 'Salmão',
  80: 'Vermelho Rubi',
  90: 'Granada',
  100: 'Granada Profundo',
};

function getHueLabel(value: number): string {
  const keys = Object.keys(HUE_LABELS).map(Number).sort((a, b) => a - b);
  let closest = keys[0];
  for (const k of keys) {
    if (Math.abs(value - k) < Math.abs(value - closest)) {
      closest = k;
    }
  }
  return HUE_LABELS[closest];
}

interface HueSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function HueSlider({ value, onChange }: HueSliderProps) {
  const [sliderWidth, setSliderWidth] = useState(0);
  const position = value / 100;

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setSliderWidth(e.nativeEvent.layout.width);
  }, []);

  const handleTouch = useCallback(
    (e: GestureResponderEvent) => {
      if (sliderWidth <= 0) return;
      const x = e.nativeEvent.locationX;
      const ratio = Math.min(1, Math.max(0, x / sliderWidth));
      onChange(Math.round(ratio * 100));
    },
    [sliderWidth, onChange],
  );

  const label = getHueLabel(value);

  return (
    <View>
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
          <Text style={{ color: WINE, fontWeight: '600', fontSize: 13 }}>{label}</Text>
        </View>
      </HStack>

      <View
        onLayout={onLayout}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={handleTouch}
        onResponderMove={handleTouch}
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
            left: position * (sliderWidth > 28 ? sliderWidth - 28 : 0),
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
      </View>
      <HStack className="justify-between mt-2">
        <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '600', letterSpacing: 0.5 }}>
          PALHA CLARO
        </Text>
        <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '600', letterSpacing: 0.5 }}>
          GRANADA PROFUNDO
        </Text>
      </HStack>
    </View>
  );
}
