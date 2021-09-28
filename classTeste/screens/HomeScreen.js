import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ChatRoomScreen from './ChatRoomScreen'
import SettingsScreen from './SettingsScreen'

const HomeScreen = () => {
    const Tabs = createBottomTabNavigator()
    return (
        <View>
            <Text>Teste</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
