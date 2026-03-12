import React, { useCallback, useState } from 'react';
import { View, GestureResponderEvent, LayoutChangeEvent } from 'react-native';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';

const WINE = '#8B1A2B';
const WINE_LIGHT = '#F5E6E9';

interface TasteSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}

export default function TasteSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 45,
  unit = 's',
}: TasteSliderProps) {
  const [trackWidth, setTrackWidth] = useState(0);
  const ratio = max > min ? (value - min) / (max - min) : 0;

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  }, []);

  const handleTouch = useCallback(
    (e: GestureResponderEvent) => {
      if (trackWidth <= 0) return;
      const x = e.nativeEvent.locationX;
      const r = Math.min(1, Math.max(0, x / trackWidth));
      onChange(Math.round(r * (max - min) + min));
    },
    [trackWidth, onChange, min, max],
  );

  const displayValue = value >= max ? `${max}+` : `${value}`;

  return (
    <View>
      <HStack className="justify-between items-center mb-3">
        <Heading size="lg" className="text-gray-900">
          {label}
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
            {displayValue}
            {unit}
          </Text>
        </View>
      </HStack>

      <View
        onLayout={onLayout}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={handleTouch}
        onResponderMove={handleTouch}
        style={{
          height: 44,
          justifyContent: 'center',
        }}
      >
        {/* Track */}
        <View
          style={{
            height: 6,
            borderRadius: 3,
            backgroundColor: '#E5E7EB',
          }}
        >
          <View
            style={{
              height: 6,
              borderRadius: 3,
              backgroundColor: WINE,
              width: `${ratio * 100}%`,
            }}
          />
        </View>
        {/* Thumb */}
        <View
          style={{
            position: 'absolute',
            left: ratio * (trackWidth > 24 ? trackWidth - 24 : 0),
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: WINE,
            borderWidth: 3,
            borderColor: '#FFF',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 3,
          }}
        />
      </View>
      <HStack className="justify-between mt-1">
        <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '600' }}>
          {min}
          {unit}
        </Text>
        <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '600' }}>
          {max}+{unit}
        </Text>
      </HStack>
    </View>
  );
}
