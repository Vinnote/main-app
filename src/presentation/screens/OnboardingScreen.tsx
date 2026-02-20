import { tokenStorage } from "@infra/storage/tokenStorage";
import { BrandLogo } from "@presentation/components";
import EmailSignUpButton from "@presentation/components/ui/buttons/EmailSignUpButton";
import PrimaryButton from "@presentation/components/ui/buttons/PrimaryButton";
import Typography from "@presentation/components/ui/Typography";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Fácil de comprar planos de dados e créditos",
      subtitle: "Experiência simples para comprar dados e obter muitos descontos",
      icon: "📱",
    },
    {
      title: "Fácil de controlar seu uso de dados",
      subtitle: "Controle sempre quanto de dados você usa todos os dias",
      icon: "📊",
    },
    {
      title: "Entre e comece",
      subtitle: "Escolha como você quer acessar sua conta",
      icon: "🔐",
    },
  ];

  const isLast = currentSlide === slides.length - 1;

  const handleNext = async () => {
    if (!isLast) {
      setCurrentSlide(currentSlide + 1);
    } else {
      await tokenStorage.setOnboardingDone();
      // @ts-ignore
      navigation.navigate("Login");
    }
  };

  const handleSkip = async () => {
    await tokenStorage.setOnboardingDone();
    // @ts-ignore
    navigation.navigate("Login");
  };

  return (
    <View className="flex-1 bg-light-50 dark:bg-dark-100">
      {/* Top hero section (hidden on last slide) */}
      {!isLast && (
        <View className="h-[455px] bg-primary-500 relative">
          {/* Status/Top bar placeholder & Skip */}
          <View className="flex-row justify-end pt-16 px-6 absolute top-0 right-0 z-20">
            <Pressable onPress={handleSkip}>
              <Text className="text-white font-medium text-base">Pular</Text>
            </Pressable>
          </View>
          {/* Centered phone graphic */}
          <View className="flex-1 justify-end items-center">
            <Image
              source={require("../../../assets/images/onboarding-phone-background.png")}
              className="w-[95%] h-[80%]"
              resizeMode="contain"
            />
          </View>
        </View>
      )}

      {/* Bottom content section */}
      <View
        className={
          isLast
            ? "bg-light-50 dark:bg-dark-100 pt-16 px-6 flex-1"
            : "-mt-8 bg-light-50 dark:bg-dark-100 rounded-t-3xl pt-8"
        }
      >
        <View className="w-[327px] self-center flex">
          {/* Title / Subtitle (special layout on last slide) */}
          {isLast ? (
            <View className="w-[327px] self-center justify-center h-full gap-10  ">
              <View className="items-center mb-2">
                <BrandLogo
                  variant="default"
                  size="xl"
                  height={265}
                  width={265}
                  showTextFallback={true}
                />
              </View>
              <Typography
                variant="h1"
                weight="bold"
                colorClassName="text-gray-900 dark:text-light-50 text-center mb-3"
              >
                Vamos Começar
              </Typography>
              <Typography
                variant="subtitle"
                weight="regular"
                colorClassName="text-gray-600 dark:text-light-50 text-center leading-6 mb-6"
              >
                Encontre o plano de dados ideal e o que você precisa na sua cota
              </Typography>
              {/* Email */}
              <EmailSignUpButton
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate("Login", { initialTab: "first" });
                }}
              />

              {/* <Text className="text-gray-500 dark:text-light-50 text-center mb-4 font-outfit">
                Ou use cadastro instantâneo
              </Text> */}
              <View className="flex justify-between gap-4">
                {/* Google */}
                {/* <SocialLoginButton
                  provider="google"
                  onPress={() => {
                    // @ts-ignore
                    navigation.navigate("Login");
                  }}
                  text="Cadastrar com Google"
                  variant="onboarding"
                /> */}

                {/* Apple */}
                {/* <SocialLoginButton
                  provider="apple"
                  onPress={() => {
                    // @ts-ignore
                    navigation.navigate("Login");
                  }}
                  text="Cadastrar com Apple"
                  variant="onboarding"
                /> */}
                <View className="items-center pb-3">
                  <Pressable
                    onPress={() => {
                      // @ts-ignore
                      navigation.navigate("Login");
                    }}
                  >
                    <Text className="text-center text-base">
                      <Text className="text-gray-600 dark:text-light-50 font-outfit">
                        Já tem uma conta?{" "}
                      </Text>
                      <Text className="text-secondary-700 dark:text-light-50 font-medium">
                        Entrar
                      </Text>
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ) : (
            <View className="w-[327px] self-center ">
              <Typography
                variant="h1"
                weight="bold"
                colorClassName={`text-gray-900 dark:text-light-50 text-center ${isLast ? "mb-3" : "mb-4"
                  }`}
              >
                {slides[currentSlide].title}
              </Typography>
              <Typography
                variant="subtitle"
                weight="regular"
                colorClassName={`text-gray-600 dark:text-light-50 text-center leading-6 ${isLast ? "mb-10" : "mb-12"
                  }`}
              >
                {slides[currentSlide].subtitle}
              </Typography>
            </View>
          )}

          {/* Progress Indicators (optional to keep on last; remove if not desired) */}
          {!isLast && (
            <View className="flex-row justify-center mb-8">
              {slides.map((_, index) => (
                <View
                  key={index}
                  className={`mx-1 h-2 w-2 rounded-full ${index === currentSlide ? "bg-primary-500" : "bg-gray-300 dark:bg-light-50"
                    }`}
                />
              ))}
            </View>
          )}

          {/* CTA(s) */}
          {!isLast && (
            <PrimaryButton onPress={handleNext} text="Próximo" variant="primary" />
          )}
        </View>
      </View>
    </View>
  );
}
