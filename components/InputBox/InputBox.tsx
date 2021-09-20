import { Entypo, FontAwesome5, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import styles from './style'

function InputBox() {
    const [message, setMessage] = useState('')
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
    const onSendPress = () => {
        console.warn(`Sending: ${message}`)
        setMessage('')
    }
    return (

        <View style={styles.container}>
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
        </View>


    )
}

export default InputBox
