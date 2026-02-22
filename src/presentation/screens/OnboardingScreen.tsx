import { tokenStorage } from "../../infrastructure/tokenStorage";
import { ImageBackground, Pressable, Text, View, StatusBar } from "react-native";
import { router } from "expo-router";

export default function OnboardingScreen() {
  const handleCreateAccount = async () => {
    await tokenStorage.setOnboardingDone();
    // Força recarregamento para ir para a tela de login
    router.replace("/");
  };

  const handleLogin = async () => {
    await tokenStorage.setOnboardingDone();
    // Força recarregamento para ir para a tela de login
    router.replace("/");
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View className="flex-1">
        <ImageBackground
          source={require("../../../assets/images/wine-share.png")}
          className="flex-1"
          resizeMode="cover"
        >
          {/* Overlay escuro para melhor legibilidade */}
          <View className="flex-1 bg-black/50">
            {/* Conteúdo centralizado */}
            <View className="flex-1 justify-center items-center px-6">
              {/* Logo e tagline */}
              <View className="items-center mb-auto mt-32">
                <Text className="text-white text-4xl font-bold tracking-widest mb-4">
                  VINNOTE
                </Text>
                <Text className="text-white text-base font-light text-center">
                  Eleve sua degustação a outro nível.
                </Text>
              </View>

              {/* Botões na parte inferior */}
              <View className="w-full mb-24 gap-4">
                <Pressable
                  onPress={handleCreateAccount}
                  className="bg-white rounded-full py-4 px-8"
                >
                  <Text className="text-gray-900 text-center text-base font-semibold">
                    Criar minha conta
                  </Text>
                </Pressable>

                <Pressable
                  onPress={handleLogin}
                  className="bg-red-800 rounded-full py-4 px-8"
                >
                  <Text className="text-white text-center text-base font-semibold">
                    Entrar
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}
