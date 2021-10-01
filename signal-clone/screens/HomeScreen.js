import { useNavigation } from '@react-navigation/core'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FlatList, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const HomeScreen = () => {
    const navigation = useNavigation();
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        })
    }

    const [chats, setChats] = useState([])

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))

        return unsubscribe
    }, [])
    useLayoutEffect(() => {

        navigation.setOptions({
            title: "Signal",
            headerStyle: {
                backgroundColor: 'white'
            },
            headerTitleStyle: { color: 'black' },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 0 }} >
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: 80,
                    marginRight: 0
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.navigate("AddChat") }}>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )

        })
    }, [navigation])
    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", { id, chatName })
    }
    return (

        <SafeAreaView>
            <StatusBar style={"dark"} />
            <ScrollView style={styles.container} onScrollBeginDrag onScrollEndDrag >
                {chats.map((chat) => {
                    return (
                        <CustomListItem key={chat.id} id={chat.id} chatName={chat.data.chatName} enterChat={enterChat} />
                    )
                })}
            </ScrollView>
        </SafeAreaView>

    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})
