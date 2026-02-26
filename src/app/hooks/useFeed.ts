import { useState, useCallback } from 'react';
import { Tasting, TastingSchema } from '@/src/app/types';

export interface TastingWithInteractions extends Tasting {
  isLiked: boolean;
  isBookmarked: boolean;
}

interface UseFeedOptions {
  initialTastings: Tasting[];
}

interface UseFeedReturn {
  tastings: TastingWithInteractions[];
  refreshing: boolean;
  handleLike: (tastingId: string) => void;
  handleBookmark: (tastingId: string) => void;
  onRefresh: () => void;
}

const addInteractions = (tasting: Tasting): TastingWithInteractions => ({
  ...tasting,
  isLiked: false,
  isBookmarked: false,
});

export const useFeed = ({ initialTastings }: UseFeedOptions): UseFeedReturn => {
  const [tastings, setTastings] = useState<TastingWithInteractions[]>(
    initialTastings.map(addInteractions)
  );
  const [refreshing, setRefreshing] = useState(false);

  const handleLike = useCallback((tastingId: string) => {
    setTastings((currentTastings) =>
      currentTastings.map((tasting) =>
        tasting.id === tastingId
          ? {
              ...tasting,
              isLiked: !tasting.isLiked,
              likeCount: tasting.isLiked ? tasting.likeCount - 1 : tasting.likeCount + 1,
            }
          : tasting
      )
    );
  }, []);

  const handleBookmark = useCallback((tastingId: string) => {
    setTastings((currentTastings) =>
      currentTastings.map((tasting) =>
        tasting.id === tastingId
          ? { ...tasting, isBookmarked: !tasting.isBookmarked }
          : tasting
      )
    );
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const validatedTastings = initialTastings.map((tasting) => {
        const result = TastingSchema.safeParse(tasting);
        return addInteractions(result.success ? result.data : tasting);
      });
      setTastings(validatedTastings);
      setRefreshing(false);
    }, 1500);
  }, [initialTastings]);

  return {
    tastings,
    refreshing,
    handleLike,
    handleBookmark,
    onRefresh,
  };
};
