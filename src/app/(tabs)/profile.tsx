import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Box className="px-4 py-3 border-b border-gray-100">
        <Heading size="xl" className="text-gray-900">
          Perfil
        </Heading>
      </Box>
      <Box className="flex-1 justify-center items-center px-6">
        <Text className="text-gray-400 text-center">
          Seu perfil e configurações
        </Text>
      </Box>
    </SafeAreaView>
  );
}
