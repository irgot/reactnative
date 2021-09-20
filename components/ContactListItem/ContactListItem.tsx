import React from 'react'
import styles from './style'
import { Text } from '../Themed';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View, Image } from 'react-native';
import { User } from '../../types';

type PropsType = {
    user: User
}

function ContactListItem(props: PropsType) {

    const { user } = props;
    user.imageUri = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/48px-User_icon_2.svg.png"
    const onPress = () => {

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
