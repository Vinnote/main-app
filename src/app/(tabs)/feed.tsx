import React, { useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { TastingCard } from '@/components/TastingCard';

import { useFeed, TastingWithInteractions } from '@/src/app/hooks/useFeed';
import { mockTastings } from '@/src/app/mocks/feedMocks';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Wine, Bell, User } from 'lucide-react-native';

export default function TastingFeedScreen() {
  const { tastings, refreshing, handleLike, handleBookmark, onRefresh } = useFeed({
    initialTastings: mockTastings,
  });

  const renderTasting = useCallback(
    ({ item }: { item: TastingWithInteractions }) => (
      <TastingCard tasting={item} onLike={handleLike} onBookmark={handleBookmark} />
    ),
    [handleLike, handleBookmark]
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
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
      </Box>

      <FlatList
        data={tastings}
        renderItem={renderTasting}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
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
    </SafeAreaView>
  );
}
