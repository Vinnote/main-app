import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
} from "react-native";
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
import { CheckIcon } from "lucide-react-native";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        console.log("Login", { email, password, rememberMe });
        router.replace("/(tabs)/feed");
    };

    const handleGoogleLogin = () => {
        console.log("Google Login");
        // Implementar lógica de login com Google aqui
    };

    const handleRegister = () => {
        console.log("Navigate to Register");
        // Navegar para tela de cadastro
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
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Box className="flex-1 px-6 pt-20">
                        {/* Header */}
                        <VStack className="items-center mb-12">
                            <Heading size="2xl" className="text-gray-900 mb-2">
                                Bem-vindo de volta
                            </Heading>
                            <Text size="sm" className="text-gray-500">
                                Acesse sua conta para continuar
                            </Text>
                        </VStack>

                        {/* Email Input */}
                        <VStack className="mb-4">
                            <Text size="sm" className="text-gray-900 font-medium mb-2">
                                E-mail
                            </Text>
                            <Input
                                variant="rounded"
                                size="xl"
                                className="bg-gray-50 border-gray-200"
                            >
                                <InputSlot className="pl-4">
                                    <Text className="text-gray-400 text-xl">✉️</Text>
                                </InputSlot>
                                <InputField
                                    placeholder="Seu e-mail"
                                    placeholderTextColor="#9CA3AF"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    className="text-gray-900"
                                />
                            </Input>
                        </VStack>

                        {/* Password Input */}
                        <VStack className="mb-4">
                            <Text size="sm" className="text-gray-900 font-medium mb-2">
                                Senha
                            </Text>
                            <Input
                                variant="rounded"
                                size="xl"
                                className="bg-gray-50 border-gray-200"
                            >
                                <InputSlot className="pl-4">
                                    <Text className="text-gray-400 text-xl">🔒</Text>
                                </InputSlot>
                                <InputField
                                    placeholder="Sua senha"
                                    placeholderTextColor="#9CA3AF"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    className="text-gray-900"
                                />
                                <InputSlot className="pr-4">
                                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                                        <Text className="text-gray-400 text-xl">
                                            {showPassword ? "👁️" : "👁️‍🗨️"}
                                        </Text>
                                    </Pressable>
                                </InputSlot>
                            </Input>
                        </VStack>

                        {/* Remember Me & Forgot Password */}
                        <HStack className="items-center justify-between mb-8">
                            <Checkbox
                                value="rememberMe"
                                isChecked={rememberMe}
                                onChange={setRememberMe}
                                size="md"
                            >
                                <CheckboxIndicator className="border-gray-300 data-[checked=true]:bg-red-800 data-[checked=true]:border-red-800">
                                    <CheckboxIcon as={CheckIcon} className="text-white" />
                                </CheckboxIndicator>
                                <CheckboxLabel className="text-gray-600 text-sm">
                                    Lembrar de mim
                                </CheckboxLabel>
                            </Checkbox>

                            <Pressable onPress={handleForgotPassword}>
                                <Text size="sm" className="text-red-800 font-medium">
                                    Esqueceu a senha?
                                </Text>
                            </Pressable>
                        </HStack>

                        {/* Login Button */}
                        <Button
                            onPress={handleLogin}
                            className="bg-red-800 rounded-full py-4 mb-6 active:opacity-80"
                            size="xl"
                        >
                            <ButtonText className="text-white text-base font-semibold">
                                Entrar
                            </ButtonText>
                        </Button>

                        {/* Divider */}
                        <HStack className="items-center mb-6">
                            <Box className="flex-1 h-px bg-gray-200" />
                            <Text size="sm" className="text-gray-400 px-4">
                                ou continue com
                            </Text>
                            <Box className="flex-1 h-px bg-gray-200" />
                        </HStack>

                        {/* Google Login Button */}
                        <Button
                            onPress={handleGoogleLogin}
                            variant="outline"
                            className="rounded-full py-4 mb-8 border-gray-200"
                            size="xl"
                        >
                            <Image
                                source={{
                                    uri: "https://www.google.com/favicon.ico",
                                }}
                                className="w-5 h-5 mr-2"
                                alt="Google"
                            />
                            <ButtonText className="text-gray-900 text-base font-medium">
                                Google
                            </ButtonText>
                        </Button>

                        {/* Register Link */}
                        <Box className="items-center mb-8">
                            <Pressable onPress={handleRegister}>
                                <HStack>
                                    <Text className="text-gray-600">
                                        Ainda não tem uma conta?{" "}
                                    </Text>
                                    <Text className="text-red-800 font-semibold">
                                        Cadastrar-se
                                    </Text>
                                </HStack>
                            </Pressable>
                        </Box>

                        {/* Footer Icon */}
                        <Box className="items-center mt-auto mb-8">
                            <Image
                                source={require("../../../assets/icon.png")}
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
