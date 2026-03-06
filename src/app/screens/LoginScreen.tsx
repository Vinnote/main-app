import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from "@/components/ui/checkbox";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "@/components/ui/image";
import { CheckIcon, Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import { useAuth } from "@/src/app/hooks/useAuth";
import { tokenStorage } from "@/src/infrastructure/tokenStorage";

export default function LoginScreen() {
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login, isLoading, error, clearError } = useAuth();

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Erro", "Preencha o e-mail e a senha.");
            return;
        }

        const result = await login(email.trim(), password);

        if (result.success) {
            router.replace("/screens/feed");
        } else {
            Alert.alert("Erro ao entrar", result.message);
        }
    };

    const handleGoogleLogin = () => {
        console.log("Google Login");
        // Implementar lógica de login com Google aqui
    };

    const handleRegister = async () => {
        await tokenStorage.setOnboardingDone();
        router.push("/screens/RegisterScreen");
    };

    const handleForgotPassword = () => {
        console.log("Navigate to Forgot Password");
        // Navegar para tela de recuperação de senha
    };

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
                        {/* Header */}
                        <VStack className="items-center mb-12">
                            <Heading size="2xl" className="text-gray-900 mb-2 font-outfit-bold">
                                Bem-vindo de volta
                            </Heading>
                            <Text size="sm" className="text-gray-500 font-outfit">
                                Acesse sua conta para continuar
                            </Text>
                        </VStack>

                        {/* Email Input */}
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
                                        placeholder="exemplo@email.com"
                                        placeholderTextColor="#9CA3AF"
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        className="text-gray-900 font-outfit"
                                    />
                                </Input>
                            </Box>
                        </VStack>

                        {/* Password Input */}
                        <VStack className="mb-4 items-center">
                            <Box className="">
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
                                        placeholder="senha"
                                        placeholderTextColor="#A8A1AC"
                                        value={password}
                                        onChangeText={setPassword}
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

                        {/* Remember Me & Forgot Password */}
                        <HStack className="items-center justify-between mb-8 self-center w-[303px]">
                            <Checkbox
                                value="rememberMe"
                                isChecked={rememberMe}
                                onChange={setRememberMe}
                                size="md"
                            >
                                <CheckboxIndicator className="border-gray-300 data-[checked=true]:bg-[#770733] data-[checked=true]:border-[#770733]">
                                    <CheckboxIcon as={CheckIcon} className="text-white" />
                                </CheckboxIndicator>
                                <CheckboxLabel className="text-gray-600 text-sm font-outfit">
                                    Lembrar de mim
                                </CheckboxLabel>
                            </Checkbox>

                            <Pressable onPress={handleForgotPassword}>
                                <Text size="sm" className="text-[#770733] font-outfit-medium">
                                    Esqueceu a senha?
                                </Text>
                            </Pressable>
                        </HStack>

                        {/* Login Button */}
                        <Box className="items-center mb-6">
                            <Button
                                onPress={handleLogin}
                                variant="solid"
                                size="xl"
                                className="rounded-full w-[327px] h-[56px] bg-[#770733] active:opacity-80"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#FFFFFF" />
                                ) : (
                                    <ButtonText className="text-white text-base font-outfit-semibold">
                                        Entrar
                                    </ButtonText>
                                )}
                            </Button>
                        </Box>

                        {/* Error message */}
                        {error ? (
                            <Box className="mb-4">
                                <Text className="text-red-600 text-center text-sm font-outfit">
                                    {error}
                                </Text>
                            </Box>
                        ) : null}

                        {/* Divider */}
                        <HStack className="items-center mb-6 self-center w-[327px]">
                            <Box className="flex-1 h-px bg-gray-200" />
                            <Text size="sm" className="text-gray-400 px-4 font-outfit">
                                ou continue com
                            </Text>
                            <Box className="flex-1 h-px bg-gray-200" />
                        </HStack>

                        {/* Google Login Button */}
                        <Box className="items-center mb-8">
                            <Button
                                onPress={handleGoogleLogin}
                                variant="outline"
                                size="xl"
                                className="rounded-full w-[327px] h-[56px] border-gray-200"
                            >
                                <Image
                                    source={{
                                        uri: "https://www.google.com/favicon.ico",
                                    }}
                                    className="w-5 h-5 mr-2"
                                    alt="Google"
                                />
                                <ButtonText className="text-gray-900 text-base font-outfit-medium">
                                    Google
                                </ButtonText>
                            </Button>
                        </Box>

                        {/* Register Link */}
                        <Box className="items-center mb-8">
                            <Pressable onPress={handleRegister}>
                                <HStack>
                                    <Text className="text-gray-600 font-outfit">
                                        Ainda não tem uma conta?{" "}
                                    </Text>
                                    <Text className="text-[#770733] font-outfit-semibold">
                                        Cadastrar-se
                                    </Text>
                                </HStack>
                            </Pressable>
                        </Box>

                        {/* Footer Icon */}
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
