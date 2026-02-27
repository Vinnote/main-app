# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

Install dependencies

   ```bash
   yarn install
   ```

## Feed mock mode (test)

To run the feed using local mock data instead of the API, set this env var before starting Expo:

```bash
EXPO_PUBLIC_USE_FEED_MOCKS=true
```

Then start the app normally:

```bash
yarn start
```

When `EXPO_PUBLIC_USE_FEED_MOCKS` is `true`, the `useFeed` hook uses `src/app/mocks/feedMocks.ts`.