import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';
import ChatListItem from '../components/ChatListItem/ChatListItem';
import { ChatRoom } from '../types';
// import chatRooms from '../data/ChatRooms';
import { FlatList } from 'react-native-gesture-handler';
import NewMessageButton from '../components/NewMessageButton/NewMessageButton';
import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser } from "./queries";

export default function ChatsScreen() {
    const [chatRooms, setChatRooms] = useState([])
    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const userInfo = await Auth.currentAuthenticatedUser();
                const userData = await API.graphql(graphqlOperation(getUser, {
                    id: userInfo.attributes.sub

                }))
                setChatRooms(userData.data.getUser.chatRoomUser.items);

                // console.log(userData)
            } catch (e) {
                console.error(e);

            }
        }
        fetchChatRooms()
        return () => {

        }
    }, [])
    return (
        <View style={styles.container}>

            <FlatList data={chatRooms} renderItem={({ item }) => (<ChatListItem chatRoom={item.chatRoom}></ChatListItem>)}
                keyExtractor={(item) => item.id}
                style={{ width: '100%' }}
                ItemSeparatorComponent={FlatListItemSeparator}
            />
            <NewMessageButton />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

const FlatListItemSeparator = () => {
    return (
        <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "#ccc",
            }}
        />
    );
}

