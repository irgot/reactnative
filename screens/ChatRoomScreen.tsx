import React from 'react'
import { Text } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

type NavigationParams = {
    id: string;
}

const ChatRoomScreen = () => {

    const route = useRoute();

    console.log(route.params)
    return (
        <Text>
            ChatRoom
        </Text>
    )
}

export default ChatRoomScreen
