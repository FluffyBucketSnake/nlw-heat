import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, ColorValue, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { styles } from "./styles";

type Props = TouchableOpacityProps & {
    text: string;
    color: ColorValue;
    backgroundColor: ColorValue;
    icon?: React.ComponentProps<typeof AntDesign>['name'];
    isLoading?: boolean;
}

export function Button({
    text,
    color,
    backgroundColor,
    icon,
    isLoading = false,
    ...rest
}: Props) {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor }
            ]}
            activeOpacity={0.7}
            disabled={isLoading}
            {...rest}
        >
            {
                isLoading ?
                    <ActivityIndicator color={color} /> :
                    <>
                        {icon && <AntDesign name={icon} size={24} style={styles.icon} />}
                        <Text style={[styles.text, { color }]}>
                            {text}
                        </Text>
                    </>
            }
        </TouchableOpacity>
    );
}   