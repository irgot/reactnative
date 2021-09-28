import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { backgroundColor, color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import tw from 'tailwind-react-native-classnames';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import colorPalete from "./colorPalete";
import { Entypo, Feather, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import HeaderComponent from './components/HeaderComponent';
import RoutineScreen from './screens/RoutineScreen';
import ActivityScreen from './screens/ActivityScreen';
import FinanceScreen from './screens/FinanceScreen';
import ChatScreen from './screens/ChatScreen';


export default function App() {
    const Tab = createBottomTabNavigator();
    const black = "#000000";
    return (
        <SafeAreaProvider>
            <HeaderComponent></HeaderComponent>
            <NavigationContainer>

                <Tab.Navigator
                    screenOptions={{
                        tabBarActiveTintColor: colorPalete.blue,
                        tabBarStyle: {
                            backgroundColor: colorPalete.white,
                            borderTopColor: 'transparent',
                            paddingBottom: 5,
                            paddingTop: 5

                        },
                        tabBarInactiveTintColor: colorPalete.gray,
                    }}

                >
                    <Tab.Screen
                        name={"Rotina"}
                        component={RoutineScreen}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ size, color }) => (
                                <FontAwesome5 name="clipboard-list" size={size} color={color} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name={"Atividades"}
                        component={ActivityScreen}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ size, color }) => (
                                <Feather name="activity" size={size} color={color} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name={"Financeiro"}
                        component={FinanceScreen}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ size, color }) => (
                                <AntDesign name="barcode" size={size} color={color} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name={"Mensagens"}
                        component={ChatScreen}
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ size, color }) => (
                                <Feather name="mail" size={size} color={color} />
                            )
                        }}
                    />
                </Tab.Navigator>


            </NavigationContainer >
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
