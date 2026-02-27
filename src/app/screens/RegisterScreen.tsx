import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StatusBar,
} from 'react-native';

import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField, InputSlot } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable';
import { Image } from '@/components/ui/image';

import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useRegister } from '@/src/app/hooks/useRegister';

export default function RegisterScreen() {
	const {
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
	} = useRegister();

	return (
		<>
			<StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				className="flex-1 bg-white"
			>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardShouldPersistTaps="handled"
				>
					<Box className="flex-1 px-6 pt-16">
						<VStack className="items-center mb-10">
							<Heading size="2xl" className="text-gray-900 mb-2">
								Criar conta
							</Heading>
							<Text size="sm" className="text-gray-500">
								Cadastre-se para começar a usar o Vinnote
							</Text>
						</VStack>

						<VStack className="mb-4">
							<Text size="sm" className="text-gray-900 font-medium mb-2">
								Nome
							</Text>
							<Input variant="rounded" size="xl" className="bg-gray-50 border-gray-200">
								<InputSlot className="pl-4">
									<User size={20} color="#9CA3AF" />
								</InputSlot>
								<InputField
									placeholder="Seu nome"
									placeholderTextColor="#9CA3AF"
									value={form.name}
									onChangeText={(text) => setField('name', text)}
									autoCapitalize="words"
									autoCorrect={false}
									className="text-gray-900"
								/>
							</Input>
						</VStack>

						<VStack className="mb-4">
							<Text size="sm" className="text-gray-900 font-medium mb-2">
								E-mail
							</Text>
							<Input variant="rounded" size="xl" className="bg-gray-50 border-gray-200">
								<InputSlot className="pl-4">
									<Mail size={20} color="#9CA3AF" />
								</InputSlot>
								<InputField
									placeholder="Seu e-mail"
									placeholderTextColor="#9CA3AF"
									value={form.email}
									onChangeText={(text) => setField('email', text)}
									keyboardType="email-address"
									autoCapitalize="none"
									autoCorrect={false}
									className="text-gray-900"
								/>
							</Input>
						</VStack>

						<VStack className="mb-4">
							<Text size="sm" className="text-gray-900 font-medium mb-2">
								Senha
							</Text>
							<Input variant="rounded" size="xl" className="bg-gray-50 border-gray-200">
								<InputSlot className="pl-4">
									<Lock size={20} color="#9CA3AF" />
								</InputSlot>
								<InputField
									placeholder="Crie uma senha"
									placeholderTextColor="#9CA3AF"
									value={form.password}
									onChangeText={(text) => setField('password', text)}
									secureTextEntry={!showPassword}
									autoCapitalize="none"
									autoCorrect={false}
									className="text-gray-900"
								/>
								<InputSlot className="pr-4">
									<Pressable onPress={() => setShowPassword(!showPassword)}>
										{showPassword ? (
											<Eye size={20} color="#9CA3AF" />
										) : (
											<EyeOff size={20} color="#9CA3AF" />
										)}
									</Pressable>
								</InputSlot>
							</Input>
						</VStack>

						<VStack className="mb-4">
							<Text size="sm" className="text-gray-900 font-medium mb-2">
								Confirmar senha
							</Text>
							<Input variant="rounded" size="xl" className="bg-gray-50 border-gray-200">
								<InputSlot className="pl-4">
									<Lock size={20} color="#9CA3AF" />
								</InputSlot>
								<InputField
									placeholder="Repita sua senha"
									placeholderTextColor="#9CA3AF"
									value={form.confirmPassword}
									onChangeText={(text) => setField('confirmPassword', text)}
									secureTextEntry={!showConfirmPassword}
									autoCapitalize="none"
									autoCorrect={false}
									className="text-gray-900"
								/>
								<InputSlot className="pr-4">
									<Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
										{showConfirmPassword ? (
											<Eye size={20} color="#9CA3AF" />
										) : (
											<EyeOff size={20} color="#9CA3AF" />
										)}
									</Pressable>
								</InputSlot>
							</Input>
						</VStack>

						<VStack className="mb-6">
							<Text size="sm" className="text-gray-900 font-medium mb-3">
								Tipo de usuário
							</Text>
							<HStack className="gap-3">
								<Pressable
									onPress={() => setField('userType', 'ENTHUSIAST')}
									className={`flex-1 rounded-full border px-4 py-3 ${
										form.userType === 'ENTHUSIAST'
											? 'border-red-800 bg-red-50'
											: 'border-gray-200 bg-gray-50'
									}`}
								>
									<Text
										className={`text-center font-medium ${
											form.userType === 'ENTHUSIAST' ? 'text-red-800' : 'text-gray-700'
										}`}
									>
										Entusiasta
									</Text>
								</Pressable>

								<Pressable
									onPress={() => setField('userType', 'SOMMELIER')}
									className={`flex-1 rounded-full border px-4 py-3 ${
										form.userType === 'SOMMELIER'
											? 'border-red-800 bg-red-50'
											: 'border-gray-200 bg-gray-50'
									}`}
								>
									<Text
										className={`text-center font-medium ${
											form.userType === 'SOMMELIER' ? 'text-red-800' : 'text-gray-700'
										}`}
									>
										Sommelier
									</Text>
								</Pressable>
							</HStack>
						</VStack>

						<Button
							onPress={submit}
							className="bg-red-800 rounded-full py-4 mb-6 active:opacity-80"
							size="xl"
							disabled={isLoading || !isValidForm}
						>
							{isLoading ? (
								<ActivityIndicator color="#FFFFFF" />
							) : (
								<ButtonText className="text-white text-base font-semibold">
									Criar conta
								</ButtonText>
							)}
						</Button>

						{error ? (
							<Box className="mb-4">
								<Text className="text-red-600 text-center text-sm">{error}</Text>
							</Box>
						) : null}

						<Box className="items-center mb-8">
							<Pressable onPress={goToLogin}>
								<HStack>
									<Text className="text-gray-600">Já tem uma conta? </Text>
									<Text className="text-red-800 font-semibold">Entrar</Text>
								</HStack>
							</Pressable>
						</Box>

						<Box className="items-center mt-auto mb-8">
							<Image
								source={require('../../../assets/icon.png')}
								className="w-12 h-12"
								resizeMode="contain"
								alt="Vinnote Logo"
							/>
						</Box>
					</Box>
				</ScrollView>
			</KeyboardAvoidingView>
		</>
	);
}
