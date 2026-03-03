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
                <Heading size="4xl" className="text-white mb-4 tracking-wider font-dm-sans-semibold">
                  VINNOTE
                </Heading>
                <Text size="md" className="text-white text-center font-outfit-light">
                  Eleve sua degustação a outro nível.
                </Text>
              </VStack>

              {/* Botões na parte inferior */}
              <VStack className="w-full mb-24 gap-4 items-center">
                <Button
                  onPress={handleCreateAccount}
                  variant="solid"
                  size="xl"
                  className="rounded-full w-[327px] h-[56px] bg-[#F2F1F5]"
                >
                  <ButtonText className="text-[#000000] font-outfit-semibold text-base">
                    Criar minha conta
                  </ButtonText>
                </Button>

                <Button
                  onPress={handleLogin}
                  variant="solid"
                  size="xl"
                  className="rounded-full w-[327px] h-[56px] bg-[#770733]"
                >
                  <ButtonText className="text-white font-outfit-semibold text-base">
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
