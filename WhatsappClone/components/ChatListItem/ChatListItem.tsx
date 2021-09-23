


import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ChatRoom, User } from '../../types';
import styles from './style';
import { useNavigation } from "@react-navigation/native";
import Auth from '@aws-amplify/auth';

export type ChatListItemProps = {
    chatRoom: ChatRoom
}

const ChatListItem = (props: ChatListItemProps) => {
    const { chatRoom } = props
    const user = chatRoom.chatRoomUsers.items[0].user;
    const [otherUser, setOtherUser] = useState(null)
    const navigation = useNavigation();
    const onClick = () => {
        // console.warn(`Clicked on ${user.name}`)
        navigation.navigate('ChatRoom', { id: chatRoom.id, name: user.name })
    }


    useEffect(() => {

        const getOtherUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
                setOtherUser(chatRoom.chatRoomUsers.items[1].user)
            }
            else {
                setOtherUser(chatRoom.chatRoomUsers.items[0].user)
            }


        }
        getOtherUser()
    }, [])
    if (!otherUser) {
        return null
    }
    return (
        <TouchableWithoutFeedback
            onPress={onClick}
        >
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{ uri: otherUser?.imageUri }} style={styles.avatar} />

                    <View style={styles.midContainer}>
                        <Text style={styles.username}>
                            {otherUser?.name}
                        </Text>
                        <Text style={styles.lastMessage} numberOfLines={2}>
                            {chatRoom.lastMessage?.content}
                        </Text>
                    </View>

                </View>

                <Text style={styles.time}>{moment(chatRoom.lastMessage?.createdAt).format("DD/MM/YYYY")}</Text>
                {/* <Text style={styles.time}>Yesterday</Text> */}

            </View>
        </TouchableWithoutFeedback>
    )
}


export default ChatListItem