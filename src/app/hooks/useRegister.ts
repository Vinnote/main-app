import { useCallback, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';

import { useAuth } from '@/src/app/hooks/useAuth';
import { RegisterForm } from '@/src/app/types/register';

const initialForm: RegisterForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  userType: 'ENTHUSIAST',
};

export function useRegister() {
  const [form, setForm] = useState<RegisterForm>(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, isLoading, error, clearError } = useAuth();

  const setField = useCallback(<K extends keyof RegisterForm>(field: K, value: RegisterForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) {
      clearError();
    }
  }, [clearError, error]);

  const isValidForm = useMemo(() => {
    return (
      form.name.trim().length > 0
      && form.email.trim().length > 0
      && form.password.length >= 6
      && form.confirmPassword.length >= 6
      && form.password === form.confirmPassword
    );
  }, [form]);

  const submit = useCallback(async () => {
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name || !email || !form.password || !form.confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Erro', 'Informe um e-mail válido.');
      return;
    }

    if (form.password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    const result = await register(email, form.password, name, form.userType);

    if (result.success) {
      router.replace('/screens/feed');
      return;
    }

    Alert.alert('Erro ao cadastrar', result.message);
  }, [form, register]);

  const goToLogin = useCallback(() => {
    router.replace('/screens/LoginScreen')
    
  }, []);

  return {
    form,
    isLoading,
    error,
    showPassword,
    showConfirmPassword,
    isValidForm,
    setField,
    submit,
    goToLogin,
    setShowPassword,
    setShowConfirmPassword,
  };
}