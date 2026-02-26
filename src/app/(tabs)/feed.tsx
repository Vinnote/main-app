import React, { useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { TastingCard } from '@/components/TastingCard';

import { useFeed, TastingWithInteractions } from '@/src/app/hooks/useFeed';
import { mockTastings } from '@/src/app/mocks/feedMocks';

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
        <Heading size="xl" className="text-gray-900">
          Tastings
        </Heading>
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
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
}
