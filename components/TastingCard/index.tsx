import React from 'react';
import { Dimensions } from 'react-native';
import { Heart, MessageCircle, Bookmark, MoreHorizontal, BadgeCheck, Wine } from 'lucide-react-native';

import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Image } from '@/components/ui/image';
import { Pressable } from '@/components/ui/pressable';

import { TastingWithInteractions } from '@/src/app/hooks/useFeed';

const formatTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const formatCount = (count: number): string => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
};

export interface TastingCardProps {
  tasting: TastingWithInteractions;
  onLike: (tastingId: string) => void;
  onBookmark: (tastingId: string) => void;
}

export const TastingCard: React.FC<TastingCardProps> = ({ tasting, onLike, onBookmark }) => {
  const screenWidth = Dimensions.get('window').width;
  const user = tasting.user;
  const wine = tasting.wine;

  return (
    <Box className="bg-white border-b border-gray-100">
      <HStack className="p-4 items-center justify-between">
        <HStack space="sm" className="items-center flex-1">
          <Image
            source={{ uri: user?.profileImageUrl || 'https://i.pravatar.cc/150' }}
            className="w-10 h-10 rounded-full"
            alt={user?.name || 'User'}
          />
          <VStack className="flex-1">
            <HStack space="xs" className="items-center">
              <Text className="font-semibold text-gray-900" size="sm">
                {user?.name}
              </Text>
              {user?.verificationStatus === 'VERIFIED' && (
                <BadgeCheck size={14} color="#3B82F6" fill="#3B82F6" strokeWidth={0} />
              )}
            </HStack>
            <Text className="text-gray-500" size="xs">
              {user?.userType === 'SOMMELIER' ? 'Sommelier' : 'Enthusiast'} · {formatTimeAgo(tasting.publishedAt || tasting.createdAt)}
            </Text>
          </VStack>
        </HStack>
        <Pressable className="p-2">
          <MoreHorizontal size={20} color="#6B7280" />
        </Pressable>
      </HStack>
      {wine && (
        <HStack className="px-4 pb-3 items-center" space="sm">
          <Wine size={16} color="#7C3AED" />
          <Text className="text-purple-700 font-medium" size="sm">
            {wine.name} {wine.vintage ? `(${wine.vintage})` : ''}
          </Text>
          {tasting.score && (
            <Box className="bg-purple-100 px-2 py-0.5 rounded-full ml-auto">
              <Text className="text-purple-700 font-bold" size="xs">
                {tasting.score}/100
              </Text>
            </Box>
          )}
        </HStack>
      )}

      {tasting.comment && (
        <Box className="px-4 pb-3">
          <Text className="text-gray-900 leading-5" size="sm">
            {tasting.comment}
          </Text>
        </Box>
      )}

      {wine?.imageUrl && (
        <Box className="mb-3">
          <Image
            source={{ uri: wine.imageUrl }}
            className="w-full"
            style={{ height: screenWidth * 0.6 }}
            alt={wine.name}
            resizeMode="cover"
          />
        </Box>
      )}

      {tasting.pairings && (
        <Box className="px-4 pb-3">
          <Text className="text-gray-500" size="xs">
            Pairs with: {tasting.pairings}
          </Text>
        </Box>
      )}

      <HStack className="px-4 pb-4 justify-between">
        <HStack space="lg">
          <Pressable onPress={() => onLike(tasting.id)}>
            <HStack space="xs" className="items-center">
              <Heart
                size={22}
                color={tasting.isLiked ? '#EF4444' : '#6B7280'}
                fill={tasting.isLiked ? '#EF4444' : 'transparent'}
              />
              <Text
                className={tasting.isLiked ? 'text-red-500' : 'text-gray-500'}
                size="sm"
              >
                {formatCount(tasting.likeCount)}
              </Text>
            </HStack>
          </Pressable>

          <Pressable>
            <HStack space="xs" className="items-center">
              <MessageCircle size={22} color="#6B7280" />
              <Text className="text-gray-500" size="sm">
                {formatCount(tasting.commentCount)}
              </Text>
            </HStack>
          </Pressable>
        </HStack>

        <Pressable onPress={() => onBookmark(tasting.id)}>
          <Bookmark
            size={22}
            color={tasting.isBookmarked ? '#3B82F6' : '#6B7280'}
            fill={tasting.isBookmarked ? '#3B82F6' : 'transparent'}
          />
        </Pressable>
      </HStack>
    </Box>
  );
};

export default TastingCard;
