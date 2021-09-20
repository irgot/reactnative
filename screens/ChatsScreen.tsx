import React from 'react'
import { StyleSheet, View } from 'react-native';
import ChatListItem from '../components/ChatListItem/ChatListItem';
import { ChatRoom } from '../types';
import chatRooms from '../data/ChatRooms';
import { FlatList } from 'react-native-gesture-handler';
import NewMessageButton from '../components/NewMessageButton/NewMessageButton';

export default function ChatsScreen() {
    return (
        <View style={styles.container}>

            <FlatList data={chatRooms} renderItem={({ item }) => (<ChatListItem chatRoom={item}></ChatListItem>)}
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

