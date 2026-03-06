import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { TastingCard } from '@/components/TastingCard';

import { useFeed, TastingWithInteractions } from '@/src/app/hooks/useFeed';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Wine, Bell, User } from 'lucide-react-native';
import { Text } from '@/components/ui/text';

export default function TastingFeedScreen() {
  const insets = useSafeAreaInsets();
  const [useMockFeed, setUseMockFeed] = useState(process.env.EXPO_PUBLIC_USE_FEED_MOCKS === 'true');
  const { tastings, isLoading, error, refreshing, handleLike, handleBookmark, loadFeed, onRefresh } = useFeed({
    useMocks: useMockFeed,
  });

  const renderTasting = useCallback(
    ({ item }: { item: TastingWithInteractions }) => (
      <TastingCard tasting={item} onLike={handleLike} onBookmark={handleBookmark} />
    ),
    [handleLike, handleBookmark]
  );

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: '#FFFFFF' }}>
      <Box className="px-4 py-3 border-b border-gray-100">
        <HStack className="items-center justify-between">
          <HStack space="sm" className="items-center">
            <Wine size={24} color="#760732" />
            <Heading size="xl" className="text-red-900">
              Degustações
            </Heading>
          </HStack>
          <HStack space="md" className="items-center">
            <Pressable onPress={() => {}} className="p-1">
              <Bell size={22} color="#760732" />
            </Pressable>
            <Pressable onPress={() => {}} className="p-1">
              <User size={22} color="#760732" />
            </Pressable>
          </HStack>
        </HStack>
        <Pressable
          onPress={() => setUseMockFeed((current) => !current)}
          className="mt-3 self-start px-3 py-1 rounded-full border border-gray-300"
        >
          <Text className="text-xs text-gray-700 font-medium">
            Mock: {useMockFeed ? 'ON' : 'OFF'}
          </Text>
        </Pressable>
      </Box>

      {isLoading && tastings.length === 0 ? (
        <Box className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#760732" />
          <Text className="mt-3 text-gray-500">Carregando feed...</Text>
        </Box>
      ) : (
      <FlatList
        data={tastings}
        renderItem={renderTasting}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Box className="py-10 px-6 items-center">
            <Text className="text-gray-600 text-center mb-3">
              {error ?? 'Nenhuma degustação encontrada no feed.'}
            </Text>
            <Pressable onPress={() => void loadFeed()} className="px-4 py-2 rounded-full border border-gray-300">
              <Text className="text-gray-800 font-medium">Tentar novamente</Text>
            </Pressable>
          </Box>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3B82F6"
          />
        }
        ItemSeparatorComponent={() => <Box className="h-2 bg-gray-50" />}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
      )}
    </View>
  );
}
