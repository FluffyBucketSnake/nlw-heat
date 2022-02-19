import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

import LogoSvg from "../../assets/logo.svg";
import { UserImage } from "../UserImage";
import { useAuth } from "../../hooks/auth";

export function Header() {
    const { user, signOut } = useAuth();

    return (
        <View style={styles.container}>
            <LogoSvg />

            <View style={styles.user}>
                {
                    user &&
                    <TouchableOpacity onPress={signOut}>
                        <Text style={styles.logoutText}>
                            Sair
                        </Text>
                    </TouchableOpacity>
                }
                <UserImage imageUri={user?.avatar_url} />
            </View>
        </View>
    );
}