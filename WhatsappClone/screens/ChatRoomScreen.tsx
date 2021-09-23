import React, { useEffect, useState } from 'react'
import { FlatList, Text, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';

import { useRoute } from '@react-navigation/native';

import ChatMessage from '../components/ChatMessage/ChatMessage';
import InputBox from '../components/InputBox/InputBox';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getMessage, messagesByChatRoom } from '../src/graphql/queries';
import { onCreateMessage } from '../src/graphql/subscriptions';

type RouteParams = {
    route: {
        params: {
            id: string,
            name: string
        }
    }
}

const ChatRoomScreen = ({ route }: RouteParams) => {
    // console.log(route.params);
    const chatRoomID = route.params.id
    const [messages, setMessages] = useState([])
    const [myId, setMyId] = useState(null)
    const fetchMessages = async () => {
        const messagesData = await API.graphql(graphqlOperation(messagesByChatRoom, {
            chatRoomID,
            sortDirection: "DESC"
        }))
        setMessages(messagesData.data.messagesByChatRoom.items)
    }
    useEffect(() => {

        fetchMessages()
        return () => {

        }
    }, [])
    useEffect(() => {
        const getMyAuthData = async () => {
            const myAuthData = await Auth.currentAuthenticatedUser()
            setMyId(myAuthData.attributes.sub)
        }
        getMyAuthData()
    })
    useEffect(() => {
        const subscription = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
            next: (data) => {
                // console.log(data.value.data);
                const newMessage = data.value.data.onCreateMessage;
                if (newMessage.chatRoomID != chatRoomID) {
                    return
                }
                // console.log(`messages: ${this?.messages.length}`)
                // const newMessages = [newMessage, ...messages]
                // console.log(`messages: ${newMessages.length}`)

                // setMessages()
                // console.log(messages)
                fetchMessages()
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [])
    return (
        <ImageBackground
            source={{ uri: "https://theabbie.github.io/blog/assets/official-whatsapp-background-image.jpg" }}
            style={{ width: '100%', height: '100%' }}

        >
            <FlatList
                data={messages}
                renderItem={({ item }) => {
                    return (<ChatMessage message={item} myId={myId}></ChatMessage>)
                }}
                inverted
            />
            <InputBox chatRoomID={route.params.id} />
        </ImageBackground >
    )
}

export default ChatRoomScreen
