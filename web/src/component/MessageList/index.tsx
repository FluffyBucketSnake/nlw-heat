import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { api } from '../../services/api';

import styles from './styles.module.scss';

import logoImg from '../../assets/logo.svg';

type Message = {
    id: string;
    text: string;
    author: {
        name: string;
        avatar_url: string;
    };
};

const messagesQueue: Message[] = [];

const socket = io('http://localhost:4000');
socket.on('new_message', (newMessage: Message) => {
    console.log(newMessage);
    messagesQueue.push(newMessage);
});

export function MessageList() {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        api.get<Message[]>('messages').then(response => {
            setMessages(response.data);
        });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (messagesQueue.length > 0) {
                setMessages(prevState => [messagesQueue[0], prevState[0], prevState[1]].filter(Boolean));
                messagesQueue.shift();
            }
        }, 3000);
    }, []);

    return (
        <div className={styles.messageBoxWrapper}>
            <img src={logoImg} alt="DoWhile 2021" />

            <ul className={styles.messageList}>
                {
                    messages.map(message => (
                        <li key={message.id} className={styles.message}>
                            <p className={styles.messageContent}>{message.text}</p>
                            <div className={styles.messageUser}>
                                <div className={styles.userImage}><img src={message.author.avatar_url} alt={message.author.name} /></div>
                                <span>{message.author.name}</span>
                            </div>
                        </li>))
                }
            </ul>
        </div>
    );
}