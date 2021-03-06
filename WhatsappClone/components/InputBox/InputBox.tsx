import API from '@aws-amplify/api'
import Auth from '@aws-amplify/auth'
import { Entypo, FontAwesome5, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'
import { graphqlOperation } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { createMessage, updateChatRoom } from '../../src/graphql/mutations';
import styles from './style'

function InputBox(props) {
    const { chatRoomID } = props
    const [message, setMessage] = useState('')
    const [myUserId, setMyUserId] = useState(null)
    const onPress = () => {
        if (!message) {
            onMicrophonePress();
        } else {
            onSendPress();
        }
    }
    const onMicrophonePress = () => {
        console.warn('Microphone');

    }

    const updateChatRoomLastMessage = async (lastMessageID: string) => {
        try {
            await API.graphql(graphqlOperation(updateChatRoom, {
                input: {
                    id: chatRoomID,
                    lastMessageID
                }
            }))
        } catch (error) {
            console.error(error);

        }
    }
    const onSendPress = async () => {

        try {
            const newMessageData = await API.graphql(graphqlOperation(createMessage, {
                input: {
                    content: message,
                    userID: myUserId,
                    chatRoomID
                }
            }))
            const newMessageID = newMessageData.data.createMessage.id
            // console.log(newMessageData.data.createMessage.id);
            await updateChatRoomLastMessage(newMessageID)


            setMessage('')
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser()
            setMyUserId(userInfo.attributes.sub)
        }
        fetchUser()

        return () => {

        }
    }, [])
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : 'height'}
            style={styles.container}
        >



            <View style={styles.mainContainer}>
                <FontAwesome5 name={'laugh-beam'} size={24} color="grey" />
                <TextInput style={styles.textInput}
                    multiline
                    value={message}
                    onChangeText={setMessage}
                    placeholder={"Type a message"}
                />
                <Entypo name="attachment" size={24} color="grey" style={styles.icon} />
                {
                    !message && <Fontisto name="camera" size={24} color="grey" style={styles.icon} />
                }
            </View>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.buttonContainer}>
                    {
                        !message ? <MaterialCommunityIcons name={"microphone"} size={28} color={'#fff'} /> : <MaterialCommunityIcons name={"send"} size={28} color={'#fff'} />
                    }
                </View>
            </TouchableOpacity>

        </KeyboardAvoidingView>


    )
}

export default InputBox
