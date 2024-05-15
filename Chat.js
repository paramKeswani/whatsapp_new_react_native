import React, { useState, useEffect, useCallback } from 'react';
import { Platform, KeyboardAvoidingView, View, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { formatTimestamp } from './helper';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const { params } = useRoute();
    const { userId, userName } = params;
    const currentUser = auth().currentUser;
    const navigation = useNavigation(); // Get navigation object

    useEffect(() => {
        const chatId = [currentUser.uid, userId].sort().join('_');
        const chatReference = firestore().collection('chats').doc(chatId);

        const unsubscribe = chatReference.onSnapshot(snapshot => {
            if (snapshot.exists) {
                const chatData = snapshot.data();
                const messagesFirestore = chatData.messages.map(msg => ({
                    ...msg,
                    createdAt: msg.createdAt.toDate(),
                }));
                setMessages(messagesFirestore);
            }
        });

        return () => unsubscribe();
    }, [userId, currentUser.uid]);

    const onSend = useCallback(async (newMessages = []) => {
        const chatId = [currentUser.uid, userId].sort().join('_');
        const chatReference = firestore().collection('chats').doc(chatId);

        const formattedMessages = newMessages.map(msg => ({
            ...msg,
            createdAt: new Date(), // Using current date for the timestamp
        }));

        try {
            await chatReference.set(
                {
                    messages: GiftedChat.append(messages, formattedMessages),
                },
                { merge: true }
            );
        } catch (error) {
            console.error('Error sending message: ', error);
        }
    }, [messages, userId, currentUser.uid]);

    const renderBubble = (props) => (
        <Bubble
            {...props}
            textStyle={{
                right: { color: 'white' },
                left: { color: 'black' },
            }}
            wrapperStyle={{
                right: { backgroundColor: '#0078FF' },
                left: { backgroundColor: '#ECECEC' },
            }}
            timeTextStyle={{
                right: { color: 'white' },
                left: { color: 'black' },
            }}
        />
    );

    useEffect(() => {
        // Set navigation options in a separate useEffect hook
        navigation.setOptions({
            title: userName, // Set header title to userName
        });
    }, [navigation, userName]); // Dependency array with navigation and userName

    return (
        <LinearGradient colors={['#000', '#FFF']} style={{ flex: 1 }}>
            <GiftedChat
                messages={messages}
                onSend={newMessages => onSend(newMessages)}
                user={{
                    _id: currentUser.uid,
                    name: userName,
                }}
                renderBubble={renderBubble}
                placeholder={`Chatting with ${userName}`}
            />
            {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
        </LinearGradient>
    );
};

export default ChatScreen;
