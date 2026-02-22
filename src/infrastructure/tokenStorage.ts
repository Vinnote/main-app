import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'access_token';
const USER_KEY = 'user_data';
const ONBOARDING_KEY = 'onboarding_done';

export const tokenStorage = {
    async setToken(token: string): Promise<void> {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    },

    async getToken(): Promise<string | null> {
        return await AsyncStorage.getItem(TOKEN_KEY);
    },

    async removeToken(): Promise<void> {
        await AsyncStorage.removeItem(TOKEN_KEY);
    },

    async setUser(user: any): Promise<void> {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    async getUser(): Promise<any | null> {
        const userData = await AsyncStorage.getItem(USER_KEY);
        return userData ? JSON.parse(userData) : null;
    },

    async removeUser(): Promise<void> {
        await AsyncStorage.removeItem(USER_KEY);
    },

    async clearAll(): Promise<void> {
        await AsyncStorage.multiRemove([
            TOKEN_KEY,
            USER_KEY,
            'user_lines',
            'selected_line',
        ]);
    },

    async setOnboardingDone(): Promise<void> {
        await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    },

    async isOnboardingDone(): Promise<boolean> {
        const value = await AsyncStorage.getItem(ONBOARDING_KEY);
        return value === 'true';
    },
};


