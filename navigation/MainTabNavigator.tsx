
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import * as React from 'react';
import { Fontisto } from "@expo/vector-icons";
import ChatsScreen from '../screens/ChatsScreen';

const MainTab = createMaterialTopTabNavigator<RootTabParamList>();

function MainTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <MainTab.Navigator
            initialRouteName="Camera"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].background,
                tabBarStyle: {
                    backgroundColor: Colors[colorScheme].tint
                },
                tabBarIndicatorStyle: {
                    backgroundColor: Colors[colorScheme].background,
                    height: 4
                },
                tabBarLabelStyle: {
                    fontWeight: 'bold'
                }
            }}


        >
            <MainTab.Screen
                name="Camera"
                component={TabOneScreen}

                options={{
                    title: 'Camera',
                    tabBarIcon: ({ color }) => (<Fontisto name="camera" color={color} size={18} />),
                    tabBarLabel: () => null
                }}

            />
            <MainTab.Screen
                name="Chats"
                component={ChatsScreen}
                options={{
                    title: 'Chats'
                }}
            />
            <MainTab.Screen
                name="Status"
                component={TabTwoScreen}
                options={{
                    title: 'Status'
                }}
            />
            <MainTab.Screen
                name="Calls"
                component={TabTwoScreen}
                options={{
                    title: 'Calls'
                }}
            />
        </MainTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default MainTabNavigator