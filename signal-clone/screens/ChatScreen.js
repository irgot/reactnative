import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Avatar, Icon, Input } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { auth, db } from '../firebase';
import firebase from 'firebase'

const ChatScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()

    const [inputMessage, setInputMessage] = useState('')
    const [messages, setMessages] = useState([])
    useLayoutEffect(() => {
        const unsubscribe = navigation.setOptions({
            title: "Chat",
            headerTitleAlign: 'left',
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Avatar rounded source={{
                        uri: messages[0]?.data.photoURL
                    }} />
                    <Text style={{ color: '#fff', fontWeight: 'bold', marginLeft: 10 }}> {route.params.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 80 }}>
                    <TouchableOpacity style={{ marginLeft: 10 }}>
                        <Ionicons name="videocam-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 10 }}>
                        <Ionicons name="call-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            )
        })
        return (unsubscribe)

    }, [navigation, route, messages])
    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: inputMessage,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        }).catch(error => {
            console.error(error)
        })
        setInputMessage('')
    }

    useLayoutEffect(() => {
        const unsubscribe = db
            .collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => setMessages(snapshot.docs.map(doc => {
                return ({
                    id: doc.id,
                    data: doc.data()
                })
            })))
        return unsubscribe;
    }, [route])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : ""}
                style={styles.container}
                keyboardVerticalOffset={90}
            >

                <>

                    {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss()}> */}
                    <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                        {messages.map(({ id, data }) => (
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.receiver}>
                                    <Avatar
                                        size={30}
                                        rounded
                                        bottom={-15}
                                        right={-5}
                                        position="absolute"
                                        source={{ uri: data.photoURL }}
                                        containerStyle={{
                                            position: 'absolute',
                                            bottom: -15,
                                            left: -5
                                        }}
                                    />
                                    <Text style={styles.receiverText}>{data.message}</Text>
                                </View>
                            ) : (
                                <View key={id} style={styles.sender}>
                                    <Avatar
                                        size={30}
                                        rounded
                                        bottom={-15}
                                        right={5}
                                        position="absolute"
                                        source={{ uri: data.photoURL }}
                                        containerStyle={{
                                            position: 'absolute',
                                            bottom: -15,
                                            left: -5
                                        }}
                                    />
                                    <Text style={styles.senderText}>{data.message}</Text>
                                    <Text style={styles.senderName}>{data.displayName}</Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                    {/* </TouchableWithoutFeedback> */}
                    <View style={styles.footer}>
                        <TextInput
                            placeholder="Signal Message"
                            style={styles.textInput}
                            value={inputMessage}
                            onChangeText={setInputMessage}
                            onSubmitEditing={sendMessage}
                        />
                        <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                            <Ionicons name="send" size={24} color="#2B68E6" />
                        </TouchableOpacity>
                    </View>
                </>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    receiver: {
        padding: 15,
        backgroundColor: '#ececec',
        alignSelf: 'flex-end',
        borderRadius: 15,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'

    },
    sender: {
        padding: 15,
        backgroundColor: '#2b68e6',
        alignSelf: 'flex-start',
        borderRadius: 15,
        marginLeft: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15,
        justifyContent: 'space-between'

    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ececec',
        padding: 10,
        color: 'grey',
        borderRadius: 30
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: '#fff'
    },
    senderText: {
        color: "#fff",
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 15
    },
    receiverText: {
        color: "#000",
        fontWeight: '600',
        marginLeft: 10
    }
})
