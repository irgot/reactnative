


import moment from 'moment';
import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ChatRoom, User } from '../../types';
import styles from './style';
import { useNavigation } from "@react-navigation/native";

export type ChatListItemProps = {
    chatRoom: ChatRoom
}

const ChatListItem = (props: ChatListItemProps) => {
    const { chatRoom } = props
    const user: User = chatRoom.users ? chatRoom.users[1] : { id: 'asdf', name: 'undefined', imageUri: 'none' };
    user.imageUri = 'https://snack-web-player.s3.us-west-1.amazonaws.com/v2/42/static/media/react-native-logo.79778b9e.png'
    const navigation = useNavigation();
    const onClick = () => {
        // console.warn(`Clicked on ${user.name}`)
        navigation.navigate('ChatRoom', { id: chatRoom.id, name: user.name })
    }
    return (
        <TouchableWithoutFeedback
            onPress={onClick}
        >
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{ uri: user.imageUri }} style={styles.avatar} />

                    <View style={styles.midContainer}>
                        <Text style={styles.username}>
                            {user.name}
                        </Text>
                        <Text style={styles.lastMessage} numberOfLines={2}>
                            {chatRoom.lastMessage.content}
                        </Text>
                    </View>

                </View>

                <Text style={styles.time}>{moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}</Text>
                {/* <Text style={styles.time}>Yesterday</Text> */}

            </View>
        </TouchableWithoutFeedback>
    )
}


export default ChatListItem