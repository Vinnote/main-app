import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function NewTastingScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: '#FFFFFF' }}>
      
      {/* HEADER */}
      <Box className="px-4 py-3 border-b border-gray-100">
        <Heading size="xl" className="text-gray-900">
          Nova Degustação
        </Heading>
      </Box>

      {/* BOTÃO + */}
      <TouchableOpacity
        onPress={() => router.push('/screens/ficha/formulario')}
        style={{
          position: 'absolute',
          top: insets.top + 4,
          right: 16,
          zIndex: 10,
          backgroundColor: '#760732',
          borderRadius: 999,
          padding: 8,
        }}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>

      {/* CONTEÚDO */}
      <Box className="flex-1 justify-center items-center px-6">
        <Text className="text-gray-400 text-center">
          Registre uma nova degustação de vinho
        </Text>
      </Box>

    </View>
  );
}