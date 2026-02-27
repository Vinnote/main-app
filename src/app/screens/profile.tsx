import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { tokenStorage } from '@/src/infrastructure/tokenStorage';
import { UserDto } from '@/src/infrastructure/api';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState<UserDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tokenStorage.getUser().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const handleSignOut = async () => {
    await tokenStorage.clearAll();
    router.replace('/');
  };

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: '#FFFFFF' }}>
      <Box className="px-4 py-3 border-b border-gray-100">
        <Heading size="xl" className="text-gray-900">
          Perfil
        </Heading>
      </Box>

      {loading ? (
        <Box className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#7C3AED" />
        </Box>
      ) : (
        <VStack className="flex-1 px-6 pt-8" space="xl">
          <VStack space="sm">
            <Text className="text-sm text-gray-500">Nome</Text>
            <Text className="text-lg text-gray-900 font-semibold">
              {user?.name ?? '—'}
            </Text>
          </VStack>

          <VStack space="sm">
            <Text className="text-sm text-gray-500">Email</Text>
            <Text className="text-lg text-gray-900">
              {user?.email ?? '—'}
            </Text>
          </VStack>

          <Box className="flex-1" />

          <TouchableOpacity
            onPress={handleSignOut}
            className="bg-red-500 rounded-xl py-4 mb-8 items-center"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-base">
              Sair da conta
            </Text>
          </TouchableOpacity>
        </VStack>
      )}
    </View>
  );
}
