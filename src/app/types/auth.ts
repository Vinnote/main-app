export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  userType: 'SOMMELIER' | 'ENTHUSIAST';
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface UserDto {
  id: string;
  email: string;
  name: string;
  userType: 'SOMMELIER' | 'ENTHUSIAST';
  verificationStatus?: 'PENDING' | 'VERIFIED' | 'REJECTED' | null;
  expertiseLevel?: 'INICIANTE' | 'INTERMEDIARIO' | 'AVANCADO' | 'EXPERT' | null;
  profileImageUrl?: string | null;
  bio?: string | null;
  tastingCount: number;
  followerCount: number;
  followingCount: number;
  createdAt: string;
  updatedAt: string;
}
