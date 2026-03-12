import React, { useState, useMemo } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import { X, Search, ChevronRight, Check } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AROMA_DATA, type AromaCategory } from '@/src/app/types/aromaData';
import type { SelectedAroma } from '@/src/app/types/wineTasting';

const WINE = '#8B1A2B';
const WINE_LIGHT = '#F5E6E9';
const MAX_AROMAS = 6;

interface AromaSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  selected: SelectedAroma[];
  onChangeSelection: (aromas: SelectedAroma[]) => void;
}

export default function AromaSelectorModal({
  visible,
  onClose,
  selected,
  onChangeSelection,
}: AromaSelectorModalProps) {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFamily, setExpandedFamily] = useState<string | null>(null);

  const isSelected = (aroma: string) =>
    selected.some((s) => s.aroma === aroma);

  const toggleAroma = (family: string, subcategory: string, aroma: string) => {
    if (isSelected(aroma)) {
      onChangeSelection(selected.filter((s) => s.aroma !== aroma));
    } else if (selected.length < MAX_AROMAS) {
      onChangeSelection([...selected, { family, subcategory, aroma }]);
    }
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return AROMA_DATA;
    const q = searchQuery.toLowerCase();
    return AROMA_DATA.map((cat) => ({
      ...cat,
      subcategories: cat.subcategories.map((sub) => ({
        ...sub,
        aromas: sub.aromas.filter((a) => a.label.toLowerCase().includes(q)),
      })).filter((sub) => sub.aromas.length > 0),
    })).filter((cat) => cat.subcategories.length > 0);
  }, [searchQuery]);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={{ flex: 1, backgroundColor: '#FFF', paddingTop: insets.top }}>
        {/* Header */}
        <HStack className="px-5 py-3 items-center justify-between">
          <TouchableOpacity onPress={onClose} hitSlop={12}>
            <X size={24} color="#333" />
          </TouchableOpacity>
          <Heading size="md" className="text-gray-900">
            Selecionar Aromas
          </Heading>
          <View
            style={{
              backgroundColor: WINE_LIGHT,
              borderRadius: 12,
              paddingHorizontal: 8,
              paddingVertical: 3,
            }}
          >
            <Text style={{ color: WINE, fontWeight: '700', fontSize: 12 }}>
              {selected.length}/{MAX_AROMAS}
            </Text>
          </View>
        </HStack>

        {/* Search */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 12 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#F3F4F6',
              borderRadius: 24,
              paddingHorizontal: 14,
              gap: 8,
            }}
          >
            <Search size={18} color="#9CA3AF" />
            <TextInput
              placeholder="Buscar aroma..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                flex: 1,
                paddingVertical: 12,
                fontSize: 15,
                color: '#1F2937',
              }}
            />
          </View>
        </View>

        {/* Selected chips */}
        {selected.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 12, gap: 8 }}
          >
            {selected.map((s) => (
              <TouchableOpacity
                key={s.aroma}
                onPress={() => toggleAroma(s.family, s.subcategory, s.aroma)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: WINE_LIGHT,
                  borderRadius: 20,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  gap: 6,
                  borderWidth: 1,
                  borderColor: WINE,
                }}
              >
                <Text style={{ color: WINE, fontWeight: '600', fontSize: 13 }}>
                  {s.aroma}
                </Text>
                <X size={14} color={WINE} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Aroma list */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.family}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          renderItem={({ item: cat }: { item: AromaCategory }) => {
            const isExpanded = expandedFamily === cat.family || !!searchQuery;
            const familyCount = selected.filter((s) => s.family === cat.family).length;

            return (
              <View style={{ marginBottom: 4 }}>
                <TouchableOpacity
                  onPress={() =>
                    setExpandedFamily(expandedFamily === cat.family ? null : cat.family)
                  }
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 14,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F3F4F6',
                  }}
                >
                  <HStack className="items-center gap-2">
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937' }}>
                      {cat.familyLabel}
                    </Text>
                    {familyCount > 0 && (
                      <View
                        style={{
                          backgroundColor: WINE,
                          borderRadius: 10,
                          width: 20,
                          height: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text style={{ color: '#FFF', fontSize: 11, fontWeight: '700' }}>
                          {familyCount}
                        </Text>
                      </View>
                    )}
                  </HStack>
                  <ChevronRight
                    size={18}
                    color="#9CA3AF"
                    style={{
                      transform: [{ rotate: isExpanded ? '90deg' : '0deg' }],
                    }}
                  />
                </TouchableOpacity>

                {isExpanded &&
                  cat.subcategories.map((sub) => (
                    <View key={sub.name} style={{ paddingLeft: 12, marginTop: 8 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '700',
                          color: '#9CA3AF',
                          letterSpacing: 0.5,
                          marginBottom: 6,
                          textTransform: 'uppercase',
                        }}
                      >
                        {sub.label}
                      </Text>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                        {sub.aromas.map((a) => {
                          const sel = isSelected(a.value);
                          const atLimit = selected.length >= MAX_AROMAS && !sel;
                          return (
                            <TouchableOpacity
                              key={a.value}
                              onPress={() => toggleAroma(cat.family, sub.name, a.value)}
                              disabled={atLimit}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: sel ? WINE : atLimit ? '#F9FAFB' : '#F3F4F6',
                                borderRadius: 20,
                                paddingHorizontal: 14,
                                paddingVertical: 8,
                                gap: 6,
                                opacity: atLimit ? 0.4 : 1,
                              }}
                            >
                              {sel && <Check size={14} color="#FFF" strokeWidth={3} />}
                              <Text
                                style={{
                                  color: sel ? '#FFF' : '#374151',
                                  fontWeight: sel ? '600' : '400',
                                  fontSize: 14,
                                }}
                              >
                                {a.label}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  ))}
              </View>
            );
          }}
        />

        {/* Confirm button */}
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
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onClose}
            style={{
              backgroundColor: WINE,
              borderRadius: 28,
              paddingVertical: 16,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 16 }}>
              Confirmar ({selected.length} aromas)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
