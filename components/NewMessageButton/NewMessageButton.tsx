import React from 'react'
import { View } from 'react-native'
import styles from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function NewMessageButton() {
    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate('Contacts');
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <MaterialCommunityIcons name="message-text"
                    size={28}
                    color={"#fff"}
                />
            </TouchableOpacity>
        </View>
    )
}

export default NewMessageButton
