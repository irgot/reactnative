import React from 'react'
import { FlatList, Text, ImageBackground } from 'react-native';

import { useRoute } from '@react-navigation/native';

import chatRomData from '../data/Chats'
import ChatMessage from '../components/ChatMessage/ChatMessage';
import InputBox from '../components/InputBox/InputBox';

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


    return (
        <ImageBackground
            source={{ uri: "https://theabbie.github.io/blog/assets/official-whatsapp-background-image.jpg" }}
            style={{ width: '100%', height: '100%' }}

        >
            <FlatList
                data={chatRomData.messages}
                renderItem={({ item }) => {
                    return (<ChatMessage message={item}></ChatMessage>)
                }}
                inverted
            />
            <InputBox chatRoomID={route.params.id} />
        </ImageBackground >

    )
}

export default ChatRoomScreen
