import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { db } from '../firebase'

const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([])
    useEffect(() => {
        const unsubscribe = db.collection('chats').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
            setChatMessages(snapshot.docs.map(doc => (
                doc.data
            )))
        ))
        return unsubscribe
    }, [])
    return (
        <ListItem key={id} bottomDivider onPress={() => { enterChat(id, chatName) }}>
            <Avatar
                rounded
                source={{
                    uri: chatMessages[0]?.photoURL
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 'bold' }} >
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode={'tail'}>
                    ABC
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
