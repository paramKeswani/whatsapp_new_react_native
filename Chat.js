import React, { useState, useEffect, useCallback } from 'react';
import { Platform, KeyboardAvoidingView, View, Text ,TouchableOpacity} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { formatTimestamp } from './helper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

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
                right: { color: 'black' },
                left: { color: 'black' },
            }}
            wrapperStyle={{
                right: { backgroundColor: '#dcf8c6' },
                left: { backgroundColor: '#ECECEC' },
            }}
            timeTextStyle={{
                right: { color: 'black' },
                left: { color: 'black' },
            }}
        />
    );

    useEffect(() => {
        // Set navigation options in a separate useEffect hook
        navigation.setOptions({
            title: userName,
            headerStyle: { backgroundColor: '#0e806a' },
            headerTintColor: 'white',
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                    <TouchableOpacity >
                        <MaterialCommunityIcons name="video" size={24} color="#fbfbfb" style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="phone" size={24} color="#fbfbfb" style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <FontAwesomeIcon icon={faEllipsisV} size={24} color="#fbfbfb" />
                    </TouchableOpacity>
                </View>)
            
          
        });
    }, [navigation, userName]); // Dependency array with navigation and userName

    return (
        <LinearGradient colors={['#ece5dd', '#ece5dd']} style={{ flex: 1 }}>
            <GiftedChat
                messages={messages}
                onSend={newMessages => onSend(newMessages)}
                user={{
                    _id: currentUser.uid,
                    name: userName,
                }}
                renderBubble={renderBubble}
                placeholder={`Message`}
            />
            {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
        </LinearGradient>
    );
};

export default ChatScreen;
