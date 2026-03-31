import type { AxiosResponse } from 'axios';

export interface WineRepositoryPort {
  verifyCode(code: string, email: string, type: string): Promise<AxiosResponse<any, any, {}>>
}