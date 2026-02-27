import { tokenStorage } from './tokenStorage';
import { LoginDto, RegisterDto, AuthResponseDto, UserDto } from '../app/types/auth';
import { Tasting } from '../app/types';

export type { LoginDto, RegisterDto, AuthResponseDto, UserDto };

export interface FeedQuery {
  cursor?: string;
  limit?: number;
}

export interface FeedResponseDto {
  tastings: Tasting[];
  nextCursor?: string;
  hasMore: boolean;
}

const BASE_URL = 'https://vinnote-api.up.railway.app/api/v1';

export class ApiError extends Error {
  status: number;
  body?: unknown;

  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  const token = await tokenStorage.getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    let body: unknown;
    try {
      body = await res.json();
    } catch {
    }
    throw new ApiError(
      res.status,
      (body as any)?.message ?? `Request failed with status ${res.status}`,
      body,
    );
  }

  if (res.status === 204) return undefined as T;

  const json = await res.json();

  return json.data !== undefined ? json.data : json;
}

export const authApi = {
  async login(dto: LoginDto): Promise<AuthResponseDto> {
    return request<AuthResponseDto>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  },

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    return request<AuthResponseDto>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
  },

  async refresh(refreshToken: string): Promise<AuthResponseDto> {
    return request<AuthResponseDto>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },

  async logout(refreshToken: string): Promise<void> {
    return request<void>('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },

  async getMe(): Promise<UserDto> {
    return request<UserDto>('/users/me');
  },
};

export const feedApi = {
  async getAllFeed(query: FeedQuery = {}): Promise<FeedResponseDto> {
    const params = new URLSearchParams();

    if (query.cursor) params.append('cursor', query.cursor);
    if (query.limit !== undefined) params.append('limit', String(query.limit));

    const suffix = params.toString();
    const path = suffix ? `/feed?${suffix}` : '/feed';

    return request<FeedResponseDto>(path);
  },
};
