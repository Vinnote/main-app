import React from 'react';
import { View } from 'react-native';
import { Heading } from '@/components/ui/heading';
import SegmentedControl from './SegmentedControl';

const CLARITY_OPTIONS = [
  { label: 'Brilhante', value: 'brilliant' },
  { label: 'Límpido', value: 'clear' },
  { label: 'Turvo', value: 'hazy' },
  { label: 'Opaco', value: 'dull' },
];

interface ClaritySelectorProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export default function ClaritySelector({ value, onChange }: ClaritySelectorProps) {
  return (
    <View>
      <Heading size="lg" className="text-gray-900 mb-3">
        Limpidez
      </Heading>
      <SegmentedControl options={CLARITY_OPTIONS} value={value} onSelect={onChange} variant="grid" />
    </View>
  );
}
