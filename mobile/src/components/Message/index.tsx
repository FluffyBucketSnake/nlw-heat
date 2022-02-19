import { MotiView } from "@motify/components";
import React from "react";

import { Text, View } from "react-native";
import { UserImage } from "../UserImage";

import { styles } from "./styles";

export type MessageData = {
    id: string;
    text: string;
    author: {
        name: string;
        avatar_url: string;
    };
};

type Props = {
    data: MessageData;
}

export function Message({ data }: Props) {
    return (
        <MotiView 
            from={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 700 }}
            style={styles.container}
        >
            <Text style={styles.message}>
                {data.text}
            </Text>

            <View style={styles.footer}>
                <UserImage imageUri={data.author.avatar_url} sizes="SMALL" />
                <Text style={styles.userName}>{data.author.name}</Text>
            </View>
        </MotiView>
    );
}