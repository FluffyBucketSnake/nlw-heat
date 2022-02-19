import React, { useState } from "react";
import { Alert, Keyboard, TextInput, View } from "react-native";
import { api } from "../../services/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from "./styles";

export function SendMessageForm() {
    const [message, setMessage] = useState('');
    const [sendingMessage, setSendingMessage] = useState(false);

    async function handleMessageSubmit() {
        setSendingMessage(true);

        const formattedMessage = message.trim();

        if (!formattedMessage) {
            Alert.alert("Preencha o campo antes de enviar uma mensagem.");
            setSendingMessage(false);
            return;
        }

        await api.post("/messages", { message: formattedMessage });
        setMessage("");
        Keyboard.dismiss();
        Alert.alert("Mensagem enviada com sucesso.");

        setSendingMessage(false);
    }

    return (
            <View style={styles.container}>
                <TextInput
                    keyboardAppearance="dark"
                    placeholder="Qual é sua expectativa para o evento?"
                    placeholderTextColor={COLORS.GRAY_PRIMARY}
                    maxLength={140}
                    onChangeText={setMessage}
                    value={message}
                    style={styles.input}
                    editable={!sendingMessage}
                />
                <Button
                    text="ENVIAR MENSAGEM"
                    backgroundColor={COLORS.PINK}
                    color={COLORS.WHITE}
                    isLoading={sendingMessage}
                    onPress={handleMessageSubmit}
                />
            </View>
    );
}