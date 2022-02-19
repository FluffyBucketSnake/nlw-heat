import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSessions from "expo-auth-session";
import Constants from "expo-constants";

import { api } from "../services/api";

const USER_STORAGE = "@nlwheat:user";
const TOKEN_STORAGE = "@nlwheat:token";

type User = {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
}

type AuthContextData = {
    user: User | null;
    isSigningIn: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
    children: React.ReactNode;
}

type AuthResponse = {
    token: string;
    user: User;
}

type AuthorizationResponse = {
    params: {
        code?: string;
        error?: string;
    };
    type?: string;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isSigningIn, setIsSigningIn] = useState(true);

    async function signIn() {
        try {
            setIsSigningIn(true);
            const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
            const SCOPE = "read:user";

            const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=${SCOPE}`;
            const authSessionResponse = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse;

            if (authSessionResponse.type === "success" &&
                authSessionResponse.params.error !== "access_denied") {
                const authResponse = await api.post<AuthResponse>(
                    "/authenticate", 
                    { code: authSessionResponse.params.code },
                );
                const { user, token } = authResponse.data;

                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
                await AsyncStorage.setItem(TOKEN_STORAGE, token);

                setUser(user);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSigningIn(false);
        }

    }

    async function signOut() {
        await AsyncStorage.removeItem(USER_STORAGE);
        await AsyncStorage.removeItem(TOKEN_STORAGE);
        setUser(null);
    }

    useEffect(() => {
        async function loadUserStorageData() {
            const user = await AsyncStorage.getItem(USER_STORAGE);
            const token = await AsyncStorage.getItem(TOKEN_STORAGE);

            if (user && token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setUser(JSON.parse(user));
            }

            setIsSigningIn(false);
        }

        loadUserStorageData();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            isSigningIn,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}