import { useState, useCallback, useEffect, useRef } from 'react';
import { Tasting, TastingSchema } from '@/src/app/types';
import { ApiError, feedApi } from '@/src/infrastructure/api';
import { mockTastings } from '@/src/app/mocks/feedMocks';

export interface TastingWithInteractions extends Tasting {
  isLiked: boolean;
  isBookmarked: boolean;
}

interface UseFeedOptions {
  initialTastings?: Tasting[];
  limit?: number;
  useMocks?: boolean;
}

interface UseFeedReturn {
  tastings: TastingWithInteractions[];
  isLoading: boolean;
  error: string | null;
  refreshing: boolean;
  handleLike: (tastingId: string) => void;
  handleBookmark: (tastingId: string) => void;
  loadFeed: () => Promise<void>;
  onRefresh: () => void;
}

const addInteractions = (tasting: Tasting): TastingWithInteractions => ({
  ...tasting,
  isLiked: false,
  isBookmarked: false,
});

let lastFeedRequestAt = 0;
const REQUEST_GUARD_MS = 1500;
const DEFAULT_THROTTLE_COOLDOWN_MS = 15000;
const USE_FEED_MOCKS = process.env.EXPO_PUBLIC_USE_FEED_MOCKS === 'true';

export const useFeed = ({ initialTastings = [], limit = 20, useMocks = USE_FEED_MOCKS }: UseFeedOptions = {}): UseFeedReturn => {
  const [tastings, setTastings] = useState<TastingWithInteractions[]>(
    initialTastings.map(addInteractions)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const inFlightRef = useRef(false);
  const cooldownUntilRef = useRef(0);

  const normalizeFeedItems = useCallback((payload: unknown): Tasting[] => {
    if (Array.isArray(payload)) {
      return payload as Tasting[];
    }

    if (payload && typeof payload === 'object') {
      const typedPayload = payload as { tastings?: unknown; items?: unknown };

      if (Array.isArray(typedPayload.tastings)) {
        return typedPayload.tastings as Tasting[];
      }

      if (Array.isArray(typedPayload.items)) {
        return typedPayload.items as Tasting[];
      }
    }

    return [];
  }, []);

  const validateAndDecorate = useCallback((items: Tasting[]) => {
    return items.map((tasting) => {
      const result = TastingSchema.safeParse(tasting);
      return addInteractions(result.success ? result.data : tasting);
    });
  }, []);

  const fetchFeed = useCallback(async (isRefresh: boolean) => {
    const now = Date.now();

    if (inFlightRef.current) {
      return;
    }

    if (now < cooldownUntilRef.current) {
      const secondsLeft = Math.max(1, Math.ceil((cooldownUntilRef.current - now) / 1000));
      setError(`Muitas requisições. Tente novamente em ${secondsLeft}s.`);
      return;
    }

    if (now - lastFeedRequestAt < REQUEST_GUARD_MS) {
      return;
    }

    lastFeedRequestAt = now;
    inFlightRef.current = true;

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      if (useMocks) {
        setTastings(validateAndDecorate(mockTastings));
        return;
      }

      const response = await feedApi.getAllFeed({ limit });
      const feedItems = normalizeFeedItems(response);
      setTastings(validateAndDecorate(feedItems));
    } catch (err) {
      console.error('[useFeed] fetch feed error:', err);

      if (initialTastings.length > 0) {
        setTastings(validateAndDecorate(initialTastings));
      }

      if (err instanceof ApiError) {
        if (err.status === 429) {
          cooldownUntilRef.current = Date.now() + DEFAULT_THROTTLE_COOLDOWN_MS;
          setError('Muitas requisições. Aguarde alguns segundos e tente novamente.');
          return;
        }
        setError(err.message);
      } else if (err instanceof TypeError && (err.message === 'Network request failed' || err.message.includes('fetch'))) {
        setError('Sem conexão com o servidor. Verifique sua internet.');
      } else {
        setError((err as Error).message ?? 'Erro ao carregar feed.');
      }
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setIsLoading(false);
      }
      inFlightRef.current = false;
    }
  }, [initialTastings, limit, normalizeFeedItems, useMocks, validateAndDecorate]);

  const loadFeed = useCallback(async () => {
    await fetchFeed(false);
  }, [fetchFeed]);

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
    void fetchFeed(true);
  }, [fetchFeed]);

  useEffect(() => {
    void fetchFeed(false);
  }, [fetchFeed]);

  return {
    tastings,
    isLoading,
    error,
    refreshing,
    handleLike,
    handleBookmark,
    loadFeed,
    onRefresh,
  };
};
