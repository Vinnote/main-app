import type { WineTastingReview } from '@/src/app/types/wineTasting';

/**
 * Wine Review API interface — prepared for future endpoint integration.
 * Replace implementations with actual API calls when backend is ready.
 */

export interface CreateWineReviewPayload extends WineTastingReview {}

export interface CreateWineReviewResponse {
  id: string;
  createdAt: string;
}

export const wineTastingApi = {
  /**
   * Submit a complete wine tasting review.
   * TODO: integrate with POST /api/v1/tastings
   */
  async createWineReview(_payload: CreateWineReviewPayload): Promise<CreateWineReviewResponse> {
    // Future implementation:
    // return apiFetch('/tastings', { method: 'POST', body: JSON.stringify(payload) });
    throw new Error('Not implemented — endpoint integration pending');
  },

  /**
   * Fetch grape varieties for autocomplete.
   * TODO: integrate with GET /api/v1/grapes?q=
   */
  async searchGrapeVarieties(_query: string): Promise<string[]> {
    // Future implementation:
    // return apiFetch(`/grapes?q=${encodeURIComponent(query)}`);
    return [];
  },

  /**
   * Fetch wine regions for autocomplete.
   * TODO: integrate with GET /api/v1/regions?q=
   */
  async searchRegions(_query: string): Promise<string[]> {
    return [];
  },

  /**
   * Fetch producers for autocomplete.
   * TODO: integrate with GET /api/v1/producers?q=
   */
  async searchProducers(_query: string): Promise<string[]> {
    return [];
  },
};
