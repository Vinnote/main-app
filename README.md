# Vinnote — Guia para Contribuidores

Vinnote é um aplicativo mobile de degustação de vinhos construído com **React Native + Expo**. Este guia cobre tudo que um novo contribuidor precisa para começar a desenvolver.

---

## Stack Tecnológica

| Área              | Tecnologia                                      |
|-------------------|-------------------------------------------------|
| Framework         | React Native 0.81 + Expo SDK 54                 |
| Linguagem         | TypeScript 5.9                                  |
| Navegação         | expo-router v6 (file-based routing)             |
| Estilização       | NativeWind v4 (Tailwind CSS para RN)            |
| Componentes UI    | Gluestack UI v3                                 |
| Validação         | Zod v4                                          |
| Armazenamento     | AsyncStorage                                    |
| Animações         | React Native Reanimated + @legendapp/motion     |
| Debug             | Reactotron                                      |

---

## Pré-requisitos

- Node.js >= 20, Yarn, qualquer IDE à sua escolha.

## Instalação e Execução

```bash
# 1. Instalar dependências
yarn

# 2. Gerar arquivos nativos (necessário antes de rodar pela primeira vez ou após mudanças em plugins Expo)
yarn prebuild

# 3. Rodar no iOS
yarn ios

# 4. Rodar no Android
yarn android

# 5. Rodar no Web (modo browser)
yarn web
```

## Estrutura de Pastas

```
main-app/
├── src/
│   ├── app/                    # Lógica da aplicação
│   │   ├── _layout.tsx         # Layout raiz (providers globais)
│   │   ├── index.tsx           # Ponto de entrada (onboarding vs. login)
│   │   ├── screens/            # Telas da aplicação
│   │   │   ├── LoginScreen.tsx
│   │   │   ├── OnboardingScreen.tsx
│   │   │   ├── feed.tsx
│   │   │   ├── discover.tsx
│   │   │   ├── new.tsx
│   │   │   ├── search.tsx
│   │   │   └── profile.tsx
│   │   ├── hooks/              # Custom hooks
│   │   │   ├── useAuth.ts      # Autenticação (login, register, logout)
│   │   │   └── useFeed.ts      # Feed de degustações com paginação
│   │   ├── navigation/
│   │   │   └── BottomTabBar.tsx
│   │   ├── mocks/              # Dados mock para desenvolvimento
│   │   └── types/
│   │       ├── index.tsx       # Schemas Zod + tipos da aplicação
│   │       └── auth.ts         # DTOs de autenticação
│   ├── infrastructure/
│   │   ├── api.ts              # Cliente HTTP (fetch wrapper + endpoints)
│   │   └── tokenStorage.ts     # Persistência via AsyncStorage
│   └── global.css              # Estilos globais Tailwind
├── components/
│   └── ui/                     # Componentes Gluestack re-exportados
│       ├── box/, text/, button/, input/, ...
│       └── gluestack-ui-provider/
├── assets/images/
├── tailwind.config.js
└── app.json
```

## Arquitetura

### Fluxo de Autenticação

```
index.tsx
  ├─ tokenStorage.isOnboardingDone() == false → OnboardingScreen
  └─ tokenStorage.isOnboardingDone() == true  → LoginScreen
       └─ useAuth.login()
            ├─ authApi.login() → recebe { accessToken, refreshToken }
            ├─ tokenStorage.setToken() / setRefreshToken()
            ├─ authApi.getMe()  → UserDto
            └─ router.replace("/screens/feed")
```

### Camada de Infraestrutura

- **`api.ts`** — Todos os requests passam por `request<T>()`, que injeta o `Bearer token` automaticamente. URL base: `https://vinnote-api.up.railway.app/api/v1`.
- **`tokenStorage.ts`** — Abstração do AsyncStorage. Gerencia `access_token`, `refresh_token`, `user_data` e `onboarding_done`.

### Tipos e Validação

`src/app/types/index.tsx` define todos os schemas Zod (Tasting, User, WineType, etc.). Ao criar novos endpoints, adicione os schemas e use `z.infer<typeof Schema>` como tipo TypeScript.

## Convenções de Código

### Estilização

Use **NativeWind** com classes Tailwind diretamente nos componentes:

```tsx
<Box className="flex-1 px-6 bg-white">
  <Text className="text-primary-700 font-semibold">Olá</Text>
</Box>
```

Cores do tema são definidas em `tailwind.config.js` como variáveis CSS.

### Componentes UI

Sempre importe de `@/components/ui/*` (wrappers Gluestack), não diretamente do React Native:

```tsx
// ✅ Correto
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

// ❌ Evitar
import { View, Text } from "react-native";
```

### Hooks de Estado

Lógica de negócio fica em `src/app/hooks/`. Não coloque chamadas de API diretamente dentro de componentes.

```tsx
// ✅ Correto
const { login, isLoading, error } = useAuth();

// ❌ Evitar
const res = await fetch('/api/login', ...); // dentro de componente
```

### Navegação

Use `expo-router` com o `router` importado:

```tsx
import { router } from "expo-router";
router.replace("/screens/feed");
router.push("/screens/profile");
```

## Debug com Reactotron

O Reactotron é inicializado automaticamente em modo `__DEV__`. Para usá-lo:

1. Instale o app [Reactotron](https://github.com/infinitered/reactotron/releases) no seu Mac.
2. Inicie o app normalmente; a conexão é feita automaticamente.
3. Inspecione logs, estado e requests de rede pela interface do Reactotron.

## Lint

```bash
yarn lint
```

Configuração em `eslint.config.js` (herda de `eslint-config-expo`).

## Variáveis de Ambiente

Não há arquivo `.env` configurado atualmente. A URL da API está definida diretamente em `src/infrastructure/api.ts`:

```ts
const BASE_URL = 'https://vinnote-api.up.railway.app/api/v1';
```

Para adicionar variáveis de ambiente, use o mecanismo de `extra` do `app.json` + `expo-constants`.

## Fluxo para Adicionar uma Nova Tela

1. Crie o arquivo em `src/app/screens/NomeDaTela.tsx`.
2. Defina e exporte o componente como `default`.
3. Navegue para ela com `router.push("/screens/NomeDaTela")`.
4. Se precisar de dados remotos, crie um hook em `src/app/hooks/useNomeDaTela.ts` e adicione os endpoints em `src/infrastructure/api.ts`.
5. Valide os dados com schemas Zod em `src/app/types/index.tsx`.