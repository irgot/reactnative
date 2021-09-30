import { useNavigation } from '@react-navigation/core'
import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect } from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import CustomListItem from '../components/CustomListItem'

const HomeScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: {
                backgroundColor: 'white'
            },
            headerTitleStyle: { color: 'black' },
            headerTintColor: "black",
        })
    }, [])
    return (

        <SafeAreaView>
            <StatusBar style={"dark"} />
            <ScrollView>
                <CustomListItem />
            </ScrollView>
        </SafeAreaView>

    )
}

export default HomeScreen

const styles = StyleSheet.create({})
