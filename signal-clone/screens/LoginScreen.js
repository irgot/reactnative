import { useNavigation } from '@react-navigation/core'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { Image } from 'react-native-elements'
import { Input } from 'react-native-elements'
import { auth } from '../firebase'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser)
                console.log("NAVIGATE")
                navigation.replace("Home")
            }
        })
        return unsubscribe
    }, [])
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch(error => {
            console.error(error)
        })
    }


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding'} style={styles.container}>
            <StatusBar style="light" />

            <Image
                source={{
                    uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
                }}
                style={{ width: 200, height: 200 }}
                onError={(e) => {
                    console.error(e.nativeEvent.error);
                }}
            />
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email"
                    autoFocus
                    value={email}
                    onChangeText={emailText => setEmail(emailText)}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={passText => { setPassword(passText) }}
                    onSubmitEditing={signIn}
                />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button containerStyle={styles.button} onPress={() => navigation.navigate('Register')} type="outline" title="Register" />

        </KeyboardAvoidingView>
    )
}
// 125197974

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff'
    },
    inputContainer: {
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10
    }
})
