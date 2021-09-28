import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Entypo, FontAwesome } from "@expo/vector-icons";
import colorPalete from '../colorPalete';

const HeaderComponent = () => {
    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonStyle}>
                    <FontAwesome name="user" size={30} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 15 }}>João Ferreira de Souza</Text>
            </View>
            <View style={{ height: 0.5, backgroundColor: '#dddddd' }} />
        </View>
    )
}

export default HeaderComponent

const styles = StyleSheet.create({
    container: {
        // width: 60,
        // height: 60,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    buttonStyle: {
        height: 50,
        width: 50,
        marginRight: 15,
        shadowColor: "#4e4f72",
        shadowOpacity: 0.2,
        shadowRadius: 30,
        shadowOffset: {
            height: 0,
            width: 0
        },
        borderRadius: 30,
        elevation: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorPalete.white,
        margin: 5

    },

})
