import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "@/components/ui/image";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import { useRegister } from "@/src/app/hooks/useRegister";

export default function RegisterScreen() {
	const insets = useSafeAreaInsets();
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
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className="flex-1 bg-white"
			>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
					keyboardShouldPersistTaps="handled"
				>
					<Box className="flex-1 px-6 pt-12">
						<VStack className="items-center mb-10">
							<Heading size="2xl" className="text-gray-900 mb-2 font-outfit-bold">
								Criar conta
							</Heading>
							<Text size="sm" className="text-gray-500 font-outfit">
								Cadastre-se para começar a usar o Vinnote
							</Text>
						</VStack>

						<VStack className="mb-4 items-center">
							<Box className="w-[303px]">
								<Text size="sm" className="text-gray-900 font-outfit-medium mb-2">
									Nome
								</Text>
								<Input
									variant="outline"
									size="xl"
									className="bg-[#F7F5F8] border-gray-200 h-[3.5rem] w-[21.5rem] rounded-[14px]"
								>
									<InputSlot className="pl-4">
										<User size={20} color="#A8A1AC" />
									</InputSlot>
									<InputField
										placeholder="Seu nome"
										placeholderTextColor="#A8A1AC"
										value={form.name}
										onChangeText={(text) => setField("name", text)}
										autoCapitalize="words"
										autoCorrect={false}
										className="text-gray-900 font-outfit"
									/>
								</Input>
							</Box>
						</VStack>

						<VStack className="mb-4 items-center">
							<Box className="w-[303px]">
								<Text size="sm" className="text-gray-900 font-outfit-medium mb-2">
									E-mail
								</Text>
								<Input
									variant="outline"
									size="xl"
									className="bg-[#F7F5F8] border-gray-200 h-[3.5rem] w-[21.5rem] rounded-[14px]"
								>
									<InputSlot className="pl-4">
										<Mail size={20} color="#A8A1AC" />
									</InputSlot>
									<InputField
										placeholder="Seu e-mail"
										placeholderTextColor="#A8A1AC"
										value={form.email}
										onChangeText={(text) => setField("email", text)}
										keyboardType="email-address"
										autoCapitalize="none"
										autoCorrect={false}
										className="text-gray-900 font-outfit"
									/>
								</Input>
							</Box>
						</VStack>

						<VStack className="mb-4 items-center">
							<Box className="w-[303px]">
								<Text size="sm" className="text-gray-900 font-outfit-medium mb-2">
									Senha
								</Text>
								<Input
									variant="outline"
									size="xl"
									className="bg-[#F7F5F8] border-gray-200 h-[3.5rem] w-[21.5rem] rounded-[14px]"
								>
									<InputSlot className="pl-4">
										<Lock size={20} color="#A8A1AC" />
									</InputSlot>
									<InputField
										placeholder="Crie uma senha"
										placeholderTextColor="#A8A1AC"
										value={form.password}
										onChangeText={(text) => setField("password", text)}
										secureTextEntry={!showPassword}
										autoCapitalize="none"
										autoCorrect={false}
										className="text-gray-900 font-outfit"
									/>
									<InputSlot className="pr-4">
										<Pressable onPress={() => setShowPassword(!showPassword)}>
											{showPassword ? (
												<Eye size={20} color="#A8A1AC" />
											) : (
												<EyeOff size={20} color="#A8A1AC" />
											)}
										</Pressable>
									</InputSlot>
								</Input>
							</Box>
						</VStack>

						<VStack className="mb-4 items-center">
							<Box className="w-[303px]">
								<Text size="sm" className="text-gray-900 font-outfit-medium mb-2">
									Confirmar senha
								</Text>
								<Input
									variant="outline"
									size="xl"
									className="bg-[#F7F5F8] border-gray-200 h-[3.5rem] w-[21.5rem] rounded-[14px]"
								>
									<InputSlot className="pl-4">
										<Lock size={20} color="#A8A1AC" />
									</InputSlot>
									<InputField
										placeholder="Repita sua senha"
										placeholderTextColor="#A8A1AC"
										value={form.confirmPassword}
										onChangeText={(text) => setField("confirmPassword", text)}
										secureTextEntry={!showConfirmPassword}
										autoCapitalize="none"
										autoCorrect={false}
										className="text-gray-900 font-outfit"
									/>
									<InputSlot className="pr-4">
										<Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
											{showConfirmPassword ? (
												<Eye size={20} color="#A8A1AC" />
											) : (
												<EyeOff size={20} color="#A8A1AC" />
											)}
										</Pressable>
									</InputSlot>
								</Input>
							</Box>
						</VStack>

						<VStack className="mb-8 items-center">
							<Box className="w-[303px]">
								<Text size="sm" className="text-gray-900 font-outfit-medium mb-2">
									Tipo de usuário
								</Text>
								<HStack className="w-[303px] justify-between gap-2">
									<Pressable
										onPress={() => setField("userType", "ENTHUSIAST")}
										className={`h-[48px] w-[147px] items-center justify-center rounded-[14px] border ${
											form.userType === "ENTHUSIAST"
												? "border-[#770733] bg-[#FFF7FA]"
												: "border-gray-200 bg-[#F7F5F8]"
										}`}
									>
										<Text
											size="sm"
											className={`font-outfit-medium ${
												form.userType === "ENTHUSIAST" ? "text-[#770733]" : "text-gray-600"
											}`}
										>
											Entusiasta
										</Text>
									</Pressable>

									<Pressable
										onPress={() => setField("userType", "SOMMELIER")}
										className={`h-[48px] w-[147px] items-center justify-center rounded-[14px] border ${
											form.userType === "SOMMELIER"
												? "border-[#770733] bg-[#FFF7FA]"
												: "border-gray-200 bg-[#F7F5F8]"
										}`}
									>
										<Text
											size="sm"
											className={`font-outfit-medium ${
												form.userType === "SOMMELIER" ? "text-[#770733]" : "text-gray-600"
											}`}
										>
											Sommelier
										</Text>
									</Pressable>
								</HStack>
							</Box>
						</VStack>

						<Box className="items-center mb-6">
							<Button
								onPress={submit}
								variant="solid"
								size="xl"
								className="rounded-full w-[327px] h-[56px] bg-[#770733] active:opacity-80"
								disabled={isLoading || !isValidForm}
							>
								{isLoading ? (
									<ActivityIndicator color="#FFFFFF" />
								) : (
									<ButtonText className="text-white text-base font-outfit-semibold">
										Criar conta
									</ButtonText>
								)}
							</Button>
						</Box>

						{error ? (
							<Box className="mb-4">
								<Text className="text-red-600 text-center text-sm font-outfit">{error}</Text>
							</Box>
						) : null}

						<Box className="items-center mb-8">
							<Pressable onPress={goToLogin}>
								<HStack>
									<Text className="text-gray-600 font-outfit">Já tem uma conta? </Text>
									<Text className="text-[#770733] font-outfit-semibold">Entrar</Text>
								</HStack>
							</Pressable>
						</Box>

						<Box className="items-center mt-auto mb-10">
							<Image
								source={require("../../../assets/images/logo-vinnote-red.png")}
								className="w-8"
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
