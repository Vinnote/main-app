import { RegisterDto } from '@/src/app/types/auth';

export type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: RegisterDto['userType'];
};