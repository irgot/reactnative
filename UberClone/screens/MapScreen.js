import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Map from '../components/Map'
import tw from "tailwind-react-native-classnames";
import { createStackNavigator } from '@react-navigation/stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';

import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useNavigation } from '@react-navigation/core';


const MapScreen = () => {
    const Stack = createStackNavigator()
    const navigation = useNavigation()
    return (
        <View>
            <TouchableOpacity style={tw`absolute top-16 left-8 z-50 bg-gray-100 p-3 rounded-full
            shadow-lg`}
                onPress={() => navigation.navigate("HomeScreen")}
            >
                <Icon name="menu" />
            </TouchableOpacity>
            <View style={tw`h-1/2`}>
                <Map />
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            </View>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({})