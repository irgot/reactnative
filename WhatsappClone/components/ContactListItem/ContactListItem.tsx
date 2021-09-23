import React from 'react'
import styles from './style'
import { Text } from '../Themed';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View, Image } from 'react-native';
import { User } from '../../types';
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createChatRoom, createChatRoomUser } from "../../src/graphql/mutations";
import { useNavigation } from "@react-navigation/native";

type PropsType = {
    user: User
}

function ContactListItem(props: PropsType) {

    const { user } = props;
    const navigation = useNavigation();
    // user.imageUri = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/48px-User_icon_2.svg.png"
    const onPress = async () => {
        try {
            //create a new chat room
            const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, {
                input: {
                    lastMessageID: "ffffffff-ffff-ffff-ffff-ffffffffffff"
                }
            }))


            if (!newChatRoomData) {
                console.log('Failed to create a chat room');

                return
            }
            const newChatRoom = newChatRoomData.data.createChatRoom
            // add user to the chat room
            await API.graphql(graphqlOperation(createChatRoomUser, {
                input: {
                    userID: user.id,
                    chatRoomID: newChatRoom.id
                }
            }))


            //add autehnticated user to the chat room
            const userInfo = await Auth.currentAuthenticatedUser();
            await API.graphql(graphqlOperation(createChatRoomUser, {
                input: {
                    userID: userInfo.attributes.sub,
                    chatRoomID: newChatRoom.id
                }
            }))
            navigation.navigate('ChatRoom', { id: newChatRoom.id, name: user.name })

        } catch (error) {
            console.error(error);

        }

    }
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{ uri: user.imageUri }} style={styles.avatar} />
                </View>
                <View style={styles.midContainer}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text style={styles.status} numberOfLines={2}>{user.status}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}


export default ContactListItem
