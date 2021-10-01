import { useNavigation } from '@react-navigation/core'
import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements';
import { db } from '../firebase';
// import { Icon } from "react-native-vector-icons/FontAwesome";

const AddChatScreen = () => {
    const navigation = useNavigation();
    const [input, setInput] = useState("");
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new chat",
            headerBackTitle: "Chats"
        })
    }, [navigation])
    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input
        }).then(() => {
            navigation.goBack()
        }).catch(error => {
            console.error(error)
        })
    }
    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a chat name"
                value={input}
                onChangeText={setInput}
                leftIcon={
                    <Icon name={"wechat"} type="antdesign" size={24} color="black" style={{ marginRight: 5 }} />
                }
                onSubmitEditing={createChat}
            />
            <Button onPress={createChat} title="Create new Chat" />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 30,
        height: '100%'
    }
})
