import { useState } from "react";
import {
    Image,
    Pressable,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
} from "react-native";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        console.log("Login", { email, password, rememberMe });
        // Implementar lógica de login aqui
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
                    <View className="flex-1 px-6 pt-20">
                        {/* Header */}
                        <View className="items-center mb-12">
                            <Text className="text-gray-900 text-2xl font-bold mb-2">
                                Bem-vindo de volta
                            </Text>
                            <Text className="text-gray-500 text-sm">
                                Acesse sua conta para continuar
                            </Text>
                        </View>

                        {/* Email Input */}
                        <View className="mb-4">
                            <Text className="text-gray-900 text-sm font-medium mb-2">
                                E-mail
                            </Text>
                            <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4">
                                <View className="mr-3">
                                    <Text className="text-gray-400 text-xl">✉️</Text>
                                </View>
                                <TextInput
                                    className="flex-1 text-gray-900 text-base"
                                    placeholder="Seu e-mail"
                                    placeholderTextColor="#9CA3AF"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>
                        </View>

                        {/* Password Input */}
                        <View className="mb-4">
                            <Text className="text-gray-900 text-sm font-medium mb-2">
                                Senha
                            </Text>
                            <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4">
                                <View className="mr-3">
                                    <Text className="text-gray-400 text-xl">🔒</Text>
                                </View>
                                <TextInput
                                    className="flex-1 text-gray-900 text-base"
                                    placeholder="Sua senha"
                                    placeholderTextColor="#9CA3AF"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                <Pressable
                                    onPress={() => setShowPassword(!showPassword)}
                                    className="ml-2"
                                >
                                    <Text className="text-gray-400 text-xl">
                                        {showPassword ? "👁️" : "👁️‍🗨️"}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>

                        {/* Remember Me & Forgot Password */}
                        <View className="flex-row items-center justify-between mb-8">
                            <Pressable
                                onPress={() => setRememberMe(!rememberMe)}
                                className="flex-row items-center"
                            >
                                <View
                                    className={`w-5 h-5 rounded border-2 ${rememberMe
                                            ? "bg-red-800 border-red-800"
                                            : "bg-white border-gray-300"
                                        } mr-2 items-center justify-center`}
                                >
                                    {rememberMe && <Text className="text-white text-xs">✓</Text>}
                                </View>
                                <Text className="text-gray-600 text-sm">Lembrar de mim</Text>
                            </Pressable>

                            <Pressable onPress={handleForgotPassword}>
                                <Text className="text-red-800 text-sm font-medium">
                                    Esqueceu a senha?
                                </Text>
                            </Pressable>
                        </View>

                        {/* Login Button */}
                        <Pressable
                            onPress={handleLogin}
                            className="bg-red-800 rounded-full py-4 mb-6 active:opacity-80"
                        >
                            <Text className="text-white text-center text-base font-semibold">
                                Entrar
                            </Text>
                        </Pressable>

                        {/* Divider */}
                        <View className="flex-row items-center mb-6">
                            <View className="flex-1 h-px bg-gray-200" />
                            <Text className="text-gray-400 text-sm px-4">ou continue com</Text>
                            <View className="flex-1 h-px bg-gray-200" />
                        </View>

                        {/* Google Login Button */}
                        <Pressable
                            onPress={handleGoogleLogin}
                            className="flex-row items-center justify-center bg-white border border-gray-200 rounded-full py-4 mb-8 active:bg-gray-50"
                        >
                            <Image
                                source={{
                                    uri: "https://www.google.com/favicon.ico",
                                }}
                                className="w-5 h-5 mr-2"
                            />
                            <Text className="text-gray-900 text-base font-medium">Google</Text>
                        </Pressable>

                        {/* Register Link */}
                        <View className="items-center mb-8">
                            <Pressable onPress={handleRegister}>
                                <Text className="text-center text-base">
                                    <Text className="text-gray-600">
                                        Ainda não tem uma conta?{" "}
                                    </Text>
                                    <Text className="text-red-800 font-semibold">
                                        Cadastrar-se
                                    </Text>
                                </Text>
                            </Pressable>
                        </View>

                        {/* Footer Icon */}
                        <View className="items-center mt-auto mb-8">
                            <Image
                                source={require("../../../assets/icon.png")}
                                className="w-12 h-12"
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}
