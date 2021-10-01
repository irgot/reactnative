import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

export default function App() {
    const Stack = createNativeStackNavigator()
    const globalScreenOptions = {
        headerStyle: { backgroundColor: "#2c6bed" },
        headerTitleStyle: { color: 'white', alignSelf: 'center', flex: 1 },
        headerTintColor: 'white',
        headerTitleAlign: 'center'

    }
    return (
        <NavigationContainer

        >
            <Stack.Navigator
                screenOptions={globalScreenOptions}
            // initialRouteName="Home"
            >
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}

                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="AddChat"
                    component={AddChatScreen}
                />
                <Stack.Screen
                    name="Chat"
                    component={ChatScreen}
                />


            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
