import { useState, useCallback } from 'react';
import { authApi, UserDto, ApiError } from '@/src/infrastructure/api';
import { tokenStorage } from '@/src/infrastructure/tokenStorage';

interface AuthState {
  user: UserDto | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: false,
    error: null,
  });

  const login = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    try {
      const authResponse = await authApi.login({ email, password });

      // Persist tokens
      await tokenStorage.setToken(authResponse.accessToken);
      await tokenStorage.setRefreshToken(authResponse.refreshToken);

      // Fetch user profile
      const user = await authApi.getMe();
      await tokenStorage.setUser(user);

      setState({ user, isLoading: false, error: null });
      return { success: true as const, user };
    } catch (err) {
      console.error('[useAuth] login error:', err);
      let message: string;
      if (err instanceof ApiError) {
        message = err.message;
      } else if (err instanceof TypeError && (err.message === 'Network request failed' || err.message.includes('fetch'))) {
        message = 'Sem conexão com o servidor. Verifique sua internet.';
      } else {
        message = (err as Error).message ?? 'Erro inesperado. Tente novamente.';
      }
      setState((s) => ({ ...s, isLoading: false, error: message }));
      return { success: false as const, message };
    }
  }, []);

  const register = useCallback(
    async (
      email: string,
      password: string,
      name: string,
      userType: 'SOMMELIER' | 'ENTHUSIAST',
    ) => {
      setState((s) => ({ ...s, isLoading: true, error: null }));
      try {
        const authResponse = await authApi.register({
          email,
          password,
          name,
          userType,
        });

        await tokenStorage.setToken(authResponse.accessToken);
        await tokenStorage.setRefreshToken(authResponse.refreshToken);

        const user = await authApi.getMe();
        await tokenStorage.setUser(user);

        setState({ user, isLoading: false, error: null });
        return { success: true as const, user };
      } catch (err) {
        console.error('[useAuth] register error:', err);
        let message: string;
        if (err instanceof ApiError) {
          message = err.message;
        } else if (err instanceof TypeError && (err.message === 'Network request failed' || err.message.includes('fetch'))) {
          message = 'Sem conexão com o servidor. Verifique sua internet.';
        } else {
          message = (err as Error).message ?? 'Erro inesperado. Tente novamente.';
        }
        setState((s) => ({ ...s, isLoading: false, error: message }));
        return { success: false as const, message };
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      const refreshToken = await tokenStorage.getRefreshToken();
      if (refreshToken) {
        await authApi.logout(refreshToken).catch(() => {});
      }
    } finally {
      await tokenStorage.clearAll();
      setState({ user: null, isLoading: false, error: null });
    }
  }, []);

  const restoreSession = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true }));
    try {
      const token = await tokenStorage.getToken();
      if (!token) {
        setState({ user: null, isLoading: false, error: null });
        return false;
      }

      const user = await authApi.getMe();
      await tokenStorage.setUser(user);
      setState({ user, isLoading: false, error: null });
      return true;
    } catch {
      // refresh token
      try {
        const refreshToken = await tokenStorage.getRefreshToken();
        if (!refreshToken) throw new Error('no refresh token');

        const authResponse = await authApi.refresh(refreshToken);
        await tokenStorage.setToken(authResponse.accessToken);
        await tokenStorage.setRefreshToken(authResponse.refreshToken);

        const user = await authApi.getMe();
        await tokenStorage.setUser(user);
        setState({ user, isLoading: false, error: null });
        return true;
      } catch {
        await tokenStorage.clearAll();
        setState({ user: null, isLoading: false, error: null });
        return false;
      }
    }
  }, []);

  const clearError = useCallback(() => {
    setState((s) => ({ ...s, error: null }));
  }, []);

  return {
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    login,
    register,
    logout,
    restoreSession,
    clearError,
  };
}
