import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';
import { Text } from '@/components/ui/text';

const WINE = '#8B1A2B';
const WINE_LIGHT = '#F5E6E9';

interface ChipSelectorProps {
  options: { label: string; value: string }[];
  selected: string[];
  onToggle: (value: string) => void;
  multi?: boolean;
}

export default function ChipSelector({
  options,
  selected,
  onToggle,
  multi = false,
}: ChipSelectorProps) {
  return (
    <ScrollView
      horizontal={false}
      scrollEnabled={false}
      contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}
    >
      {options.map((option) => {
        const isActive = selected.includes(option.value);
        return (
          <TouchableOpacity
            key={option.value}
            activeOpacity={0.7}
            onPress={() => onToggle(option.value)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: isActive ? WINE : '#F3F4F6',
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 10,
              gap: 6,
            }}
          >
            <Text
              style={{
                color: isActive ? '#FFF' : '#374151',
                fontWeight: isActive ? '600' : '400',
                fontSize: 14,
              }}
            >
              {option.label}
            </Text>
            {isActive && multi && <X size={14} color="#FFF" />}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
