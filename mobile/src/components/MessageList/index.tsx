import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { io } from "socket.io-client";

import { api } from "../../services/api";
import { Message, MessageData } from "../Message";

import { styles } from "./styles";

let messagesQueue: MessageData[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on("new_message", (newMessage: MessageData) => {
    messagesQueue.push(newMessage);
});

export function MessageList() {
    const [messages, setMessages] = useState<MessageData[]>([]);

    useEffect(() => {
        async function fetchMessages() {
            const messagesResponse = await api.get<MessageData[]>('/messages');
            setMessages(messagesResponse.data);
        }
        fetchMessages();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (messagesQueue.length > 0) {
                setMessages(prevMessages => [
                    messagesQueue[0],
                    prevMessages[0],
                    prevMessages[1],
                ]);
                messagesQueue.shift();
            }

            return () => clearInterval(timer);
        }, 3000);
    }, []);

    return (<ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="never"
    >
        {messages.map((message) => <Message key={message.id} data={message} />)}
    </ScrollView>
    );
}