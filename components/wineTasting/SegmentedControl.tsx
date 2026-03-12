import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import { Text } from '@/components/ui/text';

const WINE = '#8B1A2B';
const WINE_LIGHT = '#F5E6E9';

interface Option {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: Option[];
  value: string | undefined;
  onSelect: (value: string) => void;
  variant?: 'pill' | 'grid';
}

export default function SegmentedControl({
  options,
  value,
  onSelect,
  variant = 'pill',
}: SegmentedControlProps) {
  if (variant === 'grid') {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              activeOpacity={0.7}
              onPress={() => onSelect(option.value)}
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
    );
  }

  // pill / segmented style
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 28,
        padding: 4,
      }}
    >
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            activeOpacity={0.7}
            onPress={() => onSelect(option.value)}
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
                fontSize: 14,
              }}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
