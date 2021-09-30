import { useNavigation } from '@react-navigation/core'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../firebase'

const RegisterScreen = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [imageUrl, setImageUrl] = useState()
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login"
        })
    }, [navigation])
    const register = () => {
        auth.createUserWithEmailAndPassword(email, password).then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
            })
        }).catch(error => {
            console.error(error);
        })
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding'} style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }} >
                Create a Signal account
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Full Name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={setName}
                />
                <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    placeholder="Password"
                    type="text"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Input
                    placeholder="Image Url (optional)"
                    type="text"
                    value={imageUrl}
                    onChangeText={setImageUrl}
                    onSubmitEditing={register}
                />

            </View>
            <Button raised onPress={register} title="Register" containerStyle={styles.button} />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff'

    },
    button: {
        width: '100%',
        marginTop: 10
    },
    inputContainer: {
        width: 300
    }
})
