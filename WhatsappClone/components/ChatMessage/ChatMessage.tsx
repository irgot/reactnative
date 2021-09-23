import React from 'react'
import { Message } from '../../types'
import styles from './style'
import { Text, View } from 'react-native';
import moment from 'moment';

export type ChatMessageProps = {
    message: Message;

}

function ChatMessage(props: ChatMessageProps) {
    const { message } = props;
    const isMyMessage = (): boolean => {
        return message.user.id === 'u1'
    }
    return (
        <View style={styles.container}>
            <View style={[styles.messageBox, {
                backgroundColor: isMyMessage() ? '#DCF8C5' : '#ffffff',
                marginLeft: isMyMessage() ? 50 : 0,
                marginRight: isMyMessage() ? 0 : 50,


            }]} >
                {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
                <Text style={styles.message}>
                    {message.content}
                </Text>
                <Text style={styles.time}>
                    {moment(message.createdAt).fromNow()}
                </Text>
            </View>
        </View >
    )
}

export default ChatMessage
