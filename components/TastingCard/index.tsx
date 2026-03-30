import React, { useMemo, useState } from 'react';
import { Modal, View } from 'react-native';
import { Heart, MessageCircle, Bookmark, MoreHorizontal, BadgeCheck, Share2, Star } from 'lucide-react-native';

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

const getStarData = (score?: number | null): { full: number; empty: number } => {
  if (!score) return { full: 0, empty: 5 };
  const stars = Math.round(score / 20);
  const full = Math.min(5, Math.max(0, stars));
  return { full, empty: 5 - full };
};

const RatingStars: React.FC<{ score?: number | null }> = ({ score }) => {
  const { full, empty } = getStarData(score);
  return (
    <HStack space="xs" className="items-center">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`full-${i}`} size={16} color="#EAB308" fill="#EAB308" />
      ))}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`empty-${i}`} size={16} color="#D1D5DB" />
      ))}
    </HStack>
  );
};

export interface TastingCardProps {
  tasting: TastingWithInteractions;
  currentUserId?: string | null;
  onLike: (tastingId: string) => void;
  onBookmark: (tastingId: string) => void;
  onReportPost?: (tastingId: string) => void;
  onFollowUser?: (userId: string) => void;
  onEditPost?: (tastingId: string) => void;
  onDeletePost?: (tastingId: string) => void;
}

export const TastingCard: React.FC<TastingCardProps> = ({
  tasting,
  currentUserId,
  onLike,
  onBookmark,
  onReportPost,
  onFollowUser,
  onEditPost,
  onDeletePost,
}) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const user = tasting.user;
  const wine = tasting.wine;
  const postOwnerId = tasting.userId ?? user?.id;

  const isOwner = useMemo(
    () => Boolean(currentUserId && postOwnerId && currentUserId === postOwnerId),
    [currentUserId, postOwnerId]
  );

  const handleOpenOptions = () => {
    setIsOptionsVisible(true);
  };

  const handleCloseOptions = () => {
    setIsOptionsVisible(false);
  };

  const handleReport = () => {
    setIsOptionsVisible(false);
    onReportPost?.(tasting.id);
  };

  const handleFollow = () => {
    if (!postOwnerId) {
      setIsOptionsVisible(false);
      return;
    }

    setIsOptionsVisible(false);
    onFollowUser?.(postOwnerId);
  };

  const handleEdit = () => {
    setIsOptionsVisible(false);
    onEditPost?.(tasting.id);
  };

  const handleDelete = () => {
    setIsOptionsVisible(false);
    onDeletePost?.(tasting.id);
  };

  return (
    <>
      <Box className="bg-white border-b border-gray-100">
        <HStack className="p-5 items-center justify-between">
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
          <Pressable className="p-2" onPress={handleOpenOptions}>
            <MoreHorizontal size={20} color="#6B7280" />
          </Pressable>
        </HStack>
        {wine && (
          <Box className="px-5 pb-3">
            <Text className="text-2xl font-bold text-gray-900 mb-1">
              {wine.name} {wine.vintage ? `${wine.vintage}` : ''}
            </Text>
            <RatingStars score={tasting.score} />
          </Box>
        )}

        {tasting.comment && (
          <Box className="px-5 pb-4">
            <Text className="text-gray-900 leading-5" size="sm">
              {tasting.comment}
            </Text>
          </Box>
        )}

        {wine?.imageUrl && (
          <Box className="mx-5 mb-4 rounded-2xl overflow-hidden bg-black">
            <Image
              source={{ uri: wine.imageUrl }}
              className="w-full"
              size="2xl"
              alt={wine.name}
              resizeMode="cover"
            />
          </Box>
        )}

        {tasting.pairings && (
          <Box className="px-5 pb-4">
            <Text className="text-gray-500" size="xs">
              Pairs with: {tasting.pairings}
            </Text>
          </Box>
        )}

        <HStack className="px-5 pb-5 justify-between items-center">
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

            <Pressable>
              <HStack space="xs" className="items-center">
                <Share2 size={22} color="#6B7280" />
                <Text className="text-gray-500" size="sm">
                  Share
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

      <Modal
        transparent
        visible={isOptionsVisible}
        animationType="fade"
        onRequestClose={handleCloseOptions}
      >
        <View className="flex-1 justify-end bg-black/40">
          <Pressable className="flex-1" onPress={handleCloseOptions} />
          <Box className="bg-white rounded-t-3xl px-5 pt-3 pb-8">
            <Box className="w-10 h-1 bg-gray-300 rounded-full self-center mb-5" />

            <Pressable className="py-4 border-b border-gray-100" onPress={handleReport}>
              <Text className="text-gray-900 font-medium" size="md">
                Report post
              </Text>
            </Pressable>

            {!isOwner && postOwnerId && (
              <Pressable className="py-4 border-b border-gray-100" onPress={handleFollow}>
                <Text className="text-gray-900 font-medium" size="md">
                  Follow user
                </Text>
              </Pressable>
            )}

            {isOwner && (
              <Pressable className="py-4 border-b border-gray-100" onPress={handleEdit}>
                <Text className="text-gray-900 font-medium" size="md">
                  Edit post
                </Text>
              </Pressable>
            )}

            {isOwner && (
              <Pressable className="py-4 border-b border-gray-100" onPress={handleDelete}>
                <Text className="text-red-600 font-medium" size="md">
                  Delete post
                </Text>
              </Pressable>
            )}

            <Pressable className="py-4" onPress={handleCloseOptions}>
              <Text className="text-gray-500 text-center font-medium" size="md">
                Cancel
              </Text>
            </Pressable>
          </Box>
        </View>
      </Modal>
    </>
  );
};

export default TastingCard;
