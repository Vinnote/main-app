import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Alert, FlatList, RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { LogOut, User } from 'lucide-react-native';

import { Box } from '@/components/ui/box';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { TastingCard } from '@/components/TastingCard';

import { tokenStorage } from '@/src/infrastructure/tokenStorage';
import { feedApi, UserDto } from '@/src/infrastructure/api';
import { TastingWithInteractions } from '@/src/app/hooks/useFeed';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState<UserDto | null>(null);
  const [tastings, setTastings] = useState<TastingWithInteractions[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadUserData = useCallback(async () => {
    try {
      const userData = await tokenStorage.getUser();
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
      Alert.alert('Erro', 'Não foi possível carregar dados do perfil');
    }
  }, []);

  const loadUserTastings = useCallback(async () => {
    try {
      const response = await feedApi.getTastings({ limit: 100 });
      // Handle both array and { tastings: [] } response shapes
      const rawTastings: any[] = Array.isArray(response)
        ? response
        : (response as any).tastings ?? (response as any).items ?? [];
      // Filter tastings by current user
      const userTastings = rawTastings.filter(
        (tasting) => tasting.userId === user?.id
      );
      setTastings(
        userTastings.map((t) => ({
          ...t,
          isLiked: false,
          isBookmarked: false,
        }))
      );
    } catch (error) {
      console.error('Error loading tastings:', error);
      Alert.alert('Erro', 'Não foi possível carregar suas avaliações');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  useEffect(() => {
    if (user?.id) {
      loadUserTastings();
    }
  }, [user?.id, loadUserTastings]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadUserTastings();
  };

  const handleLogout = () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          try {
            await tokenStorage.clearAll();
            router.replace('/');
          } catch (error: any) {
            Alert.alert('Erro', error.message || 'Erro ao sair');
          }
        },
      },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const renderTasting = useCallback(
    ({ item }: { item: TastingWithInteractions }) => (
      <Box className="mb-4">
        <TastingCard
          tasting={item}
          currentUserId={user?.id}
          onLike={() => {}}
          onBookmark={() => {}}
        />
      </Box>
    ),
    [user?.id]
  );

  const renderEmpty = () => (
    <VStack className="items-center justify-center py-20 px-6">
      <Box className="w-20 h-20 bg-gray-200 rounded-full items-center justify-center mb-4">
        <Text className="text-4xl">🍷</Text>
      </Box>
      <Text className="text-gray-600 text-center text-lg font-semibold mb-2">
        Nenhuma avaliação ainda
      </Text>
      <Text className="text-gray-500 text-center">
        Comece a fazer degustações e suas avaliações aparecerão aqui!
      </Text>
    </VStack>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <LinearGradient
        colors={['#B94864', '#760732']}
        style={{
          paddingTop: insets.top + 20,
          paddingBottom: 20,
          paddingHorizontal: 20,
        }}
      >
        <HStack className="items-center justify-between mb-6">
          <VStack className="flex-1">
            <HStack space="sm" className="items-center">
              {user?.profileImageUrl ? (
                <Image
                  source={{ uri: user.profileImageUrl }}
                  className="w-16 h-16 rounded-full"
                  alt={user.name}
                />
              ) : (
                <Box className="w-16 h-16 rounded-full bg-white/20 items-center justify-center">
                  <User size={32} color="white" />
                </Box>
              )}
              <VStack className="flex-1">
                <Text className="text-white text-lg font-bold">
                  {user?.name || 'Usuário'}
                </Text>
                <Text className="text-white/80 text-sm">
                  {user?.email}
                </Text>
                {user?.userType && (
                  <Text className="text-white/90 text-xs font-medium mt-1">
                    {user.userType === 'SOMMELIER' ? '🍷 Sommelier' : '👤 Entusiasta'}
                  </Text>
                )}
              </VStack>
            </HStack>
          </VStack>
          <Pressable onPress={handleLogout} className="p-2">
            <Box className="w-10 h-10 bg-white/20 rounded-full items-center justify-center">
              <LogOut size={20} color="white" />
            </Box>
          </Pressable>
        </HStack>

        <HStack space="lg" className="items-center">
          <VStack className="items-center flex-1">
            <Text className="text-white text-2xl font-bold">
              {tastings.length}
            </Text>
            <Text className="text-white/80 text-xs">
              {tastings.length === 1 ? 'Avaliação' : 'Avaliações'}
            </Text>
          </VStack>
          <VStack className="items-center flex-1">
            <Text className="text-white text-2xl font-bold">
              {user?.followingCount || 0}
            </Text>
            <Text className="text-white/80 text-xs">
              Seguindo
            </Text>
          </VStack>
          <VStack className="items-center flex-1">
            <Text className="text-white text-2xl font-bold">
              {user?.followerCount || 0}
            </Text>
            <Text className="text-white/80 text-xs">
              Seguidores
            </Text>
          </VStack>
        </HStack>
      </LinearGradient>

      {loading ? (
        <Box className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#B94864" />
          <Text className="text-gray-600 mt-4">
            Carregando suas avaliações...
          </Text>
        </Box>
      ) : (
        <FlatList
          data={tastings}
          renderItem={renderTasting}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#B94864"
            />
          }
          ListEmptyComponent={renderEmpty}
        />
      )}
    </View>
  );
}