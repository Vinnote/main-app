import { tokenStorage } from "../../infrastructure/tokenStorage";
import { ImageBackground, StatusBar } from "react-native";
import { router } from "expo-router";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Button, ButtonText } from "@/components/ui/button";

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
      <Box className="flex-1">
        <ImageBackground
          source={require("../../../assets/images/wine-share.png")}
          className="flex-1"
          resizeMode="cover"
        >
          {/* Overlay escuro para melhor legibilidade */}
          <Box className="flex-1 bg-black/50">
            {/* Conteúdo centralizado */}
            <Box className="flex-1 justify-center items-center px-6">
              {/* Logo e tagline */}
              <VStack className="items-center mb-auto mt-32">
                <Heading size="4xl" className="text-white tracking-widest mb-4">
                  VINNOTE
                </Heading>
                <Text size="md" className="text-white font-light text-center">
                  Eleve sua degustação a outro nível.
                </Text>
              </VStack>

              {/* Botões na parte inferior */}
              <VStack className="w-full mb-24 gap-4">
                <Button
                  onPress={handleCreateAccount}
                  className="bg-white rounded-full py-4 px-8"
                  size="xl"
                >
                  <ButtonText className="text-gray-900 text-base font-semibold">
                    Criar minha conta
                  </ButtonText>
                </Button>

                <Button
                  onPress={handleLogin}
                  className="bg-red-800 rounded-full py-4 px-8"
                  size="xl"
                >
                  <ButtonText className="text-white text-base font-semibold">
                    Entrar
                  </ButtonText>
                </Button>
              </VStack>
            </Box>
          </Box>
        </ImageBackground>
      </Box>
    </>
  );
}
